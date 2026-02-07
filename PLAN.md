# Valentine's Experience for Srusti Sain - Planning Document

## Context & Story Elements

### The Love Story
- **Where they met**: Northeastern University's Cabot Hall, Boston — during a Dandiya dance night
- **Her nicknames**: Kuttu Paapu, Chinnu Munnu, Bangaara
- **What's next**: Trip to NYC to Ken & Dana's store to look at engagement rings

### Her Favorites
- **Flowers**: Pink/white roses, lilies
- **Colors**: Lavender, pink, white
- **Music**: Anirudh Ravichander, Oswald
- **Activities**: Going out, eating, shopping, laughing, exploring new things

### Must-Have Features (All Ideas)
- "Will you be my Valentine?" question
- The "No" button that runs away from the cursor (can never be clicked)
- NYC / Ken & Dana's ring shopping reveal
- Photos of the couple throughout
- Anirudh/Oswald background music option
- Lavender + pink + white color palette
- anime.js powered animations

---

## Tech Stack (Shared)

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS v3
- **Animations**: anime.js v4 (`animejs` npm package)
- **Fonts**: Google Fonts (elegant serif + playful sans-serif)
- **Deployment**: Vercel (auto-deploy from repo)
- **Icons/Graphics**: Custom SVGs + emoji fallbacks

---

## Idea 1: "The Museum of Us"

### Concept
A virtual museum experience. Srusti walks through a dark, elegant gallery hallway using horizontal scroll. Framed photos hang on textured walls, each with a brass nameplate caption. Ambient lavender lighting glows from hidden spotlights above each frame. At the end of the hallway is a grand ornate frame with the Valentine question.

### User Flow
1. **Entrance**: A grand museum door with a brass plaque reading "The Museum of Us — A Curated Exhibition". Door creaks open with animation.
2. **The Hallway**: Horizontal scrolling gallery. Dark charcoal walls with subtle damask pattern. Each photo frame lights up as it enters the viewport — spotlight effect fades in from above.
3. **Frame 1 - "The Beginning"**: Photo from Dandiya night / early days. Caption: *"Cabot Hall, Northeastern. A Dandiya night that changed everything."*
4. **Frame 2 - "The Nicknames Gallery"**: A triptych frame showing three playful illustrations/photos, each labeled with a nickname — Kuttu Paapu, Chinnu Munnu, Bangaara.
5. **Frames 3-6**: Various relationship milestone photos with captions — trips, meals, laughs, adventures.
6. **Frame 7 - "Coming Soon"**: A veiled/covered painting with a small card: *"This exhibit continues in New York City..."* with a subtle ring icon.
7. **The Grand Frame**: Ornate golden frame, bigger than all others. Inside: "Will you be my Valentine?" with Yes/No buttons. The No button floats away when hovered. On Yes — the lights come up, confetti of rose petals fills the screen, a final message reveals: *"P.S. Pack your bags, bangaara. We're going ring shopping at Ken & Dana's, NYC."*

### Key Animations (anime.js)
- Door opening: `translateX` split animation on two door panels
- Spotlight fade-in: `opacity` + `scale` on spotlight overlay per frame, triggered by Intersection Observer
- Frame entrance: `translateY` + `opacity` stagger on frames as they enter viewport
- Nameplate text: Typewriter effect using `opacity` stagger on individual characters
- No button escape: `translateX` + `translateY` with `spring()` easing to random position
- Confetti: Particle system using anime.js timeline with staggered `translateY`, `rotate`, `opacity` on many small elements
- Petal fall: SVG rose petals with `translateY` + `rotate` + gentle `translateX` sway

