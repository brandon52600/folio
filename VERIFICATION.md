# Template Studio verification — 2026-09-08

The current product is a blank PDF generator. Earlier encounter-storage tests are retained separately under `legacy/` and do not describe the current user interface.

## Passed

- TypeScript compilation and production build.
- Catalog checks: 60 distinct IDs across 15 systems; unique complaint question, ROS and examination outlines; eight interview prompts and at least ten ROS items / six examination prompts per outline; reference metadata present.
- All 120 standard combinations (60 complaints x Letter/A4) generated, re-opened with pdf-lib, and checked for expected three-page count and drawing bounds. No AcroForm fields exist: these are intentionally blank handwriting/annotation templates.
- Representative Letter three-page and A4 four-page PDFs exported. All seven pages rendered using Poppler and visually inspected for clipped text, overlapping content, missing glyphs, writing space, checkboxes, headers, footers and page numbers.
- Isolated headless Chrome: no password fields, no clinical textareas; 60 complaint cards; specialty/system filters and search; selecting a complaint changes its preview; A4 and an extra page produce the expected named four-page PDF, parsed from the actual browser download.
- Preview pagination works; empty search results and reset work.
- Networking disabled: cached app reloads, prepares and downloads a valid three-page PDF without server access. Entry query string is supported offline.
- No IndexedDB databases created in the new isolated context, no remote requests, and no JavaScript page errors during the workflow.
- Desktop and 390px mobile views captured and inspected; mobile has no horizontal overflow.

## Limits

No clinical validation, independent security audit, exhaustive cross-browser or printer testing, comprehensive accessibility audit, or guarantee of compatibility with every third-party annotation app. Outlines are educational drafts pending qualified review. Printed output depends on paper/scaling settings. Preview uses the PDF's layout coordinates and font measurements but browser font rasterization can differ slightly from the PDF reader. Existing encrypted data from the former scratchpad is not read or deleted by this release.

Final regression passed after moving Download PDF above the page preview, adding direct specialist filters, and ensuring system/specialty changes select a matching template. The app rebuild and TypeScript check also passed.

## Current labeled-HPI update

All 60 templates follow the requested subjective sequence. The HPI uses concise labels in the user's mnemonic order, with 54 short answer blanks across two pages, including 12 complaint-specific items. All 120 paper-format combinations passed with five standard pages; optional writing space adds a sixth. Tests verify label coverage, ordering, drawing bounds, and absence of conversational question marks in HPI. Both representative PDFs were rendered and all eleven pages visually inspected. TypeScript, production build, browser PDF-download tests, and offline export passed. Earlier page and question counts above describe prior layouts and are superseded.

## Expanded catalog verification

90 unique templates across 15 systems, including exactly one general template per system. All 180 Letter/A4 combinations pass PDF generation, page count, label coverage, and drawing-bound checks. Representative new general reproductive and anticoagulant outlines rendered and visually checked across all ten pages. TypeScript and production build pass. Browser regression confirms 90 cards, six templates per system, search, downloads, offline export, mobile width, and no runtime errors or remote requests.

## General specialty verification

Added 21 broad specialty visits (111 total templates). Exactly one template per selectable specialty; tests verify specialty scoping, general history fields, and PDF headings. All 222 Letter/A4 combinations pass; all six PDF tests, TypeScript, production build, and browser/offline regression pass. Browser verification includes automatic selection of the general Pediatrics template. The five-page Family medicine PDF was rendered and visually inspected.

## Ten additional complaints per specialty

The catalog now contains 321 templates, including 210 additions: exactly ten per each of 21 specialties. Seven PDF/catalog tests pass, including uniqueness within a specialty, absence of duplicate titles against existing specialty templates, 54 HPI labels, eight associated symptom items, six exam components, specialty scoping, and all 642 Letter/A4 combinations. TypeScript and production build pass. Browser regression verifies 321 cards, specialty filtering, previews, and offline download of the new Low platelet count template with its specialty-specific filename; no runtime errors or external requests. Fifteen representative PDF pages were rendered and inspected; the corrected pediatric attention ROS page was re-rendered after content refinement. Primary-care and emergency complaints now map to their relevant body systems. Common-practice selections are not a validated frequency ranking or clinically validated assessment protocol.

## Differential reminder update

All 321 templates render 5–10 diagnostic reminders, with complaint-level lookup coverage and broad lists only for general templates. Eight tests pass, including exact rendered diagnosis coverage and all 642 Letter/A4 combinations. Standard page count is six; extra writing produces seven. TypeScript and production build pass. Updated browser regression passes PDF download, page preview, mobile, and offline export. New objective and assessment/plan pages were rendered and visually reviewed in Letter and A4. Diagnostic likelihoods are not calculated and clinical validation remains pending.

