'use client'

import { useEffect, useState } from 'react'
import ProductPortal from '@/components/ProductPortal'
import type { Language } from '@/lib/i18n'

const languageKey = 'evernews-language'
const legacyLanguageKey = 'ever-new-language'

export default function PortalPage() {
  const [lang, setLang] = useState<Language>('zh')

  useEffect(() => {
    const saved = window.localStorage.getItem(languageKey) ?? window.localStorage.getItem(legacyLanguageKey)
    if (saved === 'zh' || saved === 'en') setLang(saved)
  }, [])

  const changeLanguage = (nextLanguage: Language) => {
    setLang(nextLanguage)
    window.localStorage.setItem(languageKey, nextLanguage)
  }

  const openReader = () => {
    window.open('https://reader.deline.top/', '_blank', 'noopener,noreferrer')
  }

  return <ProductPortal lang={lang} onEnterReader={openReader} onLanguageChange={changeLanguage} />
}
