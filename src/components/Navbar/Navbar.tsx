import { auth, db } from '@/firebase/clientApp'
import {
  DocumentTextIcon,
  InformationCircleIcon,
  LinkIcon,
  PhotoIcon,
  ArrowLeftOnRectangleIcon,
  Cog8ToothIcon,
  XMarkIcon,
  Bars3BottomRightIcon,
} from '@heroicons/react/24/outline'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useSetRecoilState } from 'recoil'
import { createModalState } from '../../atoms/createModalAtom'
import { settingsModalState } from '../../atoms/settingsModalAtom'
import { SpinningLoader } from '@/components/Posts/Loader'
import { useState } from 'react'
import AboutModal from '../Modal/About/AboutModal'
import LoginModal from '../Modal/Auth/LoginModal'

export const Navbar = () => {
  const [user, loading, error] = useAuthState(auth)
  const [tooltipStatus, setTooltipStatus] = useState(false)
  const setCreateState = useSetRecoilState(createModalState)
  const setAuthModalState = useSetRecoilState(settingsModalState)
  const [showAboutModal, setShowAboutModal] = useState(false)
  const [showSignupModal, setShowSignupModal] = useState(false)

  const currentUser = auth.currentUser

  return (
    <>
      {showAboutModal && <AboutModal close={() => setShowAboutModal(false)} />}
      {showSignupModal && (
        <LoginModal close={() => setShowSignupModal(false)} />
      )}
      <div className="sticky top-0 z-[40] hidden h-screen w-16 flex-shrink-0 justify-center border-r border-r-[#e5e5e5] bg-[#fdfdfd] py-2 dark:border-r-[#333333] dark:bg-[#212121] sm:flex">
        <div
          className="relative flex flex-col items-center justify-between text-center"
          onMouseEnter={() => setTooltipStatus(true)}
          onMouseLeave={() => setTooltipStatus(false)}
        >
          <div className="flex">
            {currentUser ? (
              <div className="group">
                <button
                  onClick={() =>
                    setAuthModalState({ open: true, view: 'currentUser' })
                  }
                  className="navbarButton"
                  aria-label="Settings"
                >
                  {loading ? (
                    <div className="my-[2px]">
                      <SpinningLoader height={5} width={5} />
                    </div>
                  ) : (
                    <Cog8ToothIcon className="h-6 w-6" />
                  )}
                </button>
                {tooltipStatus && <span className="tooltip">Settings</span>}
              </div>
            ) : (
              <div className="group">
                <button
                  onClick={() => setShowSignupModal(true)}
                  className="navbarButton group"
                  aria-label="Log In & Sign Up"
                >
                  {loading ? (
                    <div className="my-[2px]">
                      <SpinningLoader height={5} width={5} />
                    </div>
                  ) : (
                    <ArrowLeftOnRectangleIcon className="h-6 w-6 rotate-180" />
                  )}
                </button>
                {tooltipStatus && (
                  <span className="tooltip">Log In / Sign Up</span>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-col space-y-8">
            <div className="group">
              <button
                aria-label="Text Post"
                className="navbarButton"
                onClick={() => {
                  user
                    ? setCreateState({ open: true, view: 'text' })
                    : setShowSignupModal(true)
                }}
              >
                <DocumentTextIcon className="h-6 w-6" />
              </button>
              {tooltipStatus && <span className="tooltip">Text Post</span>}
            </div>
            <div className="group">
              <button
                aria-label="Image Post"
                className="navbarButton"
                onClick={() => {
                  user
                    ? setCreateState({ open: true, view: 'image' })
                    : setShowSignupModal(true)
                }}
              >
                <PhotoIcon className="h-6 w-6" />
              </button>
              {tooltipStatus && <span className="tooltip">Image Post</span>}
            </div>
            <div className="group">
              <button
                aria-label="Link Post"
                className="navbarButton group"
                onClick={() => {
                  user
                    ? setCreateState({ open: true, view: 'link' })
                    : setShowSignupModal(true)
                }}
              >
                <LinkIcon className="h-6 w-6" />
              </button>
              {tooltipStatus && <span className="tooltip">Link Post</span>}
            </div>
          </div>

          <div className="group flex">
            <button
              aria-label="About"
              className="navbarButton group"
              onClick={() => {
                setShowAboutModal(true)
              }}
            >
              <InformationCircleIcon className="h-6 w-6" />
            </button>
            {tooltipStatus && <span className="tooltip">About</span>}
          </div>
        </div>
      </div>
    </>
  )
}

export const MobileNav = () => {
  const [navShow, setNavShow] = useState(false)
  const [user, loading, error] = useAuthState(auth)
  const currentUser = auth.currentUser
  const setCreateState = useSetRecoilState(createModalState)
  const setAuthModalState = useSetRecoilState(settingsModalState)
  const [showAboutModal, setShowAboutModal] = useState(false)
  const [showSignupModal, setShowSignupModal] = useState(false)

  const onToggleNav = () => {
    setNavShow((status) => {
      if (status) {
        document.body.style.overflow = 'auto'
        setNavShow(false)
      } else {
        document.body.style.overflow = 'hidden'
        setNavShow(true)
      }
      return !status
    })
  }

  return (
    <div className="flex h-screen sm:hidden">
      {showAboutModal && <AboutModal close={() => setShowAboutModal(false)} />}
      {showSignupModal && (
        <LoginModal close={() => setShowSignupModal(false)} />
      )}
      <div className="fixed top-5 right-5 z-[40]">
        <div className="mt-auto flex transform rounded-full border border-[#e5e5e5] bg-[#fdfdfd] shadow-sm duration-100 ease-in-out active:scale-[.85] dark:border-[#333333] dark:bg-[#212121]">
          <button
            type="button"
            className={`flex items-center justify-center p-3`}
            aria-label="Toggle Menu"
            onClick={onToggleNav}
          >
            {navShow ? (
              <XMarkIcon className="h-6 w-6 stroke-2" />
            ) : (
              <Bars3BottomRightIcon className="h-6 w-6 stroke-2" />
            )}
          </button>
        </div>
      </div>
      {/* <div
        className={
          navShow
            ? `fixed inset-0 z-40 ml-auto bg-black/40 duration-300 ease-in-out`
            : ``
        }
        onClick={onToggleNav}
      ></div> */}
      <div
        className={`fixed bottom-0 z-30 flex w-full transform bg-[#f5f2f2] supports-[height:100dvh]:h-[100dvh] dark:bg-[#0b0b0b]  ${
          navShow
            ? 'translate-x-0 shadow-sm duration-300 ease-out'
            : 'translate-x-full duration-300 ease-in'
        }`}
      >
        <nav className="z-[150] mx-auto ml-8 flex flex-col justify-center space-y-16 text-sm">
          <div className="flex flex-col justify-between space-y-6">
            <p className="-mb-2 text-xs font-semibold uppercase text-[#a3a3a3] dark:text-[#737373]">
              Create a post
            </p>
            <button
              aria-label="Text Post"
              className="flex items-center"
              onClick={() => {
                {
                  onToggleNav()
                }
                user
                  ? setCreateState({ open: true, view: 'text' })
                  : setShowSignupModal(true)
              }}
            >
              <DocumentTextIcon className="mr-3 h-6 w-6" /> Text
            </button>

            <button
              aria-label="Image Post"
              className="flex items-center"
              onClick={() => {
                {
                  onToggleNav()
                }
                user
                  ? setCreateState({ open: true, view: 'image' })
                  : setShowSignupModal(true)
              }}
            >
              <PhotoIcon className="mr-3 h-6 w-6" />
              Image
            </button>

            <button
              aria-label="Link Post"
              className="flex items-center"
              onClick={() => {
                {
                  onToggleNav()
                }
                user
                  ? setCreateState({ open: true, view: 'link' })
                  : setShowSignupModal(true)
              }}
            >
              <LinkIcon className="mr-3 h-6 w-6" />
              Link
            </button>
          </div>
          <div className="flex-col space-y-6">
            <p className="-mb-2 text-xs font-semibold uppercase text-[#a3a3a3] dark:text-[#737373]">
              miscellaneous
            </p>
            {currentUser ? (
              <button
                onClick={() => {
                  {
                    onToggleNav()
                  }
                  setAuthModalState({ open: true, view: 'currentUser' })
                }}
                className="flex items-center"
                aria-label="Settings"
              >
                <Cog8ToothIcon className="mr-3 h-6 w-6" />
                Settings
              </button>
            ) : (
              <button
                onClick={() => {
                  onToggleNav()
                  setShowSignupModal(true)
                }}
                className="flex items-center"
                aria-label="Log In & Sign Up"
              >
                {loading ? (
                  <div className="my-[2px]">
                    <SpinningLoader height={5} width={5} />
                  </div>
                ) : (
                  <span className="flex items-center">
                    <ArrowLeftOnRectangleIcon className="mr-3 h-6 w-6 rotate-180" />
                    Log in / Sign Up
                  </span>
                )}
              </button>
            )}
            <button
              className="flex items-center"
              onClick={() => {
                onToggleNav()
                setShowAboutModal(true)
              }}
            >
              <InformationCircleIcon className="mr-3 h-6 w-6" />
              About
            </button>
          </div>
        </nav>
      </div>
    </div>
  )
}
