import { atom } from 'recoil'

export interface SettingsModalState {
  open: boolean
  view: ModalView
}

export type ModalView = 'currentUser'

const defaultModalState: SettingsModalState = {
  open: false,
  view: 'currentUser',
}

export const settingsModalState = atom<SettingsModalState>({
  key: 'settingsModalState',
  default: defaultModalState,
})
