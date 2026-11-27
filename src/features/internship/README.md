# Internship integration

`/internship` embeds the local `/internship/content` page so the imported portfolio CSS and scripts remain isolated from the main website. The main navigation and footer link to the new page.

The frame grows with its content using a ResizeObserver, so only the host page scrolls and the main footer follows the complete internship page. `embed.css` keeps viewport-based sections, dialogs and the internship guide sized and positioned within the visible browser area.

The public templates and course data were copied from `dealatecorp-internship-portfolio`. Assets, including GSAP, fonts, portraits, logos and certificates, live in `public/internship-assets`. The original repository is not needed to build or deploy this site.

`handler.mjs` renders the imported public pages and handles `/internship/apply` and `/internship/privacy`. Applications use the original site's production behavior: delivery through the existing EmailJS service/template without database storage. The source site's separate SQLite admin dashboard is not mounted in this website. Configure the EmailJS template's recipient as `hr@dealatecorp.in`, Reply-To as `{{email}}`, and allow the deployed domain if an origin allowlist is enabled. Rate limits are per running server instance.

Run `node --test tests/internship.test.mjs` for integration checks. Delivery is mocked in tests; no real emails are sent.
