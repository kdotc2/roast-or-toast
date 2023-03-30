import { atom } from 'recoil'

export interface AboutModalState {
  open: boolean
  view: ModalView
}

export type ModalView = 'about'

const defaultModalState: AboutModalState = {
  open: false,
  view: 'about',
}

export const aboutModalState = atom<AboutModalState>({
  key: 'aboutModalState',
  default: defaultModalState,
})
