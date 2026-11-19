# JL Tech Solutions: public search and AI visibility report

**Research date:** 2026-11-19
**Site checked:** <https://limjonathan.github.io/jltech-solutions/>
**Scope:** Google Search, Google AI Mode, Bing, public index signals, snippets, and
whether the official site is cited or linked.

## Search Console follow-up — 2026-11-19

Ownership of the URL-prefix property was verified with Google's generated HTML file:
`google12b0bfbea3eb0ef0.html`. The sitemap was submitted in Search Console as
`/sitemap.xml`, and Google accepted the submission, although its first status showed
“Couldn't fetch” while the newly deployed GitHub Pages file was propagating.

URL Inspection was then run for all six sitemap URLs. At the time of inspection,
Google reported each URL as **“URL is not on Google”** and **“URL is unknown to
Google”**, with no crawl or canonical data yet. The homepage was submitted for
indexing and Google confirmed that it was added to a priority crawl queue. This is
an indexing baseline, not evidence of a content or technical rejection; recheck
after Google processes the sitemap and crawl requests.

The homepage and Philadelphia on-site support page were also submitted for priority
crawling. The latter was still reported as unknown to Google at submission time.

## Live recheck — 2026-11-19

The deployed homepage, verification file, and sitemap each returned HTTP 200. The
sitemap now exposes `2026-11-19` as the `lastmod` value for all six URLs. Search
Console was rechecked and the sitemap was resubmitted after deployment; the console
still displayed the prior “Couldn't fetch” row immediately afterward, while the
property overview remained in “Processing data” status. The GBP post was publicly
confirmed as published approximately 25 minutes after creation.

## Executive summary

The site is publicly crawlable and has a sitemap, but this live spot check did **not**
confirm organic Google indexing for the Pages URL. Google’s public
`site:limjonathan.github.io/jltech-solutions/` query returned “did not match any
documents.” The official site was absent from the visible organic results for all six
non-branded Philadelphia queries tested.

The strongest current visibility is the Google Business Profile (GBP), visible in the
signed-in owner session for the branded query. That profile showed **JL Tech Solutions**,
category “Computer support and services,” 5.0/1 review, phone `(267) 699-6991`, “Open 24
hours,” and a **Website** link to the official Pages URL. This is not evidence of a
neutral public ranking: the browser was signed into the profile owner account and Google
showed owner-only management controls.

Google AI Mode was available and tested for `Philadelphia IT support`. Its generated
answer named PCS, Dataprise, Meriplex, CrafTech, CMIT Solutions, City of Philadelphia,
the School District, and Yelp; it did **not** mention or link JL Tech Solutions. Standard
results showed no AI Overview for the six local queries during this run. Google’s branded
page showed an AI-generated “Web Guide” disambiguating several similarly named
companies, but it did not treat the official Pages site as an organic result.

These are observations from one location/session/date, not durable rankings. Google
results vary by location, account, device, time, and query expansion. No ranking number
is claimed.

## Method and limitations

- Queries were run live in Google Search on 2026-11-19:
  `JL Tech Solutions`, `Philadelphia IT support`, `managed IT Philadelphia`,
  `cybersecurity Philadelphia`, `healthcare IT Philadelphia`, and
  `on-site IT support Philadelphia`.
- Google Search location displayed as **19148, Philadelphia, PA**, based on past
  activity. The browser was also signed into the business owner’s Google account.
- Google results were inspected through the rendered page, including visible result
  titles, URLs, local-pack content, snippets, and AI Mode output.
- Bing was checked for the branded query only.
- Search Console was **not accessed**. No Search Console property, URL Inspection,
  Coverage/Indexing report, sitemap report, Performance report, or ownership data was
  available in this audit. Therefore, public search results cannot establish the full
  index state.

## Google Search observations

