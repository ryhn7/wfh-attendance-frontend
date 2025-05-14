import React from 'react'
import { format } from 'date-fns'
import { CheckCircle, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

interface AttendanceStatusProps {
  checkInTime: Date | null
  checkOutTime: Date | null
  isLoading?: boolean
}

const DetailAttendanceStatus: React.FC<AttendanceStatusProps> = ({
  checkInTime,
  checkOutTime,
  isLoading = false,
}) => {
  const formatTime = (date: Date | null) => {
    if (!date) return '--:--:--'
    return format(date, 'HH:mm:ss')
  }

  const getStatusIcon = (isChecked: boolean) => {
    return isChecked ? (
      <CheckCircle className='h-5 w-5 text-green-600' />
    ) : (
      <Clock className='text-muted-foreground h-5 w-5' />
    )
  }

  // Skeleton loading for a single status row
  const StatusRowSkeleton = () => (
    <div className='flex items-center justify-between'>
      <div className='flex items-center gap-2'>
        <Skeleton className='h-5 w-5 rounded-full' />
        <Skeleton className='h-4 w-24' />
      </div>
      <Skeleton className='h-4 w-16' />
    </div>
  )

  return (
    <Card>
      <CardHeader className='pb-2'>
        <CardTitle>
          {isLoading ? <Skeleton className='h-6 w-32' /> : "Attendance Overview"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          {isLoading ? (
            <>
              <StatusRowSkeleton />
              <StatusRowSkeleton />
              <div className='pt-2'>
                <div className='flex items-center justify-between'>
                  <Skeleton className='h-4 w-28' />
                  <Skeleton className='h-4 w-16' />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  {getStatusIcon(!!checkInTime)}
                  <span className='font-medium'>Check In</span>
                </div>
                <div className='text-right'>
                  <span
                    className={cn(
                      'font-mono font-medium',
                      checkInTime ? 'text-green-600' : 'text-muted-foreground'
                    )}
                  >
                    {formatTime(checkInTime)}
                  </span>
                </div>
              </div>

              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  {getStatusIcon(!!checkOutTime)}
                  <span className='font-medium'>Check Out</span>
                </div>
                <div className='text-right'>
                  <span
                    className={cn(
                      'font-mono font-medium',
                      checkOutTime ? 'text-green-600' : 'text-muted-foreground'
                    )}
                  >
                    {formatTime(checkOutTime)}
                  </span>
                </div>
              </div>

              <div className='pt-26'>
                <div className='flex items-center justify-between'>
                  <span className='font-medium'>Work Duration</span>
                  <span className='font-mono font-medium'>
                    {checkInTime && checkOutTime
                      ? formatDuration(checkInTime, checkOutTime)
                      : '--:--:--'}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// Helper function to calculate and format duration between two dates
const formatDuration = (start: Date, end: Date) => {
  const diffMs = end.getTime() - start.getTime()
  const diffHrs = Math.floor(diffMs / 3600000)
  const diffMins = Math.floor((diffMs % 3600000) / 60000)
  const diffSecs = Math.floor((diffMs % 60000) / 1000)

  return `${String(diffHrs).padStart(2, '0')}:${String(diffMins).padStart(2, '0')}:${String(diffSecs).padStart(2, '0')}`
}

export default DetailAttendanceStatus
