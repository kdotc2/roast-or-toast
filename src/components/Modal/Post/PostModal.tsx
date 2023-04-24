import PostDetail from './PostDetail'
import ModalWrapper from '../ModalWrapper'
import { Post } from '@/atoms/postAtom'

type Props = {
  close: () => void
  post?: Post
}

const PostModal = ({ close, post }: Props) => {
  const content = <PostDetail post={post} close={close} />

  return <ModalWrapper close={close} child={content} width={750} />
}

export default PostModal
