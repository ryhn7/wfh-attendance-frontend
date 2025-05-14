import { createFileRoute, redirect } from '@tanstack/react-router'
import Attendance from '@/features/attendance'

export const Route = createFileRoute('/_authenticated/')({
  beforeLoad: () => {
    // Redirect root path to attendance
    throw redirect({ to: '/attendance' })
  },
  component: Attendance,
})
