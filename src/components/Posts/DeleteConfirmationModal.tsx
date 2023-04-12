import React, { useEffect, useState } from 'react'
import { Post } from '../../atoms/postAtom'

import ModalWrapper from '../Modal/ModalWrapper'

type Props = {
  post: Post
  onCancel: () => void,
  onSuccess: () => void,
  error?: any,
}

const DeleteConfirmationModal = ({
  post,
  onCancel,
  onSuccess,
  error,
}: Props) => {

  const content = (
    <>
      <div className="pt-6">
        <h3 className="text-lg font-semibold">
          Confirm delete post
        </h3>
      </div>
      <div className="relative"></div>
      <div className="items-center justify-center">
        <p className="py-4 text-sm">
          Are you sure you want to delete{' '}
          <span className="font-bold">{post.title}</span>? This
          action cannont be undone.
        </p>
        <div className="flex justify-between pb-6">
          <div className="flex items-center justify-start">
            {error && (
              <p className="text-xs font-medium text-red-500 dark:text-red-400">
                {error}
              </p>
            )}
          </div>
          <div className="flex justify-end gap-3">
            <button
              className="secondaryButton"
              aria-label="Cancel"
              type="button"
              onClick={() => onCancel()}
            >
              Cancel
            </button>
            <button
              className="primaryButton"
              type="button"
              aria-label="Confirm delete"
              onClick={() => onSuccess()}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  )

  return (
    <ModalWrapper child={content} close={() => onCancel()} width={400}/>
  )
}

export default DeleteConfirmationModal
