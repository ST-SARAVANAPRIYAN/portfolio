const frontImage = './src/assets/front.png'
const backImage = './src/assets/back.png'

const root = document.querySelector('#root')

if (!root) {
  throw new Error('Missing #root element')
}

root.innerHTML = `
  <div class="portfolio-root" id="appRoot">
    <div class="scroll-progress" id="scrollProgress"></div>
    <div class="theme-ripple" id="themeRipple" aria-hidden="true"></div>
    <div class="secret-toast" id="secretToast" aria-live="polite"></div>

    <header class="topbar">
      <a href="#home" class="brand" data-close-mobile="true">
        <span class="brand-name">Saravana Priyan</span>
        <span class="brand-sub">Portfolio</span>
      </a>

      <nav class="desktop-nav" aria-label="Main navigation">
        <a href="#home" class="nav-link">Home</a>
        <a href="#about" class="nav-link">About</a>
        <a href="#education" class="nav-link">Education</a>
        <a href="#skills" class="nav-link">Skills</a>
        <a href="#projects" class="nav-link">Projects</a>
        <a href="#certifications" class="nav-link">Certifications</a>
        <a href="#contact" class="nav-link">Contact</a>
      </nav>

      <div class="topbar-right">
        <div class="theme-switch" role="group" aria-label="Theme switcher">
          <button type="button" id="themeDarkBtn" class="active">
            Dark
          </button>
          <button type="button" id="themeSakuraBtn">
            Sakura
          </button>
        </div>

        <button type="button" id="mobileToggle" class="burger" aria-label="Toggle mobile menu">
          Menu
        </button>
      </div>
    </header>

    <nav class="mobile-nav" id="mobileNav" aria-label="Mobile navigation">
      <a href="#home" class="mobile-nav-link" data-close-mobile="true">Home</a>
      <a href="#about" class="mobile-nav-link" data-close-mobile="true">About</a>
      <a href="#education" class="mobile-nav-link" data-close-mobile="true">Education</a>
      <a href="#skills" class="mobile-nav-link" data-close-mobile="true">Skills</a>
      <a href="#projects" class="mobile-nav-link" data-close-mobile="true">Projects</a>
      <a href="#certifications" class="mobile-nav-link" data-close-mobile="true">Certifications</a>
      <a href="#contact" class="mobile-nav-link" data-close-mobile="true">Contact</a>
    </nav>

    <main>
      <section id="home" class="hero">
        <div class="hero-text gsap-reveal">
          <p class="eyebrow">Software Developer · Frontend Builder</p>
          <h1>Saravana Priyan</h1>
          <p class="lead">
            Building reliable web products with sharp UX, practical engineering, and a visual style that feels considered instead of overdesigned.
          </p>
          <p class="secret-hint">Double tap the portrait. Click the footer. Try the Konami code.</p>

          <div class="hero-actions">
            <a href="#contact" class="btn-primary">Let's Work</a>
            <a href="#projects" class="btn-secondary">View Projects</a>
          </div>

          <div class="hero-links">
            <a href="https://github.com/ST-SARAVANAPRIYAN" class="inline-link" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/saravana-priyan-s-t" class="inline-link" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>

          <div class="hero-stats">
            <div class="stat-pill">
              <span class="stat-num">3+</span>
              <span class="stat-label">Projects</span>
            </div>
            <div class="stat-pill">
              <span class="stat-num">5+</span>
              <span class="stat-label">Tools</span>
            </div>
            <div class="stat-pill">
              <span class="stat-num">4</span>
              <span class="stat-label">Certs</span>
            </div>
          </div>
        </div>

        <div class="hero-card-wrap gsap-reveal">
          <div class="hero-card-chrome" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div class="hover-reveal-card main-hero-card" id="heroRevealCard" aria-label="Profile">
            <img src="${frontImage}" alt="Saravana Priyan" class="hrc-image hrc-front" draggable="false" />

            <svg class="hrc-svg-mask-definitions" aria-hidden="true">
              <defs>
                <filter id="hero-goo-filter">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="20" result="blur" />
                  <feColorMatrix
                    in="blur"
                    mode="matrix"
                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 12 -4"
                    result="goo"
                  />
                  <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                </filter>

                <mask id="hero-fluid-mask">
                  <g id="heroFluidBlobGroup" filter="url(#hero-goo-filter)"></g>
                </mask>
              </defs>
            </svg>

            <div class="hrc-reveal" id="heroRevealLayer" aria-hidden="true">
              <img src="${backImage}" alt="" class="hrc-image hrc-back" draggable="false" />
            </div>
          </div>
        </div>
      </section>

      <section id="about" class="gsap-reveal">
        <div class="section-header">
          <p class="section-label"><span class="mini-icon" aria-hidden="true">•</span> About</p>
          <h2>Focused, practical, and product-minded</h2>
        </div>

        <div class="about-grid">
          <article class="about-summary">
            <p>
              I design and build web experiences that prioritize speed, usability, and maintainable code.
              My approach is simple: solve real user needs, keep interfaces intentional, and ship with care.
            </p>
            <div class="about-tags">
              <span class="tag">Product Thinking</span>
              <span class="tag">Performance</span>
              <span class="tag">Clean UI</span>
              <span class="tag">Frontend Engineering</span>
            </div>
          </article>

          <aside class="about-info">
            <h3>Quick Info</h3>
            <ul class="info-list">
              <li><span class="mini-icon" aria-hidden="true">•</span>Tamil Nadu, India</li>
              <li><span class="mini-icon" aria-hidden="true">•</span><a href="mailto:saravanapriyanst@gmail.com">saravanapriyanst@gmail.com</a></li>
              <li><span class="mini-icon" aria-hidden="true">•</span><a href="tel:+919994054077">+91 9994054077</a></li>
            </ul>
          </aside>
        </div>
      </section>

      <section id="education" class="gsap-reveal">
        <div class="section-header">
          <p class="section-label"><span class="mini-icon" aria-hidden="true">•</span> Education</p>
          <h2>Academic foundation</h2>
        </div>

        <div class="timeline">
          <article class="timeline-item">
            <span class="timeline-dot" aria-hidden="true"></span>
            <div class="timeline-card">
              <div class="timeline-head">
                <div>
                  <h3>B.Tech Information Technology</h3>
                  <p class="timeline-inst">Kongu Engineering College</p>
                </div>
                <span class="timeline-badge">2022 - 2026</span>
              </div>
              <p class="timeline-detail">
                Current CGPA: <strong>8.04</strong>
              </p>
            </div>
          </article>
        </div>
      </section>

      <section id="skills" class="gsap-reveal">
        <div class="section-header">
          <p class="section-label"><span class="mini-icon" aria-hidden="true">•</span> Skills</p>
          <h2>Tools I use to deliver work</h2>
        </div>

        <div class="skills-bento">
          <article class="skill-card">
            <div class="skill-card-header">
              <span class="skill-icon">L</span>
              <h3>Languages</h3>
            </div>
            <div class="skill-pills">
              <span class="skill-pill">Python</span>
              <span class="skill-pill">Java</span>
              <span class="skill-pill">C</span>
              <span class="skill-pill">SQL</span>
            </div>
          </article>

          <article class="skill-card">
            <div class="skill-card-header">
              <span class="skill-icon">W</span>
              <h3>Web Tech</h3>
            </div>
            <div class="skill-pills">
              <span class="skill-pill">HTML</span>
              <span class="skill-pill">CSS</span>
              <span class="skill-pill">JavaScript</span>
              <span class="skill-pill">Flask</span>
            </div>
          </article>

          <article class="skill-card">
            <div class="skill-card-header">
              <span class="skill-icon">T</span>
              <h3>Tools</h3>
            </div>
            <div class="skill-pills">
              <span class="skill-pill">Git</span>
              <span class="skill-pill">MongoDB Atlas</span>
              <span class="skill-pill">IBM SPSS</span>
              <span class="skill-pill">Watson Studio</span>
              <span class="skill-pill">Pandas</span>
            </div>
          </article>

          <article class="skill-card">
            <div class="skill-card-header">
              <span class="skill-icon">S</span>
              <h3>Soft Skills</h3>
            </div>
            <div class="skill-pills">
              <span class="skill-pill">Team Collaboration</span>
              <span class="skill-pill">Problem-solving</span>
              <span class="skill-pill">Adaptability</span>
              <span class="skill-pill">Analytical Thinking</span>
            </div>
          </article>
        </div>
      </section>

      <section id="projects" class="gsap-reveal">
        <div class="section-header">
          <p class="section-label"><span class="mini-icon" aria-hidden="true">•</span> Projects</p>
          <h2>Selected work</h2>
        </div>

        <div class="project-list">
          <article class="project-card">
            <span class="project-num">01</span>
            <div>
              <div class="project-head">
                <h3>College Event Management System</h3>
                <div class="project-stack">
                  <span class="stack-badge">Python</span>
                  <span class="stack-badge">Flask</span>
                  <span class="stack-badge">MySQL</span>
                  <span class="stack-badge">Razorpay</span>
                </div>
              </div>
              <ul class="project-bullets">
                <li>Built end-to-end event workflow platform for students and organizers.</li>
                <li>Integrated Razorpay payment, dynamic event pages, notifications and analytics.</li>
                <li>Reduced manual coordination overhead significantly across departments.</li>
              </ul>
            </div>
          </article>

          <article class="project-card">
            <span class="project-num">02</span>
            <div>
              <div class="project-head">
                <h3>Smart Home Insights</h3>
                <div class="project-stack">
                  <span class="stack-badge">Python</span>
                  <span class="stack-badge">Pandas</span>
                  <span class="stack-badge">Matplotlib</span>
                </div>
              </div>
              <ul class="project-bullets">
                <li>Engineered an analytical engine to monitor and visualize energy-usage trends.</li>
                <li>Created data-driven alerts to optimize electricity consumption and cost.</li>
                <li>Delivered clear, actionable visual insights for daily decision-making.</li>
              </ul>
            </div>
          </article>

          <article class="project-card">
            <span class="project-num">03</span>
            <div>
              <div class="project-head">
                <h3>LearnAID - Intelligent Learning Support</h3>
                <div class="project-stack">
                  <span class="stack-badge">Cognitive Computing</span>
                  <span class="stack-badge">Personalization</span>
                  <span class="stack-badge">Cloud Design</span>
                </div>
              </div>
              <ul class="project-bullets">
                <li>Designed recommendation-driven cognitive learning support architecture.</li>
                <li>Integrated gamification and cloud-first scalability for high engagement.</li>
                <li>Focused on measurable improvements in participation and learning outcomes.</li>
              </ul>
            </div>
          </article>
        </div>
      </section>

      <section id="certifications" class="gsap-reveal">
        <div class="section-header">
          <p class="section-label"><span class="mini-icon" aria-hidden="true">•</span> Credentials</p>
          <h2>Certifications and learning</h2>
        </div>

        <div class="certs-grid">
          <article class="pub-card">
            <span class="pub-tag">Focus Area</span>
            <h3>Data &amp; Web Engineering</h3>
            <p>
              I focus on practical software work: building dependable interfaces, using data responsibly,
              and improving real workflows.
            </p>
          </article>

          <div class="cert-list">
            <article class="cert-item">
              <span class="cert-icon">•</span>
              <span>JLPT N4 - Japanese Language Proficiency Test (Completed)</span>
            </article>
            <article class="cert-item">
              <span class="cert-icon">•</span>
              <span>Predictive Modeling with IBM SPSS Modeler</span>
            </article>
            <article class="cert-item">
              <span class="cert-icon">•</span>
              <span>Big Data Technologies - Spark Fundamentals</span>
            </article>
            <article class="cert-item">
              <span class="cert-icon">•</span>
              <span>Data Visualization with Python - IBM Cognitive Class</span>
            </article>
          </div>
        </div>
      </section>
    </main>

    <section id="contact" class="contact gsap-reveal">
      <div class="contact-inner">
        <div class="contact-text">
          <p class="section-label"><span class="mini-icon" aria-hidden="true">•</span> Contact</p>
          <h2>Open to internships and project collaborations</h2>
          <p>
            If you are building something useful and need a dependable developer, I would love to connect.
          </p>
        </div>

        <div class="contact-links">
          <a href="mailto:saravanapriyanst@gmail.com" class="contact-btn primary">
            <span class="mini-icon" aria-hidden="true">•</span> Email Me
          </a>
          <a href="tel:+919994054077" class="contact-btn">
            <span class="mini-icon" aria-hidden="true">•</span> Call
          </a>
          <a href="https://github.com/ST-SARAVANAPRIYAN" class="contact-btn" target="_blank" rel="noreferrer">
            <span class="mini-icon" aria-hidden="true">•</span> GitHub
          </a>
          <a href="https://www.linkedin.com/in/saravana-priyan-s-t" class="contact-btn" target="_blank" rel="noreferrer">
            <span class="mini-icon" aria-hidden="true">•</span> LinkedIn
          </a>
        </div>
      </div>
    </section>

    <p class="footer-copy" id="footerCopy">© ${new Date().getFullYear()} Saravana Priyan. Built with clarity and care.</p>
  </div>
`

