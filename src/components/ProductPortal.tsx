'use client'

import Image from 'next/image'
import {
  ArrowRight,
  Braces,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Lightbulb,
  LockKeyhole,
  Mail,
  MessageCircle,
  Palette,
  Radar,
  Radio,
  Wrench
} from 'lucide-react'
import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from 'react'
import type { Language } from '@/lib/i18n'

interface ProductPortalProps {
  lang?: Language
  onEnterReader?: () => void
  onLanguageChange?: (lang: Language) => void
}

interface PortfolioProduct {
  name: string
  titleZh: string
  titleEn: string
  descZh: string
  descEn: string
  image: string
  tone: 'feynman' | 'proof' | 'vault' | 'kids' | 'radio'
  statusZh: string
  statusEn: string
  tagsZh?: string[]
  tagsEn?: string[]
  action?: 'reader'
  href?: string
  linkZh?: string
  linkEn?: string
}

const products: PortfolioProduct[] = [
  { name: 'Feynman Reader', titleZh: '费曼读书助手', titleEn: 'Feynman Reader', descZh: '把一本书读成自己的理解：解释、追问、复习，留下可回看的学习轨迹。', descEn: 'Turn a book into your own understanding through explanation, questions, and review.', image: '/portfolio/feynman-reader-latest.png', tone: 'feynman', statusZh: '已上线', statusEn: 'Live', action: 'reader', tagsZh: ['阅读理解', '费曼学习法', 'AI 助手'], tagsEn: ['Reading insight', 'Feynman method', 'AI study coach'], href: 'https://reader.deline.top/', linkZh: '打开读书助手', linkEn: 'Open reader' },
  { name: 'AnonyProof', titleZh: 'AnonyProof · 匿证', titleEn: 'AnonyProof', descZh: '匿名提交敏感反馈，并用私密编号查看处理进展。', descEn: 'Submit sensitive feedback anonymously and follow its progress with a private tracking ID.', image: '/portfolio/anonyproof-latest.webp', tone: 'proof', statusZh: '已上线', statusEn: 'Live', tagsZh: ['匿名提交', '反馈找回', '进度跟进'], tagsEn: ['Anonymous', 'Revisit feedback', 'Track progress'], href: 'https://anonyproof.deline.top/' },
  { name: 'StarVault Imprint', titleZh: 'StarVault Imprint · 星仓印记', titleEn: 'StarVault Imprint', descZh: '持续观察 GitHub 项目，把值得关注的变化整理成行动线索。', descEn: 'Monitor GitHub projects and turn meaningful changes into actionable signals.', image: '/portfolio/starvault-imprint-latest.webp', tone: 'vault', statusZh: '已上线', statusEn: 'Live', tagsZh: ['项目监控', '变化追踪', '机会研判'], tagsEn: ['Project watch', 'Change tracking', 'Opportunity signals'], href: 'https://starvault.deline.top/' },
  { name: 'Magic Draw Kids', titleZh: 'Magic Draw Kids', titleEn: 'Magic Draw Kids', descZh: '把想象拆成一步步可完成的绘画任务，让孩子边画边找到自己的方法。', descEn: 'Turn imagination into approachable drawing steps so children can discover their own way to create.', image: '/portfolio/magic-draw-kids.png', tone: 'kids', statusZh: '研发中', statusEn: 'In development', tagsZh: ['分步绘画', '儿童创作', '轻松上手'], tagsEn: ['Step-by-step', 'Creative play', 'Easy to start'], href: 'https://magic-draw-kids.deline.top/' },
  { name: 'Tingjian', titleZh: '听间 · Tingjian', titleEn: 'Tingjian', descZh: '小蓝主持的 AI 音乐电台，选一个主题，让口播与在线歌曲串起一段收听时光。', descEn: 'An AI music radio hosted by Xiaolan, weaving spoken introductions and online songs into themed shows.', image: '/portfolio/tingjian-latest.png', tone: 'radio', statusZh: '已上线', statusEn: 'Live', tagsZh: ['主题电台', '点歌互动', '收藏与历史'], tagsEn: ['Themed shows', 'Song requests', 'Favorites & history'], href: 'https://audio.deline.top/', linkZh: '在线收听', linkEn: 'Listen online' }
]

