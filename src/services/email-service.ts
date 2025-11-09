// import {
//   type CreateEmailOptions,
//   type CreateEmailRequestOptions,
//   Resend,
// } from 'resend'
// import InternalEmail from '../../react-email-starter/emails/internal-email'

// const resend = new Resend(process.env.RESEND_API_KEY)

// export const sendEmail = async (
//   payload: CreateEmailOptions,
//   options?: CreateEmailRequestOptions
// ) => {
//   if (process.env.NODE_ENV === 'development') {
//     payload.subject = `[DEV] ${payload.subject}`
//   }

//   const {error} = await resend.emails.send(
//     {
//       ...payload,
//       from: 'onboarding@resend.dev',
//       to: 'delivered@resend.dev',
//     },
//     options
//   )

//   if (error) {
//     console.error(error)
//     throw error
//   }
// }
import InternalEmail from '../../react-email-starter/emails/internal-email'
export const sendInternalEmail = async (subject: string, text: string) => {
  if (process.env.NODE_ENV !== 'production') {
    subject = `[DEV] ${subject}`
  }
  const emailFrom = process.env.EMAIL_FROM || 'delivered@resend.dev'
  const emailTo = process.env.EMAIL_TO || 'delivered@resend.dev'
  const {error} = await resend.emails.send({
    subject,
    from: emailFrom,
    to: emailTo,
    text,
    react: InternalEmail({
      preview: subject,
      content: text,
    }),
  })

  if (error) {
    console.error(error)
    throw error
  }
}


import {
  type CreateEmailOptions,
  type CreateEmailRequestOptions,
  Resend,
} from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendEmail = async (
  payload: CreateEmailOptions,
  options?: CreateEmailRequestOptions
) => {
  if (process.env.NODE_ENV === 'development') {
    payload.subject = `[DEV] ${payload.subject}`
  }

  const { from, to } = payload

  // ✅ Vérifie que les champs "to" et "from" sont bien fournis
  if (!to) throw new Error('Missing recipient email (to)')
  if (!from) throw new Error('Missing sender email (from)')

  // ✅ Envoie vers la vraie adresse du client, pas la sandbox
  const { error } = await resend.emails.send(
    {
      ...payload,
      from, // expéditeur (ton domaine vérifié)
      to,   // destinataire (l'utilisateur)
    },
    options
  )

  if (error) {
    console.error('❌ Erreur lors de l’envoi du mail :', error)
    throw error
  }

  console.log(`✅ E-mail envoyé à ${to}`)
}