const appRoot = document.querySelector('#appRoot')
const brand = document.querySelector('.brand')
const mobileNav = document.querySelector('#mobileNav')
const mobileToggle = document.querySelector('#mobileToggle')
const darkBtn = document.querySelector('#themeDarkBtn')
const sakuraBtn = document.querySelector('#themeSakuraBtn')
const scrollProgress = document.querySelector('#scrollProgress')
const themeRipple = document.querySelector('#themeRipple')
const secretToast = document.querySelector('#secretToast')
const footerCopy = document.querySelector('#footerCopy')

let mobileOpen = false
let currentTheme = 'dark'
let toastTimer = null

const consoleBanner = [
  '%cWelcome to Saravana.exe',
  'color:#111318;background:#6fffe9;padding:8px 12px;border-radius:999px;font-weight:800;',
]

console.log(...consoleBanner)
console.log('%cYou opened the console. That counts as curiosity points.', 'color:#ffb36a;font-weight:700;')
console.log('%cHidden triggers:', 'color:#ff7a45;font-weight:800;')
console.log('• Double-click the brand')
console.log('• Click the footer')
console.log('• Konami code: ↑ ↑ ↓ ↓ ← → ← → B A')
console.log('• Double-tap the portrait')
console.log('%cBonus: the fluid gets moody when left alone.', 'color:#6fffe9;font-style:italic;')

