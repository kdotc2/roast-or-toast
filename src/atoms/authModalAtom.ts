import { atom } from 'recoil'

export interface AuthModalState {
  open: boolean
  view: ModalView
}

export type ModalView = 'login' | 'newUser' | 'loggedIn'

const defaultModalState: AuthModalState = {
  open: false,
  view: 'login',
}

export const authModalState = atom<AuthModalState>({
  key: 'modalState',
  default: defaultModalState,
})
