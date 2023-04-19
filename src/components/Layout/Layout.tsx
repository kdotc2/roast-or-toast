import { PropsWithChildren } from 'react'
import CreateModal from '../Modal/Create/CreateModal'
import NewUserModal from '../Modal/Auth/NewUserModal'
import SignInWithEmail from '../Modal/Auth/SignInWithEmail'
import { Navbar, MobileNav } from '../Navbar/Navbar'
import CurrentUserModal from '../Modal/Settings/CurrentUserModal'
import { useRecoilState } from 'recoil'
import { loginModalState } from '@/atoms/authModalAtom'
import LoginModal from '../Modal/Auth/LoginModal'
import Head from 'next/head'
import Meta from '../Meta'
import siteMetadata from '@/data/siteMetadata'
import { useRouter } from 'next/router'

type Props = {
  close: () => void
}

const Layout = ({ children }: PropsWithChildren, { close }: Props) => {
  const [loginState, setLoginModalState] = useRecoilState(loginModalState)

  const router = useRouter()

  return (
    <>
      <Head>
      <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="robots" content="follow, index" />
      </Head>
      <Meta url={`${siteMetadata.siteUrl}${router.asPath}`}/>
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
