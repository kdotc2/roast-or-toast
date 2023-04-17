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
import { SpinningLoader } from '@/components/Posts/Loader'

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
    setError('')
    handleClose()
    setLoading(false)
  }

  const handleClose = () => {
    setModalState((prev) => ({
      ...prev,
      open: false,
    }))
    resetState()
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
                  <div className="py-6">
                    <h3 className="text-lg font-semibold">
                      {modalState.view === 'text' && 'Create a text post'}
                      {modalState.view === 'image' && 'Create an image post'}
                      {modalState.view === 'link' && 'Create a link post'}
                    </h3>
                  </div>

                  <div className="flex w-full items-center pb-2">
                    <textarea
                      maxLength={250}
                      name="title"
                      value={postInputs.title}
                      onChange={onTitleChange}
                      placeholder="Title"
                      className="group block h-[40px] w-full resize-none overflow-y-hidden break-words rounded border border-gray-300 bg-gray-50 py-2 pr-16 text-sm placeholder:text-gray-400 focus:border-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600 dark:bg-[#2b2b2b] dark:placeholder-gray-500 dark:focus:border-gray-100"
                    />
                    <div className="absolute right-9 flex justify-end text-xs font-semibold text-gray-400 dark:text-gray-500">
                      {count}/250
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
                      <div className="flex justify-end gap-3 pt-2 pb-6">
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
                            <>
                              <div className="mx-[5px]">
                                <SpinningLoader height={5} width={5} />
                              </div>
                            </>
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
