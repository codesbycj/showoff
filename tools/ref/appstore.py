"""Source reference screenshots from the public App Store lookup API.

No auth, no scraping: itunes.apple.com/search resolves a name to a track id and
returns screenshotUrls. The URLs carry a thumbnail transform as their last path
segment (".../Screen_1_1206x2622.jpg/320x480bb.jpg"); replacing it with a larger
one returns the asset at native resolution.

  python tools/ref/appstore.py search "monzo"
  python tools/ref/appstore.py fetch <slug> <trackId> [--out ref/batch4]

The filename is NOT evidence of a clean screen export - Revolut's
"Screen_1_1206x2622.jpg" is a 3D card render with a headline over it. Score the
pixels with screenscore.py; this module only fetches.
"""

import argparse
import json
import os
import re
import sys
import urllib.parse
import urllib.request

API = "https://itunes.apple.com"
UA = "showoff-refsource/1.0"
# Ask for an asset larger than any phone screenshot; the CDN clamps to native.
FULL = "2400x2400bb.jpg"


def _get(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read()


def search(term, country="us", limit=6):
    q = urllib.parse.urlencode(
        {"term": term, "entity": "software", "limit": limit, "country": country}
    )
    data = json.loads(_get(API + "/search?" + q).decode("utf-8", "replace"))
    return data.get("results", [])


def lookup(track_id, country="us"):
    q = urllib.parse.urlencode({"id": track_id, "country": country})
    data = json.loads(_get(API + "/lookup?" + q).decode("utf-8", "replace"))
    r = data.get("results", [])
    return r[0] if r else None


def full_res(url):
    """Swap the trailing thumbnail transform for a full-resolution one."""
    return re.sub(r"/[0-9]+x[0-9]+[a-z]{0,3}\.(jpg|png|jpeg|webp)$", "/" + FULL, url)


def native_size(url):
    """Native pixel size if the source filename declares one, else None."""
    m = re.search(r"[_-](\d{3,4})x(\d{3,4})", url)
    return (int(m.group(1)), int(m.group(2))) if m else None


def cmd_search(args):
    for r in search(args.term, args.country):
        shots = r.get("screenshotUrls", [])
        print(
            "%-12s %-42s %-28s shots=%d"
            % (
                r["trackId"],
                r["trackName"][:42],
                (r.get("sellerName") or "")[:28],
                len(shots),
            )
        )


def cmd_fetch(args):
    rec = lookup(args.track_id, args.country)
    if not rec:
        print("NOT FOUND", args.track_id)
        return 1
    shots = rec.get("screenshotUrls", [])
    out = os.path.join(args.out, args.slug)
    os.makedirs(out, exist_ok=True)
    meta = {
        "slug": args.slug,
        "trackId": rec["trackId"],
        "trackName": rec["trackName"],
        "sellerName": rec.get("sellerName"),
        "version": rec.get("version"),
        "country": args.country,
        "shots": [],
    }
    for i, u in enumerate(shots, 1):
        src = full_res(u)
        name = "%02d.jpg" % i
        path = os.path.join(out, name)
        try:
            blob = _get(src)
        except Exception as e:
            print("  FAIL %s %s" % (name, e))
            continue
        with open(path, "wb") as f:
            f.write(blob)
        meta["shots"].append({"file": name, "url": src, "declared": native_size(u)})
        print("  %s  %7d bytes" % (name, len(blob)))
    with open(os.path.join(out, "source.json"), "w", newline="") as f:
        json.dump(meta, f, indent=2)
    print("%s: %d shots -> %s" % (args.slug, len(meta["shots"]), out))
    return 0


def main():
    p = argparse.ArgumentParser()
    sub = p.add_subparsers(dest="cmd", required=True)

    s = sub.add_parser("search")
    s.add_argument("term")
    s.add_argument("--country", default="us")
    s.set_defaults(fn=cmd_search)

    f = sub.add_parser("fetch")
    f.add_argument("slug")
    f.add_argument("track_id")
    f.add_argument("--out", default="ref/batch4")
    f.add_argument("--country", default="us")
    f.set_defaults(fn=cmd_fetch)

    a = p.parse_args()
    sys.exit(a.fn(a) or 0)


if __name__ == "__main__":
    main()