const productIcons = [Lightbulb, LockKeyhole, Radar, Palette, Radio]

const skills = [
  ['demand-clarity-coach', '需求澄清', 'Demand clarity', '把模糊想法变成可判断、可执行的需求。', 'Turn fuzzy ideas into actionable requirements.'],
  ['enterprise-diagnostic-consultant', '企业诊断', 'Enterprise diagnosis', '在真实利益与执行约束下识别问题。', 'Diagnose organizations within real constraints.'],
  ['ui-ux-design-router', '设计路由', 'Design routing', '统一产品、品牌与平面设计的决策路径。', 'Route product, brand, and graphic design coherently.'],
  ['project-from-idea-to-product', '项目总控', 'Product delivery', '把软件想法持续推进到上线与交付。', 'Carry software ideas through launch and delivery.'],
  ['crisis-pr-response', '危机回应', 'Crisis response', '为复杂公关事件建立事实、行动与风险边界。', 'Structure facts, action, and boundaries in a crisis.'],
  ['fatal-ai-resignation', 'AI 事故辞职信', 'AI incident resignation', '把 AI 事故复盘与职场沟通变成可执行的回应。', 'Turn AI incident reviews and workplace communication into practical responses.']
]

const tools = [
  ['BidCenter-Collector', '采招网采集助手', 'BidCenter Collector', '采招信息采集、过程诊断与 Excel 导出。', 'Collect procurement data, diagnose the process, and export to Excel.'],
  ['traveling', '旅行规划实验', 'Traveling', '旅行攻略与路线规划实验。', 'An experiment in travel guides and route planning.']
]

const facetPaths = {
  yellow: 'M7 29C8.3 16.9 16.9 8.3 29 7v13.2a12.3 12.3 0 0 0-8.8 8.8H7Z',
  blue: 'M35 7c12.1 1.3 20.7 9.9 22 22H43.8a12.3 12.3 0 0 0-8.8-8.8V7Z',
  coral: 'M57 35c-1.3 12.1-9.9 20.7-22 22V43.8a12.3 12.3 0 0 0 8.8-8.8H57Z',
  mint: 'M29 57C16.9 55.7 8.3 47.1 7 35h13.2a12.3 12.3 0 0 0 8.8 8.8V57Z'
} as const

const facetOrigins = {
  yellow: [-9, -9],
  blue: [9, -9],
  coral: [9, 9],
  mint: [-9, 9]
} as const

const fragmentShapes = [
  'M-1.15-.8L.9-1.05L1.25.45L.15 1.15L-1.25.55Z',
  'M-1.2-.35L-.2-1.2L1.2-.55L.85.95L-.75 1.05Z',
  'M-.9-1.1L1.15-.6L.95.9L-.45 1.2L-1.2.15Z',
  'M-1.25-.65L.35-1.1L1.2.15L.4 1.2L-1.05.8Z'
] as const

const fragmentSeeds = Array.from({ length: 96 }, (_, index) => {
  const angle = ((index * 137.508) % 82 + 4) * Math.PI / 180
  const radius = 13 + ((index * 29) % 120) / 10
  return [32 - Math.cos(angle) * radius, 32 - Math.sin(angle) * radius, .72 + (index % 5) * .07] as const
})

const rotateFragment = ([x, y, scale]: readonly [number, number, number], turns: number) => {
  let nextX = x
  let nextY = y
  for (let index = 0; index < turns; index += 1) [nextX, nextY] = [64 - nextY, nextX]
  return [nextX, nextY, scale] as const
}

const rotatePoint = (x: number, y: number, degrees: number) => {
  const radians = degrees * Math.PI / 180
  const offsetX = x - 32
  const offsetY = y - 32
  const round = (value: number) => Math.round(value * 1000) / 1000
  return [round(32 + offsetX * Math.cos(radians) - offsetY * Math.sin(radians)), round(32 + offsetX * Math.sin(radians) + offsetY * Math.cos(radians))] as const
}

