import {
  IconUser,
  IconUserShield
} from '@tabler/icons-react'

export const userTypes = [
  {
    label: 'Employee',
    value: 'EMPLOYEE',
    icon: IconUser,
  },
  {
    label: 'Admin',
    value: 'ADMIN',
    icon: IconUserShield,
  },
] as const
