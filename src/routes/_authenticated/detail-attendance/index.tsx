import { createFileRoute } from '@tanstack/react-router'
import DetailAttendance from '@/features/detail-attendance'

// Update the route path to include the dynamic :id parameter
export const Route = createFileRoute('/_authenticated/detail-attendance/')({
  component: RouteComponent,
})

function RouteComponent() {
  // Access the dynamic id parameter from the route
  const { id } = Route.useParams()

  return <DetailAttendance attendanceId={id} />
}
