import PostDetail from '@/components/Modal/Post/PostDetail'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import usePosts from '@/hooks/usePosts'
import { Post } from '@/atoms/postAtom'
import Meta from '@/components/Meta'

const PostPage = () => {
  const [post, setPost] = useState<Post | undefined>(undefined)
  const router = useRouter()
  const { pid } = router.query
  const { getPost } = usePosts()

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
      getPost(pid as string)
      .then((pos) => setPost(pos as Post))
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

export default PostPage
