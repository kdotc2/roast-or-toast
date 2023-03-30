import { createModalState, ModalView } from '@/atoms/createModalAtom'
import React from 'react'
import { useRecoilState } from 'recoil'

type PostInputProps = {
  body: string

  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  // handleCreatePost: () => void
  loading: boolean
  toggleView: (view: ModalView) => void
}

const PostInputs = ({
  body,
  onChange,
  // handleCreatePost,
  loading,
  toggleView,
}: PostInputProps) => {
  const [modalState, setModalState] = useRecoilState(createModalState)

  return (
    <div className="">
      {modalState.view === 'text' ? (
        <div
          onClick={(event) => {
            event.stopPropagation()
          }}
        >
          <textarea
            name="body"
            value={body}
            onChange={onChange}
            placeholder="Body"
            className="flex min-h-[250px] w-full resize-none rounded border border-gray-300 bg-gray-50 px-4 py-2 text-sm placeholder:text-gray-400 focus:border-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-500 dark:focus:border-gray-100"
          />
        </div>
      ) : null}
    </div>
  )
}

export default PostInputs
