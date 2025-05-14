import { createFileRoute } from '@tanstack/react-router'
import UserAttendances from '@/features/user-attendances'

export const Route = createFileRoute('/_authenticated/admin/user-attendances/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <UserAttendances />
}
