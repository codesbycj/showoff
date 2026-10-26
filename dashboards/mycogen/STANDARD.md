# Mylora (`mycogen`) — the industry standard for a store-manager dashboard

What a real e-commerce admin ships, tab by tab and feature by feature, and where this
build sits against it. Episode 7, port 5324.

> **Format.** Every episode gets this document in the same shape: §1 the category and the
> products I measured against, §2 the nav a real one ships, §3 conventions that cut across
> every tab, §4–6 the three built tabs in full, §7 what the inert tabs would hold, §8 a
> gap audit of this build, §9 the calls I would *not* change, §10 sources. Anything marked
> **[secondary]** comes from a third-party guide rather than the vendor's own docs.

---

## 1. The category and the reference products

This is a **store-manager admin**: the back office one or two people use daily to run an
online shop. The category's conventions are set by:

| Product | What it defines for the category |
|---|---|
| **Shopify admin** | The default. Home's four metrics, the Analytics overview set, the order list's saved views and status vocabulary. Everything else copies it. |
| **BigCommerce control panel** | The period picker (day/week/month/year, or last 7/30/365) with compare-to-previous-period or previous-year, and a "store performance" block of lifetime totals. |
| **WooCommerce / Amazon Seller Central** | The work-queue bias: the first thing on screen is what needs doing today, not what happened last month. |

The distinction that matters: an admin is **not** an analytics product. Analytics answers
"what happened"; an admin answers "what happened **and what do I do now**". A store admin
that is all charts and no queue has copied the wrong half.

---

## 2. The nav a real one ships

| Entry | What it is | Here |
|---|---|---|
| **Dashboard / Home** | Today's state plus the work queue | **built** |
| **Orders** | The order list, its saved views and the order detail | **built** |
| **Customers** | People, segments, lifetime value | **built** |
| Products | Catalogue, inventory, variants, media | inert |
| Categories / Collections | Grouping and merchandising order | inert |
| Reviews | Moderation queue | inert |
| Discounts | Codes, automatic discounts, schedules | inert |
| Analytics | Report library and the custom report builder | inert |
| Marketing | Campaigns, automations, abandoned-checkout recovery | inert |
| Settings | Payments, shipping, taxes, staff, notifications | inert |

That is the right nav for the category — nothing is missing from the list, and the three
built are the three with the most to show (rule 1).

---

## 3. Conventions that cut across every tab

1. **A delta needs its baseline on the card.** "+12.5%" alone is the most common defect in
   this category. The card says `vs. previous 30 days` or `vs. same period last year`, in
   words, next to the number.
2. **One period control, applied to everything on screen.** Standard set: Today, Yesterday,
   Last 7 / 30 / 90 days, Month to date, Year to date, Custom. BigCommerce adds the
   compare-to toggle beside it, which is the right place for it.
3. **Date semantics are stated.** Metrics run in the **store's** timezone, not the
   viewer's, and a partial period says so ("Today, so far"). Orders are counted by their
   placed-at date; refunds by the date of the refund, not of the order.
4. **Drill-down carries the range and the comparison with it.** Clicking a KPI opens the
   list behind it, already filtered to the same window. Overview to detail in one or two
   clicks.
5. **Status is a vocabulary, not a colour.** Every status renders as a labelled pill;
   colour is reinforcement, never the only carrier.
6. **Money and counts are formatted differently.** Money: store currency, two decimals in
   tables, abbreviated on axes (`$54.9K`). Counts: thousands separators, no decimals.
   Percentages: one decimal. Tabular figures everywhere a column of numbers stacks.
7. **Every list has a saved-view rail, a search, filters, a sort and an export.** And every
   one of those states appears in the URL or in a saved view, so a manager can return to it.
8. **Three states per list, not one:** populated, filtered-to-nothing (with the filter
   named and a way to clear it), and genuinely-empty (first-run: "No orders yet").
9. **The row count is always visible** — "18 of 142" — so a filter's effect is legible.

---

## 4. Tab 1 — Dashboard (Home)

