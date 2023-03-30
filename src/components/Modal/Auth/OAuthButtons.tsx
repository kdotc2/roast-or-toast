import React from 'react'
import { auth } from '../../../firebase/clientApp'
import { useRouter } from 'next/router'
import { getAdditionalUserInfo } from 'firebase/auth'
import { useSetRecoilState } from 'recoil'
import { newUserModalState } from '@/atoms/newUserModalAtom'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth'

const OAuthButtons = () => {
  const router = useRouter()
  const setNewUserModalState = useSetRecoilState(newUserModalState)
  const [signInWithGoogle, _, loading, error] = useSignInWithGoogle(auth)

  const signIn = async () => {
    signInWithGoogle().then((result: any) => {
      const isFirstSignin = getAdditionalUserInfo(result)?.isNewUser
      if (isFirstSignin) {
        setNewUserModalState({ open: true, view: 'newUser' })
      } else {
        router.push('/')
      }
    })
  }

  return (
    <div className="mb-4 flex">
      <button
        className="flex w-full items-center justify-center rounded border py-2 text-sm font-medium hover:bg-gray-200 dark:border-gray-700 dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white"
        onClick={signIn}
      >
        <div className="flex items-center gap-4">
          <div className="h-5 w-5">
            <svg viewBox="0 0 48 48">
              <title>Google Logo</title>
              <clipPath id="g">
                <path d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z" />
              </clipPath>
              <g clipPath="url(#g)">
                <path fill="#FBBC05" d="M0 37V11l17 13z" />
                <path fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z" />
                <path fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z" />
                <path fill="#4285F4" d="M48 48L17 24l-4-3 35-10z" />
              </g>
            </svg>
          </div>
          Continue with Google
        </div>
      </button>
    </div>
  )
}
export default OAuthButtons
