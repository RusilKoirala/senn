# Product design — Contour

Status: built and verified on 26 October 2026 (1440, 375 and 320 widths). A complete new physical product landing page, independent of Senn's existing templates.

## Intake

Assumption: Contour is a fictional lighting studio introducing the C01 desk light. The visitor is choosing a thoughtful object for a home workspace. The primary action is **Choose your finish**. This demo lets visitors select a finish and save a product specification; it does not take payment or promise fulfilment.

The key objections are whether the light fits their space, how its controls work, and which finish suits the room. Product photography, a dimensions drawing, a clear specifications table and the interactive selector answer those questions. No invented testimonials, awards, customers or performance results.

## 1. Page outline

| Order | Section | Background | React Bits | Composition |
| --- | --- | --- | --- | --- |
| 1 | Navigation | Cool white | ShinyText | Small lowercase wordmark, product links, compact primary action; an accessible mobile menu |
| 2 | Hero | Cool white and original object photograph | SplitText, AnimatedContent, Magnet | A deliberately asymmetric product spread: compact left copy, a large right product photograph, a model index and three concise physical details. No centred headline or dashboard |
| 3 | Design details | White | AnimatedContent, CountUp | One enlarged product detail opposite three practical observations in an editorial list; a small technical drawing makes dimensions understandable |
| 4 | Tagline | Cobalt | ScrollReveal | Two large lines of pale type, with generous space and a precise product silhouette accent |
| 5 | In the room | Original workspace photograph | AnimatedContent | A wide photographic spread and quiet caption, followed by a narrow description. No panels floating over the image |
| 6 | Finish configurator | Icy grey | AnimatedContent, ClickSpark, ShinyText | A large product view and real finish radio controls, live summary, shareable URL, and a working specification download |
| 7 | Specifications | White | AnimatedContent, CountUp | A compact measured drawing and ruled definition list, clearly labelled as concept specifications |
| 8 | Questions | White | AnimatedContent | Six native disclosure questions about positioning, controls, finishes, care, saving and the demo |
| 9 | Closing and footer | Cobalt and ink | SplitText, Magnet, ScrollVelocity | Strong final invitation to choose a finish, restrained legal dialogs, small contact and source links |

## 2. Hero copy

- Product line: **C01 / The desk light**
- Headline: **A little light. / A better place.**
- Description: **For the desk, the late page, and the corner that becomes your own. A considered task light with a simple turn of the dial.**
- Primary action: **Choose your finish** → `#configure`.
- Supporting evidence: **An adjustable head. A weighted base. Just one dial.**
- Visible status: **Design concept**. All product details are illustrative rather than an offer for sale.

## 3. Benefits

1. Put the light on the work: a directional head keeps the focus where it belongs.
2. Keep the desk clear: a circular base gives the light a defined, compact footprint.
3. Settle into the evening: one dial gives the brightness a familiar physical control.
4. Find the finish that belongs: compare Cobalt and Graphite on the same product view.

## 4. How it works

Folded into the design details rather than a generic three card section:

1. Place the weighted base beside the task.
2. Aim the head toward the page or work surface.
3. Turn the dial to set the light.

The finish configurator is a real browser interaction. It updates the product image and specification, stores the choice in the URL, copies a share link with success/error feedback and downloads a text specification. Nothing auto advances or imitates a checkout.

## 5. FAQ

- **Where does C01 fit?** Beside a notebook, screen or reading chair. The concept drawing lists the footprint, height and reach so visitors can compare it with their own space.
- **How do the controls work?** The concept uses a single dial on the base for power and brightness, with a directional light head.
- **Which finishes can I compare?** Cobalt and Graphite. The selector changes the actual product photograph and saved specification.
- **Can I save my choice?** Copy a link with the selected finish, or download the product specification. No account is needed.
- **How would I care for it?** For this illustrative aluminium design, a soft dry cloth is the proposed care direction. A real seller should supply verified care and safety guidance.
- **Can I order this light?** C01 is a fictional product concept made for the Senn template. This demo does not take orders or payment.

## 6. SEO / AEO

