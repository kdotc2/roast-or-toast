import React, { useEffect, useState } from 'react'
import { Post } from '../../atoms/postAtom'
import {
  HeartIcon,
  ChatBubbleOvalLeftIcon,
  BookmarkIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'

import moment from 'moment'
import { useRouter } from 'next/router'
import LinkPreview from './LinkPreview'
import Link from 'next/link'
import DeleteConfirmationModal from './DeleteConfirmationModal'
import { SpinningLoader } from './Loader'
import { hasHeartedPost, togglePostHeart } from '@/hooks/usePosts'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/firebase/clientApp'
import { loginModalState } from '@/atoms/authModalAtom'
import { useSetRecoilState } from 'recoil'

type PostViewProps = {
  post: Post
  userIsCreator: boolean
  onDeletePost: (post: Post) => Promise<boolean>
  onSelectPost?: (value: Post, postIdx: number) => void
  postIdx?: number
  onHeart?: (p: Post) => void
  onComment?: (p: Post) => void
}

const PostView = ({
  post,
  postIdx,
  userIsCreator,
  onDeletePost,
  onSelectPost,
  onHeart,
}: PostViewProps) => {
  const [user] = useAuthState(auth)
  const [loadingDelete, setLoadingDelete] = useState(false)
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false)
  const [error, setError] = useState(false)
  const singlePostPage = !onSelectPost
  const router = useRouter()
  const setAuthModalState = useSetRecoilState(loginModalState)

  const formatter = Intl.NumberFormat('en', { notation: 'compact' })

  const [hearted, setHearted] = useState(false)
  useEffect(() => {
    if (user && post) {
      hasHeartedPost(user?.uid, post?.id).then((b: boolean) => setHearted(b))
    }
  })

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
        className={`rounded border border-[#e5e5e5] bg-[#fdfdfd] dark:border-[#333333] dark:bg-[#212121] ${
          singlePostPage
            ? 'cursor-default'
            : 'cursor-pointer md:hover:border-[#a3a3a3] md:hover:dark:border-[#737373]'
        } `}
      >
        <div className="pt-4 pb-12">
          <div className="flex gap-2 px-4 text-xs font-medium">
            {post.tags &&
              post.tags.map((tags) => (
                <div key={tags} className="pb-3">
                  <div className="flex rounded-md bg-[#ededed] px-1.5 py-1 dark:bg-[#151515]">
                    {tags}
                  </div>
                </div>
              ))}
          </div>
          <div className="flex justify-between px-4">
            <div className="flex items-center text-xs text-[#737373] dark:text-[#8c8c8c]">
              <div className="space-x-0.5">
                <span className="font-bold">{post.displayName}</span>
                <span>∙</span>
                <span>
                  {moment(new Date(post.createdAt?.seconds * 1000)).fromNow()}
                </span>
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
              {post.text}
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
          <div className="z-10 px-4">
            {post.url && <LinkPreview url={post.url} />}
          </div>
        </div>
        <>
          <div
            className="-mt-6 flex -translate-y-3 items-center justify-between px-4 py-0.5"
            onClick={() => {
              {
                onSelectPost && post && onSelectPost(post, postIdx!)
              }
            }}
          >
            <div className="flex items-center gap-2 text-[#737373] dark:text-[#8c8c8c]">
              <button
                aria-label="Upvote"
                type="button"
                className="pointer-events-auto hover:text-[#262626] hover:dark:text-[#e5e5e5]"
                onClick={(event) => {
                  event.stopPropagation()
                  !user && setAuthModalState({ open: true })
                  togglePostHeart(user?.uid || '', post).then(
                    (p) => onHeart && p && onHeart(p)
                  )
                }}
              >
                <HeartIcon
                  onClick={(event) => {
                    event.preventDefault()
                  }}
                  className={`h-5 w-5 ${
                    hearted ? 'text-red-500 dark:text-red-400' : ''
                  }`}
                  fill={`${hearted ? 'currentColor' : 'none'}`}
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
            <div className="justify flex items-center gap-2 text-[#737373] dark:text-[#8c8c8c]">
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
                        className="flex items-center text-[#737373] hover:text-[#262626] dark:text-[#8c8c8c] hover:dark:text-[#e5e5e5]"
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
                    className="invisible flex items-center text-[#737373] hover:text-[#262626] dark:text-[#8c8c8c] hover:dark:text-[#e5e5e5]"
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
