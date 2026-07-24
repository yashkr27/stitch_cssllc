# CSSllc Landing Page — Design Spec

Reference design source: Stitch-generated screens (`desktop.png`, `mobile.png`).
Scope: **Landing page only.** Plain HTML / CSS / vanilla JS. No frameworks, no build tools.

---

## 1. Brand & Visual Language

- **Mood:** Dark, minimal, editorial software-agency aesthetic (Norma-inspired).
- **Background:** Near-black charcoal (`#1A1A1A`–`#212121` range).
- **Text:** Off-white / warm white for headings, muted gray for body copy.
- **Accent:** Warm taupe / stone tone used on primary CTAs and icon backgrounds.
- **Typography:** Clean sans-serif. Large, bold, tight-tracked headlines; smaller uppercase tracked labels for section eyebrows (e.g. "SERVICES").
- **Shape language:** Fully rounded pill buttons, soft-rounded card corners, thin 1px borders on cards (no heavy shadows/gradients).
- **Imagery:** Moody, desaturated photography (workspace/desk scenes on desktop, landscape/night scene on mobile) with dark overlay for text legibility.

---

## 2. Desktop Layout (source: `design/desktop.png`)

### 2.1 Navbar (sticky)
- Left: "Computer Software Solutions LLC" wordmark (two-line stacked on smaller widths)
- Center/Right: nav links — About, Services, Case Studies, Blog
- Right: pill-shaped "Get in Touch" CTA button (filled, taupe)

### 2.2 Hero
- Full-width dark photo background (office desk / workspace)
- Headline: **"Small Team, Big Ideas."**
- Subtext: "We build custom software solutions that empower your business."
- Two CTAs side by side:
  - "View Our Work" — filled pill
  - "Let's Talk" — outlined pill

### 2.3 Trusted By strip
- Label: "Trusted By"
- 5 grayscale-style logos + names: Apex Innovations, Vertex Systems, Nebula Technologies, Core Dynamics, Strata Solutions
- **Action item:** swap placeholders for CSSllc's real client/portfolio names if available

### 2.4 Our Services (grid)
- Section title: "Our Services"
- 4-column card grid (desktop) — icon, title, one-line description
- Base cards shown: Android Development, iOS Development, Web Development, UI/UX Design
- **Extend grid** using same card style to cover CSSllc's full service list: Internship Program, Skill Development, Video Editing, Graphics Designing, Growth Analyst, Technical Support

---

## 3. Mobile Layout (source: `design/mobile.png`)

> Note: mobile design has a different structure/emphasis than desktop — build it from this spec directly, not as a shrunk desktop layout.

### 3.1 Top bar
- Hamburger icon (left) · "CSS LLC" wordmark (right)

### 3.2 Hero
- Full-bleed moody landscape/night photo background
- Headline: **"Computer Software Solutions LLC"**
- Subtext: "Crafting Digital Solutions. Grounded in Reality."
- Single pill CTA: "Our Services"

### 3.3 Services
- Section title: "Services"
- Stacked full-width cards: icon thumbnail + title + description
  - Custom Development
  - Cloud Integration
  - UI/UX Design
- Pill button: "Our Services"

### 3.4 Process — "We See What Others Don't"
- Vertical timeline with icon nodes connected by a line
- Steps in order: Discover → Architect → Build → Refine

### 3.5 Portfolio
- Section title: "Portfolio"
- Horizontally scrollable cards: image thumbnail + project title + subtitle
  - e.g. "Vick'd Project — Recent Project", "Recent Collection — Recent Project"

### 3.6 Team
- Section title: "Team"
- Row of circular avatar photos, name + role beneath each

### 3.7 Contact / Footer
- Contact block: phone, email, address
- Social Links block: Facebook, Twitter/X, YouTube, Instagram icons
- Touch-friendly button sizing throughout (44px+ tap targets)

---

## 4. Responsive Behavior

- **Mobile-first build.** Base styles = mobile design. Desktop overrides via media query.
- Breakpoint guidance:
  - `< 768px` → mobile layout (per `design/mobile.png`)
  - `≥ 1024px` → desktop layout (per `design/desktop.png`)
  - `768px–1024px` (tablet) → bridge breakpoint; interpolate spacing/grid columns, default toward mobile structure with 2-column service grid
- Nav collapses to hamburger below desktop breakpoint
- Services grid: 1 column (mobile) → 2 columns (tablet) → 4 columns (desktop)
- Portfolio: horizontal scroll (mobile) → static grid (desktop)

---

## 5. Content Mapping (old site → new design)

| New design section | Existing CSSllc content to reuse |
|---|---|
| Services | Android/iOS/Web Dev, Internship Program, Skill Development, Video Editing, Graphics Designing, Growth Analyst, Technical Support (descriptions from current site) |
| Process | New section — no direct old-site equivalent; use existing "Planning / Mockup / Develop / Provide" copy as closest match, relabeled Discover/Architect/Build/Refine if preferred |
| Portfolio | Existing portfolio images/titles (`folio-1.jpg`–`folio-6.jpg`, Review Probe Jobs + Play Store link) |
| Team | Existing team members: Sudeb Mitra (Founder+CEO), Lopa Mudra Banerjee (Manager), Hritik Singh, Sanmay Das, Swarnava Mondal, Anik Dutta |
| Contact | Existing phone numbers, emails, both addresses (Highlands Ranch CO + Bidhannagar Kolkata) |
| Social Links | Existing Facebook, LinkedIn, Instagram (add Twitter/YouTube placeholders only if agent decides to keep those icons) |
| Trusted By | Placeholder logos — replace only if real client logos are provided |

---

## 6. Tech Constraints

- **Stack:** Plain HTML, CSS, vanilla JS only — no frameworks, no preprocessors, no build tools
- **File structure:**
  ```
  index.html
  css/style.css   (or split: nav.css, hero.css, services.css, etc.)
  js/main.js
  design/desktop.png
  design/mobile.png
  ```
- JS handles: hamburger toggle, horizontal portfolio scroll, form validation, hover/scroll interactions (no jQuery)
- Semantic HTML5, accessible markup (alt text, heading hierarchy, visible focus states)
- Images: `loading="lazy"`, compressed/appropriately sized
- No inline styles or inline JS
- Preserve existing functional behavior: contact form submission, external links, mailto/tel links

---

## 7. Open Items / Assumptions to Confirm

- [ ] Replace "Trusted By" placeholder logos with real clients, or drop the section
- [ ] Confirm whether "Case Studies" and "Blog" nav items map to real pages or should be removed/hidden for now (landing-page-only scope)
- [ ] Decide final labels for process section (keep "Discover/Architect/Build/Refine" or align with old site's "Planning/Mockup/Develop/Provide")
- [ ] Confirm social platforms to link in footer (old site: Facebook, LinkedIn, Instagram — new design shows Facebook, Twitter/X, YouTube, Instagram)