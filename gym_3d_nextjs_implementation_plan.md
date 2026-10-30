# Premium 3D Gym Website --- Implementation Plan

**Project:** Premium, cinematic gym / fitness website\
**Primary stack:** Next.js, TypeScript, React Three Fiber, Three.js,
GSAP\
**Scope:** Website-first implementation, with optional backend and admin
dashboard in a later phase.

------------------------------------------------------------------------

## 1. Project goals

Build a high-quality, responsive gym website that:

-   Creates a strong first impression through a cinematic 3D hero
    experience.
-   Clearly presents the gym, training programs, trainers, memberships,
    facilities, and contact details.
-   Converts visitors into enquiries, free-trial bookings, and
    membership leads.
-   Loads quickly and remains usable on mobile devices and lower-powered
    hardware.
-   Is easy to maintain, extend, and hand over to the client.

**Core principle:** Use 3D where it adds value. Do not make every
section a 3D scene. A focused 3D hero plus lightweight motion across the
rest of the site usually gives a better balance of impact, performance,
and maintainability.

## 2. Recommended technology stack

  -----------------------------------------------------------------------
  Area                    Technology              Responsibility
  ----------------------- ----------------------- -----------------------
  Framework               Next.js (App Router)    Routing, rendering, SEO
                                                  and application
                                                  structure

  Language                TypeScript              Safer, maintainable
                                                  application code

  3D rendering            Three.js                WebGL-based 3D
                                                  rendering

  React 3D integration    React Three Fiber       Build and manage 3D
                                                  scenes with React

  3D helpers              Drei                    Common helpers such as
                                                  controls, loaders and
                                                  environment components

  Animation               GSAP                    Timelines and
                                                  scroll-triggered
                                                  animation

  Scroll integration      GSAP ScrollTrigger      Scroll-based
                                                  transitions and reveals

  UI styling              Tailwind CSS or CSS     Responsive styling and
                          Modules                 design system

  Icons                   Lucide React            Consistent interface
                                                  icons

  Forms                   React Hook Form + Zod   Form state and
                                                  validation

  Image handling          Next.js Image           Responsive image
                                                  delivery

  Testing                 Playwright + Vitest     End-to-end and
                                                  unit/component testing

  Deployment              Vercel or client's      Production hosting
                          hosting                 
  -----------------------------------------------------------------------

Use compatible stable package versions at project setup and commit the
lockfile. Avoid upgrading major dependencies midway through
implementation without testing.

## 3. Website sitemap

### Public pages

1.  **Home**
    -   Cinematic 3D hero
    -   Gym introduction and key benefits
    -   Featured training programs
    -   Trainer highlights
    -   Membership preview
    -   Testimonials
    -   Gallery preview
    -   Free-trial / enquiry CTA
2.  **About**
    -   Gym story and mission
    -   Facilities and equipment
    -   Gym statistics
    -   Location and opening hours
3.  **Programs**
    -   Strength training
    -   Personal training
    -   Weight loss / fitness
    -   Cardio
    -   Functional training / CrossFit (only if offered)
    -   Program details and enquiry CTA
4.  **Trainers**
    -   Trainer profiles
    -   Expertise and certifications supplied by the client
    -   Training availability or enquiry CTA
5.  **Membership**
    -   Monthly, quarterly and annual plans
    -   Plan features and terms
    -   Free-trial / join enquiry
    -   Payment integration only if included in the agreed scope
6.  **Gallery**
    -   Gym interior and equipment
    -   Classes and events
    -   Transformation stories, only with written customer permission
7.  **Contact**
    -   Address, phone, email and opening hours
    -   Map
    -   Contact / free-trial form
    -   WhatsApp link

### Optional later scope

-   Admin dashboard
-   Lead management
-   Trainer and schedule management
-   Membership management
-   Online payments and receipts
-   Customer login and member portal

Do not build these optional modules until the client confirms the
requirements and budget.

## 4. Visual direction and design system

### Suggested visual direction

-   Background: near-black / charcoal
-   Main text: white
-   Secondary text: muted grey
-   Accent: one energetic color such as orange, lime, or red
-   Typography: bold display font for headlines; readable sans-serif for
    body text
