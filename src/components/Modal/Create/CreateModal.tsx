import { createModalState } from '@/atoms/createModalAtom'
import { newUserModalState } from '@/atoms/newUserModalAtom'
import { Post, postState } from '@/atoms/postAtom'
import { auth, db, storage } from '@/firebase/clientApp'
import useSelectFile from '@/hooks/useSelectFile'
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import FocusTrap from 'focus-trap-react'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRecoilState, useSetRecoilState } from 'recoil'
import ImageUpload from './ImageUpload'
import LinkAdd from './LinkAdd'
import PostInputs from './PostInput'

type CreateModalProps = {
  onSelectPost?: (value: Post, postIdx: number) => void
}

export default function CreateModal({ onSelectPost }: CreateModalProps) {
  const [modalState, setModalState] = useRecoilState(createModalState)
  const selectFileRef = useRef<HTMLInputElement>(null)
  const [postInputs, setPostInputs] = useState({
    title: '',
    body: '',
    url: '',
  })
  const [loading, setLoading] = useState(false)
  const setPostItems = useSetRecoilState(postState)
  const router = useRouter()
  const [error, setError] = useState('')
  const { selectedFile, setSelectedFile, onSelectFile } = useSelectFile()
  const [show, setShow] = useState(false)
  const [user] = useAuthState(auth)
  const [count, setCount] = useState(0)
  const setNewUserModalState = useSetRecoilState(newUserModalState)

  const toggleView = (view: string) => {
    setModalState({
      ...modalState,
      view: view as typeof modalState.view,
    })
  }

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose()
      }
    }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [])

  useEffect(() => {
    const handleWindowScroll = () => {
      if (window.scrollY > 50) setShow(true)
      else setShow(false)
    }

    window.addEventListener('scroll', handleWindowScroll)
    return () => window.removeEventListener('scroll', handleWindowScroll)
  }, [])

  const handleScrollTop = () => {
    window.scrollTo({ top: 0 })
  }

  const resetState = () => {
    postInputs.url = ''
    postInputs.body = ''
    postInputs.title = ''
    setSelectedFile('')
    setCount(0)
    setError('')
    handleClose()
  }

  const onTextChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setError('')
    setPostInputs((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const onTitleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCount(value.length)
    setPostInputs((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCreatePost = async () => {
    setLoading(true)
    const { title, body, url } = postInputs

    if (url.match('https://') || url.match('http://')) {
      setLoading(false)
      return setError('Please provide a valid url')
    }

    const userSnap = await getDoc(doc(db, 'users', user!.uid))

    try {
      const postDocRef = await addDoc(collection(db, 'posts'), {
        creatorId: user?.uid,
        displayName: userSnap.data()!.displayName,
        title,
        body,
        url,
        numberOfComments: 0,
        voteStatus: 0,
        createdAt: serverTimestamp(),
        editedAt: serverTimestamp(),
      })

      // console.log('HERE IS NEW POST ID', postDocRef.id)
      // check if selectedFile exists, if it does, do image processing
      if (selectedFile) {
        const imageRef = ref(storage, `posts/${postDocRef.id}/image`)
        await uploadString(imageRef, selectedFile, 'data_url')
        const downloadURL = await getDownloadURL(imageRef)
        await updateDoc(postDocRef, {
          imageURL: downloadURL,
        })

        // console.log('HERE IS DOWNLOAD URL', downloadURL)
      }

      // Clear the cache to cause a refetch of the posts
      setPostItems((prev) => ({
        ...prev,
        postUpdateRequired: true,
      }))
      router.push('/')
      handleScrollTop()
    } catch (error) {
      // console.log('createPost error', error)
      setError('Error creating post')
    }
    resetState()
    setLoading(false)
  }

  const handleClose = () => {
    setModalState((prev) => ({
      ...prev,
      open: false,
    }))
  }

  return (
    <div onClick={handleClose}>
      {modalState.open ? (
        <>
          <FocusTrap
            focusTrapOptions={{
              returnFocusOnDeactivate: false,
            }}
          >
            <div className="fixed inset-0 z-40 h-auto bg-black/40">
              <div className="fixed inset-0 z-50 flex items-center justify-center px-5 sm:px-0">
                <div
                  onClick={(event) => {
                    event.stopPropagation()
                  }}
                  className="relative w-[500px] rounded-lg bg-white px-6 shadow-lg dark:bg-gray-800"
                >
                  <div className="py-5">
                    <h3 className="text-xl font-semibold">
                      {modalState.view === 'text' && 'Create a text post'}
                      {modalState.view === 'image' && 'Create an image post'}
                      {modalState.view === 'link' && 'Create a link post'}
                    </h3>
                  </div>

                  <div className="pb-2">
                    <div className="group flex items-center rounded border border-gray-300 bg-gray-50 focus-within:border-transparent focus-within:ring-1 focus-within:ring-gray-900 dark:border-gray-600 dark:bg-gray-800 focus-within:dark:ring-gray-100">
                      <textarea
                        maxLength={250}
                        name="title"
                        value={postInputs.title}
                        onChange={onTitleChange}
                        placeholder="Title"
                        className="group block h-[38px] w-full resize-none overflow-y-hidden break-words rounded border-none bg-gray-50 px-4 py-2 text-sm placeholder:text-gray-400 focus:border-gray-900 focus:outline-0 focus:ring-0 dark:bg-gray-800 dark:placeholder:text-gray-500 dark:focus:border-gray-100"
                      />
                      <span className="px-2 text-xs font-semibold text-gray-400 dark:text-gray-500">
                        {count}/250
                      </span>
                    </div>
                  </div>
                  <PostInputs
                    toggleView={toggleView}
                    onChange={onTextChange}
                    loading={loading}
                    body={postInputs.body}
                  />
                  <ImageUpload
                    toggleView={toggleView}
                    selectedFile={selectedFile}
                    onSelectImage={onSelectFile}
                    setSelectedFile={setSelectedFile}
                    selectFileRef={selectFileRef}
                    loading={loading}
                  />
                  <LinkAdd
                    toggleView={toggleView}
                    onChange={onTextChange}
                    loading={loading}
                    url={postInputs.url}
                  />

                  <div className="relative">
                    <div className="flex justify-between">
                      <div className="flex items-center justify-start">
                        {error && (
                          <p className="text-xs font-medium text-red-500">
                            {error}
                          </p>
                        )}
                      </div>
                      <div className="flex justify-end gap-3 py-6">
                        <button
                          className="secondaryButton"
                          type="button"
                          onClick={handleClose}
                        >
                          Cancel
                        </button>
                        {loading}
                        <button
                          disabled={
                            ((!postInputs.title || !postInputs.body) &&
                              (!postInputs.title || !postInputs.url) &&
                              (!postInputs.title || !selectedFile)) ||
                            loading
                          }
                          type="button"
                          onClick={handleCreatePost}
                          className="primaryButton disabled:bg-gray-100 disabled:text-gray-200 disabled:dark:bg-gray-900 disabled:dark:text-gray-700"
                        >
                          {loading ? (
                            <div role="status spinner">
                              <svg
                                aria-hidden="true"
                                className="mx-[5px] h-5 w-5 animate-spin fill-gray-800 text-gray-200 dark:fill-gray-200 dark:text-gray-600"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                  fill="currentColor"
                                />
                                <path
                                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                  fill="currentFill"
                                />
                              </svg>
                              <span className="sr-only">Loading...</span>
                            </div>
                          ) : (
                            <span>Post</span>
                          )}
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
