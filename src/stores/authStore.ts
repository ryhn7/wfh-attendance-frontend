import Cookies from 'js-cookie'
import { create } from 'zustand'
import { jwtDecode } from 'jwt-decode';

export const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN_KEY

interface AuthUser {
  id: string
  name: string
  email: string
  role: string
}

interface JwtPayload {
  id: string
  name: string
  email: string
  role: string
  exp: number
  iat: number
}


interface AuthState {
  auth: {
    user: AuthUser | null
    setUser: (user: AuthUser | null) => void
    accessToken: string
    setAccessToken: (accessToken: string) => void
    resetAccessToken: () => void
    reset: () => void
  }
}

export const useAuthStore = create<AuthState>()((set) => {
  const cookieState = Cookies.get(ACCESS_TOKEN)
  const initToken = cookieState ? JSON.parse(cookieState) : ''

  let decodedUser: AuthUser | null = null

  if (initToken) {
    try {
      const decoded = jwtDecode<JwtPayload>(initToken)
      decodedUser = {
        id: decoded.id,
        name: decoded.name,
        email: decoded.email,
        role: decoded.role,
      }
    } catch (err) {
      console.error('Invalid token:', err)
      Cookies.remove(ACCESS_TOKEN)
    }
  }

  return {
    auth: {
      user: decodedUser,
      setUser: (user) =>
        set((state) => ({ ...state, auth: { ...state.auth, user } })),
      accessToken: initToken,
      setAccessToken: (accessToken) =>
        set((state) => {
          Cookies.set(ACCESS_TOKEN, JSON.stringify(accessToken))

          let userFromToken: AuthUser | null = null
          try {
            const decoded = jwtDecode<JwtPayload>(accessToken)
            userFromToken = {
              id: decoded.id,
              name: decoded.name,
              email: decoded.email,
              role: decoded.role,
            }
          } catch (err) {
            console.error('Failed to decode access token:', err)
          }

          return {
            ...state,
            auth: {
              ...state.auth,
              accessToken,
              user: userFromToken,
            },
          }
        }),

      resetAccessToken: () =>
        set((state) => {
          Cookies.remove(ACCESS_TOKEN)
          return {
            ...state,
            auth: { ...state.auth, accessToken: '', user: null },
          }
        }),

      reset: () =>
        set((state) => {
          Cookies.remove(ACCESS_TOKEN)
          return {
            ...state,
            auth: { ...state.auth, accessToken: '', user: null },
          }
        }),
    },
  }
})

export const useAuth = () => useAuthStore((state) => state.auth)