Index the gallery setup page as “Product design landing page template | Senn”. Mark the fictional product demo and its viewer noindex. Do not add Product, Offer or review structured data to fictional commerce. Real users should add their verified product name, specifications, pricing, stock, sharing image and purchase destination before indexing.

## 7. Layout recommendation

**A. Hero plus sections**, adapted as an industrial design product story. The product itself is the primary visual object. The page moves from object, to use, to finish selection and specifications. This is deliberately distinct from Cove's landscape SaaS, Summit's sideways portfolio, Margin's notebook and Assembly's event poster.

## Visual contract

- **Palette:** cobalt `#1645ed`, icy white `#f1f4f8`, white and ink `#17191c`. Solid colours, no decorative gradients or glass cards.
- **Type:** Poppins, regular and medium with semibold only for controls. Generous lowercase display type, a compact model index and tabular specification values. Tailwind type scale only.
- **Shape:** large image planes, open white space, restrained rounded image corners, circular finish swatches and a circular physical base. No generic bento or pill navigation.
- **Hero:** asymmetric two column composition; product photo at least half the available width, full object visible. Copy remains within 680px and sits beside the object rather than on it. On phones, the photograph follows the headline and compact CTA.
- **Responsive:** side by side on desktop, stacked reading order on phones; no pinned panels or horizontal page scrolling. Configurator controls stay beside their summary on desktop and below the product view on mobile.
- **Motion:** one shared custom easing `cubic-bezier(.22,.68,0,1)`, gentle entrances and responsive selection feedback. Core controls and body text remain available immediately. Reduced motion shows final readable content. Every section includes a React Bits component.
- **Photography:** new generated images of the same fictional object: Cobalt on an icy studio background, a matching Graphite finish, and Cobalt in a quiet home workspace. Originals kept under `docs/backgrounds/`; compressed copies ship inside this template. No photography from another template is reused.

## Motion context

Website context. The object photographs stay static after their entrances. The finish transition is triggered only by the visitor. Text sections use normal reveals. There are no automatic product stories, fake cursors or recording exports.

## Intentional deviations

Fresh product photography follows the project's visual rule. The navigation is an open editorial bar rather than a floating glass island. The hero uses cobalt type rather than a gradient so it reads like a product catalogue. An illustrated measurement drawing accompanies the fictional specifications; it is an accessible code native diagram, not a replacement for photography.

## Packaging and validation

Keep the template self contained, copy in `content.ts`, tokens scoped to `.contour`, fonts loaded in `page.tsx`, and React Bits source and notices preserved. Check all finish states, URL restoration, clipboard feedback, specification download, native dialogs and menu, keyboard focus, reduced motion and 1440/375/320 widths. Then add a production 16:10 screenshot, gallery metadata and registry, and run install verification, lint, typecheck and build.

## Build notes

- **Photography.** `cobalt.jpg` is the project owner's studio photograph. `graphite.jpg` is that photograph recoloured locally, so both finishes share an identical frame and the crossfade lines up. `room.jpg` was generated from a text prompt; its light is an interpretation with a straight arm rather than the studio photograph's curved bend. Replace it with a real photograph when one exists. Details in `assets/IMAGE_SOURCES.md`.
- **Hero headline** is capped at `text-7xl`. At `text-8xl` "A better place." needs about 640px and the copy column is 608px at 1440, while the photograph keeps half the width.
- **SplitText clips descenders** at `leading-none` because its root is `overflow: hidden`. The headlines pass `className="-mb-3 pb-3"` to extend the clip box without moving the layout.
- **`.contour-button` sets `display`**, which beats Tailwind's `hidden`. Hide a button by wrapping it (`<span className="hidden sm:block">`).
- **Finish state** lives in `?finish=<id>` through `history.replaceState`, restored after hydration and on back/forward. `lib/spec.ts` holds the pure logic, tested by `pnpm test:contour`.
- **Licence.** `THIRD_PARTY_NOTICES.md` does not repeat Assembly's redistribution confirmation; confirm React Bits redistribution for this template before publishing.
