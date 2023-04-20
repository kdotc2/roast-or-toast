import PostDetail from '@/components/Modal/Post/PostDetail'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {getPost} from '@/hooks/usePosts'
import { Post } from '@/atoms/postAtom'
import Meta from '@/components/Meta'

type PostPageProps =  {
  post: Post
}
const PostPage = ({post}: PostPageProps) => {
  const router = useRouter()
  const { pid } = router.query

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        router.push('/')
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  })
  
  useEffect(() => {
    if (!post && pid) {

    }
  }, [pid])

  return (
    <>
    <Meta
      title={post?.title}
      desc={post?.body}
      imageURL={post?.imageURL}
      url={post?.url}
    />
      <div>
        <div className="fixed inset-0 z-[90] flex items-center justify-center">
          <PostDetail post={post} /> 
        </div>
      </div>
    </>
  )
}

PostPage.getInitialProps = async ({query}: any) => {
  const { pid } = query

  let finalPost: Post | undefined
  await getPost(pid as string)
  .then((pos: Post | undefined) => finalPost = pos)
  return { post: finalPost }
}

export default PostPage
