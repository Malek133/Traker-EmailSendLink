// import {getWeek, parse} from 'date-fns'

// export const formattedDate = (date: Date) => {
//   const formatted = date.toLocaleDateString('fr-FR', {
//     year: '2-digit',
//     month: 'numeric',
//     day: 'numeric',
//   })
//   return formatted
// }

// export const getWeekFromLabel = (label: string, year: string) => {
  
//   const week = label.slice(0, 5)
//   const [day, month] = week.split('-')
//   const parsedDate = parse(
//     `${year}-${month}-${Number(day)}`,
//     'yyyy-MM-dd',
//     new Date()
//   )
//   const startWeek = getWeek(parsedDate)
//   return startWeek
// }

import { getWeek, parse } from 'date-fns'

export const formattedDate = (date: Date) => {
  const formatted = date.toLocaleDateString('fr-FR', {
    year: '2-digit',
    month: 'numeric',
    day: 'numeric',
  })
  return formatted
}

export const getWeekFromLabel = (label?: string, year?: string) => {
  if (!label || !year) {
    console.warn('⚠️ getWeekFromLabel appelé sans label ou sans année', { label, year })
    return 0 // retourne 0 ou une valeur par défaut
  }

  try {
    const week = label.slice(0, 5)
    const [day, month] = week.split('-')

    // sécurité supplémentaire : s'assurer que day et month sont valides
    if (!day || !month) {
      console.warn('⚠️ Format de label invalide :', label)
      return 0
    }

    const parsedDate = parse(
      `${year}-${month}-${Number(day)}`,
      'yyyy-MM-dd',
      new Date()
    )

    const startWeek = getWeek(parsedDate)
    return startWeek
  } catch (err) {
    console.error('❌ Erreur dans getWeekFromLabel :', err)
    return 0
  }
}

