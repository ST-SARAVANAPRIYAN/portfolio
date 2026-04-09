import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, MouseEvent as ReactMouseEvent } from 'react'
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import type { Variants } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import {
  ArrowUpRight,
  Award,
  BookOpen,
  Briefcase,
  Code2,
  Globe,
  GraduationCap,
  Heart,
  Mail,
  MapPin,
  Menu,
  MoonStar,
  Phone,
  Sparkles,
  SunMedium,
  Terminal,
  Users,
  Wrench,
  X,
} from 'lucide-react'
import { HoverRevealCard } from './components/HoverRevealCard'
import frontImage from './assets/front.png'
import backImage from './assets/back.png'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

type Theme = 'dark' | 'sakura'

type ThemeTransitionState = {
  x: number
  y: number
  key: number
  to: Theme
}

type LeafSpec = {
  left: number
  duration: number
  delay: number
  drift: number
  size: number
}

const sakuraLeaves: LeafSpec[] = [
  { left: 6, duration: 11, delay: 0, drift: 18, size: 12 },
  { left: 14, duration: 9, delay: 1.2, drift: 24, size: 10 },
  { left: 22, duration: 13, delay: 2.1, drift: 15, size: 14 },
  { left: 31, duration: 10, delay: 0.8, drift: 20, size: 9 },
  { left: 39, duration: 12, delay: 2.4, drift: 22, size: 13 },
  { left: 48, duration: 9.5, delay: 0.3, drift: 19, size: 11 },
  { left: 57, duration: 12.5, delay: 1.9, drift: 25, size: 12 },
  { left: 65, duration: 10.4, delay: 0.5, drift: 16, size: 10 },
  { left: 72, duration: 11.8, delay: 2.2, drift: 21, size: 12 },
  { left: 81, duration: 9.8, delay: 1.4, drift: 23, size: 11 },
  { left: 89, duration: 13.2, delay: 0.9, drift: 18, size: 15 },
  { left: 95, duration: 10.8, delay: 2.8, drift: 20, size: 10 },
]

const navLinks = [
  { href: '#home', label: 'Home', jp: 'ホーム' },
  { href: '#about', label: 'About', jp: '紹介' },
  { href: '#education', label: 'Education', jp: '学歴' },
  { href: '#skills', label: 'Skills', jp: 'スキル' },
  { href: '#projects', label: 'Projects', jp: 'プロジェクト' },
  { href: '#certifications', label: 'Certifications', jp: '資格' },
  { href: '#contact', label: 'Contact', jp: '連絡先' },
]

const heroContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

const heroItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const skills = {
  languages: { icon: Terminal, items: ['Python', 'Java', 'C', 'SQL'], labelEn: 'Languages', labelJp: '言語' },
  web: { icon: Globe, items: ['HTML', 'CSS', 'JavaScript', 'Flask'], labelEn: 'Web Tech', labelJp: 'Web技術' },
  tools: { icon: Wrench, items: ['Git', 'MongoDB Atlas', 'IBM SPSS', 'Watson Studio', 'Pandas'], labelEn: 'Tools', labelJp: 'ツール' },
  soft: { icon: Heart, items: ['Team Collaboration', 'Problem-solving', 'Adaptability', 'Analytical Thinking'], labelEn: 'Soft Skills', labelJp: 'ソフトスキル' },
}

const projects = [
  {
    num: '01',
    title: 'College Event Management System',
    titleJp: '大学イベント管理システム',
    stack: ['Python', 'Flask', 'MySQL', 'Razorpay'],
    bullets: [
      'Built end-to-end event workflow platform for students and organizers.',
      'Integrated Razorpay payment, dynamic event pages, notifications and analytics.',
      'Reduced manual coordination overhead significantly across departments.',
    ],
    bulletsJp: [
      '学生と運営向けシステムを一から構築しました。',
      'Razorpay決済・通知・分析を連携しました。',
      '手作業の調整コストを大幅に削減しました。',
    ],
  },
  {
    num: '02',
    title: 'Smart Home Insights',
    titleJp: 'スマートホーム分析',
    stack: ['Python', 'Pandas', 'Matplotlib'],
    bullets: [
      'Engineered an analytical engine to monitor and visualize energy-usage trends.',
      'Created data-driven alerts to optimize electricity consumption and cost.',
      'Delivered clear, actionable visual insights for daily decision-making.',
    ],
    bulletsJp: [
      'エネルギー使用傾向を可視化する分析エンジンを構築しました。',
      '消費最適化のためのデータ駆動アラートを作成しました。',
      '日々の判断に役立つ分かりやすい可視化を提供しました。',
    ],
  },
  {
    num: '03',
    title: 'LearnAID — Intelligent Learning Support',
    titleJp: 'LearnAID 学習支援システム',
    stack: ['Cognitive Computing', 'Personalization', 'Cloud Design'],
    bullets: [
      'Designed recommendation-driven cognitive learning support architecture.',
      'Integrated gamification and cloud-first scalability for high engagement.',
      'Focused on measurable improvements in participation and learning outcomes.',
    ],
    bulletsJp: [
      '推薦指向の認知学習支援アーキテクチャを設計しました。',
      'ゲーミフィケーションとクラウド前提の拡張性を導入しました。',
      '参加率と学習成果の改善を重視しました。',
    ],
  },
]

