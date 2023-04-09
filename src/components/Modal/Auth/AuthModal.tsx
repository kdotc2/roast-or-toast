import { authModalState } from '@/atoms/authModalAtom'
import { auth } from '@/firebase/clientApp'
import FocusTrap from 'focus-trap-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRecoilState } from 'recoil'
import OAuthButtons from './OAuthButtons'
import SignInWithEmail from './SignInWithEmail'
import ModalWrapper from '../ModalWrapper'

type Props = {
  close: () => void
}

export default function AuthModal({close}:Props) {
  const [user] = useAuthState(auth)

  useEffect(() => {
    if (user) close()
  }, [user])

  const content = (
    <>
      <div className="pt-5">
        <h3 className="text-xl font-semibold">
          Log In / Sign Up
        </h3>
      </div>

      <div className="relative">
        <div className="items-center justify-center pb-5">
          <p className="py-4 text-sm">
            By continuing, you are agreeing to our{' '}
            <Link
              className="hover:underline"
              href="/terms"
              onClick={()=> close()}
            >
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link
              className="hover:underline"
              href="/privacy"
              onClick={()=>close()}
            >
              Privacy Policy
            </Link>
            .
          </p>
          <OAuthButtons />
          <p className="pb-4 text-center text-xs font-semibold uppercase text-gray-400 dark:text-gray-300">
            or
          </p>
          <SignInWithEmail />
        </div>
      </div>
    </>
  )

  return (
    <ModalWrapper child={content} close={() => close()}/>
  )
}
