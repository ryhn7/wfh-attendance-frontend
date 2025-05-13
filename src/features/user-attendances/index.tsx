import { User as userAPI, useUsers } from '@/services/api/user'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import { columns } from './components/user-attendances-columns'
import { UserAttendancesDialogs } from './components/user-attendances-dialogs'
import { UserAttendancesPrimaryButtons } from './components/user-attendances-primary-buttons'
import { UserAttendancesTable } from './components/user-attendances-table'
import { UserAttendancesTableSkeleton } from './components/user-attendances-table-skeleton'
import UserAttendancesProvider from './context/user-attendances-context'

export default function UserAttendances() {
  // Fetch users from API
  const { data: usersResponse, isLoading } = useUsers()

  const userList: userAPI[] = usersResponse ? usersResponse : []
  return (
    <UserAttendancesProvider>
      <Header fixed>
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>User List</h2>
            <p className='text-muted-foreground'>
              Manage your users and their roles here.
            </p>
          </div>
          <UserAttendancesPrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
          {isLoading ? (
            <UserAttendancesTableSkeleton />
          ) : (
            <UserAttendancesTable data={userList} columns={columns} />
          )}
        </div>
      </Main>

      <UserAttendancesDialogs />
    </UserAttendancesProvider>
  )
}
