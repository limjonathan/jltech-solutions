# AI-search / AI-overview SEO research for JL Tech Solutions

**Research date:** 2026-11-19
**Scope:** Google AI Overviews and AI Mode, local-search/entity signals, and the
public JL Tech Solutions website. Primary sources were preferred. This report
does not change production files.

## Executive conclusion

There is no Google-approved “AI SEO” file, prompt, or special schema that makes
a site become the cited source. Google explicitly says that the same
foundational SEO practices apply to AI Overviews and AI Mode, and that a page
must be indexed and eligible for a normal Search snippet to be eligible as a
supporting link. Google also says inclusion and serving are not guaranteed.

The practical goal is therefore not to “stop Google summarizing” but to make
JL Tech Solutions the clearest, most trustworthy, crawlable first-party source
for a small set of local questions, while building the independent prominence
that local search uses. The highest-value work is:

1. Establish one consistent, verified business identity across the site and
   Google Business Profile (GBP).
2. Give each priority service/local-intent page a direct answer, evidence,
   author/business context, and a clear next step in crawlable HTML.
3. Strengthen discovery and prominence with Search Console, real local links,
   reviews, and accurate GBP data.
4. Measure impressions, clicks, queries, and conversions rather than assuming
   an AI answer was a win.

## Confirmed first-party guidance

### Google AI features

Google Search Central states:

- There are **no additional requirements** or special optimizations for
  inclusion in AI Overviews or AI Mode.
- A supporting-link page must be indexed and eligible for a Search snippet.
- Existing fundamentals remain relevant: crawl access, internal links, page
  experience, important content in text, useful media, matching structured
  data, and current Business Profile information.
- Google says owners do **not** need new “AI files,” AI text files, or special
  schema.org markup.
- AI Overviews and AI Mode can use query fan-out, so a page that answers a
  narrowly defined sub-question can be discovered for a related exploration.
- Search Console reports traffic from these experiences in the overall
  **Web** search type; Google does not present a separate “AI citation”
  guarantee or ranking control.

Source: [Google, AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)

### Normal SEO and crawlability

Google’s SEO Starter Guide confirms that Google primarily discovers pages
through links, that a sitemap is useful but not required, and that clear
descriptive titles, URLs, text, internal links, useful original content, and
accurate snippets help users and search engines understand pages. Google
specifically says there is no magical word count or guaranteed ranking recipe.

Sources:

