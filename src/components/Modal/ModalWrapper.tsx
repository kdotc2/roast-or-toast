import FocusTrap from 'focus-trap-react'
import { ReactNode, useEffect } from 'react'

type Props = {
  child: ReactNode
  close: () => void
  width: number
}

export default function ModalWrapper({ child, close, width }: Props) {
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
    window.document.body.classList.add("overflow-hidden")
    return () => {
      window.document.body.classList.remove("overflow-hidden")
    }
  })

  return (
    <div id="modal-wrapper" onClick={() => close()}>
      {/* TODO consider adding this to this element className={`dark:bg-gray-80 relative w-[750px] bg-[#f5f2f2] [-ms-overflow-style:'none'] [scrollbar-width:'none'] supports-[height:100dvh]:h-[100dvh] dark:bg-[#1c1b1b] sm:h-screen [&::-webkit-scrollbar]:hidden ${
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
                  className={`relative rounded-lg bg-white px-6 shadow-lg dark:bg-gray-800 w-[${width}px]`}
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
