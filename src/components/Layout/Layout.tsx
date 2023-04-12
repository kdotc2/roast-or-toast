import { PropsWithChildren } from 'react'
import CreateModal from '../Modal/Create/CreateModal'
import NewUserModal from '../Modal/Auth/NewUserModal'
import SignInWithEmail from '../Modal/Auth/SignInWithEmail'
import { Navbar, MobileNav } from '../Navbar/Navbar'
import CurrentUserModal from '../Modal/Settings/CurrentUserModal'
import { useRecoilState } from 'recoil'
import { loginModalState } from '@/atoms/authModalAtom'
import LoginModal from '../Modal/Auth/LoginModal'

type Props = {
  close: () => void
}

const Layout = ({ children }: PropsWithChildren, { close }: Props) => {
  const [loginState, setLoginModalState] = useRecoilState(loginModalState)

  return (
    <>
      <div className="relative z-10 flex w-full flex-row">
        <Navbar />
        <MobileNav />
        <main className="mx-auto flex-auto">{children}</main>
      </div>
      <div className="mx-auto flex items-center justify-center px-10">
        <CurrentUserModal />
        <CreateModal />
        <NewUserModal />
        <NewUserModal />
        <span className="hidden">
          <SignInWithEmail close={() => close()} />
        </span>
        {loginState.open && (
          <LoginModal close={() => setLoginModalState({ open: false })} />
        )}
      </div>
    </>
  )
}

export default Layout