const showToast = (message) => {
  if (!secretToast) return
  secretToast.textContent = message
  secretToast.classList.add('visible')

  if (toastTimer) {
    window.clearTimeout(toastTimer)
  }

  toastTimer = window.setTimeout(() => {
    secretToast.classList.remove('visible')
  }, 2200)
}

const updateMobileState = () => {
  if (!mobileNav || !mobileToggle) return
  mobileNav.classList.toggle('open', mobileOpen)
  mobileToggle.textContent = mobileOpen ? 'Close' : 'Menu'
  document.body.style.overflow = mobileOpen ? 'hidden' : ''
}

const applyTheme = (theme) => {
  const isSakura = theme === 'sakura'

  if (appRoot) {
    appRoot.classList.toggle('theme-sakura', isSakura)
  }

  document.body.setAttribute('data-theme', theme)

  if (darkBtn) darkBtn.classList.toggle('active', !isSakura)
  if (sakuraBtn) sakuraBtn.classList.toggle('active', isSakura)
  currentTheme = theme
}

const setTheme = (theme, point = null, { immediate = false } = {}) => {
  if (theme === currentTheme && !immediate) return

  const x = point?.x ?? window.innerWidth * 0.5
  const y = point?.y ?? window.innerHeight * 0.5

  if (immediate || !themeRipple) {
    applyTheme(theme)
    return
  }

  themeRipple.style.setProperty('--ripple-x', `${x}px`)
  themeRipple.style.setProperty('--ripple-y', `${y}px`)
  themeRipple.dataset.nextTheme = theme
  themeRipple.classList.remove('active', 'to-dark', 'to-sakura')
  void themeRipple.offsetWidth
  themeRipple.classList.add(theme === 'sakura' ? 'to-sakura' : 'to-dark', 'active')
}