-   Layout: spacious, strong grid, large photography, clear calls to
    action
-   Motion: purposeful, short, and consistent

Confirm the gym's logo, brand colors, photography, and preferred visual
style before finalizing the UI.

### Reusable design tokens

Create central CSS variables for:

-   Brand colors
-   Font families and type scale
-   Spacing scale
-   Border radius
-   Container widths
-   Shadows and overlays
-   Animation durations and easing

Build reusable components for buttons, section headings, cards,
navigation, form fields, and responsive containers.

## 5. 3D experience plan

### Hero scene

**Recommended first implementation:** one optimized GLB/GLTF model, such
as a fitness equipment object or a suitable athlete / gym-related 3D
asset with appropriate usage rights.

Hero behaviour:

1.  Display a strong headline and primary CTA in normal HTML.
2.  Render the 3D scene as a visual layer beside or behind the text.
3.  Add subtle pointer-based model rotation on capable desktop devices.
4.  Use a restrained camera movement or model reveal on initial load.
5.  Optionally connect a short GSAP timeline to the hero entrance.
6.  Keep the CTA and key message usable even if WebGL fails.

### 3D scene components

Suggested component boundaries:

-   `GymHeroScene`
-   `GymModel`
-   `SceneLighting`
-   `SceneEnvironment`
-   `SceneFallback`

Responsibilities:

-   Load the model with a suspense boundary.
-   Show a poster or static image while loading.
-   Handle load failures gracefully.
-   Keep the canvas isolated from unrelated page components.
-   Avoid unnecessary React state updates on every animation frame.

### Model asset workflow

1.  Source or commission a model with appropriate commercial usage
    rights.
2.  Prefer GLB/GLTF.
3.  Remove hidden or unnecessary geometry.
4.  Reduce polygon count where possible.
5.  Compress textures and use suitable texture dimensions.
6.  Consider mesh compression such as Draco or Meshopt where supported
    by the asset pipeline.
7.  Test the model on mobile hardware.
8.  Keep a static image fallback.

Do not assume a model is free for commercial use just because it is
downloadable.

### Scroll animation plan

Use GSAP and ScrollTrigger for selected HTML sections:

-   About: image and text reveal
-   Programs: staggered card entrance
-   Statistics: count-up animation
-   Trainers: subtle image reveal
-   Membership: pricing-card entrance
-   Gallery: controlled image reveal

Avoid pinning many sections or forcing long scroll-jacking experiences.
Native scrolling should remain natural.

### Motion accessibility

-   Respect `prefers-reduced-motion`.
-   Provide a reduced-motion experience.
-   Do not communicate essential information only through animation.
-   Ensure text and buttons remain readable and usable without WebGL.

## 6. Next.js architecture

Recommended App Router structure:

``` text
gym-website/
├── public/
│   ├── images/
│   ├── models/
│   ├── posters/
│   ├── icons/
│   └── fonts/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── programs/
│   │   │   └── page.tsx
│   │   ├── trainers/
│   │   │   └── page.tsx
│   │   ├── membership/
│   │   │   └── page.tsx
│   │   ├── gallery/
│   │   │   └── page.tsx
│   │   └── contact/
│   │       └── page.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── MobileMenu.tsx
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── AboutSection.tsx
│   │   │   ├── ProgramsSection.tsx
│   │   │   ├── TrainersSection.tsx
│   │   │   ├── MembershipSection.tsx
│   │   │   └── TestimonialsSection.tsx
│   │   ├── three/
│   │   │   ├── GymHeroScene.tsx
│   │   │   ├── GymModel.tsx
│   │   │   └── SceneFallback.tsx
│   │   ├── animation/
│   │   │   ├── Reveal.tsx
│   │   │   └── CountUp.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── SectionHeading.tsx
│   │       └── Container.tsx
│   ├── data/
│   │   ├── programs.ts
│   │   ├── trainers.ts
│   │   └── memberships.ts
│   ├── hooks/
│   ├── lib/
│   ├── schemas/
│   └── types/
├── .env.example
├── next.config.ts
├── package.json
└── README.md
```

Keep content data separate from presentation so that gym details can be
updated without editing complex UI components.

## 7. Rendering and client-component strategy

Next.js supports server and client components. Use that distinction
deliberately.

