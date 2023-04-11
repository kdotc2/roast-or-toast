import { atom } from 'recoil'

export interface LoginModalState {
  open: boolean
}

const defaultModalState: LoginModalState = {
  open: false,
}

export const loginModalState = atom<LoginModalState>({
  key: 'loginModalState',
  default: defaultModalState,
})
