function MailingList() {
  return (
    <section style={{ background: 'var(--sfh-navy-900)', padding: '96px 32px' }}>
      <div style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center' }}>

        <div style={{
          fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 600,
          letterSpacing: '0.24em', textTransform: 'uppercase',
          color: 'var(--sfh-gold-400)', marginBottom: 14,
        }}>
          Stay in the Loop
        </div>

        <h2 style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4vw, 48px)',
          fontWeight: 500, color: 'var(--sfh-cream)', margin: '0 0 20px',
          letterSpacing: '0.02em',
        }}>
          Join Our Mailing List
        </h2>

        <div style={{ width: 56, height: 1, background: 'var(--sfh-gold-400)', margin: '0 auto 24px' }} />

        <p style={{
          fontFamily: 'var(--font-serif)', fontSize: 18,
          color: 'rgba(250,246,238,0.7)', margin: '0 0 40px', lineHeight: 1.7,
        }}>
          Hunt news, event announcements, and seasonal updates — delivered to your inbox.
        </p>

        <form
          action="https://santafehunt.us4.list-manage.com/subscribe/post?u=aaf6ca70722a337ce1f9f9c05&id=9741c32bf5&f_id=0043d0e7f0"
          method="post"
          target="_blank"
          noValidate
          style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 360, margin: '0 auto' }}
        >
          <input
            type="text" name="FNAME" placeholder="First Name"
            className="sfh-signup-input"
            style={{ fontSize: 13, padding: '13px 18px' }}
          />
          <input
            type="email" name="EMAIL" placeholder="Email Address" required
            className="sfh-signup-input"
            style={{ fontSize: 13, padding: '13px 18px' }}
          />
          {/* bot trap — do not remove */}
          <div aria-hidden="true" style={{ position: 'absolute', left: -5000 }}>
            <input type="text" name="b_aaf6ca70722a337ce1f9f9c05_9741c32bf5" tabIndex="-1" defaultValue="" />
          </div>
          <button
            type="submit"
            style={{
              fontFamily: 'var(--font-sans)', fontSize: 11, letterSpacing: '0.22em',
              textTransform: 'uppercase', fontWeight: 600,
              background: 'var(--sfh-gold-400)', color: 'var(--sfh-navy-900)',
              border: 'none', padding: '15px 32px', cursor: 'pointer', marginTop: 6,
            }}
          >
            Subscribe
          </button>
        </form>

      </div>
    </section>
  );
}

window.MailingList = MailingList;
