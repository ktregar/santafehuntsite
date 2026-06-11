function SectionEyebrow({ label, gold }) {
  return (
    <div style={{ textAlign: 'center', marginBottom: 32 }}>
      <div style={{
        fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 600,
        letterSpacing: '0.24em', textTransform: 'uppercase',
        color: gold ? 'var(--sfh-gold-500)' : 'var(--sfh-navy-500)',
        marginBottom: 12,
      }}>{label}</div>
      <div style={{ width: 96, height: 1, background: 'var(--sfh-gold-400)', margin: '0 auto' }} />
    </div>
  );
}

function EventList() {
  const events = [
    { date: 'August',  day: 'TBD', title: 'Hunt Gala',               location: 'Date TBA',                tag: 'Social' },
    { date: 'Oct 17',  day: 'Sat', title: 'Hunt Clinic',             location: 'Garner Ranch',            tag: 'Clinic' },
    { date: 'Oct 25',  day: 'Sun', title: 'Halloween Hunter Pace',   location: 'Costo Ranch · Anza, CA',  tag: 'Pace' },
    { date: 'Nov 14',  day: 'Sat', title: 'Opening Hunt',            location: 'Garner Ranch',            tag: 'Formal' },
  ];
  return (
    <section style={{ padding: '96px 32px', background: 'var(--sfh-cream)' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <SectionEyebrow label="Upcoming Events" />
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 48, lineHeight: 1.1, letterSpacing: '-0.01em', textAlign: 'center', margin: '0 0 8px', color: 'var(--fg-1)' }}>
          The 2026–27 Season
        </h2>
        <p style={{ fontFamily: 'var(--font-serif)', fontSize: 18, lineHeight: 1.6, color: 'var(--fg-3)', textAlign: 'center', maxWidth: '60ch', margin: '0 auto 56px' }}>
          Hounds go out twice a week — Tuesdays and Saturdays. A punch bowl follows every weekend hunt.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
          {events.map(e => (
            <div key={e.title} style={{
              background: '#fff', border: '1px solid var(--border-hairline)',
              padding: 28, display: 'flex', alignItems: 'flex-start', gap: 22,
              transition: 'box-shadow 200ms',
            }}
            onMouseEnter={ev => ev.currentTarget.style.boxShadow = '0 6px 14px rgba(26,20,16,0.10), 0 2px 4px rgba(26,20,16,0.06)'}
            onMouseLeave={ev => ev.currentTarget.style.boxShadow = '0 1px 2px rgba(26,20,16,0.06)'}
            >
              <div style={{
                background: 'var(--sfh-navy-900)', color: 'var(--sfh-cream)',
                padding: '12px 14px', minWidth: 78, textAlign: 'center',
                fontFamily: 'var(--font-sans)',
              }}>
                <div style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--sfh-gold-300)' }}>{e.day}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 600, lineHeight: 1, marginTop: 4 }}>{e.date}</div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  display: 'inline-block',
                  fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 600,
                  letterSpacing: '0.16em', textTransform: 'uppercase',
                  color: 'var(--sfh-gold-600)', marginBottom: 6,
                }}>{e.tag}</div>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 500, margin: '0 0 6px', color: 'var(--fg-1)' }}>{e.title}</h4>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: 15, color: 'var(--fg-3)' }}>{e.location}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

window.EventList = EventList;
window.SectionEyebrow = SectionEyebrow;
