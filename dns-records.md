# santafehunt.com — DNS records

Snapshot taken 2026-11-12, queried directly from Wix's nameservers (`ns10.wixdns.net`, `ns11.wixdns.net`) ahead of moving the domain off Wix. Registration renews at Wix on Jan 11, 2027 ($31.25); Wix may bill up to 30 days early.

This list was built by querying the records and guessing common subdomain names, so it can miss an unusually named record. Before transferring, compare it against the DNS page in the Wix dashboard (Domains → santafehunt.com → Manage DNS Records). Anything listed there and not here needs to be added.

## Re-create these at the new DNS host

| Name | Type | Value | Purpose |
|---|---|---|---|
| `santafehunt.com` | A | `75.2.60.5` | Website (Netlify load balancer) |
| `www` | CNAME | `zesty-faun-e514f8.netlify.app` | Website (Netlify site) |
| `santafehunt.com` | MX 10 | `aspmx.l.google.com` | Email → Google |
| `santafehunt.com` | MX 20 | `alt1.aspmx.l.google.com` | Email → Google |
| `santafehunt.com` | MX 30 | `alt2.aspmx.l.google.com` | Email → Google |
| `santafehunt.com` | MX 40 | `alt3.aspmx.l.google.com` | Email → Google |
| `santafehunt.com` | MX 50 | `alt4.aspmx.l.google.com` | Email → Google |
| `santafehunt.com` | TXT | `google-site-verification=KYp0psLGj3Mz9OV59REQfZFYefQBxVM_Ks-KqcNz_bQ` | Proves domain ownership to Google |

TTL on all of these is 3600 (1 hour); the default at the new host is fine.

If the domain moves to Cloudflare: set the A and `www` records to **DNS only** (grey cloud), not proxied, so Netlify can keep issuing the site's HTTPS certificate.

## Leftovers, probably safe to drop

These point at services the club no longer seems to use. Copying them over does no harm; dropping them is cleaner.

| Name | Type | Value | Why it looks stale |
|---|---|---|---|
| `email` | CNAME | `email.secureserver.net` | GoDaddy email; mail now goes to Google (see MX) |
| `mail` | CNAME | `pop.secureserver.net` | GoDaddy email |
| `imap` | CNAME | `imap.secureserver.net` | GoDaddy email |
| `smtp` | CNAME | `smtp.secureserver.net` | GoDaddy email |
| `webmail` | CNAME | `webmail.secureserver.net` | GoDaddy email |
| `m` | CNAME | `www237.wixdns.net` | Old Wix mobile site; stops working once the domain leaves Wix anyway |

## Not present (worth knowing)

- **No SPF, DKIM or DMARC records.** Mail sent *from* an @santafehunt.com address is more likely to land in spam. Worth adding once the move is done; Google's admin console gives the exact values.
- **No Mailchimp domain authentication.** Fine as long as club emails go out from santafehounds@gmail.com.
- **No wildcard record.** Made-up subdomains don't resolve.
