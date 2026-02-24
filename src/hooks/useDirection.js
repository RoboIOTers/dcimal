import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export default function useDirection() {
  const { i18n } = useTranslation()

  useEffect(() => {
    const dir = i18n.language === 'ar' ? 'rtl' : 'ltr'
    const lang = i18n.language === 'ar' ? 'ar' : 'en'
    document.documentElement.setAttribute('dir', dir)
    document.documentElement.setAttribute('lang', lang)
  }, [i18n.language])

  return i18n.language === 'ar' ? 'rtl' : 'ltr'
}
