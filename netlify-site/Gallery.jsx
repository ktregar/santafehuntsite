function Gallery() {
  const photos = [
    { src: './assets/photos/staff-line.jpg',         caption: 'Staff line up at the meet' },
    { src: './assets/photos/wildflowers-pink.jpg',   caption: 'Spring wildflowers, Santa Rosa Plateau' },
    { src: './assets/photos/blessing-of-hounds.jpg', caption: 'Blessing of the Hounds — Opening Meet' },
    { src: './assets/photos/riders-pines.jpg',       caption: 'Through the pines, St. Patrick\'s Day' },
    { src: './assets/photos/wildflowers-yellow.jpg', caption: 'A field in bloom' },
    { src: './assets/photos/desert-ride.jpg',        caption: 'Out across the high desert' },
  ];
  return (
    <section style={{ padding: '96px 32px', background: 'var(--sfh-paper)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <SectionEyebrow label="From the Field" />
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 48, lineHeight: 1.1, letterSpacing: '-0.01em', textAlign: 'center', margin: '0 0 56px', color: 'var(--fg-1)' }}>
          A day with hounds.
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridAutoRows: 240,
          gap: 12,
        }}>
          {photos.map((p, i) => (
            <figure key={i} style={{
              margin: 0, position: 'relative', overflow: 'hidden',
              gridRow: i === 0 ? 'span 2' : 'auto',
              gridColumn: i === 0 ? 'span 1' : 'auto',
              cursor: 'pointer',
            }}>
              <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: `url("${p.src}")`,
                backgroundSize: 'cover', backgroundPosition: 'center',
                transition: 'transform 600ms cubic-bezier(0.2, 0.7, 0.2, 1)',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              />
              <div style={{
                position: 'absolute', left: 0, right: 0, bottom: 0,
                background: 'linear-gradient(180deg, rgba(10,29,57,0) 0%, rgba(10,29,57,0.75) 100%)',
                padding: '40px 18px 14px',
                pointerEvents: 'none',
              }}>
                <figcaption style={{
                  fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 600,
                  letterSpacing: '0.14em', textTransform: 'uppercase',
                  color: 'var(--sfh-cream)',
                }}>{p.caption}</figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

window.Gallery = Gallery;
