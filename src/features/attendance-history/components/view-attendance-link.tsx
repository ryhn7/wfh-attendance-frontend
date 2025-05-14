import { useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export const ViewAttendanceLink = ({ attendanceId }: { attendanceId: string }) => {
  const _navigate = useNavigate()

  const _handleViewClick = () => {
    _navigate({ to: `/attendance/${attendanceId}`, params: { attendanceId } })
  }

  return <Button onClick={_handleViewClick}>View</Button>
}