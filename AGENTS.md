# PROJECT KNOWLEDGE BASE

**Generated:** 2026-06-29 22:51:41 KST
**Commit:** bf1dc39
**Branch:** main

## OVERVIEW
Single-page Korean landing site for a regional economy-study recruitment funnel.
Stack is Vite 6, React 19, TypeScript strict mode, Tailwind 3, Framer Motion, react-hook-form, and EmailJS.

## STRUCTURE
```
studyRecruitNotice/
├── src/App.tsx                 # ordered one-page section composition
├── src/main.tsx                # Vite React bootstrap
├── src/index.css               # global scroll, typography, word-break rules
├── src/components/             # landing sections + shared inline SVG icons
├── src/data/content.ts         # central Korean copy and typed content model
├── public/img/                 # hero, study, atmosphere, instructor assets
├── tailwind.config.js          # project colors and Pretendard font token
├── Dockerfile                  # Node build -> nginx runtime
└── package.json                # npm scripts; no lint/test script
```

## WHERE TO LOOK
| Task | Location | Notes |
|------|----------|-------|
| Page order or section presence | `src/App.tsx` | No router; sections are stacked directly. |
| Korean copy, CTA labels, options | `src/data/content.ts` | Most components read this object; keep shape changes type-safe. |
| Form behavior and outbound submit | `src/components/CTA.tsx` | Only network action; calls EmailJS directly from the client. |
| Visual theme tokens | `tailwind.config.js` | Use `primary`, `accent`, `bg`, `txt`, and `pretendard`. |
| Global Korean line wrapping | `src/index.css` | `word-break: keep-all` and `whitespace-pre-line` are deliberate. |
| Hero and gallery images | `public/img/hero`, `public/img/study` | `HowItWorks` expects `study-01.jpeg` through `study-16.jpeg`. |
| Container deploy path | `Dockerfile` | References `nginx/default.conf`, which is currently absent. |

## CODE MAP
| Symbol / File | Type | Location | Refs | Role |
|---------------|------|----------|------|------|
| `App` | component | `src/App.tsx` | entry | Top-level page order. |
| `content` | data object | `src/data/content.ts` | 12 component imports | Copy and structured content source. |
| `SI_DO_OPTIONS` | const | `src/data/content.ts` | CTA form options | Shared Korean region selector values. |
| `CTA` | component | `src/components/CTA.tsx` | `App` | Recruitment form and EmailJS submission. |
| `Icon` | component | `src/components/Icon.tsx` | section cards | Local inline SVG registry keyed by content data. |
| `studyImages` | local data | `src/components/HowItWorks.tsx` | image gallery | Derives paths from numbered public assets. |

## CONVENTIONS
- Keep copy-driven changes in `src/data/content.ts` first; components should stay mostly presentation and mapping logic.
- Preserve newline-bearing Korean strings and `whitespace-pre-line` consumers; removing embedded `\n` changes layout.
- Tailwind classes use project theme tokens rather than raw one-off colors when matching the existing design.
- TypeScript is strict with `noUnusedLocals`, `noUnusedParameters`, and `noFallthroughCasesInSwitch`; unused imports fail the build.
- There is no API layer. Client form submission uses hardcoded EmailJS service/template/public key constants in `CTA.tsx`.
- Assets in `public/img` are addressed by absolute browser paths such as `/img/hero/hero-main.jpg`.

## ANTI-PATTERNS (THIS PROJECT)
- Do not edit `.codegraph/` or `.omx/` as application source; they are generated/tooling state.
- Do not assume tests exist. There is no test runner config or `npm test` script.
- Do not trust Docker builds until `nginx/default.conf` exists or the Dockerfile is changed.
- Do not rename the numbered study images without updating `HowItWorks.tsx`.
- Do not add env-variable usage without adding the matching Vite `VITE_` contract and documentation.

## UNIQUE STYLES
- Warm light background `#F9F7F3`, green primary, amber accent, and Pretendard typography define the page.
- Components use Framer Motion `whileInView` reveals and hover/tap motion on CTAs and image cards.
- Korean text intentionally avoids mid-word breaks via global CSS.
- Icons are locally implemented inline SVGs, not from an icon dependency.

## COMMANDS
```bash
npm run dev
npm run build
npm run preview
```

## NOTES
- `index.html` still references `/vite.svg`, but `public/vite.svg` is absent.
- `package-lock.json` is present; use npm workflows.
- No `.env` or `.env.example` exists, and source currently does not read `import.meta.env`.
- `.codegraph/codegraph.db` is present for local code-index state; keep it out of app reasoning unless explicitly inspecting tooling.
