import React, { useCallback, useState } from 'react'
import { Comment } from '@/atoms/commentAtom'
import { Timestamp } from 'firebase/firestore'
import moment from 'moment'
import { Loader } from '../Loader'
import {
  ChatBubbleOvalLeftIcon,
  HeartIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'

type CommentItemProps = {
  comment: Comment
  userVoteValue?: number
  onDeleteComment: (comment: Comment) => void
  isLoading: boolean
  userId?: string
  onVote: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    comment: Comment,
    vote: number,
    commentIdx?: number
  ) => void
  commentIdx?: number
}

const CommentItem = ({
  comment,
  onDeleteComment,
  commentIdx,
  isLoading,
  userId,
  onVote,
  userVoteValue,
}: CommentItemProps) => {
  const [loadingDelete, setLoadingDelete] = useState(false)
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false)
  return (
    <div className="p-2">
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
          <div className="flex gap-[6px]">
            <span className="font-bold">{comment.creatorDisplayName}</span> •{' '}
            {comment.createdAt?.seconds && (
              <span>
                {moment(new Date(comment.createdAt?.seconds * 1000)).fromNow()}
              </span>
            )}
          </div>
        </div>
        <p className="whitespace-pre-line text-sm">{comment.text}</p>
        <div className="flex items-center">
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <button
                aria-label="Upvote"
                type="button"
                className="hover:text-gray-800 hover:dark:text-gray-200"
                onClick={(event) => onVote(event, comment, 1)}
              >
                <HeartIcon
                  className={`h-5 w-5 ${
                    userVoteValue === 1 ? 'text-red-500 dark:text-red-400' : ''
                  }`}
                  fill={`${userVoteValue === 1 ? 'currentColor' : 'none'}`}
                />
              </button>
              <span
                className={`text-sm font-medium ${
                  comment.voteStatus === 0 ? 'hidden' : ''
                }`}
              >
                {comment.voteStatus}
              </span>
            </div>
            <div>
              {userId === comment.creatorId && (
                <>
                  {isLoading ? (
                    <div role="status">
                      <svg
                        aria-hidden
                        className="h-5 w-5 animate-spin fill-gray-800 text-gray-200 dark:fill-gray-200 dark:text-gray-600"
                        viewBox="0 0 100 100"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <div>
                      <>
                        {confirmDeleteModal ? (
                          <div
                            className="fixed inset-0 z-40 bg-black/40"
                            onClick={() => {
                              setConfirmDeleteModal(false)
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
                                  <div className="pt-6">
                                    <h3 className="text-lg font-semibold">
                                      Confirm delete
                                    </h3>
                                  </div>
                                  <div className="relative">
                                    <div className="items-center justify-center">
                                      <p className="py-4 text-sm">
                                        Are you sure you want to delete this
                                        comment? This action cannont be undone.
                                      </p>
                                      <div className="flex justify-end pb-6">
                                        <div className="flex gap-3">
                                          <button
                                            className="secondaryButton"
                                            aria-label="Cancel"
                                            type="button"
                                            onClick={() =>
                                              setConfirmDeleteModal(false)
                                            }
                                          >
                                            Cancel
                                          </button>
                                          <button
                                            className="primaryButton"
                                            type="button"
                                            aria-label="Confirm delete"
                                            onClick={() =>
                                              onDeleteComment(comment)
                                            }
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
                        ) : null}
                      </>
                      <button
                        type="button"
                        className="flex items-center text-gray-500 hover:text-gray-800 dark:text-gray-400 hover:dark:text-gray-200"
                        aria-label="Delete"
                      >
                        <TrashIcon
                          className="h-5 w-5"
                          onClick={(event) => {
                            setConfirmDeleteModal(true), event.stopPropagation()
                          }}
                        />
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommentItem
