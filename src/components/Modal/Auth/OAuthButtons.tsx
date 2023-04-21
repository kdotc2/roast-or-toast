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
    <button
      className="flex h-[40px] w-full items-center justify-center rounded border border-[#d4d4d4] py-2 text-sm font-medium dark:border-[#525252]"
      onClick={signIn}
    >
      <div className="flex items-center gap-4 text-[#737373] dark:text-[#a3a3a3]">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M15.68 8.18183C15.68 7.61456 15.6291 7.06911 15.5345 6.54547H8V9.64002H12.3055C12.12 10.64 11.5564 11.4873 10.7091 12.0546V14.0618H13.2945C14.8073 12.6691 15.68 10.6182 15.68 8.18183Z"
            fill="#4285F4"
          ></path>
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8 16C10.16 16 11.9709 15.2837 13.2945 14.0618L10.7091 12.0546C9.99273 12.5346 9.07636 12.8182 8 12.8182C5.91636 12.8182 4.15272 11.4109 3.52363 9.52002H0.850906V11.5927C2.16727 14.2073 4.87272 16 8 16Z"
            fill="#34A853"
          ></path>
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M3.52364 9.52001C3.36364 9.04001 3.27273 8.52729 3.27273 8.00001C3.27273 7.47274 3.36364 6.96001 3.52364 6.48001V4.40729H0.850909C0.309091 5.48729 0 6.70911 0 8.00001C0 9.29092 0.309091 10.5127 0.850909 11.5927L3.52364 9.52001Z"
            fill="#FBBC05"
          ></path>
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8 3.18182C9.17454 3.18182 10.2291 3.58545 11.0582 4.37818L13.3527 2.08364C11.9673 0.792727 10.1564 0 8 0C4.87272 0 2.16727 1.79273 0.850906 4.40727L3.52363 6.48C4.15272 4.58909 5.91636 3.18182 8 3.18182Z"
            fill="#EA4335"
          ></path>
        </svg>
        Continue with Google
      </div>
    </button>
  )
}
export default OAuthButtons
