"""Find, fetch and credit free-licensed photography from Wikimedia Commons.

    python commons.py search "<query>" [--limit N] [--min-width N] [--landscape]
    python commons.py fetch "<File:Title.jpg>" <out-name> [--width 2000]
    python commons.py credits                      # rewrite CREDITS.md from the sidecars

Every fetch writes a `<out-name>.json` sidecar next to the image holding the
title, author, licence and source URL, and `credits` turns those into the
CREDITS.md that has to sit beside the images. Doing it in one step is the only
way the credits stay true: a file downloaded by hand is a file nobody can
attribute three weeks later.

Output is ASCII-only on purpose — the Windows console cannot encode most of
what Commons puts in an author field, and a UnicodeEncodeError in a print
kills the script *after* the download has already happened.
"""

import json
import os
import re
import sys
import time
import urllib.parse
import urllib.request

API = "https://commons.wikimedia.org/w/api.php"
UA = "showoff-veld/1.0 (front-end study; contact via repository)"
HERE = os.path.dirname(os.path.abspath(__file__))
IMAGES = os.path.join(HERE, "..", "src", "assets", "images")


def ascii_(s):
    return (s or "").encode("ascii", "replace").decode("ascii")


def strip_html(s):
    return re.sub(r"<[^>]+>", "", s or "").strip()


def open_url(url, timeout=120):
    """GET with backoff. Commons answers 429 well before it answers slowly."""
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    for attempt in range(6):
        try:
            return urllib.request.urlopen(req, timeout=timeout).read()
        except urllib.error.HTTPError as e:
            if e.code not in (429, 503) or attempt == 5:
                raise
            wait = 3 * (attempt + 1)
            print(f"  ({e.code}; waiting {wait}s)")
            time.sleep(wait)
    raise SystemExit("unreachable")


def api(params):
    params = dict(params, format="json")
    return json.loads(open_url(API + "?" + urllib.parse.urlencode(params), timeout=60))


def search(query, limit, min_width, landscape):
    d = api(
        {
            "action": "query",
            "generator": "search",
            "gsrsearch": query,
            "gsrnamespace": 6,
            "gsrlimit": max(limit * 3, 20),
            "prop": "imageinfo",
            "iiprop": "url|size|extmetadata",
        }
    )
    pages = (d.get("query") or {}).get("pages") or {}
    rows = []
    for p in pages.values():
        ii = p["imageinfo"][0]
        meta = ii.get("extmetadata", {})
        lic = strip_html(meta.get("LicenseShortName", {}).get("value", "?"))
        w, h = ii["width"], ii["height"]
        if w < min_width:
            continue
        if landscape and h >= w:
            continue
        if "non-free" in lic.lower() or "fair use" in lic.lower():
            continue
        rows.append((p["title"], w, h, lic, strip_html(meta.get("Artist", {}).get("value", "?"))))
    rows.sort(key=lambda r: -r[1])
    for t, w, h, lic, artist in rows[:limit]:
        print(f"{w}x{h:<6} {lic:<16} {ascii_(artist)[:28]:<28} {ascii_(t)}")
    if not rows:
        print("(nothing matched)")


def fetch(title, out_name, width):
    if not title.startswith("File:"):
        title = "File:" + title
    d = api(
        {
            "action": "query",
            "titles": title,
            "prop": "imageinfo",
            "iiprop": "url|size|extmetadata",
            "iiurlwidth": width,
        }
    )
    pages = (d.get("query") or {}).get("pages") or {}
    page = next(iter(pages.values()))
    if "imageinfo" not in page:
        raise SystemExit(f"no such file: {ascii_(title)}")
    ii = page["imageinfo"][0]
    meta = ii.get("extmetadata", {})
    url = ii.get("thumburl") or ii["url"]

    os.makedirs(IMAGES, exist_ok=True)
    dest = os.path.join(IMAGES, out_name)
    with open(dest, "wb") as f:
        f.write(open_url(url, timeout=180))

    sidecar = {
        "file": out_name,
        "title": page["title"],
        "author": strip_html(meta.get("Artist", {}).get("value", "Unknown")),
        "license": strip_html(meta.get("LicenseShortName", {}).get("value", "?")),
        "licenseUrl": strip_html(meta.get("LicenseUrl", {}).get("value", "")),
        "source": "https://commons.wikimedia.org/wiki/"
        + urllib.parse.quote(page["title"].replace(" ", "_")),
        "width": ii.get("thumbwidth", ii["width"]),
        "height": ii.get("thumbheight", ii["height"]),
    }
    with open(dest + ".json", "w", encoding="utf-8", newline="") as f:
        json.dump(sidecar, f, indent=1, ensure_ascii=False)
    size_kb = os.path.getsize(dest) // 1024
    print(f"{out_name}  {sidecar['width']}x{sidecar['height']}  {size_kb}KB  {sidecar['license']}")


