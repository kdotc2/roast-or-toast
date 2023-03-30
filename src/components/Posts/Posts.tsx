import { auth, db } from '@/firebase/clientApp'
import usePosts from '@/hooks/usePosts'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Post, postState } from '../../atoms/postAtom'
import PostItem from './PostItem'
import Masonry from 'react-masonry-css'
import { Loader } from './Loader'

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

type PostsProps = {}

const PostsPage = ({}) => {
  const [user] = useAuthState(auth)
  const [loading, setLoading] = useState(false)
  const {
    postStateValue,
    setPostStateValue,
    onVote,
    onDeletePost,
    onSelectPost,
    getPosts,
  } = usePosts()

  // const getPosts = async () => {
  //   try {
  //     setLoading(true)
  //     const postsQuery = query(
  //       collection(db, 'posts'),
  //       orderBy('createdAt', 'desc')
  //     )
  //     const postDocs = await getDocs(postsQuery)
  //     const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  //     setPostStateValue((prev) => ({
  //       ...prev,
  //       posts: posts as Post[],
  //     }))
  //     console.log('posts', posts)
  //   } catch (error: any) {
  //     console.log('getPosts error', error.message)
  //   }
  //   setLoading(false)
  // }

  useEffect(() => {
    getPosts()
  }, [])

  return (
    <div>
      {/* {user?.metadata ? (
      <div>hello</div>
    ) : (<div>what's up</div>) } */}
      <Masonry
        breakpointCols={breakpointCols}
        className="my-masonry-grid w-auto"
        columnClassName="my-masonry-grid_column"
      >
        {postStateValue.posts.map((post: Post) => (
          <div>
            {loading ? (
              <div>
                <Loader />
              </div>
            ) : (
              <>
                <PostItem
                  key={post.id}
                  post={post}
                  userIsCreator={user?.uid === post.creatorId}
                  userVoteValue={
                    postStateValue.postVotes.find(
                      (item) => item.postId === post.id
                    )?.voteValue
                  }
                  onVote={onVote}
                  onSelectPost={onSelectPost}
                  onDeletePost={onDeletePost}
                />
              </>
            )}
          </div>
        ))}
      </Masonry>
    </div>
  )
}
export default PostsPage
