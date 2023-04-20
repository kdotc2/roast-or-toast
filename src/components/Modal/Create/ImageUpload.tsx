import { createModalState, ModalView } from '@/atoms/createModalAtom'
import Image from 'next/image'
import React from 'react'
import { BsXCircleFill } from 'react-icons/bs'
import { XCircleIcon } from '@heroicons/react/24/solid'
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

  const onDragEnter = () => {
    document.getElementById('image-upload-bg')!.className =
      'flex h-[250px] w-full items-center justify-center rounded border-gray-400 bg-[#f3f3f3] dark:border-gray-500 dark:bg-[#2b2b2b]'
    document.getElementById('image-upload')!.className =
      'z-10 h-full w-full cursor-pointer rounded border border-dashed text-sm text-transparent file:border-0 file:bg-transparent file:text-transparent border-gray-400 dark:border-gray-500'
  }

  const onDragLeave = () => {
    document.getElementById('image-upload-bg')!.className =
      'flex h-[250px] w-full items-center justify-center rounded bg-[#f8f8f8] hover:bg-[#f3f3f3] dark:bg-[#262626] hover:dark:bg-[#2b2b2b]'
    document.getElementById('image-upload')!.className = 'imageInput'
  }

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
                  className="absolute z-10 translate-y-2 -translate-x-2 text-gray-400 hover:text-gray-800 dark:text-gray-500 hover:dark:text-gray-200"
                  onClick={() => setSelectedFile('')}
                >
                  <XCircleIcon className="h-6 w-6" />
                </button>
                <div className="relative flex min-h-[250px] w-full items-center justify-center rounded border border-gray-300 bg-[#f8f8f8] dark:border-gray-600 dark:bg-[#262626]">
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
            <div
              id="image-upload-bg"
              className="flex h-[250px] w-full items-center justify-center rounded bg-[#f8f8f8] hover:bg-[#f3f3f3] dark:bg-[#262626] hover:dark:bg-[#2b2b2b]"
            >
              <span className="absolute hidden appearance-none text-sm text-gray-400 hover:z-20 dark:text-gray-500 sm:flex">
                Drag and drop or click to upload
              </span>
              <span className="absolute appearance-none text-sm text-gray-400 dark:text-gray-500 sm:hidden">
                Tap to upload
              </span>
              <input
                id="image-upload"
                type="file"
                title=""
                className="imageInput"
                accept=".jpg, .jpeg, .png"
                onChange={onSelectImage}
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
              />
            </div>
          )}
        </div>
      ) : null}
    </div>
  )
}
export default ImageUpload