if (themeRipple) {
  themeRipple.addEventListener('animationend', () => {
    const nextTheme = themeRipple.dataset.nextTheme
    if (nextTheme) {
      applyTheme(nextTheme)
      themeRipple.dataset.nextTheme = ''
    }
    themeRipple.classList.remove('active', 'to-dark', 'to-sakura')
  })
}

if (brand) {
  brand.addEventListener('dblclick', (event) => {
    const nextTheme = currentTheme === 'dark' ? 'sakura' : 'dark'
    setTheme(nextTheme, { x: event.clientX, y: event.clientY })
    showToast(nextTheme === 'dark' ? 'Back to midnight mode.' : 'Sakura mode in bloom.')
  })
}

if (mobileToggle) {
  mobileToggle.addEventListener('click', () => {
    mobileOpen = !mobileOpen
    updateMobileState()
  })
}

document.querySelectorAll('[data-close-mobile="true"]').forEach((el) => {
  el.addEventListener('click', () => {
    mobileOpen = false
    updateMobileState()
  })
})

if (darkBtn) {
  darkBtn.addEventListener('click', (event) => {
    setTheme('dark', { x: event.clientX, y: event.clientY })
  })
}

if (sakuraBtn) {
  sakuraBtn.addEventListener('click', (event) => {
    setTheme('sakura', { x: event.clientX, y: event.clientY })
  })
}

