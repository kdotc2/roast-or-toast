import { auth } from '@/firebase/clientApp'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import OAuthButtons from './OAuthButtons'
import SignInWithEmail from './SignInWithEmail'
import ModalWrapper from '../ModalWrapper'

type Props = {
  close: () => void
}

// TODO this needs reverted partially. this can be triggered from a lot of places so we
// we should make one instance and use recoil to trigger it
export default function LoginModal({ close }: Props) {
  const [user] = useAuthState(auth)

  useEffect(() => {
    if (user) close()
  }, [user])

  const content = (
    <>
      <div className="pt-6">
        <div className="text-lg font-semibold">Log In / Sign Up</div>
      </div>

      <div className="relative">
        <div className="items-center justify-center space-y-4 pb-6 pt-6">
          <p className="text-sm">
            By continuing, you are agreeing to our{' '}
            <Link
              className="hover:underline"
              href="/terms"
              onClick={() => close()}
            >
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link
              className="hover:underline"
              href="/privacy"
              onClick={() => close()}
            >
              Privacy Policy
            </Link>
            .
          </p>
          <OAuthButtons />
          <SignInWithEmail close={() => close()} />
        </div>
      </div>
    </>
  )

  return <ModalWrapper child={content} close={() => close()} width={400} />
}
