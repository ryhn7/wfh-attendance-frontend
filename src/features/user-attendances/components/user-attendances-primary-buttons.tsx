import { IconUserPlus } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { useUserAttendances } from '../context/user-attendances-context'

export function UserAttendancesPrimaryButtons() {
  const { setOpen } = useUserAttendances()
  return (
    <div className='flex gap-2'>
      <Button className='space-x-1' onClick={() => setOpen('add')}>
        <span>Add User</span> <IconUserPlus size={18} />
      </Button>
    </div>
  )
}
