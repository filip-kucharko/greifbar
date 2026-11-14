#!/bin/bash
# Baut eine Vorschau mit relativen Links (für die Claude-Vorschau)
set -e
cd "$(dirname "$0")/.."
npx astro build >/dev/null
rm -rf /home/claude/preview && cp -r dist /home/claude/preview && rm -rf /home/claude/preview/admin
cd /home/claude/preview
python3 - <<'PY'
import re,pathlib
root=pathlib.Path('.')
for f in root.rglob('*.html'):
    depth=len(f.parent.relative_to(root).parts); pre='../'*depth or './'
    def fix(m):
        a,p=m.group(1),m.group(2)
        if p.startswith('//'): return m.group(0)
        p=p.lstrip('/'); p='index.html' if p=='' else (p+'index.html' if p.endswith('/') else p)
        return f'{a}="{pre}{p}"'
    s=re.sub(r'(href|src)="(/[^"]*)"',fix,f.read_text()).replace('_astro/','assets/')
    f.write_text(s)
for f in root.rglob('*.css'):
    f.write_text(f.read_text().replace('url(/_astro/','url(./'))
PY
mv _astro assets
cd assets && rm -f *.woff *cyrillic* *greek* *vietnamese*
