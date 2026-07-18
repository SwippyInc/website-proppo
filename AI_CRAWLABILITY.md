# AI Bot Crawlability Changes

## What Was Done

### 1. `public/robots.txt` (created)
A `robots.txt` file was created that explicitly allows all major AI crawlers to access the entire site. Previously, no `robots.txt` existed, which meant crawler behavior was undefined. The file now includes named rules for:
- GPTBot / ChatGPT-User (OpenAI / ChatGPT)
- ClaudeBot / Claude-Web / anthropic-ai (Anthropic)
- PerplexityBot (Perplexity AI)
- CCBot (Common Crawl — feeds many AI training datasets)
- Googlebot-Extended (Google AI features)
- Meta-ExternalAgent (Meta AI)
- Applebot-Extended (Apple Intelligence)
- Bytespider (ByteDance / TikTok AI)

### 2. `app/sitemap.js` (created)
A Next.js App Router sitemap was created. It auto-generates a `/sitemap.xml` endpoint at runtime listing all public pages with their priority and change frequency. This helps crawlers discover all pages without having to follow links manually.

### 3. `public/llms.txt` (created)
An `llms.txt` file was created following the emerging [llms.txt standard](https://llmstxt.org/). This is a plain-text file at the root of the domain that gives AI language models a structured, human-readable summary of the site — what it does, who it's for, and links to key pages. Think of it as a landing page written specifically for AI models rather than humans.

### 4. `app/layout.js` (updated)
Two additions were made to the root layout:
- **Open Graph metadata** (`metadataBase`, `og:title`, `og:description`, `og:url`, `og:siteName`) so link previews render correctly on social platforms and AI tools.
- **JSON-LD structured data** using the `SoftwareApplication` schema from schema.org. This embeds machine-readable business information directly in every page's HTML, which AI crawlers and search engines can parse without interpreting the visual layout.

---

## Benefits

- **Appear in AI-generated answers**: Tools like ChatGPT, Perplexity, and Claude pull from crawled web data. Being explicitly crawlable increases the chance Proppo appears when users ask questions like "best property management software in India".
- **Better search engine features**: JSON-LD structured data enables rich results in Google Search (star ratings, pricing, app info) and powers Google's AI Overviews.
- **Sitemap speeds up indexing**: New pages get discovered faster. Without a sitemap, crawlers rely entirely on link-following, which can miss pages.
- **llms.txt gives you control of your narrative**: Instead of an AI model piecing together what Proppo does from random paragraphs on your site, `llms.txt` gives it a clean, authoritative summary you wrote yourself.
- **Open Graph tags**: Links shared on WhatsApp, Slack, LinkedIn, or inside AI chat interfaces now render with a proper title and description instead of a blank preview.

---

## Drawbacks

- **Increased crawl traffic**: Explicitly allowing many bots means more automated traffic hitting your server. For most hosting setups this is negligible, but on a constrained server it adds load.
- **llms.txt is not yet a universal standard**: It was proposed in 2024 and is gaining adoption, but not all AI systems read it yet. It helps, but it is not a guarantee.
- **robots.txt is a courtesy, not a lock**: It is a voluntary protocol. Bots that don't respect `robots.txt` (scrapers, bad actors) ignore it entirely.
- **Sitemap exposes your URL structure**: All your page paths are now listed in one publicly accessible file. This is standard practice, but it does make it trivially easy for anyone to see every page on your site.
- **JSON-LD is only as good as its accuracy**: If the structured data goes out of date (e.g., pricing currency changes, company details change), it can mislead both users and AI tools until it is updated.

---

## What Can Go Wrong

### Competitive intelligence becomes easier
By making the site fully crawlable and providing a clean `llms.txt`, you are making it easy for competitors to feed your site into an AI tool and get a structured breakdown of your product, features, and positioning.

### Content scraped for AI training without compensation
CCBot feeds the Common Crawl dataset, which is used to train many open-source and commercial AI models. By explicitly allowing CCBot, your content can be used as training data. There is currently no opt-in compensation or attribution mechanism for this.

### Outdated information in AI answers
Once crawled, AI models may cache or bake your information into their training data or retrieval indexes. If your pricing, features, or product changes, AI tools may continue citing old information for months until they re-crawl or retrain.

### Increased automated form submissions / abuse
More crawlers on the site means more exposure to bots that also probe for forms, API endpoints, and input fields. This is not caused by these changes directly, but higher crawl traffic increases the surface area for automated abuse.

### Misrepresentation by AI models
Even with `llms.txt`, an AI model may combine your content with information from other sources and produce inaccurate or misleading descriptions of Proppo that you have no control over.

---

## Recommended Follow-up Actions

1. **Add per-page metadata** to pages that currently set the title via `document.title` in `useEffect` (privacy policy, terms, refund policy). AI crawlers only see server-rendered HTML.
2. **Keep `llms.txt` updated** whenever the product, pricing, or key features change.
3. **Monitor your server logs** for unusual spikes in bot traffic after deploying.
4. **Register with Google Search Console** and submit the sitemap URL (`https://proppo.in/sitemap.xml`) to accelerate indexing.