**Purpose:** in one screen, is the shop healthy, and what needs doing today.

### 4.1 The metric block

Shopify Home ships **four** by default, over the last 30 days, across all channels:
**sessions, total sales, total orders, conversion rate** — and lets each staff member pick
which four. The Analytics overview adds **returning customer rate** and **average order
value**. That six-metric set is the category standard:

| Metric | Definition | Notes |
|---|---|---|
| **Sessions** | Visits to the online store, de-duplicated by a 30-minute inactivity window | The denominator of conversion rate; without it the funnel has no top |
| **Conversion rate** | Orders ÷ sessions, **online store channel only** | Shopify's own definition. Break it out as added-to-cart → reached-checkout → converted |
| **Orders** | Count of orders placed in the period | Not fulfilled, not paid — *placed* |
| **Average order value** | Net sales ÷ orders | **Pick one definition and print it.** Three are in common use (gross ÷ orders, (gross − discounts) ÷ orders, net ÷ orders) and every published benchmark quietly picks a different one **[secondary]** |
| **Total sales** | Gross sales − discounts − returns + shipping + taxes | Gross = price × quantity, before tax, shipping, discounts and returns. Net = gross − discounts − returns |
| **Returning customer rate** | Customers with more than one order ÷ total customers | Shopify's formula |

Optional second row, by category: **units per order**, **refund rate** (refunded ÷ gross
sales), **gross margin**, **cart abandonment**, **recovered checkout revenue**.

Each tile: label, value, delta **with its baseline**, and a sparkline of the same metric
over the period. The tile is a link to the report behind it.

### 4.2 The blocks, in priority order

1. **Period + channel + compare controls** — top right, applying to the whole screen.
2. **KPI row** (4–6 tiles, as above).
3. **The work queue.** The block that separates an admin from a report. A strip of counts,
   each one a filtered link into Orders or Products:
   - orders to fulfil (and how many are older than 24h / 48h)
   - payments to capture / unpaid orders
   - returns and refunds awaiting action
   - chargebacks and high-risk orders to review
   - products low or out of stock
   - unanswered reviews or customer messages
4. **Sales over time** — a line or bar series with a **dashed previous-period overlay**, a
   range control that matches the global one, and hover reading date, value and delta.
5. **Sales by channel** — online store, POS, marketplace, social; share and value.
6. **Top products** — by revenue *and* units (they rank differently and the difference is
   the insight), with stock remaining on each row.
7. **Customer mix** — new vs. returning, as a share of orders and of revenue.
8. **Traffic sources** — direct, search, social, referral, email; sessions and conversion
   rate per source.
9. **Marketing state** — live discounts and campaigns, with usage counts, plus abandoned
   checkouts recovered (count and revenue).
10. **Recent orders** — last 5–10 rows, the same columns as the Orders tab, "view all".

### 4.3 States

Partial period labelled "so far"; zero-session days drawn as zero, not as a gap; a
first-run empty state that links to setup rather than showing a chart of nothing.

---

## 5. Tab 2 — Orders

**Purpose:** find any order, see what state it is in, and act on it — one or in bulk.

### 5.1 Saved views (the tab rail above the table)

Shopify's defaults: **All · Unfulfilled · Unpaid · Open · Closed · Archived**, plus
user-saved views. The default Unfulfilled view is just the fulfilment filter preset — which
is the pattern: a view *is* a saved filter set, with a count on it.

### 5.2 Filters

Shopify's order list filters, which is the fullest set in the category:

- **Fulfilment status**: unfulfilled, partially fulfilled, fulfilled, scheduled, on hold
- **Payment status**: pending, authorised, paid, partially paid, partially refunded,
  refunded, voided, expired
- **Delivery method** and **delivery status**
- **Return status**, **chargeback status**, **risk level**
- **Sales channel**, **app**, **destination**, **product**, **tags**, **date**,
  **card last-4**

Filters combine, and the combination is savable as a view.

### 5.3 Columns

