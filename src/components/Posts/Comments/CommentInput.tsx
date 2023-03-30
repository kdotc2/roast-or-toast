import React, { MouseEventHandler, useState } from 'react'
import { User } from 'firebase/auth'
import { useSetRecoilState } from 'recoil'
import { authModalState } from '@/atoms/authModalAtom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/firebase/clientApp'
import TextareaAutosize from 'react-textarea-autosize'
import { SpinningLoader } from '../Loader'

type CommentInputProps = {
  comment: string
  setComment: (value: string) => void
  loading: boolean
  user?: User | null
  onCreateComment: (comment: string) => void
}

const CommentInput = ({
  comment,
  setComment,
  loading,
  user,
  onCreateComment,
}: CommentInputProps) => {
  const setLoginState = useSetRecoilState(authModalState)
  // const [user, error] = useAuthState(auth)

  return (
    <div className="relative flex-col">
      <>
        <form className="relative flex">
          <TextareaAutosize
            onChange={(event) => setComment(event.target.value)}
            name="body"
            value={comment}
            // id="floating_outlined"
            className="border-1 peer block min-h-[84px] w-full resize-none appearance-none overflow-hidden rounded border-gray-300 bg-transparent px-[11px] pt-3 text-sm text-gray-900 focus:border-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-gray-100 dark:focus:border-gray-100"
            placeholder={`Any feedback to share?`}
          />
          {/* <label
            htmlFor="floating_outlined"
            className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform bg-[#fdfbfb] px-2 text-sm text-gray-500 dark:text-gray-400 duration-300 peer-placeholder-shown:top-[27%] peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-gray-500 dark:bg-[#161515] dark:peer-focus:text-gray-400"
          >
            {user
              ? `Any feedback to share, ${user?.displayName}?`
              : 'Any feedback to share?'}
          </label> */}
        </form>
      </>
      <div className="flex justify-end">
        <button
          className="primaryButton mt-3 disabled:bg-gray-100 disabled:text-gray-200 disabled:dark:bg-gray-900 disabled:dark:text-gray-700"
          disabled={!comment.length}
          onClick={() => {
            user
              ? onCreateComment(comment)
              : setLoginState({ open: true, view: 'login' })
          }}
        >
          {loading ? (
            <div className="px-[22.5px]">
              <SpinningLoader />
            </div>
          ) : (
            <span>Comment</span>
          )}
        </button>
      </div>
    </div>
  )
}

export default CommentInput