setTheme('dark', null, { immediate: true })
updateMobileState()

const updateScrollProgress = (scrollY = window.scrollY) => {
  if (!scrollProgress) return
  const scrollable = document.documentElement.scrollHeight - window.innerHeight
  const progress = scrollable > 0 ? scrollY / scrollable : 0
  scrollProgress.style.transform = `scaleX(${Math.max(0, Math.min(1, progress))})`
}

let lastScrollY = window.scrollY

const handleScrollFrame = (scrollY) => {
  lastScrollY = scrollY

  updateScrollProgress(scrollY)
}

let scrollTicking = false

window.addEventListener(
  'scroll',
  () => {
    if (scrollTicking) return
    scrollTicking = true
    window.requestAnimationFrame(() => {
      handleScrollFrame(window.scrollY)
      scrollTicking = false
    })
  },
  { passive: true },
)

window.addEventListener('resize', () => updateScrollProgress(lastScrollY))
updateScrollProgress()

const revealElements = document.querySelectorAll('.gsap-reveal')
revealElements.forEach((el, index) => {
  el.style.setProperty('--reveal-delay', `${index * 70}ms`)
})
const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      }
    })
  },
  {
    threshold: 0.15,
    rootMargin: '0px 0px -8% 0px',
  },
)

revealElements.forEach((el) => revealObserver.observe(el))

const projectCards = document.querySelectorAll('.project-card')

projectCards.forEach((card) => {
  card.addEventListener('pointermove', (event) => {
    const rect = card.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width - 0.5
    const py = (event.clientY - rect.top) / rect.height - 0.5
    card.style.setProperty('--tilt-x', `${py * -7}deg`)
    card.style.setProperty('--tilt-y', `${px * 9}deg`)
    card.style.setProperty('--glow-x', `${(event.clientX - rect.left) / rect.width * 100}%`)
    card.style.setProperty('--glow-y', `${(event.clientY - rect.top) / rect.height * 100}%`)
  })

  card.addEventListener('pointerleave', () => {
    card.style.setProperty('--tilt-x', '0deg')
    card.style.setProperty('--tilt-y', '0deg')
  })
})

const footerMessages = [
  'Crafted to feel alive.',
  'Tiny details matter.',
  'You found one of the hidden notes.',
]
let footerMessageIndex = 0

if (footerCopy) {
  footerCopy.addEventListener('click', () => {
    footerMessageIndex = (footerMessageIndex + 1) % footerMessages.length
    showToast(footerMessages[footerMessageIndex])
  })
}

const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']
let konamiIndex = 0

window.addEventListener('keydown', (event) => {
  const key = event.key.length === 1 ? event.key.toLowerCase() : event.key
  const expected = konami[konamiIndex]

  if (key === expected) {
    konamiIndex += 1
    if (konamiIndex === konami.length) {
      appRoot?.classList.toggle('theme-arcade')
      showToast(appRoot?.classList.contains('theme-arcade') ? 'Arcade accent unlocked.' : 'Arcade accent disabled.')
      konamiIndex = 0
    }
    return
  }

  konamiIndex = key === konami[0] ? 1 : 0
})

const card = document.querySelector('#heroRevealCard')
const revealLayer = document.querySelector('#heroRevealLayer')
const blobGroup = document.querySelector('#heroFluidBlobGroup')

