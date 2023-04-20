import { createModalState, ModalView } from '@/atoms/createModalAtom'
import React, { useState } from 'react'
import { useRecoilState } from 'recoil'

type LinkAddProps = {
  url: string

  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  // handleCreatePost: () => void
  loading: boolean
  toggleView: (view: ModalView) => void
}

const LinkAdd = ({ url, onChange, toggleView }: LinkAddProps) => {
  const [loadingPreview, setLoadingPreview] = useState(true)
  const [modalState, setModalState] = useRecoilState(createModalState)
  const [error, setError] = useState('')

  return (
    <div>
      {modalState.view === 'link' ? (
        <div
          onClick={(event) => {
            event.stopPropagation()
          }}
        >
          <div className="relative">
            <input
              name="url"
              value={url}
              onChange={onChange}
              placeholder="example.com"
              id="url"
              className="input peer block h-[40px] px-4 py-2 pl-[60px] placeholder:text-gray-400 dark:placeholder:text-gray-500"
            />
            <label
              htmlFor="url"
              className="absolute left-2 top-1/2 -translate-y-1/2 pl-[5px] text-sm peer-placeholder-shown:text-gray-400 peer-focus:text-gray-900 dark:peer-placeholder-shown:text-gray-500 dark:peer-focus:text-[#dcdcdc]"
            >
              https://
            </label>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default LinkAdd
