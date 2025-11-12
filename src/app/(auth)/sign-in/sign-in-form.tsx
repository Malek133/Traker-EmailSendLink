'use client'

import * as React from 'react'

import {FormSubmitServerButton as FormSubmitButton} from '@/components/forms/form-submit-button'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import Link from 'next/link'
import {cn} from '@/lib/utils'
import {signInAction} from './action'
import {useActionState} from 'react'
import { signIn } from 'next-auth/react'

type SignInFormProps = React.HTMLAttributes<HTMLDivElement>

export function SignInForm({className, ...props}: SignInFormProps) {
  // eslint-disable-next-line unicorn/no-useless-undefined
  const [state, formAction] = useActionState(signInAction, undefined)

  // Fonction pour Google SignIn
  const handleGoogleSignIn = async () => {
    try {
      await signIn('google', { callbackUrl: '/dashboard' })
    } catch (err) {
      console.error('Erreur Google SignIn:', err)
    }
  }

  return (
    <div className={cn('grid gap-4', className)} {...props}>
      <form action={formAction}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              name="email"
              placeholder="name@example.com"
              autoCapitalize="none"
              autoCorrect="off"
              autoComplete="email"
            />
            <div aria-live="polite" id={`email-error`} aria-atomic="true">
              {state && (
                <p className="text-sm font-medium text-destructive">{state}</p>
              )}
            </div>
          </div>
          <FormSubmitButton>Se connecter</FormSubmitButton>
        </div>
      </form>

      <div className="flex items-center gap-2 mt-4">
        <span className="flex-1 border-t border-muted" />
        <span className="text-sm text-muted-foreground">ou</span>
        <span className="flex-1 border-t border-muted" />
      </div>

      {/* Bouton Google */}
      <button
        type="button"
        onClick={handleGoogleSignIn}
        className="mt-4 w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition-colors"
      >
        Se connecter avec Google
      </button>

      <p className="text-sm text-muted-foreground">
        Pas de compte ?{' '}
        <Link href="/sign-up" className="text-primary underline">
          S&apos;inscrire
        </Link>
      </p>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
      </div>
    </div>
  )
}
