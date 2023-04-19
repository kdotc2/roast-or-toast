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
import { SpinningLoader } from './Loader'

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
        className={`rounded border bg-[#fdfdfd] dark:bg-[#212121] ${
          singlePostPage
            ? 'cursor-default'
            : 'cursor-pointer md:hover:border-gray-400 md:hover:dark:border-gray-500'
        } `}
      >
        <Link
          tabIndex={singlePostPage ? -1 : undefined}
          className={`${
            singlePostPage &&
            'pointer-events-none focus:outline-none focus:ring-0 focus:ring-offset-0'
          } `}
          scroll={false}
          href={`/?pid=${post.id}`}
          as={`/post/${post.id}`}
          aria-label="Post card"
        >
          <div className="py-3 pb-12">
            <div className="flex gap-2 px-4 text-xs font-medium">
              {post.tags &&
                post.tags.map((tags) => (
                  <div key={tags} className="pb-3">
                    <div className="flex rounded bg-[#ededed] px-1.5 py-1 dark:bg-[#151515]">
                      {tags}
                    </div>
                  </div>
                ))}
            </div>

            <div className="flex justify-between px-4">
              <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-[#8c8c8c]">
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
            className="-mt-6 flex -translate-y-3 items-center justify-between px-4 py-0.5"
            onClick={() => {
              {
                onSelectPost && post && onSelectPost(post, postIdx!)
              }
            }}
          >
            <div className="flex items-center gap-2 text-gray-500 dark:text-[#8c8c8c]">
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
                  className={`h-5 w-5 ${
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
            <div className="justify flex items-center gap-2 text-gray-500 dark:text-[#8c8c8c]">
              <ChatBubbleOvalLeftIcon className="h-5 w-5" />
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
                    <>
                      <div className="mx-[2px]">
                        <SpinningLoader height={4} width={4} />
                      </div>
                    </>
                  ) : (
                    <div>
                      <button
                        type="button"
                        className="flex items-center text-gray-500 hover:text-gray-800 dark:text-[#8c8c8c] hover:dark:text-gray-200"
                        onClick={(event) => {
                          setConfirmDeleteModal(true), event.stopPropagation()
                        }}
                        aria-label="Delete"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div>
                  <button
                    type="button"
                    className="invisible flex items-center text-gray-500 hover:text-gray-800 dark:text-[#8c8c8c] hover:dark:text-gray-200"
                    aria-label="Bookmark"
                  >
                    <BookmarkIcon className="h-5 w-5" />
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
