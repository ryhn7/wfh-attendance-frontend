import { useEffect } from 'react'
import { format } from 'date-fns'
import { useNavigate } from '@tanstack/react-router'
import { useAttendanceDetail } from '@/services/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import { DetailAttendanceStatus } from './components'

interface DetailAttendanceProps {
  attendanceId: string
}

export default function DetailAttendance({
  attendanceId,
}: DetailAttendanceProps) {
  const navigate = useNavigate()
  const { data, isLoading, isError, refetch } =
    useAttendanceDetail(attendanceId)

  const checkInImage = data?.checkInPhotoUrl
  const checkOutImage = data?.checkOutPhotoUrl

  useEffect(() => {
    // Refetch when the ID changes
    if (attendanceId) {
      refetch()
    }
  }, [attendanceId, refetch])

  // Navigate to error page if there's an error
  useEffect(() => {
    if (isError) {
      navigate({
        to: '/500',
      })
    }
  }, [isError, navigate])

  // Skeleton components
  const _renderSkeletonHeader = () => (
    <div className='mb-8 flex flex-wrap items-center justify-between space-y-2'>
      <div className='space-y-2'>
        <Skeleton className='h-8 w-64' />
        <Skeleton className='h-4 w-36' />
      </div>
    </div>
  )

  const _renderSkeletonPhoto = () => (
    <div className='mx-auto flex h-52 w-full items-center justify-center overflow-hidden rounded-md border bg-gray-50 dark:bg-gray-900'>
      <Skeleton className='h-full w-full' />
    </div>
  )

  const _renderSkeletonPhotoSection = () => (
    <Card>
      <CardHeader className='pb-2'>
        <Skeleton className='h-6 w-48' />
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-2 gap-6'>
          <div className='flex flex-col space-y-4'>
            {_renderSkeletonPhoto()}
          </div>
          <div className='flex flex-col space-y-4'>
            {_renderSkeletonPhoto()}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  if (isLoading) {
    return (
      <>
        <Header fixed>
          <div className='ml-auto flex items-center space-x-4'>
            <ThemeSwitch />
            <ProfileDropdown />
          </div>
        </Header>

        <Main>
          {_renderSkeletonHeader()}

          <div className='grid gap-6 lg:grid-cols-2'>
            {/* Left Column - Skeleton for Photos */}
            <div className='flex flex-col gap-6'>
              {_renderSkeletonPhotoSection()}
            </div>

            {/* Right Column - Skeleton for Status */}
            <div className='flex flex-col gap-6'>
              <Card>
                <CardHeader className='pb-2'>
                  <Skeleton className='h-6 w-36' />
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='space-y-2'>
                    <Skeleton className='h-4 w-full' />
                    <Skeleton className='h-4 w-3/4' />
                  </div>
                  <div className='space-y-2'>
                    <Skeleton className='h-4 w-full' />
                    <Skeleton className='h-4 w-3/4' />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </Main>
      </>
    )
  }

  return (
    <>
      <Header fixed>
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className='mb-8 flex flex-wrap items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              Daily Attendance - {data?.user?.name} |{' '}
              {data?.date
                ? format(new Date(data.date), 'MMMM dd, yyyy')
                : 'No date'}
            </h2>
          </div>
        </div>

        <div className='grid gap-6 lg:grid-cols-2'>
          {/* Left Column - Camera & Check-in/out Controls */}
          <div className='flex flex-col gap-6'>
            <Card>
              <CardHeader className='pb-2'>
                <CardTitle>Check-in & Check-out Records</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Check-In / Check-Out Photos and Buttons */}
                <div className='grid grid-cols-2 gap-6'>
                  {/* Left Column (Check-In) */}
                  <div className='flex flex-col space-y-4'>
                    <div className='mx-auto flex h-52 items-center justify-center overflow-hidden rounded-md border'>
                      {checkInImage ? (
                        <img
                          src={checkInImage}
                          alt='Check-in'
                          className='h-full w-full object-cover'
                        />
                      ) : (
                        <p className='px-4 text-center text-sm text-slate-500'>
                          Check-in photo will appear here
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Right Column (Check-Out) */}
                  <div className='flex flex-col space-y-4'>
                    <div className='mx-auto flex h-52 items-center justify-center overflow-hidden rounded-md border'>
                      {checkOutImage ? (
                        <img
                          src={checkOutImage}
                          alt='Check-out'
                          className='h-full w-full object-cover'
                        />
                      ) : (
                        <p className='px-4 text-center text-sm text-slate-500'>
                          Check-out photo will appear here
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Status & History */}
          <div className='flex flex-col gap-6'>
            <DetailAttendanceStatus
              checkInTime={
                data?.checkInTime ? new Date(data.checkInTime) : null
              }
              checkOutTime={
                data?.checkOutTime ? new Date(data.checkOutTime) : null
              }
              isLoading={false}
            />
          </div>
        </div>
      </Main>
    </>
  )
}
