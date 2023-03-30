import React, { useState } from 'react'
import Resizer from 'react-image-file-resizer'

const useSelectFile = () => {
  const [selectedFile, setSelectedFile] = useState<string>()

  const resizeFile = (file: Blob) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        500,
        750,
        'JPEG',
        100,
        0,
        (uri) => {
          resolve(uri)
        },
        'base64'
      )
    })

  const onSelectFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      const image = (await resizeFile(event.target.files[0])) as string
      // console.log(image)
      setSelectedFile(image)
    }
  }

  return { selectedFile, setSelectedFile, onSelectFile }
}
export default useSelectFile
