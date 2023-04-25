import { loginModalState } from '@/atoms/authModalAtom'
import { Post, postState } from '@/atoms/postAtom'
import { auth, db } from '@/firebase/clientApp'
import { doc, increment, writeBatch } from 'firebase/firestore'
import React, { useCallback, useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useSetRecoilState } from 'recoil'
import CommentItem from './CommentItem'
import { Comment } from '@/atoms/commentAtom'

import CommentInput from './CommentInput'
import { CommentLoader, Loader } from '../Loader'
import { User } from 'firebase/auth'
import useComments, { createComment } from '@/hooks/useComments'
import usePosts from '@/hooks/usePosts'

type CommentsProps = {
  user?: User | null // if the user is nil they are not logged in
  selectedPost: Post
}

const Comments = ({ selectedPost }: CommentsProps) => {
  const [comments, setComments] = useState<Comment[]>([])
  const [commentFetchLoading, setCommentFetchLoading] = useState(true)
  const [commentCreateLoading, setCommentCreateLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState('')
  const [user, error] = useAuthState(auth)
  const setPostState = useSetRecoilState(postState)
  const { getPostComments } = usePosts()

  const { onVote, commentStateValue } = useComments()

  const onCreateComment = async (comment: Comment) => {
    setComments((prev) => [comment, ...prev])
    setPostState((prev) => ({
      ...prev,
      selectedPost: {
        ...prev.selectedPost,
        numberOfComments: prev.selectedPost?.numberOfComments! + 1,
      } as Post,
      postUpdateRequired: true,
    }))
  }

  const onDeleteComment = useCallback(
    async (comment: Comment) => {
      setDeleteLoading(comment.id as string)
      try {
        if (!comment.id) throw 'Comment has no ID'
        const batch = writeBatch(db)
        const commentDocRef = doc(db, 'comments', comment.id)
        batch.delete(commentDocRef)

        batch.update(doc(db, 'posts', comment.postId), {
          numberOfComments: increment(-1),
        })

        await batch.commit()

        setPostState((prev) => ({
          ...prev,
          selectedPost: {
            ...prev.selectedPost,
            numberOfComments: prev.selectedPost?.numberOfComments! - 1,
          } as Post,
          postUpdateRequired: true,
        }))

        setComments((prev) => prev.filter((item) => item.id !== comment.id))
        // return true;
      } catch (error: any) {
        alert('Error deleting comment')
        // return false;
      }
      setDeleteLoading('')
    },
    [setComments, setPostState]
  )

  useEffect(() => {
    if (!selectedPost || !commentFetchLoading) return
    getPostComments(selectedPost.id).then((comments) => {
      if (comments) {
        setComments(comments)
      }
      setCommentFetchLoading(false)
    })
  })

  return (
    <div>
      <div className="rounded border border-[#e5e5e5] bg-[#fdfdfd] p-4 dark:border-[#333333] dark:bg-[#212121]">
        <CommentInput
          loading={commentCreateLoading}
          user={user}
          onCreateComment={onCreateComment}
          post={selectedPost}
        />
        {commentFetchLoading ? (
          <>
            {[...Array(10)].map((_, i) => (
              <div key={i}>
                <CommentLoader />
              </div>
            ))}
          </>
        ) : (
          <div>
            {!!comments.length ? (
              <>
                {comments.map((comment: Comment) => (
                  <div key={comment.id}>
                    <CommentItem
                      key={comment.id}
                      onVote={onVote}
                      userVoteValue={
                        commentStateValue.commentVotes.find(
                          (item) => item.commentId === comment.id
                        )?.voteValue
                      }
                      comment={comment}
                      onDeleteComment={onDeleteComment}
                      isLoading={deleteLoading === (comment.id as string)}
                      userId={user?.uid}
                    />
                  </div>
                ))}
              </>
            ) : (
              <div className="flex items-center justify-center py-10 text-sm">
                No Comments Yet
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Comments
