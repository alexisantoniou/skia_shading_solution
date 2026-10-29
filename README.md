# Skia Shading Solutions website

One-page site for Skia Shading Solutions, awnings and blinds in Nicosia, Cyprus.
Plain HTML, CSS and JavaScript. No build step, no frameworks.

## Files

```
index.html        the page
css/styles.css    all styles (colour tokens at the top in :root)
js/main.js        mobile menu, product tabs, quote form → WhatsApp
images/           web-ready images (cropped + compressed from Media/)
Media/            your original images (untouched)
```

## Before going live, edit these

Search for `EDIT ME` in `index.html`:

- Phone number (`tel:+35799000000`, appears twice)
- WhatsApp number (`wa.me/35799000000`, plus `data-whatsapp` on the form)
- Email address (`info@skiashades.cy`)
- The list of areas you cover

Also check the copy matches what you actually offer (for example "free quote").

## How the quote form works

There is no server. When someone submits the form, `main.js` builds a message
from the fields and opens `https://wa.me/<number>?text=<message>`, so the
enquiry lands in your WhatsApp ready to reply.

## Run it locally

Open `index.html` in a browser, or in VS Code use the Live Server extension.

## Hosting ideas (free)

GitHub Pages, Netlify or Cloudflare Pages: upload the folder and point your
domain at it.
