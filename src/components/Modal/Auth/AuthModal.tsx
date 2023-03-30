import { authModalState } from '@/atoms/authModalAtom'
import { auth } from '@/firebase/clientApp'
import FocusTrap from 'focus-trap-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRecoilState } from 'recoil'
import OAuthButtons from './OAuthButtons'
import SignInWithEmail from './SignInWithEmail'

export default function Modal() {
  const [modalState, setModalState] = useRecoilState(authModalState)
  const [user, loading, error] = useAuthState(auth)
  const [currentUser, setCurrentUser] = useState(false)
  const [scroll, setScroll] = useState(false)

  const handleClose = () => {
    setModalState((prev) => ({
      ...prev,
      open: false,
    }))
  }

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        // event.target.blur()
        handleClose()
      }
    }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [])

  useEffect(() => {
    if (user) handleClose()
  }, [user])

  return (
    <div className="" onClick={handleClose}>
      {modalState.open ? (
        <>
          <FocusTrap
            focusTrapOptions={{
              returnFocusOnDeactivate: false,
              initialFocus: false,
            }}
          >
            <div className="fixed inset-0 z-40 bg-black/40">
              <div>
                <div className="fixed inset-0 z-50 flex items-center justify-center px-5 sm:px-0">
                  <div
                    onClick={(event) => {
                      event.stopPropagation()
                    }}
                    className="relative w-[400px] rounded-lg bg-white px-6 shadow-lg dark:bg-gray-800"
                  >
                    <div className="pt-5">
                      <h3 className="text-xl font-semibold">
                        {modalState.view === 'login' && 'Log In / Sign Up'}
                      </h3>
                    </div>

                    {modalState.view === 'login' && (
                      <div className="relative">
                        <div className="items-center justify-center pb-4">
                          <p className="py-4 text-sm">
                            By continuing, you are agreeing to our{' '}
                            <Link
                              className="hover:underline"
                              href="/terms"
                              onClick={handleClose}
                            >
                              Terms of Service
                            </Link>{' '}
                            and{' '}
                            <Link
                              className="hover:underline"
                              href="/privacy"
                              onClick={handleClose}
                            >
                              Privacy Policy
                            </Link>
                            .
                          </p>
                          <OAuthButtons />
                          {/* <p className="pb-4 text-center text-xs font-semibold uppercase text-gray-400 dark:text-gray-300">
                            or
                          </p>
                          <SignInWithEmail /> */}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </FocusTrap>
        </>
      ) : null}
    </div>
  )
}
