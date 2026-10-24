"""Re-encode the reference's images for the build.

    python tools/bake.py <dumpImgDir>

Rule 0: the images do not change; rule 10: re-encode only to save bytes. Each
file is capped at twice its painted size and written as webp.

Two notes specific to this reference.

* It is a Webflow site serving **avif**, which Pillow cannot open without a
  plugin. Those are copied through untouched rather than re-encoded — a format
  the browser handles and the build does not need to change.
* The three card illustrations and every customer logo are **SVG**, copied
  byte for byte. Rasterising a drawn illustration loses it at every size but
  one.
"""

import os
import shutil
import sys

from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, '..', 'src', 'assets', 'img')

PLAN = [
    ('67ebdf60aa3b285cdbb0027b_cupp-website_.webp', 'story-1', 1400),
    ('6a303639cfb7e6355101441c_bsc_success-story_thumbnail.webp', 'story-2', 1400),
    ('6a21e06709321d9c654c6840_success-story-thumbnail.webp', 'story-3', 1400),
    ('6a7da5138f3ca6922ea2ebf1_pieminister-nory-success-story.webp', 'story-4', 1400),
    ('6a4d003625e4fe8fe66f7a10_container.avif', 'crew', 900),
]

COPY = [
    ('6a4d06b32e444834e6ea0b94_bagel.svg', 'card-1.svg'),
    ('6a4d06c80f61695f9383c9b2_pie-chart.svg', 'card-2.svg'),
    ('6a4d06d7991804181c9a7e9c_toast.svg', 'card-3.svg'),
    ('6a57780cfc8cd81590825e67_nory-business-intelligence-sales-reporting-app-screenshot.avif', 'phone-bi.avif'),
    ('6a5780526d9d123cc4d1dcdd_nory-inventory-management-orders-app-screenshot.avif', 'phone-inv.avif'),
    ('6a57ef784b4f2438f9f8651e_nory-workforce-management-scheduling-app-screenshot.avif', 'phone-work.avif'),
    ('6a57ef78ffbae68ac4162cd0_nory-payroll-approval-app-screenshot.avif', 'phone-pay.avif'),
    ('6a55f38f36f6c985f47648a4_bc6545acd7235df3846e8120cdf78ea1_nory-cta-phone.avif', 'cta-phone.avif'),
    ('6aa7df55fdba5b2c34cf9725_receipt-icon.avif', 'news-1.avif'),
    ('6a4d012329642257cacb21dd_frame-2.avif', 'news-2.avif'),
    ('6a4cffd5b006f4bec821fa73_frame-1.avif', 'news-3.avif'),
    ('6a4cff3b49932a0f324e6b7d_frame.avif', 'news-4.avif'),
    ('6a4cff0967a1a2a1f5589de7_cash-dollar-bills-money-icon.avif', 'news-5.avif'),
    ('6a4cff0967a1a2a1f5589de7_cash-dollar-bills-money-icon.avif', 'news-6.avif'),
    ('homepage-hero-v2.mp4', 'hero.mp4'),
]


def main():
    src_dir = sys.argv[1]
    os.makedirs(OUT, exist_ok=True)
    for src, name, cap in PLAN:
        path = os.path.join(src_dir, src)
        if not os.path.exists(path):
            print('MISSING %s' % src)
            continue
        im = Image.open(path)
        im = im.convert('RGBA' if im.mode in ('RGBA', 'LA', 'P') else 'RGB')
        if max(im.size) > cap:
            r = cap / max(im.size)
            im = im.resize((round(im.width * r), round(im.height * r)), Image.LANCZOS)
        dest = os.path.join(OUT, name + '.webp')
        im.save(dest, 'WEBP', quality=84, method=6)
        print('%-16s %4dx%-4d %8d' % (name + '.webp', im.width, im.height, os.path.getsize(dest)))

    for src, name in COPY:
        path = os.path.join(src_dir, src)
        if not os.path.exists(path):
            print('MISSING %s' % src)
            continue
        shutil.copyfile(path, os.path.join(OUT, name))
        print('%-16s copied verbatim' % name)


if __name__ == '__main__':
    main()
