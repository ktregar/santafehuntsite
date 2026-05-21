# Santa Fe Hunt — Website

This folder holds the live website. It's deployed automatically by Netlify
whenever a change is pushed to the `main` branch on GitHub.

## How deploys work

1. You (or Claude on your behalf) edit a file in this folder.
2. The change is committed to git and pushed to GitHub.
3. Netlify sees the push, copies this folder up to its servers, and the
   site is live in ~30 seconds.

No build step, no upload, no drag-and-drop. The configuration lives in
`netlify.toml` at the repo root — Netlify reads it and knows to publish
this `netlify-site/` folder.

If you ever need to roll back, the Netlify dashboard keeps a history of
every deploy and lets you click "Publish deploy" on any older one.

## Folder contents

```
netlify-site/
├── index.html                  ← homepage
├── colors_and_type.css         ← design tokens (colors, fonts, spacing)
├── Header.jsx                  ← top navigation
├── Hero.jsx                    ← hero photo + headline
├── EventList.jsx               ← upcoming fixtures grid
├── Gallery.jsx                 ← "From the Field" photo gallery
├── Etiquette.jsx               ← tabbed etiquette guide
├── MemberSpotlight.jsx         ← Master & Huntsman quote
├── Footer.jsx                  ← dark navy footer
└── assets/
    ├── logo-color.jpg          ← primary mark
    ├── logo-embossed-gold.jpg  ← formal gold mark
    └── photos/                 ← all photos used on the site
```

## Editing copy or photos

- **Text changes**: open the relevant `.jsx` file in any text editor (TextEdit, Notepad,
  or a free tool like VS Code). The copy is inside the file as plain English between
  quotation marks. Edit, save, then commit and push.
- **Swap a photo**: drop a replacement JPG into `assets/photos/` with the **same
  filename** as the photo you want to replace. Commit and push.
- **Change colors or fonts**: edit `colors_and_type.css`. Every color used on the
  site is a single `--sfh-*` variable at the top of that file.

## Performance note

This site uses an "in-browser build" approach (Babel transpiles the .jsx files when
the page loads). It's perfect for a club site of this size — initial load takes
~1 second. If traffic grows large enough that you want a pre-compiled build (faster
load, better SEO), let me know and I'll set that up as a follow-up.

## Things to do before launch

- [ ] Update event dates and locations in `EventList.jsx`
- [ ] Update the Master & Huntsman quote / attribution in `MemberSpotlight.jsx`
- [ ] Verify Instagram / Facebook links in `Footer.jsx`
- [ ] Add a `<meta>` description and Open Graph tags in `index.html` for nicer
  link previews on social media
- [ ] Set up redirects from old Wix URLs if any are bookmarked or indexed
  (Netlify reads a `_redirects` file at the root — ask me and I'll generate it)

— Built from the Santa Fe Hunt Design System