- [Google, SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Google, Search Essentials](https://developers.google.com/search/docs/essentials)

### Business Profile and local ranking

Google says local results are mainly based on **relevance, distance, and
prominence**. Complete, accurate Business Profile information helps relevance;
prominence can reflect links from websites and reviews. Google recommends
verification, complete business information, correct category/hours/attributes,
review responses, and photos/videos. Google also says Business Profile
information is assembled from the owner, public web content (including the
official website), licensed data, users, and Google’s own interactions.

This matters to the requested “site link” outcome: the website is one source
Google uses to understand the business, but a GBP panel or AI answer is not
obligated to link to the site merely because the site has markup. Consistent
first-party and off-site facts make the entity easier to identify; prominence
and relevance still determine whether it is surfaced.

Sources:

- [Google, Tips to improve your local ranking](https://support.google.com/business/answer/7091)
- [Google, How Google sources and uses Business Profile information](https://support.google.com/business/answer/2721884)

### Structured data

Google recommends JSON-LD as the easiest structured-data format to maintain,
but says markup must describe visible page content and does not guarantee a
rich result. Structured data can help Google understand entities and qualify
for supported Search features; it is not a special AI-citation mechanism.

For local businesses, Google’s documented `LocalBusiness` requirements include
`name` and a physical `address`; recommended fields include `url`, `telephone`,
`geo`, and hours. Google recommends the most specific subtype possible and
testing with Rich Results Test, URL Inspection, and Search Console after
deployment.

Sources:

- [Google, Introduction to structured data](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)
- [Google, Local business structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business)
- [Google, Organization structured data](https://developers.google.com/search/docs/appearance/structured-data/organization)
- [Schema.org, LocalBusiness](https://schema.org/LocalBusiness)

### Quality and anti-manipulation boundaries

Google’s spam policies apply to attempts to manipulate generative AI responses
as well as ordinary Search. Avoid scaled, low-value AI pages; copied or lightly
rewritten content; doorway pages targeting many cities that funnel to one page;
keyword stuffing; hidden text; and purchased/manipulative links. AI-assisted
drafting is not the issue by itself; original, useful, accurate, human-reviewed
content is the relevant standard.

Source: [Google, Spam policies for Google web search](https://developers.google.com/search/docs/essentials/spam-policies)

## Public-site audit (confirmed observations)

Observed from the live site on 2026-11-19:

- Canonical site: `https://limjonathan.github.io/jltech-solutions/`
- `robots.txt` allows all crawlers and points to a sitemap.
- `sitemap.xml` lists six public URLs: home, managed IT, cybersecurity,
  healthcare IT, Philadelphia on-site IT, and showcase.
- The home page has a descriptive title and meta description, `index, follow`,
  canonical URL, Open Graph/Twitter metadata, visible Philadelphia/service
  language, and a `LocalBusiness` JSON-LD block.
- The home JSON-LD names “JL Tech Solutions,” identifies Jonathan Lim as
  founder, gives a phone number, and lists Philadelphia, Pennsylvania, New
  Jersey, and Delaware as `areaServed`; it does **not** include a physical
  `address`, hours, `geo`, or `sameAs` links.
- The service pages have unique titles/descriptions/canonicals, visible
  service copy, internal links, `Service` JSON-LD, and breadcrumbs. Their
  `Service.provider` points to the home-page business `@id`.
- The service pages are materially better citation candidates than a
  JavaScript-only landing page: the main service answers, FAQs, and local
  scope are present as HTML text.
- The home page’s headline is broad (“Full spectrum IT engineering”); the
  specific local/service intent is mostly carried by supporting sections and
  linked pages.
- The site makes strong operational claims (for example, “24/7,” “99.998%,”
  “847” AI tasks, and “97.6%” human-review pass rate). The public HTML does not
  show supporting case-study or methodology evidence for these dashboard
  numbers. These should be verified, qualified, or removed before actively
  promoting the site as a source.
- The public site exposes a phone number and “Serving Philadelphia and the
  surrounding area,” but no street address or hours in the visible footer.
- A web search in this environment did not return a confirmed public GBP
  result for “JL Tech Solutions Philadelphia Jonathan Lim.” This is **not
  proof that no GBP exists**; it means the GBP profile/URL could not be
  independently confirmed here. Verify from the owner’s Google account and
  Google Maps.

## What can make JL Tech Solutions the cited/linked source

These are implementation inferences from the confirmed guidance, not promises
from Google:

1. **Make the source uniquely answerable.** For each priority query, put a
   concise answer near the top, followed by specifics, boundaries,
   qualifications, evidence, and a CTA. A model can summarize generic “we do
   IT” copy from anywhere; it is more likely to need a linked page that
   clearly answers “what, where, for whom, and under what conditions.”
2. **Make the business entity unambiguous.** Keep exact name, canonical URL,
   phone, service area, founder/company description, and (if applicable)
   address/hours synchronized across the website, GBP, and legitimate profiles.
3. **Build topical hubs, not city-doorway pages.** Keep one page per real
   service or audience and add genuinely different local pages only when JL
   Tech Solutions can provide unique local information and service details.
4. **Publish proof that belongs to JL Tech Solutions.** Add authored case
   studies, project outcomes, before/after conditions, scope limits, photos,
   and client-permitted references. This supplies distinctive first-party
   material that generic summaries cannot replace.
5. **Earn corroborating links and reviews.** Relevant Philadelphia business,
   healthcare, technology, chamber, vendor, and community relationships can
   reinforce prominence. Do this editorially; do not buy optimized links or
   mass-submit low-quality directories.
6. **Treat structured data as disambiguation, not a citation hack.** Complete
   accurate `Organization`/`LocalBusiness` and `Service` relationships,
   validate them, and ensure all material facts are visible in HTML.

## Prioritized, implementable action list

### P0 — verify the entity and technical baseline

1. **Claim/verify GBP and record its public URL.** Use the real-world business
   category, service-area rules, phone, hours, services, description, photos,
   and website URL. If there is no customer-facing location, do not invent a
   storefront address; configure the profile as the appropriate service-area
   business. Keep service area and availability aligned with the on-site page.
   Confirm name/phone/site consistency.
2. **Set up Google Search Console** for the GitHub Pages property; inspect each
   sitemap URL, resolve indexing/canonical issues, submit the sitemap, and
   request recrawl after material edits. Record baseline queries, impressions,
   clicks, and pages.
3. **Validate the existing JSON-LD** with Rich Results Test and URL Inspection.
   Add only accurate visible facts. On the home entity, add a real address,
   hours, `geo`, email, and `sameAs` only if they are true and safe to publish.
   If no public location exists, retain service-area wording rather than
   fabricating `address`/`geo`.
4. **Remove or substantiate synthetic-looking dashboard claims.** Unverified
   numbers can reduce trust when a human or model checks the page. Replace with
   a clearly labeled illustrative demo, or publish the measurement period,
   methodology, and scope.

### P1 — improve citation-worthiness of the existing pages

5. **Rewrite each priority page around one intent:** “Philadelphia managed IT
   services,” “Philadelphia on-site IT support,” “Philadelphia healthcare IT
   support,” and cybersecurity. Add a 40–80 word direct answer in visible HTML:
   who is served, what is delivered, where, remote/on-site limits, and how to
   start. Keep the current detailed sections and FAQs below it.
6. **Add a visible trust block** to home and key service pages: business name,
   owner/author, service area, response/availability caveats, phone, contact
   path, last-reviewed date, and links to relevant case studies or credentials.
   Use only real claims.
7. **Turn the showcase into evidence-bearing case studies.** Each case should
   state client type (with permission), problem, scope, work performed,
   outcome/measurement, technology boundaries, and date. Link from the
   relevant service page with descriptive anchor text.
8. **Improve the entity graph.** Add stable `@id` relationships for the
   business, website, person/founder (only where appropriate), services, and
   breadcrumbs. Add `sameAs` for genuine official profiles such as GBP or
   LinkedIn; do not add directories merely to create markup.
9. **Keep pages crawlable without interaction.** Important facts should remain
   in HTML, not only in modals, animated dashboard logs, video, or form
   interactions. Ensure every sitemap URL is linked from a normal crawlable
   page and that titles/meta descriptions remain unique.

### P2 — build local prominence and feedback loops

10. **Create a small, honest local evidence program.** Ask completed customers
    for voluntary, policy-compliant reviews; respond helpfully; publish
    permissioned testimonials/case studies; seek relevant local organizations
    and vendor/community mentions where JL Tech Solutions is genuinely involved.
11. **Publish useful expert answers sparingly.** Examples: clinic Wi-Fi
    segmentation checklist, Philadelphia on-site IT visit preparation, or a
    small-business backup review guide. Each should contain original
    experience, author/business attribution, date, sources where needed, and a
    useful internal link—not a city-keyword template.
12. **Measure citation proxies monthly.** In Search Console track query/page
    pairs, branded vs non-branded impressions, local intent, clicks, and
    index coverage. Track GBP calls, website clicks, directions (if relevant),
    reviews, and qualified inquiry conversions. Manually sample target
    AI-search prompts and log whether the answer links to JL Tech Solutions,
    but treat that sample as directional because Google varies responses.

## Do not prioritize

- Do not create `AI.txt`, `llms.txt`, or special “AI schema” solely for Google;
  Google explicitly says they are not required for AI features.
- Do not add fake reviews, fake addresses, fake hours, fake awards, or
  unsupported metrics.
- Do not mass-produce near-identical pages for Philadelphia suburbs or every
  city.
- Do not add `FAQPage`/other markup expecting an AI citation; use structured
  data only when it accurately describes visible content and a supported
  Search feature applies.
- Do not use `noindex`, `nosnippet`, or `max-snippet` if the goal is to earn
  linked citations; Google documents those as controls to limit Search
  previews/content.

## Fact vs inference summary

**Confirmed:** Google says no special AI optimization or markup is required;
indexing/snippet eligibility and foundational SEO still matter; local ranking
uses relevance, distance, and prominence; GBP uses public web information;
JL Tech Solutions currently has crawl access, a sitemap, canonical URLs,
service pages, and some structured data, but no visible address/hours and no
confirmed GBP result from this inspection.

**Inference:** Clear answer blocks, first-party evidence, a coherent entity
graph, legitimate links/reviews, and stronger GBP/site consistency should
increase the chance that Google selects JL Tech Solutions as a relevant
supporting source and gives users a reason to click. None guarantees an AI
citation, link, ranking, or traffic increase.

## Source list

- [Google — AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)
- [Google — SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Google — Tips to improve your local ranking](https://support.google.com/business/answer/7091)
- [Google — How Google sources and uses Business Profile information](https://support.google.com/business/answer/2721884)
- [Google — Local business structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business)
- [Google — Organization structured data](https://developers.google.com/search/docs/appearance/structured-data/organization)
- [Google — Introduction to structured data](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)
- [Google — Search Console](https://developers.google.com/search/docs/monitor-debug/search-console-start)
- [Google — Spam policies](https://developers.google.com/search/docs/essentials/spam-policies)
- [Schema.org — LocalBusiness](https://schema.org/LocalBusiness)
- [JL Tech Solutions — public site](https://limjonathan.github.io/jltech-solutions/)
- [JL Tech Solutions — robots.txt](https://limjonathan.github.io/jltech-solutions/robots.txt)
- [JL Tech Solutions — sitemap.xml](https://limjonathan.github.io/jltech-solutions/sitemap.xml)
