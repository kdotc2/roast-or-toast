import { atom } from 'recoil'
import { Timestamp } from 'firebase/firestore'

export type Post = {
  id: string
  userDisplayText: string
  creatorId: string
  displayName: string
  title: string
  body: string
  url: string
  numberOfComments: number
  voteStatus: number
  currentUserVoteStatus?: {
    id: string
    voteValue: number
  }
  imageURL?: string
  postIdx?: number
  createdAt: Timestamp
  editedAt?: Timestamp
  tags: string[]
}

export type PostVote = {
  id?: string
  postId: string
  voteValue: number
}

interface PostState {
  selectedPost: Post | null
  posts: Post[]
  postVotes: PostVote[]
  postUpdateRequired: boolean
}

export const defaultPostState: PostState = {
  selectedPost: null,
  posts: [],
  postVotes: [],
  postUpdateRequired: true,
}

export const postState = atom({
  key: 'postState',
  default: defaultPostState,
})
