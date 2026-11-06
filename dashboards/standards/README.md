# standards

One document per dropped dashboard picture: **what a real product in that category ships**,
tab by tab and feature by feature, and where the picture falls short of it.

These are written before (or alongside) the build, so the three live tabs are chosen and
filled against the category's own conventions rather than from the picture alone.

## The format

Every file is the same shape, so they can be read side by side:

1. **The category and the reference products** — which real products set the conventions,
   and what each one contributes.
2. **The nav a real one ships** — the full destination list, with the three worth building
   marked.
3. **Conventions that cut across every tab** — the rules that apply everywhere in the
   category.
4. **Each built tab in full** — purpose, the metric block with formulas, the blocks in
   priority order, controls, columns, row and bulk actions, states.
5. **What the inert tabs would hold** — one line each, so the nav reads as honest.
6. **The picture against the standard** — what it already has, then the gaps, worst first.
7. **What to keep** — the places the picture is *better* than the category default.
8. **Sources** — with **[secondary]** marking anything from a third-party guide rather than
   the vendor's own documentation.

## Written so far

| File | Category | Dropped picture |
|---|---|---|
| [`../mycogen/STANDARD.md`](../mycogen/STANDARD.md) | E-commerce store manager | episode 7, built |
| [`crypto-portfolio.md`](./crypto-portfolio.md) | Retail crypto portfolio tracker | "Fullmoon" → **built as episode 20, `lunara/`** |
| [`crypto-trading.md`](./crypto-trading.md) | Crypto exchange / trading desk | "Raxon" → **built as episode 25, `zyntrex/`** |
| [`sales-crm.md`](./sales-crm.md) | B2B sales & marketing CRM | "ForSelle" → **built as episode 21, `prospra/`** |

## Built without a standard of their own

Every dropped picture is now built. These went straight to a build; the category
conventions behind each one are in that episode's README rather than here.

| Category | Dropped picture | Episode |
|---|---|---|
| Private-investment / syndicate portfolio | "odin" | **built as episode 22, `vantyr/`** |
| Fleet & driver operations | unbranded | **built as episode 23, `routra/`** — marques invented |
| Shipment creation (TMS) | "shippit.com" | **built as episode 24, `haulvo/`** — Shippit is a real company, so the brand is invented |
| Hospital nursing / shift operations | "Rexora" | **built as episode 26, `medivra/`** — hospital and staff invented |
| Language learning | unbranded | **built as episode 27, `parlexa/`** |
| Team workspace / video collaboration | unbranded | **built as episode 28, `hivora/`** — the real hospital and the real microscope are gone, and the video tiles with them |
| E-learning course platform | "Quest" | **built as episode 29, `skillra/`** — Quest is a real product name, so the brand is replaced |
| Task management (kanban) | "weihu" | **built as episode 30, `tasklio/`** |

A built episode keeps its standard beside its own README (`<slug>/STANDARD.md`); an
unbuilt one lives here until it has a slug. Nothing is unbuilt at the moment — the next
eight files to write are the eight categories above, each of which went straight to a
build.
