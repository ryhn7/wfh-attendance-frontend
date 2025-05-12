import React from 'react'
import { format } from 'date-fns'
import { CheckCircle, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface AttendanceHistoryItem {
  date: Date
  checkIn: string | null
  checkOut: string | null
  status: 'checked-in' | 'not-checked-in'
}

interface AttendanceHistoryProps {
  history: AttendanceHistoryItem[]
}

const AttendanceHistory: React.FC<AttendanceHistoryProps> = ({ history }) => {
  return (
    <Card>
      <CardHeader className='pb-2'>
        <CardTitle>Recent History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          {history.map((item, index) => (
            <div key={index} className='flex flex-col space-y-1'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  {item.status === 'checked-in' ? (
                    <CheckCircle className='h-4 w-4 text-green-600' />
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
                    item.status === 'checked-in'
                      ? 'text-green-600'
                      : 'text-destructive'
                  )}
                >
                  {item.status === 'checked-in'
                    ? 'Checked-in'
                    : 'Not checked-in'}
                </span>
              </div>

              {item.status === 'checked-in' && (
                <div className='text-muted-foreground pl-6 text-sm'>
                  {item.checkIn && <span>In: {item.checkIn}</span>}
                  {item.checkIn && item.checkOut && <span> • </span>}
                  {item.checkOut && <span>Out: {item.checkOut}</span>}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default AttendanceHistory
