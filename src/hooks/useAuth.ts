import { auth } from '@/firebase/clientApp'
import { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import nookies from 'nookies'
import { User } from 'firebase/auth'

const useAuth = () => {
  const [user] = useAuthState(auth)

  useEffect(() => {
    // console.log('HERE IS USER', user)

    user ? setUserCookie(user) : nookies.set(undefined, 'token', '')
  }, [user])

  const setUserCookie = async (user: User) => {
    const token = await user.getIdToken()
    // console.log('HERE IS TOKEN', token)
    nookies.set(undefined, 'token', token)
  }
}
export default useAuth
