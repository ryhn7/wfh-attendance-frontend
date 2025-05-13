import { useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export const ViewAttendanceLink = ({ id }: { id: string }) => {
  const _navigate = useNavigate()

  const _handleViewClick = () => {
    _navigate({ to: `/attendance/${id}`, params: { id } })
  }

  return <Button onClick={_handleViewClick}>View</Button>
}