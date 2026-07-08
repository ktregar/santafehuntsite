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

        {/* Mailing list signup */}
        <form
          action="https://santafehunt.us4.list-manage.com/subscribe/post?u=aaf6ca70722a337ce1f9f9c05&id=9741c32bf5&f_id=0043d0e7f0"
          method="post"
          target="_blank"
          noValidate
          style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}
        >
          <input type="text" name="FNAME" placeholder="First Name" className="sfh-signup-input" style={{ width: 160, fontSize: 12, padding: '10px 14px' }} />
          <input type="email" name="EMAIL" placeholder="Email Address" required className="sfh-signup-input" style={{ width: 210, fontSize: 12, padding: '10px 14px' }} />
          <div aria-hidden="true" style={{ position: 'absolute', left: -5000 }}>
            <input type="text" name="b_aaf6ca70722a337ce1f9f9c05_9741c32bf5" tabIndex="-1" defaultValue="" />
          </div>
          <button type="submit" style={{ fontFamily: 'var(--font-sans)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600, background: 'var(--sfh-gold-400)', color: 'var(--sfh-navy-900)', border: 'none', padding: '10px 22px', cursor: 'pointer', whiteSpace: 'nowrap' }}>
            Subscribe
          </button>
        </form>

        <nav style={{ display: 'flex', gap: 32, fontFamily: 'var(--font-sans)', fontSize: 11, letterSpacing: '0.24em', textTransform: 'uppercase', fontWeight: 500 }}>
          {[
            { label: 'Welcome', href: '/' },
            { label: 'About', href: '/about' },
            { label: 'Hounds', href: '/hounds' },
            { label: 'Etiquette', href: '/etiquette' },
            { label: 'Join', href: '/join' },
            { label: 'Events', href: '/events' },
            { label: 'Gallery', href: '/gallery' },
            { label: 'Members', href: '/members' },
            { label: 'Shop', href: 'https://santa-fe-hunt.myshopify.com', target: '_blank' },
            { label: 'Contact', href: '/contact' },
          ].map(i => (
            <a key={i.label} href={i.href} target={i.target || '_self'} rel={i.target === '_blank' ? 'noopener noreferrer' : undefined} style={{ color: 'var(--sfh-cream)', textDecoration: 'none', opacity: 0.85 }}>{i.label}</a>
          ))}
        </nav>
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: 14, color: 'rgba(250,246,238,0.7)', textAlign: 'center', maxWidth: 420 }}>
          Riverside &amp; San Diego Counties · Southern California<br />
          Recognized by the Masters of Foxhounds Association of America since 1987
        </div>
        <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
          <a href="https://www.instagram.com/santafehounds/?hl=en" target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-sans)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--sfh-gold-300)', textDecoration: 'none' }}>Instagram</a>
          <span style={{ color: 'rgba(250,246,238,0.4)' }}>·</span>
          <a href="https://www.facebook.com/SantaFeHunt" target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-sans)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--sfh-gold-300)', textDecoration: 'none' }}>Facebook</a>
        </div>
        <div style={{ fontFamily: 'var(--font-sans)', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(250,246,238,0.4)', marginTop: 24 }}>
          © 2026 Santa Fe Hunt
        </div>
      </div>
    </footer>
  );
}

window.Footer = Footer;
