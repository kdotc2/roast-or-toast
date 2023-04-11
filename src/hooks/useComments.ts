import { loginModalState } from '@/atoms/authModalAtom'
import { Comment, commentState, CommentVote } from '@/atoms/commentAtom'
import { auth, db } from '@/firebase/clientApp'
import { collection, doc, getDocs, query, writeBatch } from 'firebase/firestore'
import { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

const useComments = () => {
  const [commentStateValue, setCommentStateValue] = useRecoilState(commentState)
  const [user, loadingUser] = useAuthState(auth)
  const setLoginModalState = useSetRecoilState(loginModalState)

  const onVote = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    comment: Comment,
    vote: number
  ) => {
    event.stopPropagation()
    if (!user?.uid) {
      setLoginModalState({ open: true })
      return
    }

    const { voteStatus } = comment
    const existingVote = commentStateValue.commentVotes.find(
      (vote) => vote.commentId === comment.id
    )

    try {
      let voteChange = vote
      const batch = writeBatch(db)

      const updatedComment = { ...comment }
      const updatedComments = [...commentStateValue.comments]
      let updatedCommentVotes = [...commentStateValue.commentVotes]

      if (!existingVote) {
        const commentVoteRef = doc(
          collection(db, 'users', `${user.uid}/commentVotes`)
        )

        const newVote: CommentVote = {
          id: commentVoteRef.id,
          commentId: comment.id,
          voteValue: vote,
        }

        batch.set(commentVoteRef, newVote)

        updatedComment.voteStatus = voteStatus + vote
        updatedCommentVotes = [...updatedCommentVotes, newVote]
      } else {
        const commentVoteRef = doc(
          db,
          'users',
          `${user.uid}/commentVotes/${existingVote.id}`
        )

        if (existingVote.voteValue === vote) {
          voteChange *= -1
          updatedComment.voteStatus = voteStatus - vote
          updatedCommentVotes = updatedCommentVotes.filter(
            (vote) => vote.id !== existingVote.id
          )
          batch.delete(commentVoteRef)
        }
      }

      let updatedState = {
        ...commentStateValue,
        commentVotes: updatedCommentVotes,
      }

      const commentIdx = commentStateValue.comments.findIndex(
        (item) => item.id === comment.id
      )

      updatedComments[commentIdx!] = updatedComment
      updatedState = {
        ...updatedState,
        comments: updatedComments,
      }

      setCommentStateValue(updatedState)

      const commentRef = doc(db, 'comments', comment.id)
      batch.update(commentRef, { voteStatus: voteStatus + voteChange })
      await batch.commit()
    } catch (error) {
      alert('Voting error')
    }
  }

  const getCommentVotes = async () => {
    const postCommentsQuery = query(
      collection(db, `users/${user?.uid}/commentVotes`)
    )
    const commentVoteDocs = await getDocs(postCommentsQuery)
    const commentVotes = commentVoteDocs.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    setCommentStateValue((prev) => ({
      ...prev,
      commentVotes: commentVotes as CommentVote[],
    }))
  }

  useEffect(() => {
    if (!user?.uid) return
    getCommentVotes()
  }, [user])

  useEffect(() => {
    if (!user?.uid && !loadingUser) {
      setCommentStateValue((prev) => ({
        ...prev,
        commentVotes: [],
      }))
      return
    }
  }, [user, loadingUser])

  return {
    commentStateValue,
    setCommentStateValue,
    onVote,
    getCommentVotes,
  }
}

export default useComments