def categories_of(title):
    """The categories a file sits in — the fastest way to find its siblings."""
    if not title.startswith("File:"):
        title = "File:" + title
    d = api({"action": "query", "titles": title, "prop": "categories", "cllimit": 50})
    page = next(iter((d.get("query") or {}).get("pages", {}).values()))
    for c in page.get("categories", []):
        print(ascii_(c["title"]))


def category(name, limit, min_width, landscape):
    """Files in a category. Curated by hand, so far better signal than search."""
    if not name.startswith("Category:"):
        name = "Category:" + name
    d = api(
        {
            "action": "query",
            "generator": "categorymembers",
            "gcmtitle": name,
            "gcmtype": "file",
            "gcmlimit": max(limit * 3, 50),
            "prop": "imageinfo",
            "iiprop": "url|size|extmetadata",
        }
    )
    pages = (d.get("query") or {}).get("pages") or {}
    rows = []
    for p in pages.values():
        if "imageinfo" not in p:
            continue
        ii = p["imageinfo"][0]
        meta = ii.get("extmetadata", {})
        w, h = ii["width"], ii["height"]
        if w < min_width or (landscape and h >= w):
            continue
        rows.append(
            (
                p["title"],
                w,
                h,
                strip_html(meta.get("LicenseShortName", {}).get("value", "?")),
                strip_html(meta.get("Artist", {}).get("value", "?")),
            )
        )
    rows.sort(key=lambda r: -r[1])
    for t, w, h, lic, artist in rows[:limit]:
        print(f"{w}x{h:<6} {lic:<16} {ascii_(artist)[:24]:<24} {ascii_(t)}")
    if not rows:
        print("(nothing matched)")


def batch(manifest):
    """Fetch every row of a `title<TAB>out-name<TAB>width` manifest.

    The manifest is the reason the image folder is reproducible: delete
    `src/assets/images` and one command rebuilds it, credits and all. It also
    dodges the shell entirely, which matters because these titles are full of
    characters a Windows console will not pass through intact.
    """
    with open(manifest, encoding="utf-8") as f:
        rows = [
            line.rstrip("\n").split("\t")
            for line in f
            if line.strip() and not line.startswith("#")
        ]
    for i, row in enumerate(rows, 1):
        title, out_name = row[0], row[1]
        width = int(row[2]) if len(row) > 2 else 2000
        dest = os.path.join(IMAGES, out_name)
        if os.path.exists(dest) and os.path.exists(dest + ".json"):
            print(f"[{i}/{len(rows)}] {out_name}  (already there)")
            continue
        print(f"[{i}/{len(rows)}] ", end="")
        fetch(title, out_name, width)
        time.sleep(1.5)


def credits():
    rows = []
    for name in sorted(os.listdir(IMAGES)):
        if not name.endswith(".json"):
            continue
        with open(os.path.join(IMAGES, name), encoding="utf-8") as f:
            rows.append(json.load(f))

    out = [
        "# Image credits",
        "",
        "Every photograph here is free-licensed work from Wikimedia Commons, standing in",
        "for photography a real driver would own. Sem Veldkamp is invented; none of these",
        "pictures show him, and none of them are presented as his.",
        "",
        "Files are fetched and credited in one step by `tools/commons.py`, so this table",
        "cannot drift away from what is actually in the folder.",
        "",
        "| File | Source | Author | Licence |",
        "|---|---|---|---|",
    ]
    for r in rows:
        title = r["title"].removeprefix("File:")
        out.append(
            f"| `{r['file']}` | [{title}]({r['source']}) | {r['author']} | {r['license']} |"
        )
    out.append("")
    dest = os.path.join(IMAGES, "CREDITS.md")
    with open(dest, "w", encoding="utf-8", newline="") as f:
        f.write("\n".join(out))
    print(f"CREDITS.md: {len(rows)} files")


def main():
    if len(sys.argv) < 2:
        raise SystemExit(__doc__)
    cmd = sys.argv[1]
    arg = lambda name, default: (  # noqa: E731
        sys.argv[sys.argv.index(name) + 1] if name in sys.argv else default
    )
    if cmd == "search":
        search(
            sys.argv[2],
            int(arg("--limit", 12)),
            int(arg("--min-width", 1600)),
            "--landscape" in sys.argv,
        )
    elif cmd == "cat":
        category(
            sys.argv[2],
            int(arg("--limit", 20)),
            int(arg("--min-width", 1600)),
            "--landscape" in sys.argv,
        )
    elif cmd == "cats":
        categories_of(sys.argv[2])
    elif cmd == "fetch":
        fetch(sys.argv[2], sys.argv[3], int(arg("--width", 2000)))
    elif cmd == "batch":
        batch(sys.argv[2])
    elif cmd == "credits":
        credits()
    else:
        raise SystemExit(__doc__)


main()
