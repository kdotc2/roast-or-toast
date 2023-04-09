import React, { useEffect, useState } from 'react'
import { Post } from '../../atoms/postAtom'

import FocusTrap from 'focus-trap-react'

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

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        // event.target.blur()
        onCancel()
      }
    }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [])

  return (
    <FocusTrap
      focusTrapOptions={{
        returnFocusOnDeactivate: false,
        initialFocus: false,
      }}
    >
      <div
        className="fixed inset-0 z-40 bg-black/40"
        onClick={() => {
          onCancel()
        }}
      >
        <div>
          <div
            className="fixed inset-0 z-50 flex cursor-default items-center justify-center"
            onClick={(event) => {
              event.stopPropagation()
            }}
          >
            <div className="relative w-[400px] rounded-lg bg-white px-6 shadow-lg dark:bg-gray-800">
              <div className="pt-5">
                <h3 className="text-xl font-semibold">
                  Confirm delete post
                </h3>
              </div>
              <div className="relative">
                <div className="items-center justify-center">
                  <p className="py-4 text-sm">
                    Are you sure you want to delete{' '}
                    <span className="font-bold">{post.title}</span>? This
                    action cannont be undone.
                  </p>
                  <div className="flex justify-between pb-4">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </FocusTrap>
  )
}

export default DeleteConfirmationModal