-   Keep page layouts, static content, metadata, and content sections as
    Server Components by default.
-   Mark interactive components with `"use client"` only where browser
    interaction is required.
-   Load the Three.js scene through a client-only dynamic import with a
    loading fallback if the selected setup requires browser APIs.
-   Keep GSAP setup inside client components and clean up ScrollTriggers
    and animations when components unmount.
-   Avoid converting the entire application into one large Client
    Component.

This keeps the JavaScript sent to the browser smaller and improves
maintainability.

## 8. Implementation phases

### Phase 0 --- Client discovery and asset collection

Collect and confirm:

-   Gym name and logo
-   Brand colors and preferred style
-   Address, phone, email and WhatsApp number
-   Opening hours
-   Programs and services actually offered
-   Trainer names, bios and approved photos
-   Membership prices, benefits and terms
-   Gym photography and videos
-   Domain and hosting ownership
-   Required languages
-   Form recipient and lead-handling process

**Deliverable:** approved sitemap, content checklist, visual reference,
and scope.

### Phase 1 --- Project setup

1.  Create the Next.js App Router project with TypeScript.
2.  Configure linting and formatting.
3.  Add styling and shared design tokens.
4.  Create the route structure.
5.  Build the header, footer, navigation, buttons, and containers.
6.  Add responsive breakpoints.
7.  Add placeholder content and image assets.

**Deliverable:** running responsive website foundation.

### Phase 2 --- UI design and homepage

1.  Implement the hero layout.
2.  Add headline, supporting copy, and CTA.
3.  Build About, Programs, Trainers, Membership, Testimonials, Gallery,
    and Contact sections.
4.  Create reusable cards and section components.
5.  Review the desktop, tablet, and mobile layouts.

**Deliverable:** complete static homepage with responsive UI.

### Phase 3 --- 3D hero

1.  Select and optimize a licensed 3D model.
2.  Create the React Three Fiber canvas.
3.  Add camera, lighting, environment, and model placement.
4.  Add model loading and error fallbacks.
5.  Add restrained pointer or camera interaction.
6.  Tune scene performance and mobile behaviour.

**Deliverable:** working 3D hero that degrades gracefully when WebGL is
unavailable.

### Phase 4 --- Motion and interactions

1.  Add GSAP timelines for hero entrance.
2.  Add ScrollTrigger reveals to selected sections.
3.  Add staggered card animations.
4.  Add count-up statistics if meaningful.
5.  Add menu, form, and CTA interactions.
6.  Implement reduced-motion behaviour.

**Deliverable:** polished motion system without excessive animation.

### Phase 5 --- Forms and lead capture

For a website-only first release, choose one agreed approach:

-   A form service, or
-   A small server-side Next.js route that validates and forwards
    enquiries, or
-   A NestJS backend if the project needs broader business logic.

Form fields may include:

-   Name
-   Phone number
-   Email (optional if the client agrees)
-   Interested program
-   Preferred visit date
-   Message

Requirements:

-   Validate on the server, not only in the browser.
-   Add spam protection and rate limiting.
-   Show success and failure states.
-   Collect only necessary personal information.
-   Clearly tell users how their enquiry will be used.
-   Test delivery to the correct gym email or CRM.

**Deliverable:** tested enquiry / free-trial lead flow.

### Phase 6 --- SEO, accessibility and optimization

-   Add page titles, descriptions, canonical URLs, and social metadata.
-   Generate sitemap and robots configuration.
-   Add meaningful image alt text.
-   Use semantic HTML and keyboard-accessible controls.
-   Check contrast and focus states.
-   Optimize images and fonts.
-   Lazy-load below-the-fold media and the 3D scene where appropriate.
-   Avoid loading large 3D assets before they are needed.
-   Measure Core Web Vitals and Lighthouse results.
-   Test on real mobile devices and slower networks.

**Deliverable:** production-ready, accessible and optimized site.

### Phase 7 --- QA and deployment

Test:

-   Every route and navigation link
-   Desktop, tablet, and mobile layouts
-   3D loading, failure, and fallback
-   Reduced-motion setting
-   Forms and enquiry delivery
-   WhatsApp and map links
-   Browser console and network errors
-   Image loading and broken assets
-   SEO metadata and sitemap
-   HTTPS, domain, and environment variables