| Query | Visible result | Official JL site present? |
|---|---|---|
| `JL Tech Solutions` | Organic results led with unrelated similarly named businesses such as JLTech (`jltech.us`), JL Technology Solutions on Facebook, JLTech Inc, and JL Technology Services. A Google Web Guide said multiple IT providers share similar names. | **No organic result.** The official site appeared only as the GBP **Website** link in the owner view. |
| `Philadelphia IT support` | Local pack with ITAdOn IT Solutions, VileTech Computer Solutions, and Abuzz Technologies; organic results included CrafTech, City of Philadelphia, Yelp, Meriplex, HelpMePCS, Dataprise, CCS, and Provident Technology. | **No** |
| `managed IT Philadelphia` | Cloudtango, Dataprise, Reddit, HelpMePCS, ISNY, Logic, Jumpfactor, and Voree among visible results. | **No** |
| `cybersecurity Philadelphia` | Ascendant, Built In, Community College of Philadelphia, Hacker Planet, ISC2, The Manifest, and Cybersecurity Summit among visible results. | **No** |
| `healthcare IT Philadelphia` | Indeed, LinkedIn jobs, HTTI, and AI/Web Guide-style sections were visible. | **No** |
| `on-site IT support Philadelphia` | CrafTech, Techmate, Partners Plus, Provident, HelpMePCS, Jumpfactor, OpenTier, and Hyopsys among visible results. | **No** |

### Branded-query details

Google’s branded result page contained an owner-only panel:

- Business: **JL Tech Solutions**
- Category: **Computer support and services**
- Displayed rating: **5.0**, one Google review
- Phone: `(267) 699-6991`
- Hours: **Open 24 hours**
- Website link: <https://limjonathan.github.io/jltech-solutions/>
- Profile text began: “JL Tech Solutions provides practical IT support and computer
  services for small businesses, clinics, and growing teams in Philadelphia and the
  surrounding area…”

The same page’s public-looking organic area showed other entities, including `jltech.us`
and `jltechinc.com`. Google labeled the Web Guide headers/descriptions as AI-generated
and warned they may contain mistakes. The official Pages URL was not an organic result.

## Google index and crawl checks

### Public Google queries

The live query `site:limjonathan.github.io/jltech-solutions/` returned:

> Your search ... did not match any documents.

The variant `site:limjonathan.github.io/jltech-solutions/ JL Tech Solutions` also
returned no documents. An exact quoted URL query produced a Google Web Guide statement
that no specific information was available for the requested website; it did not show a
result for the official site.

This is a strong warning signal, but not a definitive index diagnosis. Search Console
URL Inspection is the authoritative next check.

### Crawl assets observed directly

- `robots.txt`: allows all crawlers and points to the sitemap:
  <https://limjonathan.github.io/jltech-solutions/robots.txt>
- `sitemap.xml`: lists six URLs:
  1. `/`
  2. `/managed-it-services.html`
  3. `/cybersecurity.html`
  4. `/healthcare-it.html`
  5. `/philadelphia-on-site-it-support.html`
  6. `/showcase.html`
- Homepage response was HTTP-accessible and included:
  - `index, follow`
  - canonical URL
  - unique title and meta description
  - visible Philadelphia/service-area answer section
  - `LocalBusiness` JSON-LD
  - internal links to the four service pages and showcase

The homepage structured data names JL Tech Solutions, Jonathan Lim, phone
`+1-267-699-6991`, and served areas. It does not include a physical address, hours,
`geo`, or `sameAs` links in the HTML checked. Do not add an address or location data
unless it is real and intended for publication.

## Google AI Overview and AI Mode

### Standard Search

No visible AI Overview was observed for the six target queries in this session. This
does not mean the queries never trigger one; Google says AI Overviews are conditional
and can vary by query, user, and context.

### AI Mode

The live Google AI Mode result for `Philadelphia IT support` produced a response titled
“AI Mode reply for Philadelphia IT support.” It categorized options into business managed
IT, public/institutional support, and personal/local repair. Named supporting options
included:

- PCS / HelpMePCS
- Dataprise
- Meriplex
- CrafTech
- CMIT Solutions
- City of Philadelphia
- School District of Philadelphia
- Yelp

JL Tech Solutions and `limjonathan.github.io` were not mentioned or linked in that
response. The displayed answer also included Google’s warning: “AI can make mistakes,
so double-check responses.”

This is a single live sample, not a claim that JL Tech Solutions cannot appear in AI
Mode. Google’s official guidance says AI Mode and AI Overviews can use query fan-out,
the links vary, and a page must be indexed and eligible for a normal Search snippet to
be eligible as a supporting link. Google also says there are no additional AI-specific
technical requirements or special AI markup.

Source: [Google Search Central — AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)

## Bing

For `JL Tech Solutions`, Bing displayed about 4,040 results, but the prominent organic
matches were other entities:

