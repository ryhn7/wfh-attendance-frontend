import DetailAttendance from '@/features/detail-attendance'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/attendance/$attendanceId',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { attendanceId } = Route.useParams()
  return <DetailAttendance attendanceId={attendanceId} />
}