Deploy to the agreed hosting provider, connect the client's domain, and
verify the live website.

**Deliverable:** live website and handover notes.

## 9. Performance strategy

The 3D hero is the largest performance risk. Treat it as an optional
enhancement, not a dependency for the website to function.

### 3D performance

-   Keep one main hero canvas rather than many independent canvases.
-   Use a model with an appropriate polygon and material budget.
-   Compress textures and geometry.
-   Limit real-time shadows and expensive post-processing.
-   Avoid unnecessary transparent layers.
-   Reduce pixel ratio on high-density screens if needed.
-   Pause or reduce rendering when the scene is not visible.
-   Use a static poster or image on unsupported or low-powered devices.
-   Avoid continuous animation when the scene is idle.

### General web performance

-   Use responsive image sizes and modern image formats.
-   Lazy-load below-the-fold images.
-   Avoid oversized video backgrounds.
-   Limit third-party scripts.
-   Use font subsets and avoid loading unnecessary font weights.
-   Keep client-side JavaScript limited to interactive areas.
-   Test with throttled network and CPU settings.

Do not promise a fixed Lighthouse score before testing the final
content, hosting, and 3D model.

## 10. Testing checklist

### Functional

-   [ ] All navigation routes work.
-   [ ] All CTA buttons go to the correct destination.
-   [ ] Contact form validates and submits.
-   [ ] Success and error messages display correctly.
-   [ ] WhatsApp link opens the correct number.
-   [ ] Map points to the correct gym address.

### Visual and responsive

-   [ ] No horizontal overflow on mobile.
-   [ ] Text is readable over imagery.
-   [ ] Images have suitable crops.
-   [ ] Cards and navigation adapt to small screens.
-   [ ] 3D canvas does not cover buttons or text.

### 3D and motion

-   [ ] Model loads successfully.
-   [ ] Loading state is visible.
-   [ ] Failure fallback works.
-   [ ] Reduced-motion mode works.
-   [ ] Scroll animations clean up correctly.
-   [ ] Mobile performance is acceptable.

### Production

-   [ ] Metadata and sitemap are correct.
-   [ ] No secrets are committed.
-   [ ] HTTPS is enabled.
-   [ ] Form endpoint has server-side validation and abuse protection.
-   [ ] Analytics and consent requirements are agreed with the client.

## 11. Suggested delivery schedule

Indicative schedule for one developer, assuming content and feedback
arrive on time:

  Workstream                                Estimate
  ------------------------------------- ------------
  Discovery and content collection        0.5--1 day
  Project setup and design foundation          1 day
  Responsive homepage and core pages       2--4 days
  3D model preparation and hero            2--4 days
  GSAP animation and interactions          1--2 days
  Forms, SEO and optimization              1--2 days
  QA, deployment and handover              1--2 days

**Indicative total:** approximately 9--16 working days. Custom 3D
modelling, complex scenes, delayed content, revisions, and additional
backend features can extend this timeline. Confirm the estimate after
reviewing the selected 3D asset and final scope.

## 12. Scope boundaries and client approvals

Before development, get written confirmation for:

-   Number of pages and revision rounds
-   Whether custom 3D modelling is included
-   Who supplies photography, video, and 3D assets
-   Whether membership purchase or only enquiry is required
-   Whether an admin dashboard is included
-   Hosting, domain, email, and third-party service costs
-   Maintenance period and post-launch support
-   Content ownership and asset licensing

Keep online payments, member accounts, class scheduling, and admin
management as separately estimated features unless included in the
signed scope.

## 13. Recommended development order

Build in this order to reduce risk:

1.  Confirm brand, content, pages, and scope.
2.  Set up Next.js and the shared design system.
3.  Finish the responsive homepage without 3D.
4.  Add the 3D hero as an isolated client component.
5.  Add GSAP animations progressively.
6.  Build the remaining pages.
7.  Implement and test enquiry capture.
8.  Optimize, QA, deploy, and hand over.

**First milestone:** a responsive homepage with the final visual
direction, a working hero layout, and one optimized 3D scene. Share this
milestone with the client for approval before expanding the rest of the
website.
