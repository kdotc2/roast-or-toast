import { auth } from '@/firebase/clientApp'
import { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { User } from 'firebase/auth'
import { setCookie, deleteCookie } from 'cookies-next'

const useAuth = () => {
  const [user] = useAuthState(auth)

  useEffect(() => {
    if (user) {
      setUserCookie(user)
    } else {
      deleteCookie('token')
    }
  }, [user])

  const setUserCookie = async (user: User) => {
    const token = await user.getIdToken()
    setCookie('token', token)

    setCookie('token', token)
  }
}

export default useAuth
