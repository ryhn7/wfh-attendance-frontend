import { createFileRoute } from '@tanstack/react-router'
import Attendance from '@/features/attendance'

export const Route = createFileRoute('/_authenticated/attendance/')({
  component: Attendance,
})
