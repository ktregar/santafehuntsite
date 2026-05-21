function Footer() {
  return (
    <footer style={{ background: 'var(--sfh-navy-900)', color: 'var(--sfh-cream)', padding: '72px 32px 40px' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28 }}>
        <div style={{ width: 140, height: 140, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src="./assets/logo-embossed-gold.jpg" alt="Santa Fe Hunt" style={{ width: 140, height: 140, objectFit: 'contain' }} />
        </div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 500, letterSpacing: '0.04em', color: 'var(--sfh-gold-300)', whiteSpace: 'nowrap' }}>
          SANTA FE HUNT
        </div>
        <div style={{ width: 80, height: 1, background: 'var(--sfh-gold-400)' }} />
        <nav style={{ display: 'flex', gap: 32, fontFamily: 'var(--font-sans)', fontSize: 11, letterSpacing: '0.24em', textTransform: 'uppercase', fontWeight: 500 }}>
          {[
            { label: 'Welcome', href: '#' },
            { label: 'About', href: '#' },
            { label: 'Join', href: '#' },
            { label: 'Events', href: '#' },
            { label: 'Members', href: '/members' },
            { label: 'Shop', href: 'https://santa-fe-hunt.myshopify.com', target: '_blank' },
            { label: 'Contact', href: '#' },
          ].map(i => (
            <a key={i.label} href={i.href} target={i.target || '_self'} style={{ color: 'var(--sfh-cream)', textDecoration: 'none', opacity: 0.85 }}>{i.label}</a>
          ))}
        </nav>
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: 14, color: 'rgba(250,246,238,0.7)', textAlign: 'center', maxWidth: 420 }}>
          Riverside &amp; San Diego Counties · Southern California<br />
          Recognized by the Masters of Foxhounds Association of America since 1987
        </div>
        <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
          <a href="https://www.instagram.com/santafehounds/?hl=en" target="_blank" style={{ fontFamily: 'var(--font-sans)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--sfh-gold-300)', textDecoration: 'none' }}>Instagram</a>
          <span style={{ color: 'rgba(250,246,238,0.4)' }}>·</span>
          <a href="https://www.facebook.com/SantaFeHunt" target="_blank" style={{ fontFamily: 'var(--font-sans)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--sfh-gold-300)', textDecoration: 'none' }}>Facebook</a>
        </div>
        <div style={{ fontFamily: 'var(--font-sans)', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(250,246,238,0.4)', marginTop: 24 }}>
          © 2026 Santa Fe Hunt
        </div>
      </div>
    </footer>
  );
}

window.Footer = Footer;
