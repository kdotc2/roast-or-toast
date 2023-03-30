import { atom } from 'recoil'

export interface PostsModalState {
  open: boolean
  view: ModalView
}

export type ModalView = 'posts'

const defaultModalState: PostsModalState = {
  open: false,
  view: 'posts',
}

export const postsModalState = atom<PostsModalState>({
  key: 'postsModalState',
  default: defaultModalState,
})
