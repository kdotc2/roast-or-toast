import React, { useState } from 'react'
import { Post } from '../../atoms/postAtom'
import {
  HeartIcon,
  ChatBubbleOvalLeftIcon,
  BookmarkIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'

import moment from 'moment'
import { useRouter } from 'next/router'
import LinkMetadata from './LinkMetadata'
import Link from 'next/link'
import DeleteConfirmationModal from './DeleteConfirmationModal'

type PostViewProps = {
  post: Post
  userIsCreator: boolean
  userVoteValue?: number
  onVote: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    post: Post,
    vote: number,
    postIdx?: number
  ) => void
  onDeletePost: (post: Post) => Promise<boolean>
  onSelectPost?: (value: Post, postIdx: number) => void
  postIdx?: number
}

const PostView = ({
  post,
  postIdx,
  userIsCreator,
  userVoteValue,
  onVote,
  onDeletePost,
  onSelectPost,
}: PostViewProps) => {
  const [loadingDelete, setLoadingDelete] = useState(false)
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false)
  const [error, setError] = useState(false)
  const singlePostPage = !onSelectPost
  const router = useRouter()

  const formatter = Intl.NumberFormat('en', { notation: 'compact' })

  const handleDelete = async () => {
    setLoadingDelete(true)
    try {
      const success = await onDeletePost(post)
      if (!success) throw new Error('Failed to delete post')
      if (singlePostPage) {
        router.push('/')
      }
      // console.log('Post successfully deleted')
    } catch (error: any) {
      setError(error.message)
    }
    setConfirmDeleteModal(false)
    setLoadingDelete(false)
  }

  return (
    <>
      {confirmDeleteModal && (
        <DeleteConfirmationModal 
          onCancel={() => setConfirmDeleteModal(false)}
          onSuccess={() => handleDelete()}
          post={post}
          error={error}
          />
      )}
      <div
        onClick={() => {
            onSelectPost && post && onSelectPost(post, postIdx!)
        }}
        className={`rounded border bg-[#fdfbfb] dark:bg-[#161515] ${
          singlePostPage
            ? 'cursor-default'
            : 'cursor-pointer md:hover:border-gray-400 md:hover:dark:border-gray-500'
        } `}
      >
        <Link
          tabIndex={singlePostPage ? -1 : 0}
          className={`${
            singlePostPage &&
            'pointer-events-none focus:outline-none focus:ring-0 focus:ring-offset-0'
          } `}
          scroll={false}
          href={`/?pid=${post.id}`}
          as={`/comments/${post.id}`}
          aria-label="Post card"
        >
          <div className="py-3 pb-12">
            <div className="flex justify-between px-4">
              <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                <div className="flex gap-[6px]">
                  <span className="font-bold">{post.displayName}</span> •{' '}
                  {moment(new Date(post.createdAt?.seconds * 1000)).fromNow()}
                </div>
              </div>
            </div>
            <div className="pt-3">
              <div className="px-4 text-sm font-bold">{post.title}</div>
              <p
                className={`whitespace-pre-line px-4 pt-3 text-sm ${
                  singlePostPage ? 'line-clamp-none' : 'line-clamp-[20]'
                }`}
              >
                {post.body}
              </p>
              <div className="">
                {post.imageURL && (
                  <div
                    className={`flex justify-center ${
                      singlePostPage &&
                      'mx-auto flex object-scale-down sm:w-[500px]'
                    }`}
                  >
                    <img
                      src={post.imageURL}
                      alt="Post image"
                      // onLoad={() => setLoadingImage(false)}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="z-10">
              {post.url && <LinkMetadata url={post.url} />}
            </div>
          </div>
        </Link>
        <>
          <div
            className="-mt-6 flex -translate-y-3 items-center justify-between px-4"
            onClick={() => {
              {
                onSelectPost && post && onSelectPost(post, postIdx!)
              }
            }}
          >
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <button
                aria-label="Upvote"
                type="button"
                className="pointer-events-auto hover:text-gray-800 hover:dark:text-gray-200"
                onClick={(event) => onVote(event, post, 1)}
              >
                <HeartIcon
                  onClick={(event) => {
                    event.preventDefault()
                  }}
                  className={`h-6 w-6 ${
                    userVoteValue === 1 ? 'text-red-500 dark:text-red-400' : ''
                  }`}
                  fill={`${userVoteValue === 1 ? 'currentColor' : 'none'}`}
                />
              </button>
              <span
                className={`text-sm font-medium ${
                  post.voteStatus === 0 ? 'hidden' : ''
                }`}
              >
                {formatter.format(post.voteStatus)}
              </span>
            </div>
            <div className="justify flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <ChatBubbleOvalLeftIcon className="h-6 w-6" />
              <span
                className={`text-sm font-medium ${
                  post.numberOfComments === 0 ? 'hidden' : ''
                }`}
              >
                {formatter.format(post.numberOfComments)}
              </span>
            </div>
            <div>
              {userIsCreator ? (
                <>
                  {loadingDelete ? (
                    <div role="status">
                      <svg
                        aria-hidden
                        className="h-6 w-6 animate-spin fill-gray-800 text-gray-200 dark:fill-gray-200 dark:text-gray-600"
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
                      <button
                        type="button"
                        className="flex items-center text-gray-500 hover:text-gray-800 dark:text-gray-400 hover:dark:text-gray-200"
                        onClick={(event) => {
                          setConfirmDeleteModal(true), event.stopPropagation()
                        }}
                        aria-label="Delete"
                      >
                        <TrashIcon className="h-6 w-6" />
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div>
                  <button
                    type="button"
                    className="invisible flex items-center text-gray-500 hover:text-gray-800 dark:text-gray-400 hover:dark:text-gray-200"
                    aria-label="Bookmark"
                  >
                    <BookmarkIcon className="h-6 w-6" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      </div>
    </>
  )
}
export default PostView