if (card && revealLayer && blobGroup) {
  const frontImageEl = card.querySelector('.hrc-front')
  const backImageEl = card.querySelector('.hrc-back')
  let x = 0
  let y = 0
  let targetX = 0
  let targetY = 0
  let radius = 48
  let targetRadius = 48
  let panX = 0
  let panY = 0
  let zoom = 1
  let isHovering = false
  let isVisible = true
  let rafId = 0
  let rippleTimer = null
  let rectCache = null
  let rectDirty = true
  let splashBoost = 0
  const blobCount = 32

  const blobs = Array.from({ length: blobCount }).map((_, i) => {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    circle.setAttribute('fill', 'white')
    blobGroup.appendChild(circle)

    const isSatellite = i > blobCount - 7
    const spread = isSatellite ? 54 + i * 3.4 : 24 + i * 2

    return {
      circle,
      x: 0,
      y: 0,
      ox: (Math.random() - 0.5) * spread,
      oy: (Math.random() - 0.5) * spread,
      nSeed: Math.random() * Math.PI * 2,
      nSpeed: isSatellite ? 1 + Math.random() * 1.4 : 0.8 + Math.random() * 1.3,
      nScale: isSatellite ? 16 + Math.random() * 22 : 10 + Math.random() * 20,
      lag: isSatellite ? 0.08 + Math.random() * 0.06 : 0.14 + Math.random() * 0.12,
      drift: 0.8 + Math.random() * 2,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 2.2 + Math.random() * 3.4,
      pulseAmp: isSatellite ? 0.26 + Math.random() * 0.22 : 0.12 + Math.random() * 0.24,
      sizeBias: isSatellite ? 0.26 + Math.random() * 0.26 : 0.52 + Math.random() * 0.62,
      splashBias: Math.random(),
      isSatellite,
    }
  })

  const getRect = () => {
    if (!rectCache || rectDirty) {
      rectCache = card.getBoundingClientRect()
      rectDirty = false
    }
    return rectCache
  }

  const setStaticCenter = () => {
    const rect = getRect()
    x = rect.width * 0.5
    y = rect.height * 0.5
    targetX = x
    targetY = y
    radius = 48
    targetRadius = 48
    blobs.forEach((blob) => {
      blob.x = x + blob.ox
      blob.y = y + blob.oy
    })
    card.style.setProperty('--img-pan-x', '0px')
    card.style.setProperty('--img-pan-y', '0px')
    card.style.setProperty('--img-zoom', '1')
  }

  revealLayer.style.maskImage = 'url(#hero-fluid-mask)'
  revealLayer.style.webkitMaskImage = 'url(#hero-fluid-mask)'

  const ensureAnimation = () => {
    if (!rafId && isVisible) {
      rafId = window.requestAnimationFrame(animate)
    }
  }

  const setTargetFromEvent = (event) => {
    const rect = getRect()
    const touch = event.touches?.[0] ?? event.changedTouches?.[0]
    const clientX = touch ? touch.clientX : event.clientX
    const clientY = touch ? touch.clientY : event.clientY
    targetX = clientX - rect.left
    targetY = clientY - rect.top
  }

  const animate = (time) => {
    rafId = 0
    const rect = getRect()
    const t = time / 1000

    if (!isHovering) {
      const cx = rect.width * 0.5
      const cy = rect.height * 0.5
      targetX = cx + Math.sin(time / 900) * (rect.width * 0.06)
      targetY = cy + Math.cos(time / 820) * (rect.height * 0.05)
      targetRadius += (48 - targetRadius) * 0.2
      splashBoost += (0 - splashBoost) * 0.08
    } else {
      splashBoost += (1 - splashBoost) * 0.14
    }

    x += (targetX - x) * 0.42
    y += (targetY - y) * 0.42
    radius += (targetRadius - radius) * 0.36

    const rx = rect.width > 0 ? x / rect.width - 0.5 : 0
    const ry = rect.height > 0 ? y / rect.height - 0.5 : 0
    const targetPanX = rx * 11
    const targetPanY = ry * 9
    const targetZoom = isHovering ? 1.02 : 1

    panX += (targetPanX - panX) * 0.22
    panY += (targetPanY - panY) * 0.22
    zoom += (targetZoom - zoom) * 0.2

    card.style.setProperty('--img-pan-x', `${panX}px`)
    card.style.setProperty('--img-pan-y', `${panY}px`)
    card.style.setProperty('--img-zoom', `${zoom}`)

    blobs.forEach((blob, i) => {
      const swirlX = Math.sin(t * blob.nSpeed + blob.nSeed) * blob.nScale
      const swirlY = Math.cos(t * (blob.nSpeed * 0.9) + blob.nSeed * 1.6) * blob.nScale
      const splashWave = Math.sin(t * blob.pulseSpeed + blob.pulse)
      const sprayX = splashWave * (8 + blob.splashBias * 18) * splashBoost
      const sprayY = Math.cos(t * (blob.pulseSpeed * 0.92) + blob.pulse * 1.4) * (5 + blob.splashBias * 13) * splashBoost
      const dragX = rx * (blob.isSatellite ? 34 : 18) * (0.5 + blob.splashBias) * splashBoost
      const dragY = ry * (blob.isSatellite ? 26 : 12) * (0.4 + blob.splashBias) * splashBoost
      const tx = x + blob.ox + swirlX + sprayX + dragX + Math.sin(t * blob.drift + i) * (blob.isSatellite ? 4.2 : 2.4)
      const ty = y + blob.oy + swirlY + sprayY + dragY

      blob.x += (tx - blob.x) * blob.lag
      blob.y += (ty - blob.y) * blob.lag

      const pulse = 1 + Math.sin(t * blob.pulseSpeed + blob.pulse) * blob.pulseAmp
      const splashStretch = 1 + splashBoost * blob.splashBias * (blob.isSatellite ? 0.7 : 0.36)
      const radiusNoise = 0.86 + Math.sin(t * (blob.nSpeed * 1.6) + blob.nSeed) * 0.16
      const baseSize = radius * blob.sizeBias * pulse * splashStretch * radiusNoise
      const r = Math.max(blob.isSatellite ? 2.2 : 3.2, baseSize)
      blob.circle.setAttribute('cx', `${blob.x}`)
      blob.circle.setAttribute('cy', `${blob.y}`)
      blob.circle.setAttribute('r', `${r}`)
    })

    const settled =
      Math.abs(targetX - x) < 0.3 &&
      Math.abs(targetY - y) < 0.3 &&
      Math.abs(targetRadius - radius) < 0.3 &&
      !isHovering

    if (!settled || isVisible) {
      rafId = window.requestAnimationFrame(animate)
    }
  }

  setStaticCenter()
  ensureAnimation()

  const visibilityObserver = new IntersectionObserver(
    ([entry]) => {
      isVisible = entry?.isIntersecting ?? true
      if (isVisible) {
        rectDirty = true
        ensureAnimation()
      } else if (rafId) {
        window.cancelAnimationFrame(rafId)
        rafId = 0
      }
    },
    { threshold: 0.08 },
  )

  visibilityObserver.observe(card)

  const startInteractive = (event) => {
    isHovering = true
    splashBoost = Math.max(splashBoost, 0.35)
    setTargetFromEvent(event)
    const rect = getRect()
    targetRadius = Math.min(108, Math.max(76, rect.width * 0.16))
    if (frontImageEl) frontImageEl.style.transitionDuration = '110ms'
    if (backImageEl) backImageEl.style.transitionDuration = '110ms'
    ensureAnimation()
  }

  const endInteractive = () => {
    isHovering = false
    splashBoost = Math.max(splashBoost, 0.2)
    targetRadius = 48
    if (frontImageEl) frontImageEl.style.transitionDuration = '170ms'
    if (backImageEl) backImageEl.style.transitionDuration = '170ms'
    ensureAnimation()
  }

  card.addEventListener('pointerenter', (event) => {
    startInteractive(event)
  })

  card.addEventListener('pointermove', (event) => {
    isHovering = true
    setTargetFromEvent(event)
    ensureAnimation()
  })

  card.addEventListener('pointerleave', () => {
    endInteractive()
  })

  card.addEventListener('pointerdown', (event) => {
    startInteractive(event)
  })

  card.addEventListener('pointerup', () => {
    endInteractive()
  })

  card.addEventListener('pointercancel', () => {
    endInteractive()
  })

  card.addEventListener(
    'touchstart',
    (event) => {
      startInteractive(event)
    },
    { passive: true },
  )

  card.addEventListener(
    'touchmove',
    (event) => {
      isHovering = true
      setTargetFromEvent(event)
      ensureAnimation()
    },
    { passive: true },
  )

  card.addEventListener(
    'touchend',
    () => {
      endInteractive()
    },
    { passive: true },
  )

  card.addEventListener('click', () => {
    const rect = getRect()
    splashBoost = 1.2
    targetRadius = Math.min(rect.width * 0.98, Math.max(targetRadius + 34, rect.width * 0.34))

    if (rippleTimer) {
      window.clearTimeout(rippleTimer)
    }

    rippleTimer = window.setTimeout(() => {
      targetRadius = isHovering ? Math.min(108, Math.max(76, rect.width * 0.16)) : 48
      ensureAnimation()
    }, 220)
  })

  const handleResize = () => {
    rectDirty = true
    setStaticCenter()
    ensureAnimation()
  }

  window.addEventListener('resize', handleResize)
  window.addEventListener(
    'scroll',
    () => {
      rectDirty = true
    },
    { passive: true },
  )
}
