import { Post } from '@/atoms/postAtom'
import { postsModalState } from '@/atoms/postModalAtom'
import Comments from '@/components/Posts/Comments/Comments'
import PostItem from '@/components/Posts/PostItem'
import { auth, db } from '@/firebase/clientApp'
import usePosts from '@/hooks/usePosts'
import { ArrowLongLeftIcon } from '@heroicons/react/24/outline'
import { doc, onSnapshot } from 'firebase/firestore'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRecoilState } from 'recoil'

const PostDetail = () => {
  const { postStateValue, setPostStateValue, onDeletePost, onVote } = usePosts()
  const [user] = useAuthState(auth)
  const router = useRouter()
  const [modalState, setModalState] = useRecoilState(postsModalState)
  const { pid } = router.query
  const [error, setError] = useState('')

  const fetchPost = async () => {
    try {
      const postDocRef = doc(db, 'posts', pid as string)
      const unsubscribe = onSnapshot(postDocRef, (querySnapshot) => {
        const postDoc = querySnapshot
        setPostStateValue((prev) => ({
          ...prev,
          selectedPost: { id: postDoc.id, ...postDoc.data() } as Post,
        }))
      })
      return () => unsubscribe()
    } catch (error) {
      setError('Error loading post')
    }
  }

  useEffect(() => {
    const { pid } = router.query

    if (pid && !postStateValue.selectedPost) {
      fetchPost()
    }
  }, [router.query, postStateValue.selectedPost])

  const handleClose = () => {
    setModalState((prev) => ({
      ...prev,
      open: false,
    }))
    router.push(`/`, undefined, { scroll: false })
  }

  useEffect(() => {
    window.onpopstate = () => {
      setModalState((prev) => ({
        ...prev,
        open: false,
      }))
      // router.push(`/`, undefined, { scroll: false })
    }
  }, [])

  return (
    <>
      <Head>
        <title>{postStateValue?.selectedPost?.title}</title>
      </Head>

      <div className="fixed inset-0 z-40 flex items-center justify-center overflow-y-auto overscroll-contain">
        <div
          onClick={(event) => {
            event.stopPropagation()
          }}
          className={`dark:bg-gray-80 relative w-[750px] bg-[#f5f2f2] shadow-lg [-ms-overflow-style:'none'] [scrollbar-width:'none'] supports-[height:100cqh]:h-[100cqh] supports-[height:100svh]:h-[100svh] dark:bg-[#1c1b1b] sm:h-screen [&::-webkit-scrollbar]:hidden ${
            modalState.open && 'overflow-y-auto overscroll-contain'
          }`}
        >
          {error && (
            <p className="flex h-screen items-center justify-center text-xs font-medium text-red-500 dark:text-red-400">
              {error}
            </p>
          )}
          <div className="sm:mx-6">
            <div className="sticky top-0 z-10 mx-5 bg-[#f5f2f2] py-2 dark:bg-[#1c1b1b] sm:mx-8">
              <button
                onClick={handleClose}
                className="relative flex items-center gap-2 rounded-md py-2 px-3 text-sm font-medium hover:rounded-md hover:bg-gray-200 hover:py-2 hover:px-3 dark:text-white dark:hover:bg-gray-800"
              >
                <ArrowLongLeftIcon className="h-5 w-5" /> Back to posts
              </button>
            </div>
            <div className="mx-auto space-y-5 px-[20px] pb-12 sm:px-[32px]">
              {postStateValue.selectedPost && (
                <div className="">
                  <PostItem
                    post={postStateValue.selectedPost}
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
                </div>
              )}
              <Comments
                user={user}
                selectedPost={postStateValue.selectedPost!}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PostDetail
