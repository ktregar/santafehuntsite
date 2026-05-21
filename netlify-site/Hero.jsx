function Hero() {
  return (
    <section style={{ position: 'relative', height: 620, overflow: 'hidden', background: 'var(--sfh-navy-900)' }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'url("./assets/photos/master-pack.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center 35%',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(10,29,57,0.55) 0%, rgba(10,29,57,0.15) 40%, rgba(10,29,57,0.7) 100%)',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(90deg, rgba(10,29,57,0.65) 0%, rgba(10,29,57,0.25) 45%, rgba(10,29,57,0) 70%)',
      }} />
      <div style={{
        position: 'relative', zIndex: 2, maxWidth: 1080, margin: '0 auto',
        height: '100%', padding: '0 32px',
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', color: 'var(--sfh-cream)',
      }}>
        <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--sfh-gold-300)', fontWeight: 600, marginBottom: 18 }}>
          Foxhunting in Southern California
        </div>
        <h1 style={{
          fontFamily: 'var(--font-display)', fontWeight: 500,
          fontSize: 'clamp(36px, 6vw, 84px)', lineHeight: 1.05,
          letterSpacing: '-0.01em', margin: 0, maxWidth: '14ch',
          color: 'var(--sfh-cream)',
        }}>
          Riding to hounds since 1969.
        </h1>
        <p style={{
          fontFamily: 'var(--font-serif)', fontSize: 'clamp(15px, 2vw, 20px)', lineHeight: 1.55,
          maxWidth: '52ch', marginTop: 22, color: 'rgba(250,246,238,0.92)',
        }}>
          Two days a week from November through April, our pack works the open country of Riverside and San Diego counties. There are those that ride to hunt, and others that hunt to ride — both are welcome.
        </p>
        <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
          <a href="/join" style={{
            fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 13,
            letterSpacing: '0.16em', textTransform: 'uppercase',
            padding: '14px 26px', background: 'var(--sfh-gold-400)', color: 'var(--sfh-navy-900)',
            border: 0, borderRadius: 2, cursor: 'pointer', textDecoration: 'none',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -1px 0 rgba(120,80,20,0.35)',
          }}>Become a Subscriber</a>
          <a href="/about" style={{
            fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 13,
            letterSpacing: '0.16em', textTransform: 'uppercase',
            padding: '14px 26px', background: 'transparent', color: 'var(--sfh-cream)',
            border: '1.5px solid var(--sfh-cream)', borderRadius: 2, cursor: 'pointer', textDecoration: 'none',
          }}>About the Hunt →</a>
        </div>
      </div>
    </section>
  );
}

window.Hero = Hero;
