import { atom } from 'recoil'

export interface NewUserModalState {
  open: boolean
  view: ModalView
}

export type ModalView = 'newUser'

const defaultModalState: NewUserModalState = {
  open: false,
  view: 'newUser',
}

export const newUserModalState = atom<NewUserModalState>({
  key: 'newUserModalState',
  default: defaultModalState,
})
