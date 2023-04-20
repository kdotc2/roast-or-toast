import React, { MouseEventHandler, useState } from 'react'
import { User } from 'firebase/auth'
import { useSetRecoilState } from 'recoil'
import { loginModalState } from '@/atoms/authModalAtom'
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
  const setLoginState = useSetRecoilState(loginModalState)
  // const [user, error] = useAuthState(auth)

  return (
    <div className="relative flex-col">
      <>
        <form className="relative flex">
          <TextareaAutosize
            onChange={(event) => setComment(event.target.value)}
            name="body"
            value={comment}
            className="input peer block min-h-[84px] resize-none appearance-none overflow-hidden px-[11px] pt-3"
            placeholder={`Any feedback to share?`}
          />
        </form>
      </>
      <div className="flex justify-end">
        <button
          className="primaryButton mt-2"
          disabled={!comment.length}
          onClick={() => {
            user ? onCreateComment(comment) : setLoginState({ open: true })
          }}
        >
          {loading ? (
            <div className="px-[22.5px]">
              <SpinningLoader height={5} width={5} />
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
