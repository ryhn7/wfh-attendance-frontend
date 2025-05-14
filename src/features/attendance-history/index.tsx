import { AttendanceRecord, useAttendanceHistory } from '@/services/api'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import { columns } from './components/attendance-history-columns'
import { AttendanceHistoryTable } from './components/attendance-history-table'
import { AttendanceHistoryTableSkeleton } from './components/attendance-history-table-skeleton'

export default function AttendanceHistory() {
  const { data: attendanceHistoryResponse, isLoading } = useAttendanceHistory()

  const attendanceHistories: AttendanceRecord[] = attendanceHistoryResponse
    ? attendanceHistoryResponse
    : []
  return (
    <>
      <Header fixed>
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              My Attendance History
            </h2>
            <p className='text-muted-foreground'>
              Check your historical records and time logs.
            </p>
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
          {isLoading ? (
            <AttendanceHistoryTableSkeleton />
          ) : (
            <AttendanceHistoryTable data={attendanceHistories} columns={columns} />
          )}
        </div>
      </Main>
    </>
  )
}