const allLogoDotParticles = (Object.keys(facetPaths) as Array<keyof typeof facetPaths>).flatMap((tone, toneIndex) =>
  fragmentSeeds.map((seed, index) => {
    const [sourceX, sourceY, scale] = rotateFragment(seed, toneIndex)
    const [rotatedX, rotatedY] = rotatePoint(sourceX, sourceY, 45)
    const [originX, originY] = facetOrigins[tone]
    const radialX = rotatedX - 32
    const radialY = rotatedY - 32
    const cross = ((index % 7) - 3) * .85
    const length = Math.max(Math.hypot(radialX, radialY), 1)
    const crossX = -radialY / length * cross
    const crossY = radialX / length * cross
    return [
      tone,
      fragmentShapes[index % fragmentShapes.length],
      Math.round((rotatedX + originX) * 1000) / 1000,
      Math.round((rotatedY + originY) * 1000) / 1000,
      Math.round((rotatedX + originX + radialX * .9 + crossX) * 1000) / 1000,
      Math.round((rotatedY + originY + radialY * .9 + crossY) * 1000) / 1000,
      Math.round((rotatedX + originX + radialX * 3.65 + crossX * 2.4) * 1000) / 1000,
      Math.round((rotatedY + originY + radialY * 3.65 + crossY * 2.4) * 1000) / 1000,
      scale,
      toneIndex * fragmentSeeds.length + index
    ] as const
  })
)

const sectionIds = ['work', 'skills', 'tools', 'about', 'contact'] as const

function GitHubMark({ size = 19 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M12 .7a11.5 11.5 0 0 0-3.64 22.41c.58.11.79-.25.79-.56v-2.24c-3.22.7-3.9-1.37-3.9-1.37-.52-1.34-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.57-.29-5.27-1.28-5.27-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.47.11-3.05 0 0 .97-.31 3.16 1.18A10.98 10.98 0 0 1 12 6.11c.98 0 1.96.13 2.88.39 2.19-1.49 3.15-1.18 3.15-1.18.63 1.58.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.71 5.39-5.29 5.68.42.36.79 1.07.79 2.16v3.25c0 .31.21.68.8.56A11.5 11.5 0 0 0 12 .7Z" />
    </svg>
  )
}

