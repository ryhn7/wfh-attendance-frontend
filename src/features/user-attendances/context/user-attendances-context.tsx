import React, { useState } from 'react'
import { User as userAPI } from '@/services/api/user'
import useDialogState from '@/hooks/use-dialog-state'

type UserAttendancesDialogType = 'add' | 'edit' | 'delete'

interface UserAttendancesContextType {
  open: UserAttendancesDialogType | null
  setOpen: (str: UserAttendancesDialogType | null) => void
  currentRow: userAPI | null
  setCurrentRow: React.Dispatch<React.SetStateAction<userAPI | null>>
}

const UserAttendancesContext =
  React.createContext<UserAttendancesContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function UserAttendancesProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<UserAttendancesDialogType>(null)
  const [currentRow, setCurrentRow] = useState<userAPI | null>(null)
  return (
    <UserAttendancesContext.Provider
      value={{ open, setOpen, currentRow, setCurrentRow }}
    >
      {children}
    </UserAttendancesContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useUserAttendances = () => {
  const userAttendancesContext = React.useContext(UserAttendancesContext)

  if (!userAttendancesContext) {
    throw new Error(
      'useUserAttendances has to be used within <UserAttendancesContext>'
    )
  }

  return userAttendancesContext
}
