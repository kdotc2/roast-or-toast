import React, { useCallback, useState } from 'react'
import { Comment } from '@/atoms/commentAtom'
import { Timestamp } from 'firebase/firestore'
import moment from 'moment'
import { Loader, SpinningLoader } from '../Loader'
import { HeartIcon, TrashIcon } from '@heroicons/react/24/outline'

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
    <div className="p-2 mt-4">
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-[#737373] dark:text-[#a3a3a3]">
          <div className="flex gap-[6px]">
            <span className="font-bold">{comment.creatorDisplayName}</span> •{' '}
            {comment.createdAt?.seconds && (
              <span>
                {moment(new Date(comment.createdAt?.seconds * 1000)).fromNow()}
              </span>
            )}
            {(comment.isRoast || comment.isToast) && (
              <div className="">
                <span>• </span>
                <span>
                  {comment.isRoast && <>🔥</>} {comment.isToast && <>🍺</>}
                </span>
              </div>
            )}
          </div>
        </div>
        <p className="whitespace-pre-line text-sm">{comment.text}</p>
        <div className="flex items-center">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-[#737373] dark:text-[#a3a3a3]">
              <button
                aria-label="Upvote"
                type="button"
                className="hover:text-[#262626] hover:dark:text-[#e5e5e5]"
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
                    <SpinningLoader height={4} width={4} />
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
                                <div className="relative w-[400px] rounded-lg bg-[#fdfdfd] px-6 shadow-lg dark:bg-[#262626]">
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
                        className="flex items-center text-[#737373] hover:text-[#262626] dark:text-[#a3a3a3] hover:dark:text-[#e5e5e5]"
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
