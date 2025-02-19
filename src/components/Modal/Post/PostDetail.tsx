import { Post } from '@/atoms/postAtom'
import Comments from '@/components/Posts/Comments/Comments'
import PostView from '@/components/Posts/PostView'
import { auth } from '@/firebase/clientApp'
import usePosts, { hasHeartedPost, togglePostHeart } from '@/hooks/usePosts'
import { ArrowLongLeftIcon } from '@heroicons/react/24/outline'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

type Props = {
  initialPost?: Post
  close?: () => void
}
const PostDetail = ({ initialPost, close }: Props) => {
  const { onDeletePost } = usePosts()
  const [user] = useAuthState(auth)
  const router = useRouter()
  const [error, setError] = useState('')
  const [hearted, setHearted] = useState(false)
  const [post, setPost] = useState(initialPost)

  if (!close) {
    close = () => {
      router.push('/')
    }
  }

  const safeClose = close

  useEffect(() => {
    if (user && post) {
      hasHeartedPost(user?.uid, post?.id)
      .then((b: boolean) => setHearted(b))
    }
  }, [post])

  const onUpdate = (p: Post) => {
    setPost(p)
  }

  return (
    <>
      <Head>
        <title>{post?.title}</title>
      </Head>

      {/*
        TODO some of this css should be refactored but im not going to do it right now
        ideally the modal wrapper should contain all background and container css and the PostDetail
        just contains things for the post itself but they are intermingled currently with some overlaps
        so we have duplicate click listeners for outside of the modal
       */}
      <div
        id="post-detail"
        className="fixed inset-0 z-20 flex items-center justify-center overflow-y-auto overscroll-contain"
        onClick={(e: any) => {
          // since this element lays over the top of the modal wrapper we have to make a separate
          // click listener for outside of the actual content to close
          const el = document.getElementById('post-detail-content')
          // ts-ignore
          if (el && !el.contains(e.target)) {
            safeClose()
          }
        }}
      >
        <div
          id="post-detail-content"
          className={`relative z-40 w-[750px] overflow-y-auto overscroll-contain bg-[#f5f2f2] [-ms-overflow-style:'none'] [scrollbar-width:'none'] supports-[height:100dvh]:h-[100dvh] dark:bg-[#0b0b0b] sm:h-screen [&::-webkit-scrollbar]:hidden`}
        >
          {error && (
            <p className="flex h-screen items-center justify-center text-xs font-medium text-red-500 dark:text-red-400">
              {error}
            </p>
          )}
          <div className="sm:mx-6">
            <div className="z-40 sticky top-0 mx-5 bg-[#f5f2f2] py-2 dark:bg-[#0b0b0b] sm:mx-8">
              <button
                onClick={() => safeClose()}
                className="relative flex items-center gap-2 rounded-md py-2 px-3 text-sm font-medium hover:rounded-md hover:bg-[#e5e5e5] hover:py-2 hover:px-3 dark:text-white dark:hover:bg-[#262626]"
              >
                <ArrowLongLeftIcon className="h-5 w-5" /> Back to posts
              </button>
            </div>
            <div
              className="mx-auto space-y-5 px-[20px] pb-12 sm:px-[32px]"
              onClick={(e) => e.preventDefault()}
            >
              {post && (
                <div className="">
                  <PostView
                    post={post}
                    onDeletePost={onDeletePost}
                    userIsCreator={user?.uid === post.creatorId}
                    onHeart={onUpdate}
                  />
                </div>
              )}
              {/*
              this is redudant but there is a css spacing issue if you put this immediately after
              the PostView and i dont want to figure out right now
             */}
              {post && <Comments user={user} initialPost={post} onChange={onUpdate}/>}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PostDetail
