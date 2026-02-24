import { ArrowRight, ArrowLeft } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function DirectionalArrow({ size = 16, ...props }) {
  const { i18n } = useTranslation()
  const Icon = i18n.language === 'ar' ? ArrowLeft : ArrowRight
  return <Icon size={size} {...props} />
}
