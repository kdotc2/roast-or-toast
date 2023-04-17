import { newUserModalState } from '@/atoms/newUserModalAtom'
import { userState } from '@/atoms/userAtom'
import { SpinningLoader } from '@/components/Posts/Loader'
import { db } from '@/firebase/clientApp'
import { getAuth } from 'firebase/auth'
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRecoilState, useSetRecoilState } from 'recoil'

export default function Modal() {
  const [modalState, setModalState] = useRecoilState(newUserModalState)
  const [userInputs, setUserInputs] = useState({
    displayName: '',
  })
  const [inputError, setInputError] = useState('')
  const [loading, setLoading] = useState(false)
  const auth = getAuth()
  const [user] = useAuthState(auth)
  const [userDisplayName, setUserDisplayName] = useRecoilState(userState)
  const router = useRouter()

  const handleClose = () => {
    setModalState((prev) => ({
      ...prev,
      open: false,
    }))
    router.push('/')
  }

  const onTextChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUserInputs((prev) => ({
      ...prev,
      [name]: value,
    }))
    setInputError('')
  }

  const updateDisplayName = async () => {
    setLoading(true)
    if (inputError) setInputError('')
    const format = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/

    if (format.test(userInputs.displayName)) {
      setLoading(false)
      return setInputError(
        'Names can only contain letters, numbers or underscores.'
      )
    }

    try {
      const { displayName } = userInputs

      const userRef = collection(db, 'users')
      const userQuery = query(
        userRef,
        where('lowercaseDisplayName', '==', displayName.toLowerCase())
      )
      const querySnapshot = await getDocs(userQuery)
      if (querySnapshot.empty) {
        await updateDoc(doc(db, 'users', user!.uid), {
          displayName: displayName,
          lowercaseDisplayName: displayName.toLowerCase(),
        })
      } else {
        setInputError(`The display name is already taken. Try a different one.`)
        setLoading(false)
        return
      }

      setUserDisplayName((prev) => ({
        ...prev,
        userUpdatedRequired: true,
      }))
    } catch (error: any) {
      setLoading(false)
      return setInputError('There was an error updating the username.')
    }
    handleClose()
    setLoading(false)
  }

  return (
    <div>
      {modalState.open ? (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40"
            onClick={(event) => {
              event.stopPropagation()
            }}
          >
            <div className="fixed inset-0 z-50 flex items-center justify-center px-5 sm:px-0">
              <div className="relative w-[400px] rounded-md bg-white px-6 pb-6 shadow-lg dark:bg-gray-800">
                <div className="pt-6">
                  <h3 className="text-lg font-semibold">
                    {modalState.view === 'newUser' &&
                      'Update account information'}
                  </h3>
                </div>

                <div className="relative">
                  <div className="items-center justify-center">
                    <div className="relative">
                      <div className="items-center justify-center">
                        <p className="py-4 text-sm">
                          Before you continue, choose a display name with at
                          least four characters.
                        </p>
                        <form
                          className="relative flex flex-col border-gray-500"
                          onSubmit={updateDisplayName}
                        >
                          <div className="relative flex">
                            <input
                              name="displayName"
                              required
                              value={userInputs.displayName}
                              minLength={4}
                              maxLength={24}
                              className="h-[40px] w-full resize-none rounded border border-gray-300 bg-transparent pl-3 text-sm text-gray-900 focus:border-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-gray-100 dark:focus:border-gray-100"
                              placeholder="Display name"
                              onChange={onTextChange}
                            />
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between pt-2">
                  <div className="flex items-center justify-start">
                    {inputError && (
                      <p className="mr-2 text-xs font-medium text-red-500 dark:text-red-400">
                        {inputError}
                      </p>
                    )}
                  </div>
                  <div className="flex justify-end">
                    <button
                      disabled={
                        !userInputs.displayName ||
                        userInputs.displayName.length < 4
                      }
                      className="primaryButton disabled:bg-gray-100 disabled:text-gray-200 disabled:dark:bg-gray-900 disabled:dark:text-gray-700"
                      onClick={updateDisplayName}
                    >
                      {loading ? (
                        <div className="mx-[13.5px]">
                          <SpinningLoader height={5} width={5} />
                        </div>
                      ) : (
                        <span>Submit</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  )
}
