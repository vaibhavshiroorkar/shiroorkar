# Site versions

Every version of the Udaykumar Shiroorkar site so far: what it looked like, why it changed, and
how to run it again. Versions are listed oldest first.

## Browsing every version

Static HTML copies of each version live in [`designs/`](designs/index.html), so none is ever
lost. The site snapshots need a local server:

```bash
npx serve docs        # then open http://localhost:3000/designs/
```

The demos in `designs/demos/` also open straight from the file.

To preserve a new version, snapshot it before moving on:

```bash
scripts/snapshot.sh v4 <commit-or-branch>
```

The script builds that version in a temporary checkout and writes it to `docs/designs/v4/`.
Your working files are never touched. The copy has no inquiry API, so its form falls back to
"send by email". Add the new version to `docs/designs/index.html` and to this file.

## Running an old version next to the current one

Each committed version can run in its own folder without touching your working copy:

```bash
git worktree add ../shiroorkar-v1 6d87a84   # pick the commit from the table below
cd ../shiroorkar-v1
npm install
npx next dev -p 3001                        # current site stays on port 3000
```

Remove it afterwards with `git worktree remove ../shiroorkar-v1`.

| Version | Commit | Status |
|---|---|---|
| v0 Scaffold | `f4a90d4` | In git |
| v1 Editorial | `6d87a84` | In git |
| Design demos A to D | none | Rebuilt as HTML in `designs/demos/` |
| v2 Green cutout hero | `bbd2d87` | On `main`, the live version |
| v3 Work-led homepage | `55edb82` | On branch `v3-work-led`, not live |
| v4 Story pattern | `593af86` | Archived in `designs/v4/` |
| v5 A layout per story | latest `main` | Current |

`main` is what Vercel deploys.

## v0: Scaffold (`f4a90d4`)

The empty Next.js 16 starter from `create-next-app`, with TypeScript and Tailwind CSS 4. Nothing
of the brand yet.

## v1: Editorial (`6d87a84`)

The first full site, built from the original brief.

- **Look:** warm off-white paper, deep forest green, an ochre accent. Fraunces serif headings with
  Inter body text, thin dividing rules, small uppercase labels and numbered sections.
- **Homepage:** a hero with a portrait placeholder beside a large serif headline ("Turning
  experience into meaningful change."), then introduction, professional background, environmental
  work, an impact band (23 / 26 / 1), Reels, media and film, speaking topics and an inquiry band.
- **Pages:** About (story and timeline), Environmental Work, Reels & Media, Speaking, Work With Us
  (inquiry form) and Contact.
- **Built in this version and still used today:** the `content/` folder for all copy, the fact
  status system (`confirmed`, `sourced`, `pending`), the inquiry API with its honest "not live
  yet" message, the sitemap, robots file and share image.
- **Why it changed:** it read as AI-generated. It had no real photography, and the small labels,
  hairline rules and numbered sections are patterns AI tools reach for by default.

## Design demos A to D

Four standalone HTML homepages made to compare directions before rebuilding. The originals were
deleted before being committed. They were rebuilt from the session that made them and are kept
in [`designs/demos/`](designs/demos/index.html).

- **A. Editorial Magazine:** v1 refined with a drop cap, pull quotes and a lead story with
  smaller cards.
- **B. Civic Record:** a Swiss grid with a sticky numbered contents list and facts in ruled tables
  with footnoted sources. EB Garamond and Lato.
- **C. Cinematic Story:** dark, chapter-by-chapter scrolling like the film, with letterboxed
  frames, film grain and a filmstrip of Reels. Cormorant Garamond and Inter.
- **D. Bold Manifesto:** oversized condensed type, one statement per screen and a giant "23".
  Inter Tight and Newsreader.
- **Why they were dropped:** they were judged AI-generated and repetitive. Their directions came
  from a design plugin; later work used real reference sites instead.

## v2: Green cutout hero (`bbd2d87`)

A full rebuild of the look, keeping the content, form and SEO files from v1.

- **Look:** a deep green stage with grain and warm light from above, cream type and an ochre
  accent. Archivo (condensed black for display) with Instrument Serif italic for single words.
  Rounded cards and a floating pill navigation.
- **Hero:** a giant "SHIROORKAR" sized to fill the screen width, with a transparent PNG cutout of
  Udaykumar standing in front of it (a silhouette until the real photo is added). Letters rise on
  load, and the name and figure move at different speeds on scroll and with the mouse.
- **Homepage:** a sentence that brightens word by word, count-up figures (23 / 26 / 1), story
  chapters as stacking cards (The ward, The workers, The film, The work today), a pinned sideways
  Reels section, a press marquee, a programme list with a cursor preview and a large closing call
  to action.
- **Motion:** Motion for animation and Lenis for smooth scrolling. Every effect switches off when
  the reader's device asks for reduced motion.
- **Why it changed:** the homepage told mostly one story, the 23 workers and the film, when he has
  done more than that.

## v3: Work-led homepage (`55edb82`, branch `v3-work-led`)

Same design as v2, with the content rebalanced around all of his work. Not live yet: `main` was
kept on v2 by choice.

- **Research:** press coverage from 2017 to 2025 was gathered and added with sources: YourStory,
  Nagpur Today, DNA India, Mumbai Live, Prahaar, the film premiere report and a YouTube interview.
  The timeline now has real dates, and the SSC year is settled (the 2016-17 exams, results in June
  2017).
- **Homepage:** the 23 / 26 / 1 figures are removed. The opening sentence covers his whole career.
  "His story" became "His work", with one card per area: environment, public space, civic
  awareness, education and law. The film is mentioned once inside the education card and once in
  the press strip.
- **Hero line:** "Former BMC Assistant Commissioner, advocate and environmental worker. Known
  across Mumbai as the BMC's Singham."
- **Held back on purpose:** the 2019 Mumbadevi election run is stored as `pending` in
  `content/timeline.ts`, so it does not appear on the public site until the family decides. A
  headline claim about Dawood Ibrahim-linked demolitions is left out entirely until the family
  confirms it.

## v4: Story pattern (`593af86`)

Built on v2 after going back from v3.

- **Hero:** the giant word became UDAYKUMAR, with Shiroorkar as the wordmark. The bottom-right Instagram card and button were removed.
- **Homepage:** the 23 / 26 / 1 figures went. Each story became a sentence that lights up on scroll, followed by stacking cards. The four stories were Second chances, Public space, Clean city and Nisarg Rakshak.
- **Interviews:** a carousel of five YouTube interviews, one video at a time, autoplaying muted when scrolled into view.
- **Elsewhere:**
  - Navigation became one word each.
  - The Contact page folded into a lean Invite page.
  - The footer shrank to a single row.
- **Why it changed:** four identical card stacks felt repetitive.

## v5: A layout per story (current)

Same design as v4, but each story now has its own layout after its sentence:

- **Second chances:** a pinned sequence. The photo cross-fades while the step text changes beside it.
- **Public space:** giant neighbourhood names drift sideways and fill in green, followed by four facts.
- **Clean city:** a phone mid-call to the B Ward helpline, with the planned messages cycling.
- **Nisarg Rakshak:** a photo window that grows to fill the screen, with his title and Reels link over it.
