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
              className="peer block h-[38px] w-full rounded border border-gray-300 bg-gray-50 px-4 py-2 pl-[60px] text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-900 focus:outline-0 focus:ring-0 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-gray-100"
            />
            <label
              htmlFor="url"
              className="absolute left-2 top-1/2 -translate-y-1/2 pl-[5px] text-sm peer-placeholder-shown:text-gray-400 peer-focus:text-gray-900 dark:peer-placeholder-shown:text-gray-500 dark:peer-focus:text-gray-100"
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
