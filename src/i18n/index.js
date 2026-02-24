import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import enCommon from './locales/en/common.json'
import enHome from './locales/en/home.json'
import enServices from './locales/en/services.json'
import enCaseStudies from './locales/en/caseStudies.json'
import enAbout from './locales/en/about.json'
import enContact from './locales/en/contact.json'

import arCommon from './locales/ar/common.json'
import arHome from './locales/ar/home.json'
import arServices from './locales/ar/services.json'
import arCaseStudies from './locales/ar/caseStudies.json'
import arAbout from './locales/ar/about.json'
import arContact from './locales/ar/contact.json'

// Gulf region ISO country codes
const GULF_COUNTRIES = ['AE', 'SA', 'QA', 'BH', 'KW', 'OM']
const GULF_LOCALES = ['ar-AE', 'ar-SA', 'ar-QA', 'ar-BH', 'ar-KW', 'ar-OM']

function detectLanguage() {
  // 1. User manually chose a language — respect it
  const stored = localStorage.getItem('dcimal-lang')
  if (stored === 'en' || stored === 'ar') return stored

  // 2. Browser language is Arabic — use it immediately
  const browserLang = navigator.language || navigator.userLanguage || ''
  if (GULF_LOCALES.includes(browserLang) || browserLang.startsWith('ar')) {
    return 'ar'
  }

  // 3. Default to English; geo-detection will override if Gulf IP
  return 'en'
}

// Async IP geolocation — runs after initial render on first visit only
function detectByGeo() {
  // Skip if user already made a manual choice
  if (localStorage.getItem('dcimal-lang')) return

  // Skip if we already did a geo check this session
  if (sessionStorage.getItem('dcimal-geo-checked')) return
  sessionStorage.setItem('dcimal-geo-checked', '1')

  fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(3000) })
    .then(res => res.json())
    .then(data => {
      if (data.country_code && GULF_COUNTRIES.includes(data.country_code)) {
        if (i18n.language !== 'ar') {
          i18n.changeLanguage('ar')
          localStorage.setItem('dcimal-lang', 'ar')
        }
      } else {
        // Not Gulf — lock in English so we don't check again
        localStorage.setItem('dcimal-lang', 'en')
      }
    })
    .catch(() => {
      // Geo API failed — keep current language, don't persist
    })
}

i18n.use(initReactI18next).init({
  resources: {
    en: {
      common: enCommon,
      home: enHome,
      services: enServices,
      caseStudies: enCaseStudies,
      about: enAbout,
      contact: enContact,
    },
    ar: {
      common: arCommon,
      home: arHome,
      services: arServices,
      caseStudies: arCaseStudies,
      about: arAbout,
      contact: arContact,
    },
  },
  lng: detectLanguage(),
  fallbackLng: 'en',
  defaultNS: 'common',
  interpolation: {
    escapeValue: false,
  },
})

// Fire geo-detection after i18n is ready
detectByGeo()

export default i18n
