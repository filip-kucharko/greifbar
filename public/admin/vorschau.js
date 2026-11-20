// Greifbar – Vorschau in der Redaktionsoberfläche mit „Artikel kopieren“-Knopf.
// Kopiert den ganzen Artikel (Titel, Lead, Text, Einordnung, Quellen) als Text,
// damit er in einem Rutsch zum Korrigieren eingefügt werden kann.
(() => {
  const CMS = window.CMS;
  if (!CMS || !CMS.registerPreviewTemplate) return;

  const RUBRIKEN = {
    industrie: 'Industrie',
    medizin: 'Medizin',
    mobilitaet: 'Mobilität',
    logistik: 'Logistik',
    forschung: 'Forschung',
    startups: 'Startups & Kapital',
    wochenrueckblick: 'Wochenrückblick',
  };

  const alsJs = (v) => (v && typeof v.toJS === 'function' ? v.toJS() : v);
  const datum = (v) => {
    if (!v) return '';
    const d = new Date(v);
    return isNaN(d) ? String(v) : d.toLocaleDateString('de-AT', { day: 'numeric', month: 'long', year: 'numeric' });
  };
  const woerter = (s) => (s || '').split(/\s+/).filter(Boolean).length;

  // Der Text, der in die Zwischenablage kommt
  function alsText(d) {
    const z = [];
    z.push('TITEL: ' + (d.titel || ''));
    z.push('');
    z.push('LEAD: ' + (d.lead || ''));
    z.push('');
    z.push(`DATUM: ${datum(d.datum)} | RUBRIK: ${RUBRIKEN[d.rubrik] || d.rubrik || ''} | AUTOR: ${d.autor || ''}`);
    if (d.bild || d.bildAlt || d.bildQuelle) {
      z.push(`BILD: ${d.bildAlt || '(keine Beschreibung)'} | Bildquelle: ${d.bildQuelle || '(fehlt)'}`);
    }
    z.push('');
    z.push('TEXT:');
    z.push((d.body || '').trim());
    if (d.einordnung) {
      z.push('');
      z.push('WARUM DAS WICHTIG IST:');
      z.push(String(d.einordnung).trim());
    }
    const quellen = alsJs(d.quellen) || [];
    if (quellen.length) {
      z.push('');
      z.push('QUELLEN:');
      quellen.forEach((q) => z.push(`- ${(q && q.name) || ''}: ${(q && q.url) || ''}`));
    }
    const n = woerter(d.lead) + woerter(d.body) + woerter(d.einordnung);
    z.push('');
    z.push(`(ca. ${n} Wörter)`);
    return z.join('\n');
  }

  // Kopieren mit mehreren Rückfallstufen, weil die Vorschau in einem eigenen Rahmen läuft
  async function inZwischenablage(text, doc) {
    const versuche = [
      () => window.navigator.clipboard.writeText(text),
      () => doc.defaultView.navigator.clipboard.writeText(text),
    ];
    for (const v of versuche) {
      try {
        await v();
        return true;
      } catch (e) {}
    }
    try {
      const ta = doc.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      doc.body.appendChild(ta);
      ta.select();
      const ok = doc.execCommand('copy');
      ta.remove();
      if (ok) return true;
    } catch (e) {}
    return false;
  }

  const { useState, useRef } = CMS.React;

  function ArtikelVorschau({ entry, widgetFor, document: doc }) {
    const d = alsJs(entry.get('data')) || {};
    const text = alsText(d);
    const [status, setStatus] = useState('');
    const [offen, setOffen] = useState(false);
    const preRef = useRef(null);
    const quellen = alsJs(d.quellen) || [];

    const kopieren = async (e) => {
      e.preventDefault();
      e.stopPropagation();
      const dokument = doc || (e.target && e.target.ownerDocument);
      if (await inZwischenablage(text, dokument)) {
        setStatus('Kopiert! Jetzt einfach im Chat einfügen.');
        return;
      }
      // Letzte Stufe: Text sichtbar machen und markieren, dann Strg+C
      setOffen(true);
      setTimeout(() => {
        const pre = preRef.current;
        if (!pre) return;
        const sel = pre.ownerDocument.getSelection();
        const r = pre.ownerDocument.createRange();
        r.selectNodeContents(pre);
        sel.removeAllRanges();
        sel.addRange(r);
      }, 50);
      setStatus('Text ist markiert – jetzt Strg+C (Mac: Cmd+C) drücken.');
    };

    return html`
      <div class="gb">
        <div class="gb-leiste">
          <button type="button" class="gb-knopf" onClick=${kopieren}>Artikel kopieren</button>
          <span class="gb-status" aria-live="polite">${status}</span>
        </div>
        <details class="gb-roh" open=${offen} onToggle=${(e) => setOffen(e.target.open)}>
          <summary>Kopiertext ansehen</summary>
          <pre ref=${preRef}>${text}</pre>
        </details>
        <article class="gb-artikel">
          <p class="gb-kicker">${[RUBRIKEN[d.rubrik] || d.rubrik, datum(d.datum)].filter(Boolean).join(' · ') || 'Rubrik · Datum'}</p>
          <h1 data-key-path="titel">${d.titel || 'Titel'}</h1>
          <p class="gb-lead" data-key-path="lead">${d.lead || ''}</p>
          <div class="gb-text" data-key-path="body">${widgetFor('body')}</div>
          ${d.einordnung &&
          html`<aside class="gb-einordnung" data-key-path="einordnung">
            <h2>Warum das wichtig ist</h2>
            <p>${d.einordnung}</p>
          </aside>`}
          ${quellen.length > 0 &&
          html`<section class="gb-quellen">
            <h2>Quellen</h2>
            <ul>
              ${quellen.map((q) => html`<li>${(q && q.name) || ''}: ${(q && q.url) || ''}</li>`)}
            </ul>
          </section>`}
        </article>
      </div>
    `;
  }

  CMS.registerPreviewTemplate('artikel', ArtikelVorschau);

  CMS.registerPreviewStyle(
    `
    body { margin: 0; font: 17px/1.6 Georgia, 'Times New Roman', serif; color: #141414; background: #fff; }
    .gb { max-width: 760px; margin: 0 auto; padding: 0 20px 40px; }
    .gb-leiste { position: sticky; top: 0; z-index: 2; display: flex; gap: 12px; align-items: center; flex-wrap: wrap;
      background: #fff; padding: 14px 0; border-bottom: 1px solid #d9d6d0; font-family: system-ui, sans-serif; }
    .gb-knopf { font: 600 15px system-ui, sans-serif; min-height: 44px; padding: 0 18px; border: 0; border-radius: 6px;
      background: #173a63; color: #fff; cursor: pointer; }
    .gb-knopf:hover { background: #1f4a7d; }
    .gb-knopf:focus-visible { outline: 3px solid #7fa9dc; outline-offset: 2px; }
    .gb-status { font: 14px system-ui, sans-serif; color: #2f6fb5; }
    .gb-roh { margin: 12px 0 4px; font: 14px system-ui, sans-serif; color: #5c5c5c; }
    .gb-roh summary { cursor: pointer; padding: 6px 0; }
    .gb-roh pre { white-space: pre-wrap; font: 13px/1.5 ui-monospace, monospace; background: #f4f1ec; padding: 12px; color: #141414; }
    .gb-kicker { font: 700 14px system-ui, sans-serif; color: #1f3a5f; margin: 24px 0 6px; }
    h1 { font: 700 34px/1.1 Georgia, serif; margin: 0 0 12px; }
    .gb-lead { font-size: 20px; font-weight: 500; margin: 0 0 18px; }
    .gb-einordnung { margin: 28px 0 0; padding: 16px 18px; border-top: 3px solid #1f3a5f; background: #f4f1ec; }
    .gb-einordnung h2, .gb-quellen h2 { font: 700 15px system-ui, sans-serif; color: #1f3a5f; margin: 0 0 6px; }
    .gb-einordnung p { margin: 0; }
    .gb-quellen { margin-top: 22px; font: 14px/1.5 system-ui, sans-serif; overflow-wrap: anywhere; }
    `,
    { raw: true },
  );
})();
