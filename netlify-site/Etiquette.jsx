function Etiquette() {
  const [tab, setTab] = React.useState('hounds');
  const tabs = [
    { id: 'hounds',  label: 'The Hounds' },
    { id: 'staff',   label: 'The Staff' },
    { id: 'quarry',  label: 'The Quarry' },
  ];
  const content = {
    hounds: [
      'Watch and listen to the hounds working — that is why we are here.',
      "Listen for the horn and the hounds to tell you what's happening.",
      'Never "rate" — talk to — a hound or correct a hound. That is a huntsman\'s or staff responsibility.',
      'Never use your whip on a hound in any manner.',
      "Do not speak to one another when close to hounds — you will bring their heads up.",
      "Keep your horse's head pointed toward passing hounds to avoid an errant kick.",
    ],
    staff: [
      "At the end of the day thank the Huntsman, and the Staff. They worked hard bringing you a day's sport.",
      "When a staff member passes by you, especially on narrow lanes, turn your horse's head toward them.",
      "A call of 'staff please' requires that you quickly leave room for said staff member to pass safely.",
      'Greet the Secretary to ensure that you are recorded as being on the hunt; pay your capping fee before the hunt moves out.',
    ],
    quarry: [
      "If you see a coyote, don't \"Tally ho\" — that coyote might not be the one hunted, and you might turn him into the pack.",
      'Get word to your Field Master quietly. He or she will signal a Whip or the Huntsman by pointing the horse\'s head and cap at the spot.',
      'If you see something and are not sure if it is a coyote — see the above.',
    ],
  };
  return (
    <section style={{ padding: '96px 32px', background: 'var(--sfh-parchment)' }}>
      <div style={{ maxWidth: 920, margin: '0 auto' }}>
        <SectionEyebrow label="Foxhunting Etiquette" gold />
        <h2 style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 500, fontSize: 44, lineHeight: 1.15, textAlign: 'center', margin: '0 0 12px', color: 'var(--fg-1)' }}>
          The conventions of the field
        </h2>
        <p style={{ fontFamily: 'var(--font-serif)', fontSize: 18, lineHeight: 1.65, color: 'var(--fg-3)', textAlign: 'center', maxWidth: '60ch', margin: '0 auto 40px' }}>
          The preservation of the centuries-old foxhunting spirit depends on the continued observance of a small set of rules. They keep us safe, and they keep the sport itself alive.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 0, marginBottom: 36, borderBottom: '1px solid var(--border-soft)' }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 12,
              letterSpacing: '0.16em', textTransform: 'uppercase',
              padding: '14px 28px', background: 'transparent',
              color: tab === t.id ? 'var(--sfh-navy-700)' : 'var(--fg-3)',
              border: 0, borderBottom: tab === t.id ? '2px solid var(--sfh-gold-400)' : '2px solid transparent',
              marginBottom: -1, cursor: 'pointer', transition: 'all 200ms', whiteSpace: 'nowrap',
            }}>{t.label}</button>
          ))}
        </div>
        <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 18 }}>
          {content[tab].map((line, i) => (
            <li key={i} style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
              <div style={{
                fontFamily: 'var(--font-display)', fontStyle: 'italic',
                fontSize: 28, color: 'var(--sfh-gold-500)', lineHeight: 1, minWidth: 36,
              }}>{String(i + 1).padStart(2, '0')}</div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 18, lineHeight: 1.6, color: 'var(--fg-2)', flex: 1 }}>
                {line}
              </div>
            </li>
          ))}
        </ol>
        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <a href="/etiquette" style={{
            fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 600,
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: 'var(--sfh-navy-900)', textDecoration: 'none',
            borderBottom: '2px solid var(--sfh-gold-400)', paddingBottom: 3,
          }}>Read the Full Etiquette Guide →</a>
        </div>
      </div>
    </section>
  );
}

window.Etiquette = Etiquette;
