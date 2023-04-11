import { Post } from '@/atoms/postAtom'
import Comments from '@/components/Posts/Comments/Comments'
import PostView from '@/components/Posts/PostView'
import { auth, db } from '@/firebase/clientApp'
import usePosts from '@/hooks/usePosts'
import { ArrowLongLeftIcon } from '@heroicons/react/24/outline'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

type Props = {
  post?: Post
  close?: () => void
}
const PostDetail = ({ post, close }: Props) => {
  const { postStateValue, onDeletePost, onVote } = usePosts()
  const [user] = useAuthState(auth)
  const router = useRouter()
  const [error, setError] = useState('')

  if (!close) {
    close = () => {
      console.log('default close')
      router.push("/")
    }
  }

  const safeClose = close

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
            console.log('real click')
            const el = document.getElementById('post-detail-content')
            // ts-ignore
            if (el && !el.contains(e.target)) {
              safeClose()
            }
          }}
        >
        <div
          id="post-detail-content"
          className={`z-41 dark:bg-gray-80 relative w-[750px] bg-[#f5f2f2] [-ms-overflow-style:'none'] [scrollbar-width:'none'] supports-[height:100dvh]:h-[100dvh] dark:bg-[#1c1b1b] sm:h-screen [&::-webkit-scrollbar]:hidden overflow-y-auto overscroll-contain shadow-lg`}
        >
          {error && (
            <p className="flex h-screen items-center justify-center text-xs font-medium text-red-500 dark:text-red-400">
              {error}
            </p>
          )}
          <div className="sm:mx-6">
            <div className="sticky top-0 z-60 mx-5 bg-[#f5f2f2] py-2 dark:bg-[#1c1b1b] sm:mx-8">
              <button
                onClick={() => safeClose()}
                className="relative flex items-center gap-2 rounded-md py-2 px-3 text-sm font-medium hover:rounded-md hover:bg-gray-200 hover:py-2 hover:px-3 dark:text-white dark:hover:bg-gray-800"
              >
                <ArrowLongLeftIcon className="h-5 w-5" /> Back to posts
              </button>
            </div>
            <div className="mx-auto space-y-5 px-[20px] pb-12 sm:px-[32px]" onClick={(e)=> e.preventDefault()}>
              {post && (
                <div className="">
                  <PostView
                    post={post}
                    onVote={onVote}
                    onDeletePost={onDeletePost}
                    userVoteValue={
                      postStateValue.postVotes.find(
                        (item) =>
                          item.postId === post.id
                      )?.voteValue
                    }
                    userIsCreator={
                      user?.uid === post.creatorId
                    }
                  />
                </div>
             )}
             {/*
              this is redudant but there is a css spacing issue if you put this immediately after
              the PostView and i dont want to figure out right now
             */}
             {post && (
                <Comments
                  user={user}
                  selectedPost={post}
                />
             )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PostDetail
