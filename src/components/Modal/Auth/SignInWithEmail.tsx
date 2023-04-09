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
import { authModalState } from '@/atoms/authModalAtom'
import { newUserModalState } from '@/atoms/newUserModalAtom'
import { SpinningLoader } from '@/components/Posts/Loader'
import { getDoc, doc } from 'firebase/firestore'

export const SignInWithEmail = () => {
  const [modalState, setModalState] = useRecoilState(authModalState)
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
    setModalState((prev) => ({
      ...prev,
      open: false,
    }))
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
      url: 'https://roastortoast.me',
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
            <div className="justify-betweeb flex h-[38px] gap-4 text-sm font-medium">
              <p className="flex items-center justify-center">{infoMsg}</p>
              <div className="flex justify-end">
                <button className="primaryButton" onClick={handleClose}>
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form
              className="relative flex gap-4 border-gray-500 "
              onSubmit={handleClose}
            >
              <input
                type={'email'}
                required
                value={email}
                id="floating_outlined"
                className="peer block w-full rounded border-gray-300 bg-transparent px-[11px] py-2 text-sm text-gray-900 focus:border-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-gray-100 dark:focus:border-gray-100"
                placeholder=" "
                onChange={newEmail}
              />
              <label
                htmlFor="floating_outlined"
                className="absolute top-2 left-1 z-10 flex origin-[0] -translate-y-4 scale-75 transform cursor-text bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-gray-500 dark:bg-gray-800 peer-focus:dark:text-gray-100"
              >
                {loginError ? (
                  <p className="text-red-500 dark:text-red-400">{loginError}</p>
                ) : (
                  <p>Continue with Email</p>
                )}
              </label>
              <button
                type="submit"
                disabled={!email.includes('@') || loginLoading}
                className="primaryButton"
                onClick={handleLogin}
              >
                {loginLoading ? (
                  <div className="mx-[13.5px]">
                    <SpinningLoader />
                  </div>
                ) : (
                  <p>Submit</p>
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