- JLTech LLC at `jltech.us`
- JL Tech Services at `jltechservices.com`

The official JL Tech Solutions Pages URL was not visible in the inspected Bing result
set. No Bing local/non-branded query set was run, so no broader Bing ranking conclusion
is made.

## Official-site citation/link status

| Surface | Current observation |
|---|---|
| Google organic results, branded | Not visible in the inspected organic results |
| Google organic results, six local queries | Not visible |
| Google local pack, non-branded queries | JL Tech Solutions not visible in the inspected pack |
| Google GBP owner view | Official site linked as **Website** |
| Google AI Mode sample | Not cited or linked |
| Bing branded results | Not visible in inspected prominent results |
| Public `site:` query | No documents returned |

The GBP Website link is positive entity linkage, but it should not be confused with an
organic result or AI citation.

## Interpretation against official guidance

Google’s AI-search guidance says:

1. Existing SEO fundamentals apply; there are no extra AI requirements.
2. A page must be indexed and eligible for a Search snippet to be a supporting link.
3. Indexing and serving are not guaranteed.
4. Important content should be crawlable text, with crawl access, internal links,
   matching structured data, and current Business Profile information.
5. Search Console reports AI-feature traffic inside overall **Web** search data rather
   than as a guaranteed standalone citation metric.

Google’s local-ranking guidance says local visibility is mainly based on **relevance,
distance, and prominence**, with complete profile information, reviews, photos, and
links contributing to prominence. It does not promise a position or allow businesses
to pay/request a better organic local rank.

Sources:

- [Google — AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)
- [Google — Tips to improve your local ranking](https://support.google.com/business/answer/7091)
- [Google — Get started with Search Console](https://developers.google.com/search/docs/monitor-debug/search-console-start)
- [JL Tech Solutions — robots.txt](https://limjonathan.github.io/jltech-solutions/robots.txt)
- [JL Tech Solutions — sitemap.xml](https://limjonathan.github.io/jltech-solutions/sitemap.xml)
- [JL Tech Solutions — homepage](https://limjonathan.github.io/jltech-solutions/)

## Priority actions

### P0: establish the actual index state

1. Open Search Console for the verified Pages property and inspect the homepage plus
   all five sitemap URLs.
2. Record each URL’s indexed/canonical status, last crawl, enhancements, and any
   discovered-but-not-indexed reason.
3. Submit the sitemap in Search Console if it is not already submitted, then request
   indexing for the homepage and priority service pages after confirming canonical
   consistency.
4. Capture baseline impressions/clicks/queries in the Performance report. This is the
   only reliable way to distinguish “not indexed” from “indexed but low visibility.”

### P0: resolve entity ambiguity

5. Keep the exact business name, phone, website, service area, hours, category, and
   description synchronized between the verified GBP and the official site.
6. If there is no public customer-facing location, use the correct service-area
   configuration rather than inventing an address.
7. Add only genuine official `sameAs` links and credentials. Avoid adding similarly
   named companies or directories to structured data.

### P1: improve local citation eligibility

8. Keep the direct-answer blocks and crawlable landing pages, but make each page answer
   one intent clearly: managed IT, cybersecurity, healthcare IT, or Philadelphia
   on-site support.
9. Add real, permissioned proof: authored case studies, outcomes, scope, dates,
   testimonials, and relevant local/vendor/community references.
10. Review unsupported operational-looking figures and label them as illustrative or
    substantiate them with method, scope, and dates.

### P2: measure AI visibility without overclaiming

11. Monthly, sample the same prompts from a clean/non-owner context and record whether
    JL Tech Solutions is named, whether the official site is linked, and which page is
    cited.
12. Treat AI Mode/Overview samples as directional. Use Search Console Web performance,
    GBP calls/website clicks, reviews, and qualified inquiries as the durable measures.

## Bottom line

On 2026-11-19, JL Tech Solutions had a functioning public site and a visible
owner-linked GBP, but no confirmed organic Google indexing from public `site:` checks,
no visible placement for the six target local queries, and no citation in the tested
Google AI Mode answer. The immediate blocker is not an “AI SEO” file; it is verifying
indexing in Search Console and strengthening the consistent, externally corroborated
business entity that Google can confidently match to Philadelphia IT-support intent.