export default function ProductPortal({ lang = 'zh', onEnterReader, onLanguageChange }: ProductPortalProps) {
  const isZh = lang === 'zh'
  const shellRef = useRef<HTMLDivElement>(null)
  const transitionTimerRef = useRef<number | null>(null)
  const [activeProductIndex, setActiveProductIndex] = useState(0)
  const [activeSection, setActiveSection] = useState('')
  const [isLeaving, setIsLeaving] = useState(false)
  const [isNavElevated, setIsNavElevated] = useState(false)
  const activeProduct = products[activeProductIndex]

  useEffect(() => {
    const shell = shellRef.current
    if (!shell) return
    const items = Array.from(shell.querySelectorAll<HTMLElement>('.portfolio-reveal'))
    shell.classList.add('reveal-ready')
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      })
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 })
    items.forEach(item => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const observers = sectionIds.map(id => {
      const section = document.getElementById(id)
      if (!section) return null
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setActiveSection(id)
      }, { rootMargin: '-20% 0px -65% 0px' })
      observer.observe(section)
      return observer
    })
    return () => observers.forEach(observer => observer?.disconnect())
  }, [])

  useEffect(() => {
    const shell = shellRef.current
    if (!shell) return
    let frame = 0
    const updateProgress = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const range = document.documentElement.scrollHeight - window.innerHeight
        const progress = range > 0 ? Math.min(1, window.scrollY / range) : 0
        shell.style.setProperty('--page-progress', String(progress))
        setIsNavElevated(window.scrollY > 12)
      })
    }
    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light')
  }, [])

  useEffect(() => {
    document.documentElement.lang = isZh ? 'zh-CN' : 'en'
    document.title = isZh ? '物与日新 · EverNews | Wilson / HachikoJ' : 'EverNews · 物与日新 | Wilson / HachikoJ'
  }, [isZh])

  useEffect(() => {
    const resetRouteTransition = () => {
      if (transitionTimerRef.current) window.clearTimeout(transitionTimerRef.current)
      transitionTimerRef.current = null
      setIsLeaving(false)
    }

    window.addEventListener('pageshow', resetRouteTransition)
    return () => {
      window.removeEventListener('pageshow', resetRouteTransition)
      if (transitionTimerRef.current) window.clearTimeout(transitionTimerRef.current)
    }
  }, [])

  const scrollToSection = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    const section = document.getElementById(id)
    if (!section) return
    event.preventDefault()
    history.replaceState(null, '', `#${id}`)
    section.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' })
  }

  const selectProduct = (index: number, revealWork = false) => {
    setActiveProductIndex(index)
    if (revealWork) {
      document.getElementById('work')?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        block: 'start'
      })
    }
  }

  const rotateProduct = (direction: -1 | 1) => {
    setActiveProductIndex(current => (current + direction + products.length) % products.length)
  }

  const enterReader = () => {
    if (isLeaving) return
    onEnterReader?.()
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }
    setIsLeaving(true)
    transitionTimerRef.current = window.setTimeout(() => {
      transitionTimerRef.current = null
      setIsLeaving(false)
    }, 420)
  }

  return (
    <div ref={shellRef} className="portfolio-shell min-h-screen overflow-x-clip bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <header className={`portfolio-nav ${isNavElevated ? 'is-elevated' : ''}`}>
        <div className="portfolio-progress" aria-hidden="true" />
        <div className="mx-auto flex min-h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#top" onClick={event => scrollToSection(event, 'top')} className="group flex min-h-11 min-w-0 items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] sm:gap-3">
            <span className="portfolio-signature" aria-hidden="true"><img src="/brand/evernews-mark.svg" alt="" /></span>
            <span className="min-w-0"><strong className="block truncate text-sm">{isZh ? '物与日新 · EverNews' : 'EverNews · 物与日新'}</strong><span className="block truncate text-[11px] text-[var(--text-secondary)]">by Wilson / HachikoJ</span></span>
          </a>
          <nav aria-label={isZh ? '主要导航' : 'Main navigation'} className="hidden items-center gap-1 md:flex">
            {[
              ['work', isZh ? '作品' : 'Work'],
              ['skills', 'Skills'],
              ['tools', isZh ? '开源' : 'Open source'],
              ['about', isZh ? '关于' : 'About'],
              ['contact', isZh ? '联系' : 'Contact']
            ].map(([id, label]) => <a key={id} href={`#${id}`} onClick={event => scrollToSection(event, id)} className={`portfolio-nav-link ${activeSection === id ? 'is-active' : ''}`}>{label}</a>)}
          </nav>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => onLanguageChange?.(isZh ? 'en' : 'zh')} className="portfolio-language-button" aria-label={isZh ? 'Switch to English' : '切换至中文'}>{isZh ? 'EN' : '中'}</button>
            <a href="https://github.com/HachikoJ" target="_blank" rel="noopener noreferrer" className="portfolio-icon-link" aria-label={isZh ? '打开 GitHub 主页' : 'Open GitHub profile'} title="GitHub"><GitHubMark /></a>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="portfolio-hero mx-auto max-w-6xl px-4 pb-10 pt-12 sm:px-6 sm:pt-16 lg:pb-16 lg:pt-20">
          <div className="portfolio-hero-copy portfolio-reveal">
            <h1 className="portfolio-brand-title"><span className="portfolio-brand-cn">物与日新</span><span className="portfolio-brand-dot" aria-hidden="true"><svg viewBox="0 0 64 64" focusable="false"><g className="portfolio-dot-facets"><g className="facet facet-yellow"><path className="facet-shape" d={facetPaths.yellow}/></g><g className="facet facet-blue"><path className="facet-shape" d={facetPaths.blue}/></g><g className="facet facet-coral"><path className="facet-shape" d={facetPaths.coral}/></g><g className="facet facet-mint"><path className="facet-shape" d={facetPaths.mint}/></g></g><g className="portfolio-dot-particles">{allLogoDotParticles.map(([tone, path, originX, originY, midX, midY, burstX, burstY, scale, index]) => <path key={`${tone}-${index}`} className={`particle particle-${tone}`} d={path} style={{ '--particle-index': String(index), '--particle-origin-x': `${originX}px`, '--particle-origin-y': `${originY}px`, '--particle-mid-x': `${midX}px`, '--particle-mid-y': `${midY}px`, '--particle-burst-x': `${burstX}px`, '--particle-burst-y': `${burstY}px`, '--particle-scale': String(scale), '--particle-origin-r': '34deg', '--particle-spin': `${(index % 9) * 17 - 68}deg` } as CSSProperties}/>)}</g><rect className="portfolio-dot-center" width="8" height="8" x="28" y="28" rx="2.4" transform="rotate(45 32 32)"/></svg></span><span className="sr-only"> · </span><span className="portfolio-brand-en">EverNews</span></h1>
            <p className="portfolio-hero-statement">{isZh ? <>看见问题，<strong>做一点具体的东西。</strong></> : <>Notice a problem. <strong>Make something concrete.</strong></>}</p>
            <div className="portfolio-hero-summary">
              <p className={isZh ? undefined : 'portfolio-hero-summary-en'}>{isZh ? <>从阅读、生活、工作与各种偶然的念头出发，把值得继续思考的问题，做成可以试用的<strong className="portfolio-result-emphasis">小作品</strong>。</> : <>I start with questions from reading, everyday life, work, and whatever else catches my attention, then turn a few of them into <strong className="portfolio-result-emphasis">small, usable experiments</strong>.</>}</p>
              <div className="portfolio-hero-actions">
                <button type="button" onClick={enterReader} className="portfolio-featured-entry">
                  <span className="portfolio-featured-entry-icon" aria-hidden="true"><Lightbulb /></span>
                  <span className="portfolio-featured-entry-copy">
                    <small>{isZh ? '当前主推' : 'FEATURED NOW'}</small>
                    <strong>{isZh ? '费曼读书助手' : 'Feynman Reader'}</strong>
                    <span>{isZh ? '用费曼学习法真正读懂一本书' : 'Understand a book with the Feynman method'}</span>
                  </span>
                  <span className="portfolio-featured-entry-action">{isZh ? '立即进入' : 'Open'}<ArrowRight /></span>
                </button>
                <a href="#work" onClick={event => scrollToSection(event, 'work')} className="portfolio-hero-all-work">{isZh ? '浏览全部作品' : 'Explore all work'}<ArrowRight size={15} /></a>
              </div>
            </div>
          </div>

          <div className="portfolio-build-board portfolio-reveal" aria-label={isZh ? '产品概览' : 'Product portfolio'}>
            <div className="portfolio-build-board-head"><span>{isZh ? '产品概览' : 'PRODUCT PORTFOLIO'}</span><span><i aria-hidden="true" />{isZh ? '当前状态' : 'Current status'}</span></div>
            <div className="portfolio-build-lanes">
              {products.map((product, index) => {
                const Icon = productIcons[index]
                return <button key={product.name} type="button" aria-pressed={activeProductIndex === index} onClick={() => selectProduct(index, true)} className={`portfolio-build-lane tone-${product.tone} ${activeProductIndex === index ? 'is-active' : ''}`} style={{ '--lane-index': index } as CSSProperties}>
                  <span className="portfolio-build-icon"><Icon aria-hidden="true" /></span>
                  <span className="min-w-0"><strong>{product.name}</strong><small>{isZh ? product.statusZh : product.statusEn}</small></span>
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
              })}
            </div>
          </div>
        </section>

        <section id="work" className="portfolio-section portfolio-work-section border-y border-[var(--border)]">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
            <div className="portfolio-section-heading portfolio-reveal"><p>01 / {isZh ? '产品作品' : 'Products'}</p><h2>{isZh ? '从问题出发，做一些可试用的东西' : 'Small things to try, starting from a question'}</h2><span>{isZh ? '来自阅读、生活、工作与日常观察。' : 'Drawn from reading, everyday life, work, and close observation.'}</span></div>

            <div className="portfolio-workbench portfolio-reveal">
              <div className="portfolio-product-tabs" role="tablist" aria-label={isZh ? '选择产品' : 'Choose a product'}>
                {products.map((product, index) => <button key={product.name} type="button" role="tab" aria-selected={activeProductIndex === index} onClick={() => selectProduct(index)} className={`portfolio-product-tab tone-${product.tone} ${activeProductIndex === index ? 'is-active' : ''}`}>
                  <span>0{index + 1}</span><strong>{product.name}</strong><small>{isZh ? product.statusZh : product.statusEn}</small>
                </button>)}
              </div>

              <div className={`portfolio-product-stage tone-${activeProduct.tone}`} role="tabpanel" aria-live="polite">
                <div className="portfolio-stage-toolbar">
                  <span>{String(activeProductIndex + 1).padStart(2, '0')} / {String(products.length).padStart(2, '0')}</span>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => rotateProduct(-1)} aria-label={isZh ? '上一个产品' : 'Previous product'} title={isZh ? '上一个产品' : 'Previous product'}><ChevronLeft /></button>
                    <button type="button" onClick={() => rotateProduct(1)} aria-label={isZh ? '下一个产品' : 'Next product'} title={isZh ? '下一个产品' : 'Next product'}><ChevronRight /></button>
                  </div>
                </div>
                <div key={activeProduct.name} className="portfolio-stage-content">
                  <div className={`portfolio-stage-media ${activeProduct.action || activeProduct.tone === 'radio' ? 'is-product-interface' : ''}`}><Image src={activeProduct.image} alt={`${isZh ? activeProduct.titleZh : activeProduct.titleEn} ${isZh ? '产品界面' : 'product interface'}`} fill sizes="(min-width:1024px) 760px, 100vw" className={activeProduct.action || activeProduct.tone === 'radio' ? 'object-contain object-center' : activeProduct.tone === 'proof' ? 'object-cover object-center' : 'object-cover object-top'} priority={activeProductIndex === 0} /></div>
                  <div className="portfolio-stage-copy">
                    <div className="portfolio-stage-copy-main">
                      <h3 className="portfolio-stage-title"><span>{isZh ? activeProduct.titleZh : activeProduct.titleEn}</span>{activeProduct.tagsZh && <span className="portfolio-stage-title-tags">{(isZh ? activeProduct.tagsZh : activeProduct.tagsEn)?.map(tag => <span key={tag}>{tag}</span>)}</span>}</h3>
                      <p>{isZh ? activeProduct.descZh : activeProduct.descEn}</p>
                    </div>
                    <div className="portfolio-product-actions">
                      {activeProduct.href && <a href={activeProduct.href} target="_blank" rel="noopener noreferrer" className="portfolio-product-link">{isZh ? activeProduct.linkZh ?? '访问项目' : activeProduct.linkEn ?? 'Visit project'}<ExternalLink /></a>}
                      {activeProduct.href && <span className="portfolio-product-url">{new URL(activeProduct.href).hostname}</span>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="portfolio-section portfolio-skills-band border-b border-[var(--border)]">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
            <div className="portfolio-section-heading portfolio-reveal"><p>02 / Agent Skills</p><h2>{isZh ? '把做事的方法，变成可复用的能力' : 'Turning working methods into reusable capabilities'}</h2><span>{isZh ? '从弄清问题，到设计、交付和处理风险。' : 'From clarifying the problem to design, delivery, and risk response.'}</span></div>
            <div className="portfolio-skill-path mt-12">{skills.map(([slug, zh, en, descZh, descEn], index) => <a key={slug} href={`https://github.com/HachikoJ/${slug}`} target="_blank" rel="noopener noreferrer" className="portfolio-skill-step portfolio-reveal"><span className="portfolio-skill-number">{String(index + 1).padStart(2, '0')}</span><div><h3>{isZh ? zh : en}</h3><p>{isZh ? descZh : descEn}</p></div><ExternalLink size={16} aria-hidden="true" /></a>)}</div>
          </div>
        </section>

        <section id="tools" className="portfolio-section"><div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28"><div className="portfolio-section-heading portfolio-reveal"><p>03 / {isZh ? '开源与实验' : 'Open source & experiments'}</p><h2>{isZh ? '从具体问题开始的小工具' : 'Small tools that begin with concrete problems'}</h2></div><div className="mt-10 divide-y divide-[var(--border)] border-y border-[var(--border)]">{tools.map(([slug, titleZh, titleEn, descZh, descEn], index) => <a key={slug} href={`https://github.com/HachikoJ/${slug}`} target="_blank" rel="noopener noreferrer" className="portfolio-tool-row portfolio-reveal"><span className="portfolio-tool-index">0{index + 1}</span><span className="portfolio-tool-icon">{index === 0 ? <Wrench /> : <Braces />}</span><span className="min-w-0"><strong>{isZh ? titleZh : titleEn}</strong><small>{isZh ? descZh : descEn}</small></span><ArrowRight size={18} /></a>)}</div></div></section>

        <section id="about" className="portfolio-section portfolio-about border-y border-[var(--border)]"><div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[.85fr_1.15fr] lg:py-28"><div className="portfolio-reveal"><p className="portfolio-kicker">04 / {isZh ? '关于作者' : 'About'}</p><h2>{isZh ? '一个作者，边观察，边做小作品。' : 'One author, observing and making small things.'}</h2><p>{isZh ? 'Wilson / HachikoJ 是这些产品与方法的独立作者，从日常观察出发，把一些问题做成可以试用的小作品。' : 'Wilson / HachikoJ independently creates these products and methods, turning observations and questions into small things people can try.'}</p></div><div className="portfolio-principles">{[[isZh ? '先弄清问题' : 'Clarify first', isZh ? '不急着用功能掩盖判断。' : 'Do not hide weak judgment behind features.'], [isZh ? '做完整体验' : 'Build the whole experience', isZh ? '从第一次打开，到长期使用。' : 'From the first open to long-term use.'], [isZh ? '持续验证' : 'Keep validating', isZh ? '上线不是终点，使用才是答案。' : 'Launch is not the end. Use is the answer.']].map(([title, desc], index) => <div key={title} className="portfolio-principle portfolio-reveal"><span>0{index + 1}</span><h3>{title}</h3><p>{desc}</p></div>)}</div></div></section>

        <section id="contact" className="portfolio-section portfolio-contact"><div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(340px,.72fr)] lg:py-28"><div className="portfolio-reveal"><p className="portfolio-kicker">05 / {isZh ? '联系我' : 'Contact'}</p><h2>{isZh ? '关于产品、合作或反馈，欢迎直接找到我。' : 'For products, collaboration, or feedback, reach me directly.'}</h2><div className="portfolio-contact-links"><a href="mailto:18682408521@163.com" className="portfolio-contact-link"><Mail aria-hidden="true" /><span><small>{isZh ? '邮箱' : 'Email'}</small><strong>18682408521@163.com</strong></span><ArrowRight aria-hidden="true" /></a><div className="portfolio-contact-link"><MessageCircle aria-hidden="true" /><span><small>{isZh ? '微信' : 'WeChat'}</small><strong>hostrow</strong></span></div><a href="https://github.com/HachikoJ" target="_blank" rel="noopener noreferrer" className="portfolio-contact-link"><span className="portfolio-contact-brand"><GitHubMark /></span><span><small>GitHub</small><strong>HachikoJ</strong></span><ExternalLink aria-hidden="true" /></a></div></div><figure className="portfolio-contact-qr portfolio-reveal"><div><Image src="/community-qr.jpg" alt={isZh ? 'Wilson / HachikoJ 微信交流二维码' : 'Wilson / HachikoJ WeChat QR code'} width={930} height={1446} className="h-auto w-full object-contain" /></div><figcaption><span>{isZh ? '微信扫码交流' : 'Scan with WeChat'}</span><small>{isZh ? '产品交流 · 使用反馈 · 合作沟通' : 'Product discussion · Feedback · Collaboration'}</small></figcaption></figure></div></section>
      </main>

      <footer className="portfolio-footer"><div className="mx-auto grid max-w-6xl gap-3 px-4 py-7 text-center text-xs sm:grid-cols-3 sm:px-6 sm:text-left"><span>© 2026 Wilson / HachikoJ</span><a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer" className="sm:text-center">粤ICP备2025449309号-2</a><a href="#top" onClick={event => scrollToSection(event, 'top')} className="sm:text-right">{isZh ? '回到顶部' : 'Back to top'} ↑</a></div></footer>

      <div className={`portfolio-route-transition ${isLeaving ? 'is-active' : ''}`} aria-hidden={!isLeaving} aria-live="polite"><span className="portfolio-transition-panel panel-one" /><span className="portfolio-transition-panel panel-two" /><p>{isZh ? '正在进入费曼读书助手' : 'Opening Feynman Reader'}</p></div>
    </div>
  )
}
