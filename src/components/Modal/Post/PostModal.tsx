import { postsModalState } from '@/atoms/postModalAtom'
import FocusTrap from 'focus-trap-react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import PostDetail from './PostDetail'

const PostModal = () => {
  const router = useRouter()
  const [modalState, setModalState] = useRecoilState(postsModalState)

  const handleClose = () => {
    setModalState((prev) => ({
      ...prev,
      open: false,
    }))
    router.push(`/`, undefined, { scroll: false })
  }

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        // event.target.blur()
        handleClose()
      }
    }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [])

  useEffect(() => {
    window.onpopstate = () => {
      setModalState((prev) => ({
        ...prev,
        open: false,
      }))
    }
  }, [])

  return (
    <>
      <div onClick={handleClose}>
        {modalState.open ? (
          <>
            <FocusTrap
              focusTrapOptions={{ setReturnFocus: false, initialFocus: false }}
            >
              <div className="fixed inset-0 z-30 bg-black/40 ">
                <div>
                  <div className="fixed inset-0 z-40 flex items-center justify-center">
                    <PostDetail />
                  </div>
                </div>
              </div>
            </FocusTrap>
          </>
        ) : null}
      </div>
    </>
  )
}

export default PostModal
