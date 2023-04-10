import PostDetail from '@/components/Modal/Post/PostDetail'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const PostPage = () => {
  const router = useRouter()
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        router.push('/')
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  })

  return (
    <>
      <div>
        <div className="fixed inset-0 z-[90] flex items-center justify-center">
          <PostDetail  /> 
        </div>
      </div>
    </>
  )
}

export default PostPage