## Specialty landing page

Landing page now displays 22 icon tiles (21 specialties and All specialties) with a top search field. Selecting a specialty opens its template library; search opens matching results; the Specialties button returns to the grid. Desktop and 390px mobile screenshots visually inspected, with no overflow. Production build, TypeScript, browser filtering, preview, PDF download, and offline search/export checks pass.

## AI creator verification

Added a 23rd landing tile and a dedicated chief-complaint/specialty creation flow. Backend tests pass for structured Responses API payloads, duplicate detection before calling the provider, missing credentials, refusal handling, malformed output rejection, and generated PDF export. Browser tests with an explicitly mocked provider response pass creation, draft review, saving, six-page PDF download, clearing the request key, and restoring the saved template offline. Existing library regression passes. Creation UI screenshot inspected. Production build and TypeScript pass. No live OpenAI call was made: an API key is still required for live generation, and clinical output quality is not validated by fixture tests.

## Reference sheets tab

Six source-linked reference sheets generate twelve valid single-page Letter/A4 variants. Text width and content checks pass. All six sheets rendered and visually inspected. Browser tests pass tab navigation, template access, six sheet cards, preview, A4 download, offline download, and mobile width. TypeScript and build pass.

## Quick Look

Template and reference cards offer independent Quick Look buttons. Native modal dialog supports Escape, focus restoration, page selection, previous/next navigation, 50–300% zoom, and fit-width reset. Browser test passes both document types, zoom sizing, six-page navigation, preserving selection, offline use, and mobile width. Desktop/mobile modal screenshots inspected.

## Applicable subjective parameters
HPI counts now vary by complaint, superseding earlier fixed 54-item statements. Psychiatry excludes pain quality, region, and radiation; relevant pain/localized complaints retain applicable parameters. Exposure/context prompts also vary. All nine PDF tests pass across 321 templates and both paper sizes, including applicability assertions. TypeScript passes; the Low mood PDF was rendered and visually checked.

## Complaint relevance across the catalog
Focused complaints no longer inherit blanket system ROS or appended specialty history. The 210 expanded templates retain their authored symptom lists and explicit pediatric ROS overrides; general visits retain broad review. Pain/localization now depend on the complaint rather than its system, follow-up and abnormal-result prompts omit symptom provocation/severity groups, and travel/exposure prompts use authored complaint context. Ten PDF tests pass across all 642 paper/template combinations; TypeScript and production build pass. These checks establish rendering and selection behavior, not clinical validation.

## Correction: restore pain and related symptom dimensions
Supersedes the previous title-based applicability rules and removal of follow-up symptom groups. All 265 distinct focused chief complaints (285 catalog entries) now have explicit pain applicability metadata; 36 general visits use conditional pain assessment. All symptom dimensions are retained for primary/conditional pain, including quality, region, radiation, palliative/provoking factors, setting, severity, and timing. Nonpain psychiatric outlines keep their authored HPI and symptom lists. The 321-entry audit is in docs/pain-applicability-audit.csv.

20 tests pass, including every focused title having an explicit profile, physical pain cues not being excluded, 21 regression presentations with PDF-level field checks, generated metadata validation/persistence, and all 642 Letter/A4 exports. TypeScript and production build pass. Ankle injury and Gallstone consultation first pages were rendered and visually inspected. These are content consistency and software checks, not independent clinical validation or a guarantee of every possible clinical question.

## Full HPI reset
At user request, every template now includes the original full HPI groups and all six contact/travel/exposure fields. The PDF says "Complete each section if applicable; leave unrelated fields blank." Previous applicability classifications no longer control rendering. Complaint-specific history and symptoms remain.

## Static PWA and GitHub preparation

Removed the AI creation UI, restoration code, generation implementation, and API routes. The built-in library remains 321 templates and six reference sheets. Added scoped manifest/icons, install help, explicit service-worker update activation, offline navigation, a public-facing educational/privacy/liability notice, and guide/liability notices on every PDF page. Added portable Playwright tests, a Pages workflow, MIT license, environment example, and source-only ignore rules. The local Git repository is initialized on main; no remote is configured and nothing has been published.

All 12 PDF/catalog tests pass, including notice coverage on all templates and references. TypeScript and production builds pass. Real Chromium checks pass at both / and /folio/: icons/manifest paths, no AI endpoint or creation UI, installation help, update waiting and explicit activation, offline new-tab reopening, Quick Look, six-page download, and mobile-width layout. Template and reference notice layouts were rendered and visually inspected. Tests use a local installed Chrome via environment overrides; CI uses the declared Playwright dependency. Physical iOS/Android installation and the hosted GitHub Actions run remain unverified until a repository is published and devices are available.
