"""Usage: python make_fonts.py <GoogleSansFlex VF .ttf> <out-dir>

Cut static, Latin-only FlexRounded faces out of the Google Sans Flex VF.

React Native cannot set variation axes, so each weight is instanced at fixed
opsz / wdth / ROND and saved as its own file. The family is renamed because the
upstream trademark notice does not allow "Google" in a derived name.
"""
import os
import sys

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

SRC, OUT = sys.argv[1], sys.argv[2]

FAMILY = 'FlexRounded'
# 660 rather than 700 for Bold: SF Pro Rounded Bold measures 0.200-0.209 stem to
# cap on Jomo's large glyphs, which FlexRounded reaches at 660 (700 is 0.215).
WEIGHTS = {400: 'Regular', 500: 'Medium', 600: 'SemiBold', 660: 'Bold'}
AXES = {'opsz': 18, 'wdth': 100, 'GRAD': 0, 'ROND': 100, 'slnt': 0}

UNICODES = (
    list(range(0x20, 0x7F))
    + list(range(0xA0, 0x100))
    + list(range(0x2010, 0x2028))
    + list(range(0x2030, 0x203B))
    + [0x20AC, 0x2122, 0x2190, 0x2191, 0x2192, 0x2193, 0x2212]
)

os.makedirs(OUT, exist_ok=True)
for w, style in WEIGHTS.items():
    vf = TTFont(SRC)
    inst = instantiateVariableFont(vf, dict(AXES, wght=w))

    opts = subset.Options()
    opts.layout_features = ['*']
    opts.name_IDs = ['*']
    opts.notdef_outline = True
    opts.drop_tables += ['STAT']
    sub = subset.Subsetter(opts)
    sub.populate(unicodes=UNICODES)
    sub.subset(inst)

    name = inst['name']
    full = '%s %s' % (FAMILY, style)
    ps = '%s-%s' % (FAMILY, style)
    for rec in list(name.names):
        if rec.nameID in (1, 2, 3, 4, 6, 16, 17, 21, 22, 25):
            name.removeNames(nameID=rec.nameID)
    name.setName(FAMILY, 1, 3, 1, 0x409)
    name.setName(style if style in ('Regular', 'Bold') else 'Regular', 2, 3, 1, 0x409)
    name.setName('%s;%s' % (ps, 'instance'), 3, 3, 1, 0x409)
    name.setName(full, 4, 3, 1, 0x409)
    name.setName(ps, 6, 3, 1, 0x409)
    name.setName(FAMILY, 16, 3, 1, 0x409)
    name.setName(style, 17, 3, 1, 0x409)
    inst['OS/2'].usWeightClass = w

    path = os.path.join(OUT, '%s_%d%s.ttf' % (FAMILY, w, style))
    inst.save(path)
    print(path, os.path.getsize(path), 'bytes')
