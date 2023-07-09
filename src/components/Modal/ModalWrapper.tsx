import FocusTrap from 'focus-trap-react'
import { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/router'

type Props = {
  child: ReactNode
  close: () => void
  width: number
}

export default function ModalWrapper({ child, close, width }: Props) {
  const router = useRouter()

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close()
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  })

  useEffect(() => {
    window.document.body.classList.add('overflow-hidden')
    return () => {
      window.document.body.classList.remove('overflow-hidden')
    }
  })

  useEffect(() => {
    router.beforePopState(({ as }) => {
      if (as !== router.asPath) {
        close()
      }
      return true
    })

    // return () => {
    //   router.beforePopState(() => true)
    // }
  }, [router])

  return (
    <div id="modal-wrapper" onClick={() => close()}>
      {/* TODO consider adding this to this element className={`dark:bg-[#262626] relative w-[750px] bg-[#f5f2f2] [-ms-overflow-style:'none'] [scrollbar-width:'none'] supports-[height:100dvh]:h-[100dvh] dark:bg-[#0b0b0b] sm:h-screen [&::-webkit-scrollbar]:hidden ${
            modalState.open && 'overflow-y-auto overscroll-contain shadow-lg'
 */}

      <>
        <FocusTrap
          focusTrapOptions={{
            returnFocusOnDeactivate: false,
            initialFocus: false,
          }}
        >
          <div className="fixed inset-0 z-[45] bg-black/40">
            <div>
              <div className="fixed inset-0 z-50 flex items-center justify-center px-5 sm:px-0">
                <div
                  onClick={(event) => {
                    event.stopPropagation()
                  }}
                  className={`relative rounded-lg bg-[#fdfdfd] px-6 shadow-lg dark:bg-[#212121] w-[${width}px]`}
                >
                  {child}
                </div>
              </div>
            </div>
          </div>
        </FocusTrap>
      </>
    </div>
  )
}