Order number · date placed · customer · channel · total · **payment status** ·
**fulfilment status** · items · delivery method · tags **[secondary]**

Sortable: date, total, payment status, fulfilment status, customer.

### 5.4 Row and bulk actions

- **Row**: open detail, fulfil, capture payment, print packing slip, refund, archive, cancel.
- **Bulk** (on checkbox selection): fulfil, print packing slips, capture payments, add or
  remove tags, archive, cancel, export CSV. The selection bar states what is selected
  ("12 orders selected") and offers "select all 142 matching".

### 5.5 Order detail

Line items with variants and quantities · customer and both addresses · payment summary
(subtotal, discounts, shipping, tax, total, amount paid, balance) · fulfilment panel with
tracking · a **timeline** of events and staff notes · tags · risk assessment.

---

## 6. Tab 3 — Customers

**Purpose:** who buys, how often, and which group is worth a campaign.

### 6.1 The metric block

Total customers · new this period · **returning customer rate** (>1 order ÷ total) ·
repeat purchase rate · average lifetime spend · average orders per customer.

### 6.2 Segments

Shopify's data model carries the segment flags **new, returning, loyal, at risk, dormant**,
plus `total_order_count` and `total_order_value` per customer, and a segment builder with
filters such as lifetime spend. Third-party tools commonly tier on order count — one-time,
returning (2–3), loyal (4+) **[secondary]**.

The segment rail shows each segment with a live count, and "create segment" opens the
filter builder. Definitions must be visible — a segment nobody can define is a segment
nobody trusts.

### 6.3 Columns

Name · email · location · orders · **lifetime spend** · average order value · last order
date · segment · tags · email-marketing consent.

Sortable on spend, orders, last order date. Filters: spend range, order count, location,
tag, consent, last-order recency.

### 6.4 Customer profile

Lifetime summary (orders, spend, AOV, first and last order) · order history with status ·
addresses · tags and notes · marketing consent and subscription state · timeline.

### 6.5 Bulk actions

Add to segment, tag, export CSV, start an email campaign to the selection.

---

## 7. What the inert tabs would hold

So the nav reads as honest even though these do nothing:

- **Products** — list with image, title, status, inventory, type, vendor; variants; bulk
  edit; low-stock filter.
- **Categories / Collections** — manual and automated collections, merchandising order.
- **Reviews** — moderation queue, reply, publish/unpublish, rating distribution.
- **Discounts** — code and automatic discounts, usage limits, schedule, usage counts.
- **Analytics** — report library (sales over time, by product, by channel, by traffic
  source), plus a custom report builder.
- **Marketing** — campaigns, automations, abandoned-checkout recovery, attribution.
- **Settings** — payments, shipping, taxes, staff and permissions, notifications.

---

## 8. Gap audit — this build against the standard

### What is already right

KPI row with deltas and period notes · sales series with Daily/Weekly/Monthly · customer
insight column with new/VIP/total and top customers · retention meter · active promotions
with usage counts · orders table with order, customer, placed, items, total, status ·
customers table with segment, orders, spend, last order · filters and sorts on both lists ·
inert nav done properly.

### Gaps, worst first

