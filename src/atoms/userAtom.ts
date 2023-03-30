import { atom } from 'recoil'
import { Timestamp } from 'firebase/firestore'

export type User = {
  id: string
  displayName: string
  username: string
  email: string
  photoURL: string
}

interface UserState {
  userUpdatedRequired: boolean
}

export const defaultUserState: UserState = {
  userUpdatedRequired: true,
}

export const userState = atom({
  key: 'userState',
  default: defaultUserState,
})

// export type User = {
//   id: string
//   username: string
//   totalNumberOfPosts: number
//   totalNumberOfComments: number
//   totalVotes: number
//   profileURL?: string
//   createdAt: Timestamp
// }
