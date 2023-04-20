import { createModalState, ModalView } from '@/atoms/createModalAtom'
import React from 'react'
import { useRecoilState } from 'recoil'

type PostTextProps = {
  text: string

  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  // handleCreatePost: () => void
  loading: boolean
  toggleView: (view: ModalView) => void
}

const PostText = ({
  text,
  onChange,
  // handleCreatePost,
  loading,
  toggleView,
}: PostTextProps) => {
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
            name="text"
            value={text}
            onChange={onChange}
            placeholder="Text"
            className="input flex min-h-[250px] w-full resize-none py-2"
          />
        </div>
      ) : null}
    </div>
  )
}

export default PostText
