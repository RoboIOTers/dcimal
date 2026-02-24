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

// Gulf region country codes
const GULF_LOCALES = ['ar-AE', 'ar-SA', 'ar-QA', 'ar-BH', 'ar-KW', 'ar-OM']

function detectLanguage() {
  // 1. Check localStorage for persisted choice
  const stored = localStorage.getItem('dcimal-lang')
  if (stored === 'en' || stored === 'ar') return stored

  // 2. Check browser language for Gulf region
  const browserLang = navigator.language || navigator.userLanguage || ''
  if (GULF_LOCALES.includes(browserLang) || browserLang.startsWith('ar')) {
    return 'ar'
  }

  return 'en'
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

export default i18n
