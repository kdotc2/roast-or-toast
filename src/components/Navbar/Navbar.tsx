import { auth, db } from '@/firebase/clientApp'
import {
  DocumentTextIcon,
  InformationCircleIcon,
  LinkIcon,
  PhotoIcon,
  ArrowLeftOnRectangleIcon,
  Cog8ToothIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useSetRecoilState } from 'recoil'
import { authModalState } from '../../atoms/authModalAtom'
import { createModalState } from '../../atoms/createModalAtom'
import { settingsModalState } from '../../atoms/settingsModalAtom'
import { SpinningLoader } from '@/components/Posts/Loader'
import { aboutModalState } from '../../atoms/aboutModalAtom'
import { useState } from 'react'

export const Navbar = () => {
  const [user, loading, error] = useAuthState(auth)
  const [tooltipStatus, setTooltipStatus] = useState(false)
  const setCreateState = useSetRecoilState(createModalState)
  const setLoginState = useSetRecoilState(authModalState)
  const setAuthModalState = useSetRecoilState(settingsModalState)
  const setAboutModalState = useSetRecoilState(aboutModalState)

  const currentUser = auth.currentUser

  return (
    <>
      <div className="sticky top-0 z-[40] hidden h-screen w-16 flex-shrink-0 justify-center border-r bg-[#fdfbfb] py-2 dark:bg-[#161515] sm:flex">
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
                      <SpinningLoader />
                    </div>
                  ) : (
                    <Cog8ToothIcon className="h-6 w-6" />
                  )}
                </button>
                {tooltipStatus && <span className="toolTip">Settings</span>}
              </div>
            ) : (
              <div className="group">
                <button
                  onClick={() => setLoginState({ open: true, view: 'login' })}
                  className="navbarButton group"
                  aria-label="Log In & Sign Up"
                >
                  {loading ? (
                    <div className="my-[2px]">
                      <SpinningLoader />
                    </div>
                  ) : (
                    <ArrowLeftOnRectangleIcon className="h-6 w-6 rotate-180" />
                  )}
                </button>
                {tooltipStatus && (
                  <span className="toolTip">Log In / Sign Up</span>
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
                    : setLoginState({ open: true, view: 'login' })
                }}
              >
                <DocumentTextIcon className="h-6 w-6" />
              </button>
              {tooltipStatus && <span className="toolTip">Text Post</span>}
            </div>
            <div className="group">
              <button
                aria-label="Image Post"
                className="navbarButton"
                onClick={() => {
                  user
                    ? setCreateState({ open: true, view: 'image' })
                    : setLoginState({ open: true, view: 'login' })
                }}
              >
                <PhotoIcon className="h-6 w-6" />
              </button>
              {tooltipStatus && <span className="toolTip">Image Post</span>}
            </div>
            <div className="group">
              <button
                aria-label="Link Post"
                className="navbarButton group"
                onClick={() => {
                  user
                    ? setCreateState({ open: true, view: 'link' })
                    : setLoginState({ open: true, view: 'login' })
                }}
              >
                <LinkIcon className="h-6 w-6" />
              </button>
              {tooltipStatus && <span className="toolTip">Link Post</span>}
            </div>
          </div>

          <div className="group flex">
            <button
              aria-label="About"
              className="navbarButton group"
              onClick={() => {
                setAboutModalState({ open: true, view: 'about' })
              }}
            >
              <InformationCircleIcon className="h-6 w-6" />
            </button>
            {tooltipStatus && <span className="toolTip">About</span>}
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
  const setLoginState = useSetRecoilState(authModalState)
  const setAuthModalState = useSetRecoilState(settingsModalState)
  const setAboutModalState = useSetRecoilState(aboutModalState)
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
      <div className="fixed z-[80] mt-5 flex w-[calc(100%-20px)] justify-end">
        <div className="mt-auto flex transform rounded-full border bg-[#fdfbfb] shadow-md duration-100 ease-in-out active:scale-[.85] dark:bg-[#161515]">
          <button
            type="button"
            className={`flex items-center justify-center p-3`}
            aria-label="Toggle Menu"
            onClick={onToggleNav}
          >
            {navShow ? (
              <XMarkIcon className="h-6 w-6 stroke-2" />
            ) : (
              <Bars3Icon className="h-6 w-6 stroke-2" />
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
        className={`fixed bottom-0 z-50 flex w-full transform bg-[#f5f2f2] supports-[height:100dvh]:h-[100dvh] dark:bg-[#1c1b1b]  ${
          navShow
            ? 'translate-x-0 shadow-lg duration-300 ease-out'
            : 'translate-x-full duration-300 ease-in'
        }`}
      >
        <nav className="z-[150] mx-auto ml-8 flex flex-col justify-center space-y-16 text-sm">
          <div className="flex flex-col justify-between space-y-6">
            <p className="-mb-2 text-xs font-semibold uppercase text-gray-400 dark:text-gray-500">
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
                  : setLoginState({ open: true, view: 'login' })
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
                  : setLoginState({ open: true, view: 'login' })
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
                  : setLoginState({ open: true, view: 'login' })
              }}
            >
              <LinkIcon className="mr-3 h-6 w-6" />
              Link
            </button>
          </div>
          <div className="flex-col space-y-6">
            <p className="-mb-2 text-xs font-semibold uppercase text-gray-400 dark:text-gray-500">
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
                onClick={() => setLoginState({ open: true, view: 'login' })}
                className="flex items-center"
                aria-label="Log In & Sign Up"
              >
                {loading ? (
                  <div className="my-[2px]">
                    <SpinningLoader />
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
                {
                  onToggleNav()
                }
                setAboutModalState({ open: true, view: 'about' })
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
