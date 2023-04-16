import { auth } from '@/firebase/clientApp'
import usePosts from '@/hooks/usePosts'
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router'
import { Post } from '../../atoms/postAtom'
import PostView from './PostView'
import Masonry from 'react-masonry-css'
import { Loader } from './Loader'
import PostModal from '../Modal/Post/PostModal'

const breakpointCols = {
  7200: 14,
  6880: 13,
  6480: 12,
  6000: 11,
  5120: 10,
  4480: 9,
  3840: 8,
  3440: 7,
  3072: 6,
  2560: 5,
  1920: 4,
  1440: 3,
  1080: 2,
  640: 1,
}

const PostFeed = () => {
  const [user] = useAuthState(auth)
  // const [showPostModal, setShowPostModal] = useState(false)
  const [clickedPost, setClickedPost] = useState<Post | undefined>(undefined)
  const {
    postStateValue,
    onVote,
    onDeletePost,
    getPosts,
  } = usePosts()

  useEffect(() => {
    getPosts()
  }, [])
  const router = useRouter()

  return (
    <div>
      { clickedPost && (
        <PostModal
          close={() => {
            setClickedPost(undefined)
            router.push('/')
          }}

          post={clickedPost} />
      )}

      <Masonry
        breakpointCols={breakpointCols}
        className="my-masonry-grid w-auto"
        columnClassName="my-masonry-grid_column"
      >
        {postStateValue?.posts?.length === 0 && (
          <Loader />
        )}

        {postStateValue.posts.map((post: Post) => (
          <div key={post.id}>
              <PostView
                post={post}
                userIsCreator={user?.uid === post.creatorId}
                userVoteValue={
                  postStateValue.postVotes.find(
                    (item) => item.postId === post.id
                  )?.voteValue
                }
                onVote={onVote}
                onSelectPost={() => {
                  setClickedPost(post)
                  // setShowPostModal(true)
                }}
                onDeletePost={onDeletePost}
              />
          </div>
        ))}
      </Masonry>
    </div>
  )
}

export default PostFeed
