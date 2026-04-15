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
  const [mobileOpen, setMobileOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement | null>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const progressScale = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 })
  const isSakura = theme === 'sakura'

  const handleThemeSwitch = (next: Theme, e: ReactMouseEvent<HTMLButtonElement>) => {
    if (next === theme) return
    void e
    setTheme(next)
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
    if (reduceMotion || !rootRef.current) return

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
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 86%',
              once: true,
            },
          }
        )
      })
    }, rootRef)

    return () => {
      ctx.revert()
      gsap.ticker.remove(tick)
      lenis.destroy()
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [reduceMotion])

  return (
    <div ref={rootRef} className={`portfolio-root ${isSakura ? 'theme-sakura' : ''}`}>
      <motion.div className="scroll-progress" style={{ scaleX: progressScale }} />

      <div className="ambient ambient-a" aria-hidden="true" />
      <div className="ambient ambient-b" aria-hidden="true" />
      <div className="ambient ambient-c" aria-hidden="true" />

      <div className={`sakura-leaf-layer ${isSakura ? 'active' : ''}`} aria-hidden="true">
        {sakuraLeaves.map((leaf, index) => {
          const style: CSSProperties = {
            ['--leaf-left' as string]: `${leaf.left}%`,
            ['--leaf-duration' as string]: `${leaf.duration}s`,
            ['--leaf-delay' as string]: `${leaf.delay}s`,
            ['--leaf-drift' as string]: `${leaf.drift}px`,
            ['--leaf-size' as string]: `${leaf.size}px`,
          }

          return <span key={index} className="sakura-leaf" style={style} />
        })}
      </div>

      <header className="topbar">
        <a href="#home" className="brand" onClick={() => setMobileOpen(false)}>
          <span className="brand-name">Saravana Priyan</span>
          <span className="brand-sub">Portfolio</span>
        </a>

        <nav className="desktop-nav" aria-label="Main navigation">
          {navLinks.map((item) => (
            <a key={item.href} href={item.href} className="nav-link">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="topbar-right">
          <div className="theme-switch" role="group" aria-label="Theme switcher">
            <button
              type="button"
              className={!isSakura ? 'active' : ''}
              onClick={(event) => handleThemeSwitch('dark', event)}
            >
              <MoonStar size={14} />
              Dark
            </button>
            <button
              type="button"
              className={isSakura ? 'active' : ''}
              onClick={(event) => handleThemeSwitch('sakura', event)}
            >
              <SunMedium size={14} />
              Sakura
            </button>
          </div>

          <button
            type="button"
            className="burger"
            aria-label="Toggle mobile menu"
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </header>

      <nav className={`mobile-nav ${mobileOpen ? 'open' : ''}`} aria-label="Mobile navigation">
        {navLinks.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="mobile-nav-link"
            onClick={() => setMobileOpen(false)}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <main>
        <section id="home" className="hero">
          <motion.div
            className="hero-text"
            variants={heroContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.p className="eyebrow" variants={heroItem}>Software Developer</motion.p>
            <motion.h1 variants={heroItem}>Saravana Priyan</motion.h1>
            <motion.p className="lead" variants={heroItem}>
              Building reliable web products with clear UX, practical engineering, and clean visual systems.
            </motion.p>

            <motion.div className="hero-actions" variants={heroItem}>
              <a href="#contact" className="btn-primary">
                Let&apos;s Work
                <ArrowUpRight size={14} />
              </a>
              <a href="#projects" className="btn-secondary">View Projects</a>
            </motion.div>

            <motion.div className="hero-stats" variants={heroItem}>
              <div className="stat-pill">
                <span className="stat-num">3+</span>
                <span className="stat-label">Projects</span>
              </div>
              <div className="stat-pill">
                <span className="stat-num">5+</span>
                <span className="stat-label">Tools</span>
              </div>
              <div className="stat-pill">
                <span className="stat-num">4</span>
                <span className="stat-label">Certs</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div className="hero-card-wrap gsap-reveal" variants={cardVariants} initial="hidden" animate="visible">
            <div className="card-glow" aria-hidden="true" />
            <HoverRevealCard
              className="main-hero-card"
              title="Profile"
              frontImage={frontImage}
              backImage={backImage}
            />
          </motion.div>
        </section>

        <section id="about" className="gsap-reveal">
          <div className="section-header">
            <p className="section-label"><BookOpen size={14} /> About</p>
            <h2>Focused, practical, and product-minded</h2>
          </div>

          <div className="about-grid">
            <article className="glass-card about-summary">
              <p>
                I design and build web experiences that prioritize speed, usability, and maintainable code.
                My approach is simple: solve real user needs, keep interfaces intentional, and ship with care.
              </p>
              <div className="about-tags">
                <span className="tag">Product Thinking</span>
                <span className="tag">Performance</span>
                <span className="tag">Clean UI</span>
                <span className="tag">Frontend Engineering</span>
              </div>
            </article>

            <aside className="glass-card about-info">
              <h3>Quick Info</h3>
              <ul className="info-list">
                <li><MapPin size={16} />Tamil Nadu, India</li>
                <li><Mail size={16} /><a href="mailto:saravanapriyan2004@gmail.com">saravanapriyan2004@gmail.com</a></li>
                <li><Phone size={16} /><a href="tel:+918122104454">+91 81221 04454</a></li>
              </ul>
            </aside>
          </div>
        </section>

        <section id="education" className="gsap-reveal">
          <div className="section-header">
            <p className="section-label"><GraduationCap size={14} /> Education</p>
            <h2>Academic foundation</h2>
          </div>

          <div className="timeline">
            <article className="timeline-item">
              <span className="timeline-dot" aria-hidden="true" />
              <div className="glass-card timeline-card">
                <div className="timeline-head">
                  <div>
                    <h3>B.Tech Information Technology</h3>
                    <p className="timeline-inst">Kongu Engineering College</p>
                  </div>
                  <span className="timeline-badge">2022 - 2026</span>
                </div>
                <p className="timeline-detail">
                  Current CGPA: <strong>8.04</strong>
                </p>
              </div>
            </article>
          </div>
        </section>

        <section id="skills" className="gsap-reveal">
          <div className="section-header">
            <p className="section-label"><Code2 size={14} /> Skills</p>
            <h2>Tools I use to deliver work</h2>
          </div>

          <div className="skills-bento">
            {Object.values(skills).map((group) => {
              const Icon = group.icon
              return (
                <article key={group.labelEn} className="glass-card skill-card">
                  <div className="skill-card-header">
                    <span className="skill-icon">
                      <Icon size={16} />
                    </span>
                    <h3>{group.labelEn}</h3>
                  </div>
                  <div className="skill-pills">
                    {group.items.map((item) => (
                      <span key={item} className="skill-pill">{item}</span>
                    ))}
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <section id="projects" className="gsap-reveal">
          <div className="section-header">
            <p className="section-label"><Briefcase size={14} /> Projects</p>
            <h2>Selected work</h2>
          </div>

          <div className="project-list">
            {projects.map((project) => (
              <article key={project.num} className="glass-card project-card">
                <span className="project-num">{project.num}</span>
                <div>
                  <div className="project-head">
                    <h3>{project.title}</h3>
                    <div className="project-stack">
                      {project.stack.map((stackItem) => (
                        <span key={stackItem} className="stack-badge">{stackItem}</span>
                      ))}
                    </div>
                  </div>
                  <ul className="project-bullets">
                    {project.bullets.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="certifications" className="gsap-reveal">
          <div className="section-header">
            <p className="section-label"><Sparkles size={14} /> Credentials</p>
            <h2>Certifications and learning</h2>
          </div>

          <div className="certs-grid">
            <article className="glass-card pub-card">
              <span className="pub-tag">Focus Area</span>
              <h3>Data & Web Engineering</h3>
              <p>
                I focus on practical software work: building dependable interfaces, using data responsibly,
                and improving real workflows.
              </p>
            </article>

            <div className="cert-list">
              {certifications.map((cert) => (
                <article key={cert.text} className="glass-card cert-item">
                  <span className="cert-icon">
                    <cert.icon size={16} />
                  </span>
                  <span>{cert.text}</span>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <section id="contact" className="contact gsap-reveal">
        <div className="contact-inner">
          <div className="contact-text">
            <p className="section-label"><Users size={14} /> Contact</p>
            <h2>Open to internships and project collaborations</h2>
            <p>
              If you are building something useful and need a dependable developer, I would love to connect.
            </p>
          </div>

          <div className="contact-links">
            <a href="mailto:saravanapriyan2004@gmail.com" className="contact-btn primary">
              <Mail size={16} /> Email Me
            </a>
            <a href="tel:+918122104454" className="contact-btn">
              <Phone size={16} /> Call
            </a>
          </div>
        </div>
      </section>

      <p className="footer-copy">© {new Date().getFullYear()} Saravana Priyan. Built with clarity and care.</p>
    </div>
  )
}

export default App
