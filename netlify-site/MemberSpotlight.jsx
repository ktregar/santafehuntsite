function MemberSpotlight() {
  return (
    <section style={{ padding: '96px 32px', background: 'var(--sfh-cream)' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <SectionEyebrow label="A Word from the Field" />
        <div style={{
          display: 'grid', gridTemplateColumns: '300px 1fr', gap: 64, alignItems: 'center',
        }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{
              width: 280, height: 340,
              backgroundImage: 'url("./assets/photos/hounds-running.jpg")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              boxShadow: '0 14px 28px rgba(26,20,16,0.22), 0 0 0 1px rgba(26,20,16,0.08)',
              position: 'relative',
            }}>
              <div style={{
                position: 'absolute', left: -10, top: -10, right: 10, bottom: 10,
                border: '1px solid var(--sfh-gold-400)',
                pointerEvents: 'none',
              }} />
            </div>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--sfh-pink-500)', fontWeight: 600, marginBottom: 12 }}>
              Master & Huntsman
            </div>
            <blockquote style={{
              fontFamily: 'var(--font-display)', fontStyle: 'italic',
              fontSize: 32, lineHeight: 1.3, margin: 0, color: 'var(--fg-1)',
              borderLeft: '2px solid var(--sfh-gold-400)', paddingLeft: 24,
            }}>
              "The heart of all SFH activity is the care, breeding, exercise and training of our select pack of MFHA-registered foxhounds."
            </blockquote>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--fg-3)', marginTop: 18, paddingLeft: 26 }}>
              — Terrel E. Paine, MFH · ✓ deploy test
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

window.MemberSpotlight = MemberSpotlight;
