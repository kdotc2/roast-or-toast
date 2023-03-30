import { aboutModalState } from '@/atoms/aboutModalAtom'
import { auth } from '@/firebase/clientApp'
import FocusTrap from 'focus-trap-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRecoilState } from 'recoil'

export default function CurrentUserModal() {
  const [modalState, setModalState] = useRecoilState(aboutModalState)

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

  return (
    <div onClick={handleClose}>
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
                    className="relative w-[500px] space-y-4 rounded-lg bg-white px-6 shadow-lg dark:bg-gray-800"
                  >
                    <div className="pt-5">
                      <h3 className="text-xl font-semibold">
                        {modalState.view === 'about' && 'About'}
                      </h3>
                    </div>

                    <div className="space-y-5 pt-5 text-sm">
                      <p className="">
                        Roast or Toast is a place where users can share their
                        content and get feedback. Content can be in the form of
                        a copy of text, an image, or a website link.{' '}
                      </p>
                      <p>
                        If you have any feedback, suggestions, or comments, feel
                        free to{' '}
                        <a
                          href="mailto: hello@roastortoast.me"
                          className="hover:underline"
                        >
                          send us an email
                        </a>
                        .
                      </p>
                    </div>

                    <div className="flex justify-between">
                      <div className="flex items-center justify-start gap-5 text-gray-400 dark:text-gray-500">
                        <Link
                          className="text-xs font-medium hover:underline"
                          href="/privacy"
                          onClick={handleClose}
                        >
                          Privacy Policy
                        </Link>
                        <Link
                          className="text-xs font-medium hover:underline"
                          href="/terms"
                          onClick={handleClose}
                        >
                          Terms of Service
                        </Link>
                      </div>
                      <div className="flex justify-end gap-3 py-6">
                        <button
                          className="primaryButton"
                          type="button"
                          onClick={handleClose}
                        >
                          Done
                        </button>
                      </div>
                    </div>
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
