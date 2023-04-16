import { loginModalState } from '@/atoms/authModalAtom'
import { Comment } from '@/atoms/commentAtom'
import { Post, postState, PostVote } from '@/atoms/postAtom'
import { auth, db, storage } from '@/firebase/clientApp'
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  writeBatch,
  where,
} from 'firebase/firestore'
import { deleteObject, ref } from 'firebase/storage'
import { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRecoilState, useSetRecoilState } from 'recoil'

const usePosts = () => {
  const [postStateValue, setPostStateValue] = useRecoilState(postState)
  const [user, loadingUser] = useAuthState(auth)
  const setLoginModalState = useSetRecoilState(loginModalState)

  const onVote = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    post: Post,
    vote: number
  ) => {
    event.stopPropagation()
    if (!user?.uid) {
      setLoginModalState({ open: true })
      return
    }

    const { voteStatus } = post
    // const existingVote = post.currentUserVoteStatus;
    const existingVote = postStateValue.postVotes.find(
      (vote) => vote.postId === post.id
    )

    // is this an upvote or a downvote?
    // has this user voted on this post already? was it up or down?

    try {
      let voteChange = vote
      const batch = writeBatch(db)

      const updatedPost = { ...post }
      const updatedPosts = [...postStateValue.posts]
      let updatedPostVotes = [...postStateValue.postVotes]

      // New vote
      if (!existingVote) {
        const postVoteRef = doc(
          collection(db, 'users', `${user.uid}/postVotes`)
        )

        const newVote: PostVote = {
          id: postVoteRef.id,
          postId: post.id,
          voteValue: vote,
        }

        // console.log('NEW VOTE!!!', newVote)

        // APRIL 25 - DON'T THINK WE NEED THIS
        // newVote.id = postVoteRef.id;

        batch.set(postVoteRef, newVote)

        updatedPost.voteStatus = voteStatus + vote
        updatedPostVotes = [...updatedPostVotes, newVote]
      }
      // Removing existing vote
      else {
        // Used for both possible cases of batch writes
        const postVoteRef = doc(
          db,
          'users',
          `${user.uid}/postVotes/${existingVote.id}`
        )

        // Removing vote
        if (existingVote.voteValue === vote) {
          voteChange *= -1
          updatedPost.voteStatus = voteStatus - vote
          updatedPostVotes = updatedPostVotes.filter(
            (vote) => vote.id !== existingVote.id
          )
          batch.delete(postVoteRef)
        }
        // Changing vote
        else {
          voteChange = 2 * vote
          updatedPost.voteStatus = voteStatus + 2 * vote
          const voteIdx = postStateValue.postVotes.findIndex(
            (vote) => vote.id === existingVote.id
          )
          // console.log("HERE IS VOTE INDEX", voteIdx);

          // Vote was found - findIndex returns -1 if not found
          if (voteIdx !== -1) {
            updatedPostVotes[voteIdx] = {
              ...existingVote,
              voteValue: vote,
            }
          }
          batch.update(postVoteRef, {
            voteValue: vote,
          })
        }
      }

      let updatedState = { ...postStateValue, postVotes: updatedPostVotes }

      const postIdx = postStateValue.posts.findIndex(
        (item) => item.id === post.id
      )

      // if (postIdx !== undefined) {
      updatedPosts[postIdx!] = updatedPost
      updatedState = {
        ...updatedState,
        posts: updatedPosts,
      }
      // }

      /**
       * Optimistically update the UI
       * Used for single page view [pid]
       * since we don't have real-time listener there
       */
      if (updatedState.selectedPost) {
        updatedState = {
          ...updatedState,
          selectedPost: updatedPost,
        }
      }

      // Optimistically update the UI
      setPostStateValue(updatedState)

      // Update database
      const postRef = doc(db, 'posts', post.id)
      batch.update(postRef, { voteStatus: voteStatus + voteChange })
      await batch.commit()
    } catch (error) {
      // console.log('onVote error', error)
      alert('Voting error')
    }
  }

  const onDeletePost = async (post: Post): Promise<boolean> => {
    // console.log('DELETEING POST', 'post.id')

    try {
      // if post has an image url, delete it from storage

      if (post.imageURL) {
        const imageRef = ref(storage, `posts/${post.id}/image`)
        await deleteObject(imageRef)
      }

      // delete post from posts collection
      const postDocRef = doc(db, 'posts', post.id)
      await deleteDoc(postDocRef)

      // update post state
      setPostStateValue((prev) => ({
        ...prev,
        posts: prev.posts.filter((item) => item.id !== post.id),
      }))
      return true
    } catch (error) {
      return false
    }
  }

  const getPostVotes = async () => {
    const postVotesQuery = query(collection(db, `users/${user?.uid}/postVotes`))
    const postVoteDocs = await getDocs(postVotesQuery)
    const postVotes = postVoteDocs.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    setPostStateValue((prev) => ({
      ...prev,
      postVotes: postVotes as PostVote[],
    }))
  }

  useEffect(() => {
    if (!user?.uid) return
    getPostVotes()
  }, [user])

  const getPosts = async () => {
    try {
      const postsQuery = query(
        collection(db, 'posts'),
        orderBy('createdAt', 'desc')
      )
      const unsubscribe = onSnapshot(postsQuery, (querySnapshot) => {
        const posts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))

        setPostStateValue((prev) => ({
          ...prev,
          posts: posts as Post[],
          postUpdateRequired: false,
        }))
      })

      return () => unsubscribe()
      // console.log('posts', postsQuery)
    } catch (error: any) {
      alert(`Error getting posts ${error}`)
    }
  }

  const getPost = async (pid: string) => {
    const docRef = doc(db, 'posts', pid as string)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      return {id: docSnap.id, ...docSnap.data()}
    } else {
      return undefined
    }
  }

  useEffect(() => {
    // Logout or no authenticated user
    if (!user?.uid && !loadingUser) {
      setPostStateValue((prev) => ({
        ...prev,
        postVotes: [],
      }))
      return
    }
  }, [user, loadingUser])

  const getPostComments = async (postID: string) => {
    try {
      const commentsQuery = query(
        collection(db, 'comments'),
        where('postId', '==', postID),
        orderBy('createdAt', 'desc')
      )

      const snapshot = await getDocs(commentsQuery)
      let comments: Array<Comment> = []
      snapshot.forEach((doc) => comments.push({id: doc.id, ...doc.data()} as Comment))
      return comments
    } catch (error: any) {
      console.log('getPostComments error', error.message)
    }
  }

  return {
    postStateValue,
    setPostStateValue,
    onVote,
    onDeletePost,
    getPosts,
    getPost,
    getPostComments,
  }
}

export default usePosts
