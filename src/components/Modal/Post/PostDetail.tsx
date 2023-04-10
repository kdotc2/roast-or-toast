import { Post } from '@/atoms/postAtom'
import { postsModalState } from '@/atoms/postModalAtom'
import Comments from '@/components/Posts/Comments/Comments'
import PostView from '@/components/Posts/PostView'
import { auth, db } from '@/firebase/clientApp'
import usePosts from '@/hooks/usePosts'
import { ArrowLongLeftIcon } from '@heroicons/react/24/outline'
import { doc, onSnapshot } from 'firebase/firestore'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRecoilState } from 'recoil'

type Props = {
  post?: Post
  close?: () => void
}
// TODO fix routing to post links and back on close
const PostDetail = ({ post, close }: Props) => {
  const { postStateValue, setPostStateValue, onDeletePost, onVote } = usePosts()
  const [user] = useAuthState(auth)
  const router = useRouter()
  const [modalState, setModalState] = useRecoilState(postsModalState)
  const { pid } = router.query
  const [error, setError] = useState('')

  if (!close) {
    close = () => {
      console.log('default close')
      router.push("/")
    }
  }

  // if (post) {
  //   setPostStateValue((prev) => ({
  //     ...prev,
  //     selectedPost: post,
  //   }))
  // }

  // const fetchPost = async () => {
  //   try {
  //     const postDocRef = doc(db, 'posts', pid as string)
  //     const unsubscribe = onSnapshot(postDocRef, (querySnapshot) => {
  //       const postDoc = querySnapshot
  //       setPostStateValue((prev) => ({
  //         ...prev,
  //         selectedPost: { id: postDoc.id, ...postDoc.data() } as Post,
  //       }))
  //     })
  //     return () => unsubscribe()
  //   } catch (error) {
  //     setError('Error loading post')
  //   }
  // }

  // useEffect(() => {
  //   const { pid } = router.query

  //   if (pid && !postStateValue.selectedPost) {
  //     fetchPost()
  //   }
  // }, [router.query, postStateValue.selectedPost])

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
          className="fixed inset-0 z-40 flex items-center justify-center overflow-y-auto overscroll-contain"
          // onClick={() => close()}
        >
        <div
          // onClick={() => close()}
          className={`z-41 dark:bg-gray-80 relative w-[750px] bg-[#f5f2f2] [-ms-overflow-style:'none'] [scrollbar-width:'none'] supports-[height:100dvh]:h-[100dvh] dark:bg-[#1c1b1b] sm:h-screen [&::-webkit-scrollbar]:hidden overflow-y-auto overscroll-contain shadow-lg`}
        >
          {error && (
            <p className="flex h-screen items-center justify-center text-xs font-medium text-red-500 dark:text-red-400">
              {error}
            </p>
          )}
          <div className="sm:mx-6">
            <div className="sticky top-0 z-10 mx-5 bg-[#f5f2f2] py-2 dark:bg-[#1c1b1b] sm:mx-8">
              <button
                onClick={() => close()}
                className="relative flex items-center gap-2 rounded-md py-2 px-3 text-sm font-medium hover:rounded-md hover:bg-gray-200 hover:py-2 hover:px-3 dark:text-white dark:hover:bg-gray-800"
              >
                <ArrowLongLeftIcon className="h-5 w-5" /> Back to posts
              </button>
            </div>
            <div className="mx-auto space-y-5 px-[20px] pb-12 sm:px-[32px]">
              {post && (
                <div className="">
                  <PostView
                    post={post}
                    onVote={onVote}
                    onDeletePost={onDeletePost}
                    userVoteValue={
                      postStateValue.postVotes.find(
                        (item) =>
                          item.postId === postStateValue.selectedPost?.id
                      )?.voteValue
                    }
                    userIsCreator={
                      user?.uid === postStateValue.selectedPost?.creatorId
                    }
                  />
                  <Comments
                    user={user}
                    selectedPost={post}
                  />
                </div>
             )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PostDetail
