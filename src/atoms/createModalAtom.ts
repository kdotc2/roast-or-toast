import { atom } from 'recoil'

export interface CreateModalState {
  open: boolean
  view: ModalView
}

export type ModalView = 'create' | 'text' | 'image' | 'link'

const defaultModalState: CreateModalState = {
  open: false,
  view: 'create',
}

export const createModalState = atom<CreateModalState>({
  key: 'createModalState',
  default: defaultModalState,
})
