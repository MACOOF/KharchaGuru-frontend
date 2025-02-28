import { useTranslations } from 'next-intl'
import { createColumns } from '../columns'

export const ColumnsWrapper = () => {
  const t = useTranslations('history.HistoryColumns')
  
  const translations = {
    select: {
      ariaLabel: t('select.ariaLabel'),
      rowAriaLabel: t('select.rowAriaLabel')
    },
    date: {
      label: t('date.label'),
      formatFull: t('date.formatFull'),
      formatShort: t('date.formatShort')
    },
    amount: {
      label: t('amount.label')
    },
    category: {
      label: t('category.label')
    },
    description: {
      label: t('description.label')
    },
    edit: {
      label: t('edit.label')
    }
  }

  return createColumns(translations)
} 