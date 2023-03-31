import PostDetail from '@/components/Modal/Post/PostDetail'

const PostPage = () => {
  return (
    <>
      <div>
        <div className="fixed inset-0 z-40 flex items-center justify-center">
          <PostDetail />
        </div>
      </div>
    </>
  )
}

export default PostPage
