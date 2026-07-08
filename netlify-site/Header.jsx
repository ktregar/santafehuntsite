function Header() {
  const [active, setActive] = React.useState('Welcome');
  const [menuOpen, setMenuOpen] = React.useState(false);

  const navItems = [
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
  ];

  // Inject mobile styles once
  React.useEffect(() => {
    if (document.getElementById('sfh-header-styles')) return;
    const style = document.createElement('style');
    style.id = 'sfh-header-styles';
    style.textContent = `
      .sfh-nav-desktop { display: flex; }
      .sfh-nav-hamburger { display: none; }
      .sfh-nav-mobile { display: none; }
      @media (max-width: 820px) {
        .sfh-nav-desktop { display: none !important; }
        .sfh-nav-hamburger { display: flex !important; }
        .sfh-nav-mobile.open { display: flex !important; }
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <header style={{ background: 'var(--sfh-cream)', position: 'sticky', top: 0, zIndex: 10 }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 20px' }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '12px 0',
          borderTop: '1px solid var(--sfh-navy-500)',
          borderBottom: '1px solid var(--sfh-navy-500)',
        }}>
          {/* Logo */}
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
            <img src="./assets/logo-color.jpg" alt="Santa Fe Hunt" style={{ height: 48, width: 48, objectFit: 'contain' }} />
            <div style={{ flexShrink: 0 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(16px, 3vw, 22px)', fontWeight: 600, letterSpacing: '0.04em', color: 'var(--sfh-navy-900)', lineHeight: 1.1, whiteSpace: 'nowrap' }}>SANTA FE HUNT</div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--sfh-gold-500)', whiteSpace: 'nowrap' }}>Est. 1969 · MFHA Recognized</div>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="sfh-nav-desktop" style={{ alignItems: 'center', gap: 20, fontFamily: 'var(--font-sans)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500 }}>
            {navItems.map(i => (
              <a key={i.label} href={i.href} target={i.target || '_self'} rel={i.target === '_blank' ? 'noopener noreferrer' : undefined}
                style={{
                  color: active === i.label ? 'var(--sfh-navy-500)' : 'var(--fg-2)',
                  textDecoration: 'none',
                  borderBottom: active === i.label ? '2px solid var(--sfh-gold-400)' : '2px solid transparent',
                  paddingBottom: 3, transition: 'all 200ms', whiteSpace: 'nowrap',
                }}
                onClick={() => setActive(i.label)}>
                {i.label}
              </a>
            ))}
          </nav>

          {/* Hamburger button — mobile only */}
          <button
            className="sfh-nav-hamburger"
            onClick={() => setMenuOpen(o => !o)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: 8, display: 'none', flexDirection: 'column', gap: 5,
            }}
            aria-label="Menu">
            {[0,1,2].map(i => (
              <span key={i} style={{
                display: 'block', width: 24, height: 2,
                background: 'var(--sfh-navy-900)',
                transition: 'all 200ms',
                transform: menuOpen
                  ? i === 0 ? 'translateY(7px) rotate(45deg)'
                  : i === 2 ? 'translateY(-7px) rotate(-45deg)'
                  : 'scaleX(0)'
                  : 'none',
              }} />
            ))}
          </button>
        </div>

        {/* Mobile nav dropdown */}
        <nav
          className={`sfh-nav-mobile${menuOpen ? ' open' : ''}`}
          style={{
            display: 'none', flexDirection: 'column',
            borderBottom: '1px solid var(--sfh-navy-500)',
            background: 'var(--sfh-cream)',
          }}>
          {navItems.map(i => (
            <a key={i.label} href={i.href} target={i.target || '_self'} rel={i.target === '_blank' ? 'noopener noreferrer' : undefined}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: 'var(--font-sans)', fontSize: 12, letterSpacing: '0.16em',
                textTransform: 'uppercase', fontWeight: 500,
                color: 'var(--fg-2)', textDecoration: 'none',
                padding: '14px 20px',
                borderBottom: '1px solid var(--border-hairline)',
              }}>
              {i.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

window.Header = window.Header || Header;
