import { createFileRoute } from '@tanstack/react-router'
import AttendanceHistory from '@/features/attendance-history'

export const Route = createFileRoute('/_authenticated/attendance-history/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <AttendanceHistory />
}
