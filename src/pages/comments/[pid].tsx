import PostDetail from '@/components/Modal/Post/PostDetail'

const PostPage = () => {
  return (
    <>
      <div>
        <div className="fixed inset-0 z-[90] flex items-center justify-center">
          {/* TODO navgate to / or something */}
          <PostDetail close={console.log} /> 
        </div>
      </div>
    </>
  )
}

export default PostPage
