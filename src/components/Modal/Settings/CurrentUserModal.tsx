import { settingsModalState } from '@/atoms/settingsModalAtom'
import { userState } from '@/atoms/userAtom'
import ThemeSwitch from '@/components/Modal/Settings/ThemeSwitch'
import { SpinningLoader } from '@/components/Posts/Loader'
import { auth, db } from '@/firebase/clientApp'
import {
  deleteUser,
  signOut,
  reauthenticateWithCredential,
  GoogleAuthProvider,
  EmailAuthProvider,
} from 'firebase/auth'
import { doc, getDoc, onSnapshot } from 'firebase/firestore'
import FocusTrap from 'focus-trap-react'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRecoilState, useSetRecoilState } from 'recoil'

export default function CurrentUserModal() {
  const [modalState, setModalState] = useRecoilState(settingsModalState)
  const [user, loading, error] = useAuthState(auth)
  const [errorMessage, setErrorMessage] = useState('')
  const [email, setEmail] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false)

  // const deleteCurrentUser = () => {
  //   const currentUser = auth.currentUser
  //   const googleCredential = GoogleAuthProvider.credential(currentUser!.email)
  //   console.log(googleCredential)

  //   reauthenticateWithCredential(currentUser!, googleCredential)
  //     .then(() => {
  //       deleteUser(currentUser!)
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //     })
  // }

  const signedOut = () => {
    signOut(auth)
      .then(() => handleClose())
      .catch((error) => setErrorMessage('Failed to logout'))
  }

  const handleClose = () => {
    setModalState((prev) => ({
      ...prev,
      open: false,
    }))
  }

  const unsub = auth.onAuthStateChanged(async (user) => {
    unsub()
    if (user) {
      const userSnap = doc(db, 'users', user.uid)
      const unsubscribe = onSnapshot(userSnap, (querySnapshot) => {
        const userDoc = querySnapshot
        setDisplayName(userDoc.data()?.displayName)
        setEmail(userDoc.data()?.email)
      })
      return () => unsubscribe()
    }
  })

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
    <>
      {/* {confirmDeleteModal ? (
        <FocusTrap
          focusTrapOptions={{
            returnFocusOnDeactivate: false,
            initialFocus: false,
          }}
        >
          <div
            className="fixed inset-0 z-40 bg-black/40"
            onClick={() => {
              setConfirmDeleteModal(false)
            }}
          >
            <div>
              <div
                className="fixed inset-0 z-50 flex cursor-default items-center justify-center"
                onClick={(event) => {
                  event.stopPropagation()
                }}
              >
                <div className="relative w-[400px] rounded-lg bg-[#fdfdfd] px-6 shadow-lg dark:bg-[#262626]">
                  <div className="pt-5">
                    <h3 className="text-xl font-semibold">
                      Confirm delete account
                    </h3>
                  </div>
                  <div className="relative">
                    <div className="items-center justify-center">
                      <p className="py-4 text-sm">
                        Are you sure you want to delete the account associated
                        with <span className="font-bold">{email}</span>? This
                        action cannont be undone.
                      </p>
                      <div className="flex justify-end pb-4">
                        <div className="flex gap-3">
                          <button
                            className="secondaryButton"
                            aria-label="Cancel"
                            type="button"
                            onClick={() => setConfirmDeleteModal(false)}
                          >
                            Cancel
                          </button>
                          <button
                            className="primaryButton"
                            type="button"
                            aria-label="Confirm delete"
                            onClick={deleteCurrentUser}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FocusTrap>
      ) : null} */}

      <div onClick={handleClose}>
        {modalState.open ? (
          <>
            <FocusTrap
              focusTrapOptions={{
                returnFocusOnDeactivate: false,
                initialFocus: false,
              }}
            >
              <div className="fixed inset-0 z-30 bg-black/40">
                <div>
                  <div className="fixed inset-0 z-40 flex items-center justify-center px-5 sm:px-0">
                    <div
                      onClick={(event) => {
                        event.stopPropagation()
                      }}
                      className="relative w-[500px] space-y-6 rounded-lg bg-[#fdfdfd] px-6 shadow-lg dark:bg-[#212121]"
                    >
                      <div className="pt-6">
                        <h3 className="text-lg font-semibold">
                          {modalState.view === 'currentUser' && 'Settings'}
                        </h3>
                      </div>
                      <div className="space-y-4 text-sm">
                        <p className="-mb-3 text-xs font-semibold uppercase text-[#a3a3a3] dark:text-[#737373]">
                          Appearance
                        </p>
                        <div>
                          <ThemeSwitch />
                        </div>
                      </div>
                      <div className="space-y-4 text-sm">
                        <p className="-mb-3 text-xs font-semibold uppercase text-[#a3a3a3] dark:text-[#737373]">
                          Account
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="">
                            Logged in as:
                            <span className="font-semibold">
                              {' '}
                              {displayName}
                            </span>
                          </div>
                          <button
                            className="settingsButton"
                            onClick={signedOut}
                          >
                            <span>Log out</span>
                          </button>
                        </div>
                        {/* <div className="flex justify-between">
                          <div className="font-semibold">
                            Created account with
                            <p className="font-normal">{email}</p>
                          </div>
                          <button
                            className="settingsButton"
                            onClick={() => {
                              setConfirmDeleteModal(true)
                            }}
                          >
                            <span className="text-red-500 dark:text-red-400">
                              Delete
                            </span>
                          </button>
                        </div> */}
                      </div>

                      <div className="flex justify-between">
                        <div className="flex items-center justify-start">
                          {error && (
                            <p className="text-xs font-medium text-red-500 dark:text-red-400">
                              {errorMessage}
                            </p>
                          )}
                        </div>
                        <div className="flex justify-end py-6">
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
    </>
  )
}