### Visual Style
- **Background**: Dark charcoal (#1a1a2e) with subtle texture
- **Accent lighting**: Lavender (#E6E6FA) spotlight cones
- **Frames**: Gold (#D4AF37) ornate borders (CSS box-shadow + border-image)
- **Text**: Cream/off-white (#FFF8E7) serif font (Playfair Display)
- **Buttons**: Rose pink (#FF69B4) for Yes, gray for No

### Layout
- Horizontal scroll container (CSS `overflow-x: scroll` with snap points)
- Each "room" is `100vw` wide
- Mobile: Falls back to vertical scroll with same content

---

## Idea 2: "Dandiya Night to Diamond Ring"

### Concept
An origin-story-driven cinematic journey that begins where they began — Dandiya night at Cabot Hall. The experience opens with an animated Dandiya night scene (colorful sticks, swirling patterns, music) and transitions through chapters of their relationship, each with a different visual world. Ends with a transition from Boston skyline to NYC skyline, leading to the question.

### User Flow
1. **Opening Scene - "It Started with a Dance"**: Dark screen. Animated dandiya sticks cross and tap rhythmically. Colorful Navratri-style mandala patterns bloom outward from the center. Text fades in: *"Cabot Hall. Northeastern University. One Dandiya night."* Background: warm golden/orange tones. A play button for an Anirudh track.
2. **Chapter 1 - "The First Hello"**: Transition from Dandiya patterns to a softer scene. Photo(s) from their early days. Animated text: *"And just like that, I found my Kuttu Paapu."* Dandiya patterns subtly morph into heart patterns.
3. **Chapter 2 - "The Adventures"**: A photo collage that assembles itself piece by piece (anime.js stagger). Photos of them going out, eating, shopping, exploring. Each photo slides/rotates into place. Caption: *"Every day became an adventure with you."*
4. **Chapter 3 - "The Names I Call You"**: Three floating bubbles/cards, each containing a nickname. They orbit gently around a central heart. Clicking each reveals a reason/memory for that nickname.
5. **Chapter 4 - "Her Garden"**: A field of animated SVG roses (pink/white) and lilies grows from the bottom of the screen. Among the flowers, small photos peek out like hidden treasures. Lavender butterflies flutter across.
6. **Chapter 5 - "What's Next"**: Boston skyline silhouette on the left smoothly morphs (SVG morph via anime.js) into NYC skyline on the right. Text: *"From Boston to New York..."* A sparkling ring icon appears.
7. **The Question**: Full-screen lavender gradient. Elegant text: *"Srusti Sain, will you be my Valentine?"* The runaway No button. On Yes: Dandiya sticks return, but now they form a heart shape. Confetti explosion. Reveal card: *"NYC awaits us, bangaara. Ken & Dana's. Rings. Us."*

### Key Animations (anime.js)
- Dandiya sticks: `rotate` + `translateX/Y` with timeline for rhythmic crossing
- Mandala bloom: SVG paths with `scale` + `opacity` stagger from center outward
- Skyline morph: `svg.morphTo()` from Boston skyline SVG to NYC skyline SVG
- Flower growth: `scaleY` from 0 to 1 with `spring()` easing, staggered
- Butterfly flutter: `translateX/Y` with sinusoidal keyframes + `rotate` on wings
- Photo collage assembly: `translateX/Y` + `rotate` + `scale` stagger
- Nickname orbit: `rotate` on parent + counter-`rotate` on children for orbiting effect

### Visual Style
- **Ch.1**: Warm gold/orange Navratri palette → transitions to...
- **Ch.2-4**: Soft lavender + pink gradient backgrounds
- **Ch.5**: Sunset gradient (warm → cool) for Boston→NYC transition
- **Question**: Deep lavender (#7B68EE) to soft pink (#FFB6C1) gradient
- **Typography**: Mix of Playfair Display (elegant) + Dancing Script (playful/romantic)

---

## Idea 3: "The Infinite Love Letter"

### Concept
A vertical-scrolling love letter that unfolds endlessly. The page is styled like aged parchment paper. As Srusti scrolls, handwritten-style text appears as if being written in real-time (animated stroke). Interspersed between paragraphs are photos that develop like Polaroids (fade in from white). Pressed flowers (roses, lilies) are "pressed" into the margins of the letter. The letter starts with "Dear Kuttu Paapu," and ends with the Valentine question.

### User Flow
1. **The Envelope**: Screen shows a lavender envelope addressed to *"Kuttu Paapu"* with a wax seal. Tapping/clicking breaks the seal (crack animation) and the letter unfolds.
2. **"Dear Kuttu Paapu,"**: Handwritten text animates in stroke-by-stroke using SVG path animation. Gentle parchment texture background.
3. **Paragraph 1 - The Meeting**: *"Do you remember that Dandiya night at Cabot Hall? I do. Every detail..."* A Polaroid photo develops from white — a photo from that time.
4. **Paragraph 2 - The Names**: *"I started calling you Chinnu Munnu. Then Bangaara. Because that's what you are — gold."* Pressed lavender flowers appear in the margin.
5. **Paragraph 3 - The Favorites**: *"I know you love your pink roses and lilies, your Anirudh songs on repeat, your shopping adventures..."* Small animated icons float in the margins (roses, music notes, shopping bags).
6. **Paragraph 4 - The Future**: *"And now, we're going to New York. To Ken & Dana's. To look at something... sparkly."* A ring doodle appears in the margin, drawn stroke-by-stroke.
7. **The Closing**: *"But before all that, I need to ask you something..."*
8. **"Will you be my Valentine?"**: Large, beautiful calligraphy. Yes/No buttons styled as wax seals. The No seal crumbles and rolls away when approached. On Yes: Rose petals rain from the top, the letter folds itself into a heart shape.

### Key Animations (anime.js)
- Wax seal break: `scale` + `opacity` + `rotate` fragment explosion
- Handwriting: SVG text paths animated with `svg.createDrawable()` stroke animation
- Polaroid develop: `opacity` transition from white overlay, with slight `rotate` wobble
- Pressed flowers: `opacity` + `scale` fade-in at scroll positions
- Margin doodles: SVG line drawing animations
- Letter fold to heart: Complex `transform` sequence on letter sections
- Floating icons: `translateY` + subtle `translateX` oscillation with `alternate: true`

### Visual Style
- **Background**: Parchment texture (#F5E6D3) with subtle aging effects
- **Text**: Dark brown (#3E2723) in a handwriting font (Caveat or Dancing Script)
- **Flowers**: Watercolor-style SVGs in pink, white, lavender
- **Polaroids**: White border, slight shadow, slight rotation
- **Accents**: Sepia (#704214), dried flower colors
- **Wax seal**: Deep red (#8B0000)

---

## Idea 4: "Srusti's Secret Garden"

### Concept
An interactive, magical garden that grows as Srusti scrolls/explores. The page starts as bare earth and a single seed (their first meeting). As she scrolls down, the garden comes to life — flowers bloom, paths form, memories appear as garden elements (photos in flower centers, messages on garden stones). The garden is lush with her favorites (roses, lilies, lavender). Hidden throughout are clickable elements that reveal memories, nicknames, and surprises. At the garden's heart is a gazebo with the question.

### User Flow
1. **The Seed**: Dark, earthy screen with a single glowing seed in the center. Text: *"Every love story starts with a single moment."* Scroll prompt appears. A music toggle for Anirudh plays softly.
2. **Sprouting**: As user scrolls, a stem grows upward from the seed (SVG path drawing animation). Small leaves unfurl. Text on a garden stone: *"Cabot Hall. Dandiya Night. The moment I saw you."*
3. **First Bloom**: The stem produces a single pink rose that blooms open (petal-by-petal SVG animation). A photo appears in the rose's center. Around it, grass grows outward.
4. **The Garden Grows**: More flowers spring up with continued scrolling — lilies, lavender bushes, white roses. Each major flower contains a memory photo or message. Garden stones appear with text:
   - Stone 1: *"My Kuttu Paapu"*
   - Stone 2: *"My Chinnu Munnu"*
   - Stone 3: *"My Bangaara"*
5. **The Path**: A cobblestone path forms through the garden (stones animate in one by one). Butterflies and fireflies float around. The path winds through arches of flowers.
6. **The Wishing Well**: A small wishing well appears beside the path. Clicking it reveals: *"I wished for someone like you. The universe gave me someone better."*
7. **NYC Signpost**: A wooden signpost pointing right: *"New York City → Ken & Dana's →"* with a tiny diamond icon. Sparkle particles around it.
8. **The Gazebo**: A beautiful garden gazebo covered in climbing roses. Inside: *"Srusti Sain, will you be my Valentine?"* The Yes button is a blooming flower. The No button is a weed that gets pulled out by animated garden gloves whenever she tries to click it. On Yes: The entire garden erupts in a bloom explosion — hundreds of flowers bloom simultaneously, fireflies swarm into heart shapes, and a banner unfurls: *"She said YES! NYC, here we come!"*

### Key Animations (anime.js)
- Seed glow: `scale` + `opacity` pulse with `alternate: true, loop: true`
- Stem growth: `svg.createDrawable()` path drawing animation, scroll-linked
- Flower bloom: Timeline — petals `scale` + `rotate` from center, staggered
- Grass spread: Many small blades with staggered `scaleY` from 0 → 1 with `spring()`
- Butterflies: Complex `translateX/Y` keyframe paths + wing `scaleX` flutter
- Fireflies: `opacity` pulse + random `translateX/Y` drift
- Garden stones: `translateY` + `opacity` (rise from ground)
- Cobblestone path: Staggered `scale` + `opacity` on each stone
- Weed pull (No button): `translateY` downward + `scaleY` to 0 + dirt particle burst
- Bloom explosion: Massive stagger on all flower elements, `scale` + `rotate` + `opacity`

### Visual Style
- **Background gradient**: Deep earth (#2D1810) at bottom → sky blue (#87CEEB) at top, transitioning as garden grows
- **Flowers**: Realistic-ish SVGs in pink (#FFB7C5), white (#FFFFFF), lavender (#B57EDC)
- **Garden stones**: Warm gray (#808080) with engraved-style text
- **Path**: Cobblestone brown (#8B7355)
- **Gazebo**: White (#FFFFFF) with climbing pink roses
- **Fireflies**: Warm yellow (#FFD700) with glow effect
- **Typography**: Playfair Display for headers, Lora for body text

---

## Comparison Matrix

| Feature | Museum of Us | Dandiya to Diamond | Infinite Love Letter | Secret Garden |
|---|---|---|---|---|
| **Scroll Direction** | Horizontal | Vertical (sections) | Vertical (continuous) | Vertical (continuous) |
| **Origin Story** | One frame | Central theme | Letter paragraph | First seed/bloom |
| **Visual Complexity** | Medium | High | Medium | Very High |
| **Emotional Arc** | Gallery walk → surprise | Cultural journey → future | Intimate letter → question | Nature metaphor → bloom |
| **Interactivity** | Click frames | Click chapters | Scroll + click | Click discoveries |
| **Mobile Friendly** | Good (fallback to vertical) | Great | Excellent | Good |
| **Photo Integration** | Framed on walls | Collage + scenes | Polaroids in letter | Inside flowers |
| **"No" Button Gag** | Floats away | Dandiya sticks chase it | Wax seal crumbles | Weed gets pulled |
| **NYC Reveal** | Veiled painting + final | Skyline morph | Letter paragraph + doodle | Signpost + gazebo |
| **Estimated Build Time** | Medium | High | Medium | High |
| **Uniqueness** | Classic & elegant | Culturally personal | Intimate & heartfelt | Whimsical & magical |
| **anime.js Showcase** | Spotlights, stagger | SVG morph, timelines | Stroke drawing | Everything — full showcase |

---

## Next Steps

1. **User picks their favorite (or a hybrid)**
2. Scaffold Next.js project with Tailwind + anime.js
3. Collect photos from user (or use placeholder slots)
4. Build out the chosen experience
5. Test on mobile + desktop
6. Deploy via Vercel

---

*Plan created for the Valentine's Day experience for Srusti Sain.*
*Tech: Next.js 14 + Tailwind CSS + anime.js v4*
*Target: Vercel auto-deploy*