| # | Gap | Why it matters | Cost |
|---|---|---|---|
| 1 | **No conversion rate and no sessions** | The category's headline metric, and both inputs are already in the deck — Product Views 45,210 and Orders 1,429 give 3.2%. Without it the KPI row is a bag of numbers rather than a funnel | **Cheap — derived.** One tile, no new data |
| 2 | **No work queue** | The block a store manager actually uses: to fulfil, unpaid, returns, low stock. The Orders tab has the statuses; nothing surfaces them on Home | Medium — a strip of counts computed from the order deck, each linking into a filtered Orders view |
| 3 | **Deltas have no baseline** | "+12.5% This month" implies vs. last month but never says it; the standard prints the comparison | **Cheap** — a string per tile |
| 4 | **No sales-by-channel and no top-products** | Two of the six standard Home blocks. The right column is entirely customer-side | Medium — needs a channel field on orders and a product roll-up |
| 5 | **Cart abandonment is inert** | 23.8% with no recovered-checkout count or revenue beside it is a statistic nobody can act on | Low — a second figure on the same tile |
| 6 | **No previous-period overlay on the sales chart** | A series with no baseline cannot show whether this month beat last | Low — a second dashed path from the same series shifted one period |
| 7 | **Orders list has no saved views** | All / Unfulfilled / Unpaid / Open is the category's primary navigation of the order list | Medium — a view rail over the existing filter |
| 8 | **Payment status is missing from the order row** | Fulfilment and payment are two independent statuses in every product in this category; the build carries one | Low — a field and a column |
| 9 | **No bulk selection or bulk actions** | Fulfil, print, tag, export are how the list is actually used | Medium — checkbox column plus a selection bar |
| 10 | **Customer segments are a flat trio** (VIP / Returning / New) | The standard tiers on order count and spend with visible definitions, and adds at-risk and dormant | Low — rules over the existing fields |
| 11 | **No CSV export anywhere** | Every list in this category exports | Low — a button and a client-side CSV |
| 12 | **No order detail** | A row that cannot be opened is where the category's real work happens | High — a detail panel with line items, payment summary and timeline |

---

## 9. What I would **not** change

The series rule is to rebuild the dropped picture, not to redesign it toward a category
template. These stay as they are unless you say otherwise:

- **The right-hand customer column.** The reference put customer summaries there; replacing
  it with top-products would be a different design.
- **The pastel wash.** It is this episode's identity (see the README).
- **Six KPI tiles rather than four.** The reference draws six; Shopify defaults to four but
  lets the user choose, so six is inside the convention.
- **Marketing shortcut cards along the top.** Not standard on Home, but they are what the
  picture had, and they read as the admin's quick actions.

Gaps 1, 3, 5 and 6 are the ones I would close first: all four are cheap, none of them
changes the layout the reference set, and together they turn the KPI row from a bag of
numbers into a funnel with a baseline.

---

## 10. Sources

- [Shopify Home page](https://help.shopify.com/en/manual/shopify-admin/shopify-home) — the
  four default metrics, the 30-day window, per-user metric choice, conversion-rate scope.
- [Shopify: searching and viewing orders](https://help.shopify.com/manual/orders/search-view-print-orders)
  — order filters, saved views, the default Unfulfilled view.
- [Shopify Admin GraphQL: orders](https://shopify.dev/api/admin-graphql/latest/queries/orders)
  — the fulfilment and financial status vocabularies.
- [Shopify data-warehouse customers schema](https://shopify.dev/docs/apps/data-warehouse/reference/schema/customers)
  — segment flags, lifetime order count and value, the returning definition.
- [Shopify segmentation](https://www.shopify.com/segmentation) — the segment builder.
- [BigCommerce: getting started with the new control panel](https://support.bigcommerce.com/articles/en_US/Knowledge/Getting-Started-with-the-New-Control-Panel)
  — period picker, compare-to-previous, store performance and recent orders.
- [Tableau: 5 best practices for analyzing e-commerce data](https://www.tableau.com/learn/whitepapers/5-best-practices-analyzing-ecommerce-data)
  — drill-down in one to two clicks, against decorative widgets.
- [SaaS metric KPI card patterns](https://www.saasui.design/blog/saas-metric-kpi-card-ux-patterns)
  **[secondary]** — stating the comparison window on the card, sparklines, card-level drill-in.
- [Shopify analytics guide, Polar](https://www.polaranalytics.com/post/shopify-analytics-guide)
  and [BeProfit sales-report guide](https://beprofit.co/a/blog/an-essential-guide-to-shopify-sales-reports-types-kpis-and-analytics)
  **[secondary]** — the overview metric set, gross vs. net sales.
- [Coupler: Shopify sales report](https://www.coupler.io/ai-agent-skills/shopify-sales-report)
  **[secondary]** — that AOV has three definitions in common use.
