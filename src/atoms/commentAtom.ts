import { atom } from 'recoil'
import { Timestamp } from 'firebase/firestore'

export type Comment = {
  id: string
  creatorId: string
  creatorDisplayName: string
  creatorPhotoURL: string
  postId: string
  postTitle: string
  text: string
  createdAt?: Timestamp
  editedAt?: Timestamp
  commentIdx?: number
  voteStatus: number
  currentUserVoteStatus?: {
    id: string
    voteValue: number
  }
}

export type CommentVote = {
  id?: string
  commentId: string
  voteValue: number
}

interface CommentState {
  // selectedPost: Post | null
  comments: Comment[]
  commentVotes: CommentVote[]
  commentUpdateRequired: boolean
}

export const defaultCommentState: CommentState = {
  // selectedPost: null,
  comments: [],
  commentVotes: [],
  commentUpdateRequired: true,
}

export const commentState = atom({
  key: 'commentState',
  default: defaultCommentState,
})
