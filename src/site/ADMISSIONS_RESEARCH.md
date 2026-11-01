# Admissions and college guide evidence

Reviewed 1 November 2026 (India time). This extends the owner's request for disciplines, degree durations, score-accepting colleges and national/Pune directories. Preserve the Discovery visual contract and the three academy programmes in PROGRAMMES.md. College degrees and academy preparation programmes are different information categories.

## Source hierarchy and maintenance

`admissions-sources.js` contains the public source links. `discipline-data.js` and `college-data.js` contain the reviewed facts; `CollegeGuides.jsx` and `DisciplineExplorer.jsx` render them. These are a dated editorial snapshot, not live admissions feeds. Preserve source editions in UI and review the relevant official publication before changing facts. Do not introduce prices, invented deadlines, placement promises, application guarantees, unsupported rankings or automatic score waivers.

Research used the connected Search service and official institute/exam sources. The NID and NIFT handbooks were also retrieved from their official linked PDF URLs and read locally when the search service could not fetch them. Local research copies remain outside the repository at `/tmp/dexam-admissions-research/`.

## NID 2027–28

Use the amended common handbooks, which supersede older academic landing pages:

- Integrated/B.Des handbook, printed pages 6–7 (PDF pages 11–12): 15 named disciplines in five streams for NID Ahmedabad, Gandhinagar and Bengaluru. Official award name: Professional Education Master of Design (Integrated Pathway), 5.5 years / 11 semesters. Do not promise two independent awards or a universal four-year exit that this handbook does not establish.
- M.Des handbook, printed pages 5–6 (PDF pages 11–12): 22 specialised disciplines across those three campuses. These include Design Trends and Futures and Design Education. The duration is 2.5 years; Design Education has additional eligibility rules. Photography is listed at Ahmedabad, Textile at Gandhinagar and New Media at Bengaluru in this edition, despite older academic pages showing other locations.
- Amendment dated 24 September 2026: MP integrated fields include Design for Moving Images; Haryana integrated fields include Product Design & Innovation, Strategic Communication Design, Digital Experience & Interaction Design, Textile Innovation & Material Design, and Fashion, Apparel & Lifestyle Design.
- Amended M.Des handbook, PDF page 3: MP lists Experience Design, Design for Care and Textile Design. Haryana's 29 September amendment lists Digital Design Futures and Creative Leadership.
- The explorer contains 32 distinct NID field labels after combining overlaps across the common lists. An offer records institution, campus, study level and source. Streams are not presented as extra disciplines.
- Haryana's own integrated programme page lists 4-year B.Des, 5.5-year integrated and 2.5-year M.Des routes. Assam's site currently describes a four-year B.Des. The common handbook directs applicants to regional campus publications. Keep regional award/exit information campus-specific.

## Other disciplines and degree durations

- NIFT 2027 prospectus, programme overview (PDF page 12): B.Des and B.F.Tech are four years; M.Des, M.F.M. and M.F.Tech are two. The seven B.Des labels include Fashion Interiors. Campus availability and eligibility differ by programme.
- MIT ID's current course catalogue and individual pages document AI-Enabled Design, Immersive Media Design, Information Design & Data Visualization, and automotive sculpting. Automotive sculpting is shown as a postgraduate diploma here; avoid copying the catalogue's repeated generic B.Des/M.Des template blocks into a new degree claim.
- Srishti Manipal's primary programme pages document four-year B.Des routes in Creative and Applied Computation, Business Service and Systems Design, and Human Centered Design. The explorer adds these as examples beyond NID.
- UCEED 2027 brochure: seven participating institutions, including IIT Indore; four-year B.Des, and IIT Bombay's five-year dual-degree option with an internal shift at the end of year three. Distinguish exam registration, joint allocation and institute eligibility.
- CEPT's 26 October 2026 announcement accepts UCEED 2027 or NID DAT 2027 for a five-year B.Des (Hons.). It says the CEPT application schedule will be announced separately. Its old exam registration dates are superseded by any exam-office updates, so those dates are not reproduced here.
- CEED is a postgraduate entrance route; duration is institute-specific. IDC's taught M.Des structure provides a two-year example. Research routes may differ.
- CoA/NATA 2026 and JEE Advanced/JoSAA 2026 are the verified architecture entry sources. B.Arch is five years. IIT architecture requires JEE Advanced and AAT; NIT/SPA architecture uses JEE Main Paper 2A through the applicable allocation process. Do not label the entire national rank list as NATA-accepting or imply verified 2027 architecture notices.

## National and Pune directories

- Design India: an alphabetical editorial shortlist of 20 campuses/institutions, selected for published undergraduate/integrated design offerings, identifiable admission routes, geographic coverage and public/private variety. There is no ordinal quality rank. It includes all seven UCEED 2027 participating institutions. NID Ahmedabad's extension campuses remain one institutional entry.
- Pune design: ten entries across Pune, PCMC and the wider district. RT-MSSU is government-established and explicitly lists a Pune design option. MIT ADT, MIT-WPU and MITAOE are distinct institutions. The DPU Tathawade listing is distinct from ADYPU Lohegaon and DY Patil University Ambi. Public-university affiliation does not imply government ownership.
- Architecture India: reproduce ranks 1–20 from the official NIRF **2025** Architecture and Planning table. The search service returned the full official indexed table when NIRF's live site returned HTTP 403. A 2026 table was not verified; do not call this a 2026 ranking or an undated latest ranking. NIRF evaluates Architecture and Planning at institution level, not admissions eligibility or only the B.Arch course.
- Pune architecture: five unranked local choices selected for a published B.Arch offering, location and primary information: BKPS, BNCA (women), Bharati Vidyapeeth, Sinhgad and DY Patil Akurdi. BKPS is government-aided per Maharashtra CET Cell's 2025 seat matrix, not government-run. The Bharati admission reference available in this research is 2025 and is labelled accordingly. Link the CoA approval directory for current recognition checks.

## Score acceptance and uncertainty

Current source-backed examples: CEPT, MIT-WPU, FLAME, DES Pune University and Woxsen have 2027-labelled information. Jindal and Vishwakarma have published policies whose intake must be confirmed. MITAOE's verified notice names 2026; preserve that year. Only mark an institution as accepting a test if its linked programme policy supports that test.

MIT-WPU still requires its drawing test, PI and portfolio with alternative scores. FLAME describes an FDAT exemption with accepted national scores, while retaining other selection requirements. A scholarship reference does not establish an admission-test waiver.

Anant's 2027 process diagram mentions ADEPT/UCEED, while its note calls ADEPT mandatory and refers to UCEED scholarships. The guide calls out the conflict and asks for direct clarification rather than publishing a waiver.

The UCEED **2027** brochure's result-sharing page is explicitly labelled **UCEED 2026**. Its selected historical examples are shown in a separate disclosure and must not be relabelled as verified 2027 policies. MIT ID Pune's 2027 process publishes MITID DAT and studio/interview stages; do not infer a UCEED/NID exemption from another MIT-branded institution.

## Verification

Run the build, `check:site`, assessment model tests, `node --test src/site/admissions.test.mjs` and the browser release suite. Preserve static HTML, unique metadata, canonical links, sitemap inclusion, mobile wrapping, keyboard disclosures/filters and visible source links. Research regression checks cover catalogue counts, NID level/campus assignments, ranking order, source references, ownership and historical score-policy labels.
