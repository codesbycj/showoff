# B2B sales & marketing CRM — the industry standard

**Reference picture:** the "ForSelle" dashboard (nav: Dashboard · Leads · Workflows ·
Sales · Reports). Not yet built.

---

## 1. The category and the reference products

A **CRM with marketing attached**: pipeline on one side, campaigns on the other, and a
dashboard that has to serve a rep, a manager and a founder without being three dashboards.

| Product | What it sets |
|---|---|
| **HubSpot** | The object model everyone copies — lifecycle stage (Subscriber → Lead → MQL → SQL → Opportunity → Customer → Evangelist → Other), lead status, and a deal pipeline whose stages carry win probabilities **[secondary]** |
| **Salesforce / Pipedrive** | The pipeline board, forecast categories, and the deal record as the unit of work |
| **Sales-dashboard practice** | Quota attainment, win rate, pipeline coverage, pipeline velocity, and the rule that the dashboard changes by role **[secondary]** |
| **Klaviyo / email platforms** | Campaign metrics: open, click, conversion, revenue per recipient, plus list health **[secondary]** |

The thing most designs get wrong: **vanity metrics at the top**. "Followers", "audience
growth" and "emails sent" are activity, not outcome. The category's headline row is
pipeline and quota.

---

## 2. The nav a real one ships

| Entry | What it is | Build? |
|---|---|---|
| **Dashboard** | The role-aware overview | **yes** — the dropped screen |
| **Leads / Contacts** | People and companies, lifecycle stage, owner, score | **yes** |
| **Sales / Deals** | The pipeline board and the deal record | **yes** — the category's core |
| Workflows | Automation canvas: triggers, conditions, delays, actions | inert |
| Reports | Saved reports and the builder | inert |
| Campaigns / Marketing | Email, ads, attribution | inert |
| Activities / Tasks | Calls, meetings, follow-ups, sequences | inert |
| Settings | Pipelines, stages, properties, users, permissions | inert |

---

## 3. Conventions that cut across every tab

1. **Money is forecast money.** Raw pipeline value is always accompanied by **weighted**
   pipeline (Σ deal value × stage probability). A dashboard that shows only the raw number
   overstates the quarter, every quarter.
2. **Every metric names its owner scope** — mine / my team / everyone — and the filter is
   one control at the top.
3. **Period and comparison together**, as everywhere: `this quarter vs. last quarter`.
4. **A deal's age is as important as its value.** Days in current stage, on every card and
   every row; stale deals surfaced, not buried.
5. **Close date and probability are editable from anywhere** a deal appears.
6. **Lifecycle stage ≠ deal stage ≠ lead status.** Three different properties: the contact's
   overall relationship, the specific sale's progress, and pre-deal qualification. Keeping
   them distinct is the single clearest sign the model is understood.
7. **Activity counts are a leading indicator, never a headline.** They belong under the
   outcome metrics.
8. **Everything is assignable and everything has an owner avatar.**

---

## 4. Tab 1 — Dashboard

**Purpose:** are we going to hit the number, and what is in the way.

### 4.1 The metric block

| Metric | Formula |
|---|---|
| **Pipeline value** | Σ open deal value in the period |
| **Weighted pipeline** | Σ (deal value × stage probability) |
| **Closed-won** | Σ value of deals closed-won in the period, against **quota** |
| **Quota attainment** | Actual ÷ target, as a percent |
| **Win rate** | Closed-won ÷ (closed-won + closed-lost) |
| **Average deal size** | Closed-won value ÷ closed-won count |
| **Sales cycle length** | Mean days from deal created to closed-won |
| **Pipeline coverage** | Open pipeline ÷ quota — 3–4× is the usual health bar **[secondary]** |
| **Pipeline velocity** | (deals × average deal size × win rate) ÷ cycle length **[secondary]** |

### 4.2 The blocks, in priority order

1. **Period · owner/team · pipeline filters**, applying to everything below.
2. **KPI row** — closed-won vs. quota, weighted pipeline, win rate, average deal size.
3. **The funnel** — count and value at each stage, with stage-to-stage conversion rates.
   This is the block that says *where* deals die.
4. **Revenue vs. forecast over time** — actual, forecast and plan on one chart, with the
   period boundary marked. (The picture's "forecast $50M / planned $40M" chart is exactly
   this, and is the strongest thing in it.)
5. **Deals needing attention** — stalled (no activity in N days), closing this week,
   past close date, high value at an early stage. Each row a link.
6. **Team leaderboard** — rep, quota attainment, closed-won, pipeline, win rate.
7. **Top deals** — largest open deals with stage, close date, owner, age.
8. **Marketing contribution** — MQLs created, MQL→SQL conversion, campaign-sourced
   pipeline, cost per lead. Channel bars belong here, under the pipeline, not above it.
9. **Geography / segment split**, where the business has one.

---

## 5. Tab 2 — Leads

**Purpose:** who is in the funnel, how qualified, and who owns them.

- **Views rail:** All · My leads · Unassigned · MQLs · SQLs · Recently created · Stale.
  Each a saved filter with a count; users can save their own.
- **Columns:** name · company · **lifecycle stage** · lead status · score · source ·
  owner · last activity · next step · created. Sortable; column set configurable.
- **Filters:** lifecycle stage, status, source, owner, score range, created/last-activity
  date, tags, company size, region.
- **Row → lead detail:** timeline of every touch (emails, calls, meetings, form fills,
  page views), properties panel, associated company and deals, tasks, notes, and the
  actions — change stage, assign owner, enrol in a sequence, create a deal, log activity.
- **Bulk actions:** assign owner, change lifecycle stage, add to list/segment, enrol in
  sequence, add tags, export, delete.
