import { PropsWithChildren } from 'react'
import AuthModal from '../Modal/Auth/AuthModal'
import CreateModal from '../Modal/Create/CreateModal'
import NewUserModal from '../Modal/Auth/NewUserModal'
import SignInWithEmail from '../Modal/Auth/SignInWithEmail'
import { Navbar, MobileNav } from '../Navbar/Navbar'
import AboutModal from '../Modal/About/AboutModal'
import CurrentUserModal from '../Modal/Settings/CurrentUserModal'
import PostModal from '../Modal/Post/PostModal'

const Layout = ({ children }: PropsWithChildren) => {
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
        <AuthModal />
        <NewUserModal />
        <NewUserModal />
        <PostModal />
        <AboutModal />
        <span className="hidden">
          <SignInWithEmail />
        </span>
      </div>
    </>
  )
}

export default Layout
