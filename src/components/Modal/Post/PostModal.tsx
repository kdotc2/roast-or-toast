import { postsModalState } from '@/atoms/postModalAtom'
import FocusTrap from 'focus-trap-react'
import { useRouter } from 'next/router'
import { ReactNode, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import PostDetail from './PostDetail'
import ModalWrapper from '../ModalWrapper'
import { Post } from '@/atoms/postAtom'

type Props = {
  close: () => void
  post?: Post
}

const PostModal = ({ close, post }: Props) => {
  console.log(`modal for ${post?.title}`)
  const content = <PostDetail post={post} close={close}/>

  return (
    <ModalWrapper close={close} child={content}/>
  )
}

export default PostModal

