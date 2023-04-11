import { loginModalState } from '@/atoms/authModalAtom'
import { Post, postState } from '@/atoms/postAtom'
import { auth, db } from '@/firebase/clientApp'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
  writeBatch,
} from 'firebase/firestore'
import React, { useCallback, useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useSetRecoilState } from 'recoil'
import CommentItem from './CommentItem'
import { Comment } from '@/atoms/commentAtom'

import CommentInput from './CommentInput'
import { CommentLoader, Loader } from '../Loader'
import { User } from 'firebase/auth'
import useComments from '@/hooks/useComments'

type CommentsProps = {
  user?: User | null
  selectedPost: Post
}

const Comments = ({ selectedPost }: CommentsProps) => {
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState<Comment[]>([])
  const [commentFetchLoading, setCommentFetchLoading] = useState(true)
  const [commentCreateLoading, setCommentCreateLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState('')
  const [user, error] = useAuthState(auth)
  const setAuthModalState = useSetRecoilState(loginModalState)
  const setPostState = useSetRecoilState(postState)

  const { onVote, commentStateValue } = useComments()

  const onCreateComment = async (comment: string) => {
    if (!user) {
      setAuthModalState({ open: true })
      return
    }

    setCommentCreateLoading(true)
    try {
      const batch = writeBatch(db)
      const userSnap = await getDoc(doc(db, 'users', user.uid))
      // Create comment document
      const commentDocRef = doc(collection(db, 'comments'))
      batch.set(commentDocRef, {
        postId: selectedPost.id,
        creatorId: user!.uid,
        creatorDisplayName: userSnap.data()?.displayName,
        // creatorPhotoURL: user!.photoURL,
        text: comment,
        voteStatus: 0,
        postTitle: selectedPost.title,
        createdAt: serverTimestamp(),
      } as Comment)

      // Update post numberOfComments
      batch.update(doc(db, 'posts', selectedPost.id), {
        numberOfComments: increment(1),
      })
      await batch.commit()

      setComment('')
      const { id: postId, title } = selectedPost
      setComments((prev) => [
        {
          id: commentDocRef.id,
          creatorId: user!.uid,
          creatorDisplayName: userSnap.data()?.displayName,
          // creatorPhotoURL: user!.photoURL,
          postId,
          postTitle: title,
          text: comment,
          voteStatus: 0,
          createdAt: {
            seconds: Date.now() / 1000,
          },
        } as Comment,
        ...prev,
      ])
      setPostState((prev) => ({
        ...prev,
        selectedPost: {
          ...prev.selectedPost,
          numberOfComments: prev.selectedPost?.numberOfComments! + 1,
        } as Post,
        postUpdateRequired: true,
      }))
    } catch (error: any) {
      // console.log('onCreateComment error', error.message)
      alert('Error creating comment')
    }
    setCommentCreateLoading(false)
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

  // const getPostComments = async () => {
  //   try {
  //     const commentsQuery = query(
  //       collection(db, 'comments'),
  //       where('postId', '==', selectedPost.id),
  //       orderBy('createdAt', 'desc')
  //     )
  //     const commentDocs = await getDocs(commentsQuery)
  //     const comments = commentDocs.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }))
  //     setComments(comments as Comment[])
  //   } catch (error: any) {
  //     // console.log('getPostComments error', error.message)
  //   }
  //   setCommentFetchLoading(false)
  // }

  const getPostComments = () => {
    try {
      const commentsQuery = query(
        collection(db, 'comments'),
        where('postId', '==', selectedPost.id),
        orderBy('createdAt', 'desc')
      )
      const unsubscribe = onSnapshot(commentsQuery, (querySnapshot) => {
        const comments = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))

        setComments(comments as Comment[])
        setCommentFetchLoading(false)
      })

      return () => unsubscribe()
    } catch (error: any) {
      console.log('getPostComments error', error.message)
    }
  }

  useEffect(() => {
    if (!selectedPost) return
    getPostComments()
  }, [selectedPost])

  return (
    <div>
      <div className="rounded border bg-[#fdfbfb] p-4 dark:bg-[#161515]">
        <CommentInput
          comment={comment}
          setComment={setComment}
          loading={commentCreateLoading}
          user={user}
          onCreateComment={onCreateComment}
        />
        {commentFetchLoading ? (
          <>
            {[...Array(10)].map((key) => (
              <div key={key}>
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
