import { useEffect } from 'react'
import { format } from 'date-fns'
import { useAttendanceDetail } from '@/services/api/attendance'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

interface AttendanceDetailProps {
  id: string
}

export const AttendanceDetail = ({ id }: AttendanceDetailProps) => {
  const { data, isLoading, isError, error, refetch } = useAttendanceDetail(id)

  useEffect(() => {
    // Refetch when the ID changes
    if (id) {
      refetch()
    }
  }, [id, refetch])

  if (isLoading) {
    return <AttendanceDetailSkeleton />
  }

  if (isError) {
    return (
      <Card className='w-full'>
        <CardHeader className='bg-red-50 dark:bg-red-900/20'>
          <CardTitle className='text-red-700 dark:text-red-400'>
            Error Loading Attendance
          </CardTitle>
        </CardHeader>
        <CardContent className='pt-6'>
          <p className='text-sm text-red-600 dark:text-red-400'>
            {error instanceof Error
              ? error.message
              : 'Failed to load attendance details'}
          </p>
        </CardContent>
      </Card>
    )
  }

  if (!data || !data.data) {
    return (
      <Card className='w-full'>
        <CardHeader>
          <CardTitle>No Data Available</CardTitle>
        </CardHeader>
        <CardContent className='pt-6'>
          <p className='text-muted-foreground text-sm'>
            No attendance record found with the provided ID.
          </p>
        </CardContent>
      </Card>
    )
  }

  const attendance = data.data

  return (
    <Card className='w-full'>
      <CardHeader className='border-b'>
        <CardTitle>Attendance Details</CardTitle>
      </CardHeader>
      <CardContent className='pt-6'>
        <div className='space-y-4'>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <div>
              <h3 className='text-muted-foreground text-sm font-medium'>
                Employee
              </h3>
              <p className='mt-1 text-base font-medium'>
                {attendance.user?.name || 'N/A'}
              </p>
              <p className='text-muted-foreground text-sm'>
                {attendance.user?.email || 'N/A'}
              </p>
            </div>

            <div>
              <h3 className='text-muted-foreground text-sm font-medium'>
                Date
              </h3>
              <p className='mt-1 text-base font-medium'>
                {format(new Date(attendance.date), 'PPPP')}
              </p>
            </div>
          </div>

          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <div>
              <h3 className='text-muted-foreground text-sm font-medium'>
                Check-in Time
              </h3>
              <p className='mt-1 text-base font-medium'>
                {format(new Date(attendance.checkInTime), 'h:mm a')}
              </p>
            </div>

            <div>
              <h3 className='text-muted-foreground text-sm font-medium'>
                Check-out Time
              </h3>
              <p className='mt-1 text-base font-medium'>
                {attendance.checkOutTime
                  ? format(new Date(attendance.checkOutTime), 'h:mm a')
                  : 'Not checked out yet'}
              </p>
            </div>
          </div>

          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            <div>
              <h3 className='text-muted-foreground mb-2 text-sm font-medium'>
                Check-in Photo
              </h3>
              <div className='overflow-hidden rounded-md border'>
                <img
                  src={attendance.checkInPhotoUrl}
                  alt='Check-in'
                  className='h-auto w-full object-cover'
                />
              </div>
            </div>

            {attendance.checkOutPhotoUrl && (
              <div>
                <h3 className='text-muted-foreground mb-2 text-sm font-medium'>
                  Check-out Photo
                </h3>
                <div className='overflow-hidden rounded-md border'>
                  <img
                    src={attendance.checkOutPhotoUrl}
                    alt='Check-out'
                    className='h-auto w-full object-cover'
                  />
                </div>
              </div>
            )}
          </div>

          <div className='text-muted-foreground text-xs'>
            <p>ID: {attendance.id}</p>
            <p>
              Last updated: {format(new Date(attendance.updatedAt), 'PPpp')}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const AttendanceDetailSkeleton = () => {
  return (
    <Card className='w-full'>
      <CardHeader className='border-b'>
        <Skeleton className='h-6 w-[180px]' />
      </CardHeader>
      <CardContent className='pt-6'>
        <div className='space-y-4'>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <div>
              <Skeleton className='mb-2 h-4 w-[100px]' />
              <Skeleton className='mb-1 h-5 w-[150px]' />
              <Skeleton className='h-4 w-[180px]' />
            </div>
            <div>
              <Skeleton className='mb-2 h-4 w-[100px]' />
              <Skeleton className='h-5 w-[180px]' />
            </div>
          </div>

          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <div>
              <Skeleton className='mb-2 h-4 w-[120px]' />
              <Skeleton className='h-5 w-[80px]' />
            </div>
            <div>
              <Skeleton className='mb-2 h-4 w-[120px]' />
              <Skeleton className='h-5 w-[120px]' />
            </div>
          </div>

          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            <div>
              <Skeleton className='mb-2 h-4 w-[100px]' />
              <Skeleton className='h-[200px] w-full rounded-md' />
            </div>
            <div>
              <Skeleton className='mb-2 h-4 w-[100px]' />
              <Skeleton className='h-[200px] w-full rounded-md' />
            </div>
          </div>

          <div>
            <Skeleton className='mb-1 h-3 w-[200px]' />
            <Skeleton className='h-3 w-[180px]' />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
