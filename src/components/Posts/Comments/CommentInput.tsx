import React, { MouseEventHandler, useState } from 'react'
import { User } from 'firebase/auth'
import { useSetRecoilState } from 'recoil'
import { loginModalState } from '@/atoms/authModalAtom'
import TextareaAutosize from 'react-textarea-autosize'
import { SpinningLoader } from '../Loader'
import { CheckCircleIcon, TagIcon } from '@heroicons/react/24/solid'

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
  const [toggle, setToggle] = useState(false)
  const [toggle2, setToggle2] = useState(false)
  // const [user, error] = useAuthState(auth)

  return (
    <div className="relative mb-6 block">
      <>
        <form className="relative flex">
          <TextareaAutosize
            onChange={(event) => setComment(event.target.value)}
            name="body"
            value={comment}
            className="input peer block min-h-[176px] resize-none overflow-hidden px-[11px] pb-16  placeholder:text-[#a3a3a3]"
            placeholder={`Any feedback to share?`}
          />

          <div className="absolute bottom-3 -mb-3 flex w-full items-center justify-between rounded-b border border-[#d4d4d4] bg-[#fdfdfd] p-4 px-3 pt-3 pb-3 peer-focus:border-t-0 peer-focus:border-[#121212] dark:border-[#525252] dark:bg-[#212121] dark:peer-focus:border-[#dcdcdc]">
            <div className="flex space-x-2 text-xs font-medium">
              <div className="flex items-center">
                <TagIcon className="h-[18px] w-[18px] text-[#a3a3a3] dark:text-[#737373]" />
              </div>
              <button
                onClick={() => setToggle((prev) => !prev)}
                className={`flex gap-1 rounded-md px-2 py-1.5 ${
                  toggle
                    ? 'bg-[#ededed] opacity-50 hover:opacity-75 dark:bg-[#151515]'
                    : 'bg-[#ededed] dark:bg-[#151515]'
                }`}
              >
                🔥
                <span className="hidden justify-center sm:inline">Roast</span>
                {!toggle && <CheckCircleIcon className="h-4 w-4" />}
              </button>
              <button
                onClick={() => setToggle2((prev) => !prev)}
                className={`flex gap-1 rounded-md px-2 py-1.5 ${
                  toggle2
                    ? 'bg-[#ededed] opacity-50 hover:opacity-75 dark:bg-[#151515]'
                    : 'bg-[#ededed] dark:bg-[#151515]'
                }`}
              >
                🍺 <span className="hidden sm:inline">Toast</span>
                {!toggle2 && <CheckCircleIcon className="h-4 w-4" />}
              </button>
            </div>

            <button
              className="primaryButton"
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
        </form>
      </>
    </div>
  )
}

export default CommentInput
