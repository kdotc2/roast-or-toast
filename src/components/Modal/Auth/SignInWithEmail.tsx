import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '@/firebase/clientApp'
import {
  getAdditionalUserInfo,
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithEmailLink,
} from 'firebase/auth'
import { useRouter } from 'next/router'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { newUserModalState } from '@/atoms/newUserModalAtom'
import { SpinningLoader } from '@/components/Posts/Loader'
import { getDoc, doc } from 'firebase/firestore'
import { loginModalState } from '@/atoms/authModalAtom'
import { ArrowRightIcon, EnvelopeIcon } from '@heroicons/react/24/outline'

type Props = {
  close: () => void
}

const getEmailLink = () => {
  return process.env.NEXT_PUBLIC_LOCAL_DEV
    ? 'http://localhost:3000'
    : 'https://roastortoast.me'
}

export const SignInWithEmail = ({ close }: Props) => {
  const [loginState, setLoginModalState] = useRecoilState(loginModalState)
  const setNewUserModalState = useSetRecoilState(newUserModalState)
  const [user] = useAuthState(auth)
  const router = useRouter()
  const [email, setEmail] = useState('')

  const [loginLoading, setLoginLoading] = useState(false)
  const [loginError, setLoginError] = useState('')

  const [infoMsg, setInfoMsg] = useState('')

  const [initialLoading, setInitialLoading] = useState(false)
  const [initialError, setInitialError] = useState('')

  const handleClose = () => {
    setLoginModalState({ open: false })
  }

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (user) => {
      unsub()
      if (user) {
        const userSnap = await getDoc(doc(db, 'users', user.uid))
        if (userSnap.data()?.displayName === '') {
          setNewUserModalState({ open: true, view: 'newUser' })
        }
      } else {
        if (isSignInWithEmailLink(auth, window.location.href)) {
          let email = localStorage.getItem('email')
          if (!email) {
            email = window.prompt('please provide your email')
          }

          setInitialLoading(true)
          signInWithEmailLink(
            auth,
            localStorage.getItem('email')!,
            window.location.href
          )
            .then((result) => {
              const isFirstSignin = getAdditionalUserInfo(result)?.isNewUser
              if (isFirstSignin) {
                setNewUserModalState({ open: true, view: 'newUser' })
              } else {
                router.push('/')
              }
              localStorage.removeItem('email')
              setInitialLoading(false)
              setInitialError('')
            })
            .catch((err) => {
              setInitialLoading(false)
              setInitialError(err.message)
            })
        }
      }
    })
  }, [user])

  const handleLogin = (event: any) => {
    event.preventDefault()
    setLoginLoading(true)
    sendSignInLinkToEmail(auth, email, {
      url: getEmailLink(),
      handleCodeInApp: true,
      iOS: {
        bundleId: 'com.example.ios',
      },
      android: {
        packageName: 'com.example.android',
        installApp: true,
        minimumVersion: '12',
      },
    })
      .then((result) => {
        localStorage.setItem('email', email)
        setLoginLoading(false)
        setLoginError('')
        setInfoMsg(`An email was sent to ${email}`)
      })
      .catch((err) => {
        setLoginLoading(false)
        setLoginError('Please provide a valid email address')
      })
  }

  const newEmail = (event: any) => {
    setEmail(event.target.value)
    setLoginError('')
  }

  return (
    <>
      {initialError !== '' ? (
        <div>{initialError}</div>
      ) : (
        <>
          {infoMsg !== '' ? (
            <div className="flex justify-between gap-4 text-sm font-medium">
              <p className="flex items-center justify-center">{infoMsg}</p>
              <div className="flex">
                <button className="primaryButton" onClick={() => close()}>
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form
              className="relative flex items-center justify-center"
              onSubmit={handleClose}
            >
              <input
                type="email"
                required
                value={email}
                id="label"
                className="peer block h-[40px] w-full items-center rounded border-[#d4d4d4] bg-transparent px-[11px] py-2 pr-10 text-sm placeholder:text-center placeholder:font-medium focus:border-[#121212] focus:outline-none focus:ring-0 dark:border-[#525252] dark:focus:border-[#dcdcdc]"
                placeholder=" "
                onChange={newEmail}
              />
              <label
                htmlFor="label"
                className="invisible absolute z-10 flex cursor-text items-center gap-4 bg-transparent px-2 text-sm peer-placeholder-shown:visible peer-focus:text-transparent"
              >
                <EnvelopeIcon className="h-[18px] w-[18px]" />
                <p className="font-medium">Continue with Email</p>
              </label>

              <button
                id="label"
                type="submit"
                disabled={
                  !email.match(
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                  ) || loginLoading
                }
                className="absolute right-[7px] flex rounded-[2px] bg-[#e5e5e5] p-2 text-sm font-medium active:bg-[#d8d8d8] disabled:bg-[#f5f5f5] disabled:text-[#e5e5e5] hover:disabled:cursor-no-drop peer-placeholder-shown:invisible peer-focus:visible dark:bg-[#383838] active:dark:bg-[#4b4b4b] disabled:dark:bg-[#121212] disabled:dark:text-[#404040]"
                onClick={handleLogin}
              >
                {loginLoading ? (
                  <div className="flex h-3 w-3 items-center justify-center">
                    <SpinningLoader height={3} width={3} />
                  </div>
                ) : (
                  <ArrowRightIcon className="h-3 w-3 stroke-[2.5]" />
                )}
              </button>
            </form>
          )}
        </>
      )}
    </>
  )
}

export default SignInWithEmail
