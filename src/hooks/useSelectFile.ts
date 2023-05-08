import React, { useState } from 'react'
import Resizer from 'react-image-file-resizer'

const useSelectFile = () => {
  const [selectedFile, setSelectedFile] = useState<string>()
  const [loadingImage, setLoadingImage] = useState(false)

  const resizeFile = (file: Blob) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        500,
        750,
        'WEBP',
        90,
        0,
        (uri) => {
          resolve(uri)
        },
        'base64'
      )
    })

  const onSelectFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoadingImage(true)
    if (event.target.files?.[0]) {
      const image = (await resizeFile(event.target.files[0])) as string
      // console.log(image)
      setSelectedFile(image)
      setLoadingImage(false)
    }
  }

  return { selectedFile, setSelectedFile, onSelectFile, loadingImage }
}
export default useSelectFile