- **Lead scoring is visible and explainable** — the score with the reasons behind it, not
  a bare number.
- **States:** filtered-to-nothing names the filter; an unassigned queue that is empty says
  so cheerfully.

---

## 6. Tab 3 — Sales (pipeline)

**Purpose:** move deals, and see the quarter.

- **Board by stage.** Each column header: stage name, deal count, **total and weighted
  value**, and the stage probability. Cards drag between stages; the move is optimistic and
  reversible.
- **Deal card:** name · company · value · close date · owner avatar · days in stage ·
  probability or forecast category · a flag when it is past its close date.
- **Views:** board · list · forecast. The forecast view groups by **commit / best case /
  pipeline / closed** and totals each.
- **Filters:** owner, stage, close date, value range, source, product, tags; plus a
  pipeline selector when there is more than one.
- **Deal record:** value and line items · contacts and company · stage history with dates ·
  activity timeline · tasks · quotes and documents · next step and close date. Changing the
  stage prompts for the reason when it is closed-lost — the field that makes win-rate
  analysis possible.
- **Bulk:** change stage, assign owner, update close date, export.
- **The quarter bar:** closed + commit vs. quota, so the board always answers "are we
  there".

---

## 7. What the inert tabs would hold

**Workflows** — a canvas of trigger → condition → delay → action. Triggers: stage change,
record created, form submitted, field changed, time-based, idle-for-N-days. Actions: send
email, create task, update field, assign owner, move stage, add/remove tag, enrol in
sequence. Plus run history, errors and versioning with rollback **[secondary]**.
**Reports** — saved reports, a builder (object → filters → columns → chart), scheduling.
**Campaigns** — sends, open/click/conversion, revenue per recipient, list growth and churn,
spend and ROAS per channel, attribution model selector.
**Activities** — a queue of calls, meetings and follow-ups due today.
**Settings** — pipelines and stage probabilities, custom properties, users and roles.

---

## 8. The dropped picture against the standard

**What it has:** three count tiles (audience growth, followers, campaign emails sent);
Total Sales Growth +83.42% with a `Grow Since Last Week` note; Current Business Revenue
with forecast and planned lines and a period marker; Customers Growth on a world map;
Sales Team Performance as rings of "target completion"; Platform Value with
Revenue/Leads/Workflows tabs; Campaign bars by channel with cost and a percentage; Top
Deals table.

**Gaps, worst first:**

| # | Gap | Why it matters |
|---|---|---|
| 1 | **The headline row is vanity metrics.** Audience growth, followers, emails sent | Three activity counts where the category puts pipeline, quota and win rate. The whole screen reads as a marketing report, not a CRM |
| 2 | **No pipeline anywhere.** No stages, no weighted value, no funnel | The object the product exists to manage never appears on its own dashboard |
| 3 | **"Total Sales Growth +83.42%"** sits on a striped bar with no scale | A percentage with no baseline, no period and no axis |
| 4 | **Top Deals has no stage, close date or owner**, and its three rows are identical (`#245639890`, same date, same amount) | A deal table without stage and close date cannot be acted on — and identical rows are the placeholder tell |
| 5 | **Sales Team Performance shows only % complete** | Right metric (quota attainment), missing the two numbers behind it — closed-won and target |
| 6 | **The map carries one pin** ("USA 50k Our Customer") | A map is the most expensive way to show one number; either populate it or use a bar list |
| 7 | **Campaign bars mix cost and percentage** with negative values (`-$290.87 · -56.32%`) and no labels on what is good | Spend, return and change need separate columns |
| 8 | **No date range on the dashboard** | "Weekly" and "Country" dropdowns sit on individual cards instead |

---

## 9. What to keep from the picture

- **The forecast-vs-planned revenue chart** with the period boundary and the "Best Value"
  marker. That is the best block in the design and standard practice done well.
- **The Platform Value tab group** (Revenue / Leads / Workflows) — one chart, three series,
  switched rather than stacked.
- **The quota rings** in the team list — compact and legible.
- **The dark "primary tile"** treatment to mark the one metric that matters most.

---

## 10. Sources

- [HubSpot community: lifecycle stages, deal stages and lead status](https://community.hubspot.com/t/ama-demystifying-hubspots-lifecyle-stages-deal-stages-and-lead-status/45781) **[secondary]** — the three properties and how they interact.
- [HubSpot deal stages explained](https://www.sybill.ai/blogs/hubspot-deal-stages) **[secondary]** — the seven default pipeline stages and their probabilities.
- [HubSpot lifecycle stages explained](https://www.sybill.ai/blogs/hubspot-lifecycle-stages) **[secondary]** — the eight default lifecycle stages.
- [DealHub: sales management dashboard](https://dealhub.io/glossary/sales-management-dashboard/) **[secondary]** — quota attainment and pipeline coverage definitions.
- [Teamgate: role-based sales dashboards](https://www.teamgate.com/blog/how-to-build-role-based-sales-dashboards/) **[secondary]** — what reps, managers and leaders each need.
- [Yesware: sales pipeline dashboard](https://yesware.com/blog/sales-pipeline-dashboard) **[secondary]** — pipeline velocity and coverage.
- [Pipeline CRM: sales automation](https://pipelinecrm.com/docs/ai/sales-automation.html) **[secondary]** — workflow triggers and actions.
- [Klaviyo: what is a marketing dashboard](https://www.klaviyo.com/products/marketing-analytics/what-is-a-marketing-dashboard) **[secondary]** — campaign metric set and list health.
- [Practical Ecommerce: tracking channel performance](https://www.practicalecommerce.com/track-overall-marketing-performance-channels) **[secondary]** — attribution and spend/ROI basics.
