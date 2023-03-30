import { createModalState, ModalView } from '@/atoms/createModalAtom'
import Image from 'next/image'
import React from 'react'
import { BsXCircleFill } from 'react-icons/bs'
import { useRecoilState } from 'recoil'

type ImageUploadProps = {
  selectedFile?: string
  setSelectedFile: (value: string) => void
  selectFileRef: React.RefObject<HTMLInputElement>
  onSelectImage: (event: React.ChangeEvent<HTMLInputElement>) => void
  toggleView: (view: ModalView) => void
  // handleCreatePost: () => void
  loading: boolean
}

const ImageUpload = ({
  selectedFile,
  setSelectedFile,
  selectFileRef,
  onSelectImage,
  toggleView,
  loading,
}: // handleCreatePost,
ImageUploadProps) => {
  const onError = (error: any) => {
    console.error(error)
  }
  const [modalState, setModalState] = useRecoilState(createModalState)

  return (
    <div>
      {modalState.view === 'image' ? (
        <div
          onClick={(event) => {
            event.stopPropagation()
          }}
        >
          {selectedFile ? (
            <>
              <div className="flex justify-end">
                <button
                  className="absolute z-20 translate-y-2 -translate-x-2"
                  onClick={() => setSelectedFile('')}
                >
                  <BsXCircleFill className="text-3xl" />
                </button>
                <div className="relative flex min-h-[250px] w-full items-center justify-center rounded border border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-800">
                  <div className="fixed flex max-h-[250px] p-2">
                    <Image
                      className="object-scale-down"
                      src={selectedFile as string}
                      alt="Uploaded image"
                      height={250}
                      width={250}
                    />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex w-full cursor-pointer items-center justify-center">
              <label className="flex h-[250px] w-full flex-col items-center justify-center rounded border border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:hover:border-gray-500 dark:hover:bg-[#303032]">
                <span className="z-1 absolute hidden appearance-none text-sm text-gray-400 dark:text-gray-500 sm:flex">
                  Drag and drop or click to upload
                </span>
                <span className="z-1 absolute appearance-none text-sm text-gray-400 dark:text-gray-500 sm:hidden">
                  Tap to upload
                </span>
                <input
                  id="file-upload"
                  type="file"
                  title=""
                  className="imageUpload"
                  accept="image/x-png,image/gif,image/jpeg"
                  onChange={onSelectImage}
                />
              </label>
            </div>
          )}
        </div>
      ) : null}
    </div>
  )
}
export default ImageUpload
