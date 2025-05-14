import React from 'react'
import { format } from 'date-fns'
import { CheckCircle, Clock, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

interface AttendanceHistoryItem {
  date: Date
  checkIn: string | null
  checkOut: string | null
  status: 'completed' | 'checked-in' | 'not-checked-in'
}

interface AttendanceHistoryProps {
  history: AttendanceHistoryItem[]
  isLoading?: boolean
}

const AttendanceHistory: React.FC<AttendanceHistoryProps> = ({
  history,
  isLoading = false,
}) => {
  return (
    <Card>
      <CardHeader className='pb-2'>
        <CardTitle>Recent History</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className='space-y-4'>
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={`skeleton-${index}`}
                className='flex flex-col space-y-1'
              >
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <Skeleton className='h-4 w-4 rounded-full' />
                    <Skeleton className='h-4 w-16' />
                  </div>
                  <Skeleton className='h-4 w-24' />
                </div>
                <div className='pl-6'>
                  <Skeleton className='h-4 w-32' />
                </div>
              </div>
            ))}
          </div>
        ) : history.length === 0 ? (
          <div className='text-muted-foreground text-center text-sm'>
            You haven&apos;t submitted any attendance records yet.
          </div>
        ) : (
          <div className='space-y-4'>
            {history.map((item, index) => (
              <div key={index} className='flex flex-col space-y-1'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    {item.status === 'completed' ? (
                      <CheckCircle className='h-4 w-4 text-green-600' />
                    ) : item.status === 'checked-in' ? (
                      <Clock className='h-4 w-4 text-yellow-500' />
                    ) : (
                      <XCircle className='text-destructive h-4 w-4' />
                    )}
                    <span className='font-medium'>
                      {format(item.date, 'MMM d')}
                    </span>
                  </div>

                  <span
                    className={cn(
                      'text-sm',
                      item.status === 'completed'
                        ? 'text-green-600'
                        : item.status === 'checked-in'
                        ? 'text-yellow-500'
                        : 'text-destructive'
                    )}
                  >
                    {item.status === 'completed'
                      ? 'Completed'
                      : item.status === 'checked-in'
                      ? 'Checked-in'
                      : 'Not checked-in'}
                  </span>
                </div>

                {(item.checkIn || item.checkOut) && (
                  <div className='text-muted-foreground pl-6 text-sm'>
                    {item.checkIn && <span>In: {item.checkIn}</span>}
                    {item.checkIn && item.checkOut && <span> • </span>}
                    {item.checkOut && <span>Out: {item.checkOut}</span>}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default AttendanceHistory