const certifications = [
  { icon: Award, text: 'JLPT N4 — Japanese Language Proficiency Test (Completed)' },
  { icon: Award, text: 'Predictive Modeling with IBM SPSS Modeler' },
  { icon: Award, text: 'Big Data Technologies — Spark Fundamentals' },
  { icon: Award, text: 'Data Visualization with Python — IBM Cognitive Class' },
]

function App() {
  const [theme, setTheme] = useState<Theme>('dark')
  const [themeTransition, setThemeTransition] = useState<ThemeTransitionState | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement | null>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const progressScale = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 })
  const isSakura = theme === 'sakura'

  const handleThemeSwitch = (next: Theme, e: ReactMouseEvent<HTMLButtonElement>) => {
    if (next === theme || themeTransition) return
    const rect = e.currentTarget.getBoundingClientRect()
    setThemeTransition({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2, key: Date.now(), to: next })
  }

  useEffect(() => {
    document.body.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  useEffect(() => {
    if (reduceMotion) return

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      wheelMultiplier: 0.92,
      touchMultiplier: 1,
      lerp: 0.1,
    })

    // GSAP ticker provides time in seconds; Lenis.raf expects milliseconds
    const tick = (time: number) => lenis.raf(time * 1000)

    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    const ctx = gsap.context(() => {
      gsap.to('.ambient-a', { x: 50, y: -30, duration: 7, ease: 'sine.inOut', repeat: -1, yoyo: true })
      gsap.to('.ambient-b', { x: -40, y: 32, duration: 8, ease: 'sine.inOut', repeat: -1, yoyo: true })

      gsap.utils.toArray<HTMLElement>('.gsap-reveal').forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 32 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 84%', once: true },
          },
        )
      })
    }, rootRef)

    return () => {
      ctx.revert()
      gsap.ticker.remove(tick)
      lenis.destroy()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [reduceMotion])

  return (
    <div className={`portfolio-root theme-${theme}`} ref={rootRef}>


      {/* Scroll Progress */}
      <motion.div className="scroll-progress" style={{ scaleX: progressScale }} />

      {/* Ambient Orbs */}
      <div className="ambient ambient-a" aria-hidden="true" />
      <div className="ambient ambient-b" aria-hidden="true" />
      <div className="ambient ambient-c" aria-hidden="true" />

      {/* Theme Transition */}
      {themeTransition && (
        <motion.div
          key={themeTransition.key}
          className={`theme-transition-overlay theme-overlay-${themeTransition.to}`}
          style={{ '--ripple-x': `${themeTransition.x}px`, '--ripple-y': `${themeTransition.y}px` } as CSSProperties}
          initial={{ clipPath: `circle(0px at ${themeTransition.x}px ${themeTransition.y}px)` }}
          animate={{ clipPath: `circle(160vmax at ${themeTransition.x}px ${themeTransition.y}px)` }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          onAnimationComplete={() => {
            setTheme(themeTransition.to)
            setThemeTransition(null)
          }}
          aria-hidden="true"
        />
      )}

      {/* Sakura leaves */}
      <div className={`sakura-leaf-layer ${isSakura ? 'active' : ''}`} aria-hidden="true">
        {sakuraLeaves.map((leaf, i) => (
          <span
            key={`${leaf.left}-${i}`}
            className="sakura-leaf"
            style={{
              '--leaf-left': `${leaf.left}%`,
              '--leaf-duration': `${leaf.duration}s`,
              '--leaf-delay': `${leaf.delay}s`,
              '--leaf-drift': `${leaf.drift}px`,
              '--leaf-size': `${leaf.size}px`,
            } as CSSProperties}
          />
        ))}
      </div>

      {/* ── NAV ──────────────────────────────────────────────────── */}
      <header className="topbar">
        <a className="brand" href="#home" onClick={() => setMobileOpen(false)}>
          <span className="brand-name">SARAVANA PRIYAN</span>
          <span className="brand-sub">AI · Data Science</span>
        </a>

        <nav className="desktop-nav" aria-label="Site navigation">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">
              {isSakura ? link.jp : link.label}
            </a>
          ))}
        </nav>

        <div className="topbar-right">
          <div className="theme-switch" role="group" aria-label="Theme selector">
            <button
              type="button"
              id="btn-theme-dark"
              className={theme === 'dark' ? 'active' : ''}
              onClick={(e) => handleThemeSwitch('dark', e)}
              disabled={Boolean(themeTransition)}
            >
              <MoonStar size={14} aria-hidden="true" /> Dark
            </button>
            <button
              type="button"
              id="btn-theme-sakura"
              className={theme === 'sakura' ? 'active' : ''}
              onClick={(e) => handleThemeSwitch('sakura', e)}
              disabled={Boolean(themeTransition)}
            >
              <SunMedium size={14} aria-hidden="true" /> Sakura
            </button>
          </div>

          <button
            id="mobile-menu-toggle"
            className="burger"
            type="button"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <div className={`mobile-nav ${mobileOpen ? 'open' : ''}`} aria-hidden={!mobileOpen}>
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="mobile-nav-link"
            onClick={() => setMobileOpen(false)}
            tabIndex={mobileOpen ? 0 : -1}
          >
            {isSakura ? link.jp : link.label}
          </a>
        ))}
      </div>

      <main>
        {/* ── HERO ──────────────────────────────────────────────── */}
        <section className="hero" id="home">
          <motion.div
            className="hero-text"
            variants={heroContainer}
            initial={reduceMotion ? false : 'hidden'}
            animate="visible"
          >
            <motion.p className="eyebrow" variants={heroItem}>
              {isSakura ? '人工知能・データサイエンス' : 'AI · Data Science · Developer'}
            </motion.p>

            <motion.h1 variants={heroItem}>
              {isSakura ? (
                <>サラバナ<br />プリヤン</>
              ) : (
                <>SARAVANA<br />PRIYAN S T</>
              )}
            </motion.h1>

            <motion.p className="lead" variants={heroItem}>
              {isSakura
                ? 'AIを活用した実践的な開発に強い関心を持ち、設計から実装まで取り組むB.Tech学生です。'
                : 'Passionate B.Tech student in AI & Data Science — building practical, data-driven software from end to end.'}
            </motion.p>

            <motion.div className="hero-actions" variants={heroItem}>
              <a href="#projects" className="btn-primary" id="hero-cta-projects">
                {isSakura ? 'プロジェクトを見る' : 'View Projects'}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              <a href="#contact" className="btn-secondary" id="hero-cta-contact">
                {isSakura ? '連絡する' : 'Let\'s Connect'}
              </a>
            </motion.div>

            <motion.div className="hero-stats" variants={heroItem}>
              <div className="stat-pill">
                <span className="stat-num">8.24</span>
                <span className="stat-label">CGPA</span>
              </div>
              <div className="stat-pill">
                <span className="stat-num">3+</span>
                <span className="stat-label">{isSakura ? 'プロジェクト' : 'Projects'}</span>
              </div>
              <div className="stat-pill">
                <span className="stat-num">4+</span>
                <span className="stat-label">{isSakura ? '資格' : 'Certifications'}</span>
              </div>
              <div className="stat-pill">
                <span className="stat-num">JLPT</span>
                <span className="stat-label">N4</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-card-wrap"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <HoverRevealCard
              title={isSakura ? '代表プロジェクト ハイライト' : 'Hover to see the graffiti side'}
              frontImage={frontImage}
              backImage={backImage}
              className="main-hero-card"
            />
            <div className="card-glow" aria-hidden="true" />
          </motion.div>
        </section>

        {/* ── ABOUT ──────────────────────────────────────────────── */}
        <section className="about gsap-reveal" id="about">
          <div className="section-header">
            <span className="section-label">
              <Sparkles size={14} aria-hidden="true" />
              {isSakura ? 'プロフィール' : 'About'}
            </span>
            <h2>{isSakura ? 'プロフィール概要' : 'Who I Am'}</h2>
          </div>

          <div className="about-grid">
            <div className="glass-card about-summary">
              <p>
                {isSakura
                  ? 'AIを活用した実践的な開発に強い関心を持ち、設計から実装まで一貫して取り組みます。教育分野や分析領域で、使いやすく信頼性の高いソフトウェアを構築することを目標にしています。'
                  : 'I focus on building practical AI-driven software with clean architecture, clear data thinking, and user-centered execution. My goal is to contribute to impactful products in education and analytics. I\'m a B.Tech AI & DS student driven by curiosity and a love for continuous learning.'}
              </p>
              <div className="about-tags">
                {['AI/ML', 'Data Science', 'Full Stack', 'JLPT N4'].map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </div>

            <div className="glass-card about-info">
              <h3>{isSakura ? '基本情報' : 'Profile'}</h3>
              <ul className="info-list">
                <li>
                  <MapPin size={16} aria-hidden="true" />
                  <span>Karur, Tamil Nadu, India</span>
                </li>
                <li>
                  <Phone size={16} aria-hidden="true" />
                  <a href="tel:+919994054077">+91 99940 54077</a>
                </li>
                <li>
                  <Mail size={16} aria-hidden="true" />
                  <a href="mailto:saravanapriyanst@gmail.com">saravanapriyanst@gmail.com</a>
                </li>
                <li>
                  <Users size={16} aria-hidden="true" />
                  <span>{isSakura ? 'B.Tech AI&DS — 2027卒' : 'B.Tech AI & DS, Graduating 2027'}</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── EDUCATION ─────────────────────────────────────────── */}
        <section className="education gsap-reveal" id="education">
          <div className="section-header">
            <span className="section-label">
              <GraduationCap size={14} aria-hidden="true" />
              {isSakura ? '学歴' : 'Education'}
            </span>
            <h2>{isSakura ? '学歴' : 'Academic Journey'}</h2>
          </div>

          <div className="timeline">
            <motion.div
              className="timeline-item"
              variants={cardVariants}
              initial={reduceMotion ? false : 'hidden'}
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="timeline-dot" />
              <div className="glass-card timeline-card">
                <div className="timeline-head">
                  <div>
                    <h3>{isSakura ? 'B.Tech 人工知能・データサイエンス' : 'B.Tech — AI & Data Science'}</h3>
                    <p className="timeline-inst">M. Kumarasamy College of Engineering, Karur</p>
                  </div>
                  <span className="timeline-badge">{isSakura ? '2027卒予定' : 'Exp. 2027'}</span>
                </div>
                <p className="timeline-detail">
                  <strong>CGPA: 8.24</strong>
                  {isSakura ? ' — 継続中' : ' · Currently pursuing'}
                </p>
              </div>
            </motion.div>

            <motion.div
              className="timeline-item"
              variants={cardVariants}
              initial={reduceMotion ? false : 'hidden'}
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.15 }}
            >
              <div className="timeline-dot" />
              <div className="glass-card timeline-card">
                <div className="timeline-head">
                  <div>
                    <h3>{isSakura ? '高等学校 (HSC)' : 'Higher Secondary Certificate (HSC)'}</h3>
                    <p className="timeline-inst">Lord's Park Matric Higher Secondary School</p>
                  </div>
                  <span className="timeline-badge">2022–23</span>
                </div>
                <p className="timeline-detail">
                  <strong>{isSakura ? '成績: 90%' : 'Percentage: 90%'}</strong>
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── SKILLS ────────────────────────────────────────────── */}
        <section className="skills gsap-reveal" id="skills">
          <div className="section-header">
            <span className="section-label">
              <Code2 size={14} aria-hidden="true" />
              {isSakura ? 'スキル' : 'Skills'}
            </span>
            <h2>{isSakura ? '技術スキル' : 'Skills & Capabilities'}</h2>
          </div>

          <div className="skills-bento">
            {Object.values(skills).map((cat, i) => {
              const Icon = cat.icon
              return (
                <motion.div
                  key={cat.labelEn}
                  className="glass-card skill-card"
                  variants={cardVariants}
                  initial={reduceMotion ? false : 'hidden'}
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <div className="skill-card-header">
                    <div className="skill-icon">
                      <Icon size={18} aria-hidden="true" />
                    </div>
                    <h3>{isSakura ? cat.labelJp : cat.labelEn}</h3>
                  </div>
                  <div className="skill-pills">
                    {cat.items.map((item) => (
                      <span key={item} className="skill-pill">{item}</span>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* ── PROJECTS ──────────────────────────────────────────── */}
        <section className="projects gsap-reveal" id="projects">
          <div className="section-header">
            <span className="section-label">
              <Briefcase size={14} aria-hidden="true" />
              {isSakura ? 'プロジェクト' : 'Projects'}
            </span>
            <h2>{isSakura ? 'プロジェクト' : 'Selected Work'}</h2>
          </div>

          <div className="project-list">
            {projects.map((p, i) => (
              <motion.article
                key={p.title}
                className="glass-card project-card"
                variants={cardVariants}
                initial={reduceMotion ? false : 'hidden'}
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="project-num">{p.num}</div>
                <div className="project-body">
                  <div className="project-head">
                    <h3>{isSakura ? p.titleJp : p.title}</h3>
                    <div className="project-stack">
                      {p.stack.map((s) => (
                        <span key={s} className="stack-badge">{s}</span>
                      ))}
                    </div>
                  </div>
                  <ul className="project-bullets">
                    {(isSakura ? p.bulletsJp : p.bullets).map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* ── CERTIFICATIONS ────────────────────────────────────── */}
        <section className="certs gsap-reveal" id="certifications">
          <div className="section-header">
            <span className="section-label">
              <BookOpen size={14} aria-hidden="true" />
              {isSakura ? '資格・出版' : 'Certifications & Publication'}
            </span>
            <h2>{isSakura ? '認定資格・出版' : 'Achievements'}</h2>
          </div>

          <div className="certs-grid">
            {/* Publication card */}
            <motion.div
              className="glass-card pub-card"
              variants={cardVariants}
              initial={reduceMotion ? false : 'hidden'}
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="pub-tag">{isSakura ? '論文' : 'Publication'}</div>
              <h3>LearnAID</h3>
              <p>
                {isSakura
                  ? 'LearnAID: 認知コンピューティングベースの学習支援システムを設計し、個別推薦・参加促進・学習成果向上に注力しました。'
                  : 'LearnAID — A cognitive computing-based intelligent learning support system with focus on personalization, engagement, and measurable learning outcomes.'}
              </p>
            </motion.div>

            {/* Cert cards */}
            <div className="cert-list">
              {certifications.map((cert, i) => {
                const Icon = cert.icon
                return (
                  <motion.div
                    key={cert.text}
                    className="glass-card cert-item"
                    variants={cardVariants}
                    initial={reduceMotion ? false : 'hidden'}
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: i * 0.07 }}
                  >
                    <div className="cert-icon">
                      <Icon size={16} aria-hidden="true" />
                    </div>
                    <span>{cert.text}</span>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>
      </main>

      {/* ── CONTACT / FOOTER ─────────────────────────────────── */}
      <footer className="contact gsap-reveal" id="contact">
        <div className="contact-inner">
          <div className="contact-text">
            <span className="section-label">
              <Mail size={14} aria-hidden="true" />
              {isSakura ? '連絡先' : 'Contact'}
            </span>
            <h2>{isSakura ? '一緒に作りましょう。' : "Let's Build Together."}</h2>
            <p>
              {isSakura
                ? '技術的に優れたプロジェクトに貢献したいと考えています。お気軽にご連絡ください。'
                : "I'm open to internships, collaborations, and exciting projects. Reach out and let's make something great."}
            </p>
          </div>

          <div className="contact-links">
            <a href="mailto:saravanapriyanst@gmail.com" id="contact-email" className="contact-btn primary">
              <Mail size={16} aria-hidden="true" />
              Email Me
            </a>
            <a
              href="https://www.linkedin.com/in/saravana-priyan-s-t/"
              id="contact-linkedin"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-btn"
            >
              LinkedIn
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <a
              href="https://github.com/ST-SARAVANAPRIYAN"
              id="contact-github"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-btn"
            >
              GitHub
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>

        <p className="footer-copy">
          © {new Date().getFullYear()} Saravana Priyan S T · Built with React & GSAP
        </p>
      </footer>
    </div>
  )
}

export default App
