"""Download the two OFL typefaces the before's heading images are rendered in.

    python tools/fetch-fonts.py

The before's headings are JPEGs — that is this episode's angle — so they have to
be *rendered*, which needs a real TTF on disk rather than the woff2 that
`@fontsource` ships. The obvious shortcut is to point PIL at
`C:/Windows/Fonts/georgia.ttf`, which is exactly what the imaginary designer did
in 2009 and exactly what cannot be redistributed or reproduced elsewhere.

So: two OFL faces from the Google Fonts repository.

  * **Cinzel** for the wordmark and the section headings, standing in for
    Trajan — the Roman capital on the front of every solicitor's, surveyor's
    and accountant's website for about fifteen years.
  * **PT Serif** for the body-weight text that is also an image, standing in
    for Georgia, which is what the HTML around it was set in.
"""

import os
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, '_fonts')
RAW = 'https://raw.githubusercontent.com/google/fonts/main'

# Cinzel ships as a single variable file; PT Serif as statics. These are the
# names the repository actually uses — a guessed `static/Name-Regular.ttf` path
# returns a 14-byte "404: Not Found" that curl writes out happily, which is why
# the size check below exists.
FONTS = {
    'Cinzel[wght].ttf': f'{RAW}/ofl/cinzel/Cinzel%5Bwght%5D.ttf',
    'PTSerif-Regular.ttf': f'{RAW}/ofl/ptserif/PT_Serif-Web-Regular.ttf',
    'PTSerif-Bold.ttf': f'{RAW}/ofl/ptserif/PT_Serif-Web-Bold.ttf',
    'OFL-Cinzel.txt': f'{RAW}/ofl/cinzel/OFL.txt',
    'OFL-PTSerif.txt': f'{RAW}/ofl/ptserif/OFL.txt',
}


def main():
    os.makedirs(OUT, exist_ok=True)
    for name, url in FONTS.items():
        dest = os.path.join(OUT, name)
        if os.path.exists(dest) and os.path.getsize(dest) > 1000:
            print('have %s' % name)
            continue
        # curl rather than urllib: raw.githubusercontent answers urllib with a
        # 403 often enough that it is not worth the retry loop.
        subprocess.run(['curl', '-sL', url, '-o', dest], check=True)
        size = os.path.getsize(dest) if os.path.exists(dest) else 0
        if size < 1000:
            print('FAILED %s (%d bytes)' % (name, size))
            sys.exit(1)
        print('wrote %-22s %7d bytes' % (name, size))


if __name__ == '__main__':
    main()
