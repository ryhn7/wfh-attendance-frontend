import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAttendanceDetail } from '@/services/api'
import { format } from 'date-fns'
import { useEffect, useRef, useState } from 'react'
import {
  AttendanceDetail,
  AttendanceHistory,
  AttendanceStatus
} from './components'

interface DetailAttendanceProps {
  attendanceId: string
}

export default function DetailAttendance({ attendanceId }: DetailAttendanceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [checkInImage, setCheckInImage] = useState<string | null>(null)
  const [checkOutImage, setCheckOutImage] = useState<string | null>(null)
  const [isCapturingCheckIn, setIsCapturingCheckIn] = useState(false)
  const [isCapturingCheckOut, setIsCapturingCheckOut] = useState(false)

  const { data, isLoading, isError, error, refetch } = useAttendanceDetail(attendanceId)

  useEffect(() => {
    // Refetch when the ID changes
    if (id) {
      refetch()
    }
  }, [id, refetch])

  if (isLoading) {
    return 'Loading...'
  }

  // Mock attendance history data for display purposes
  const attendanceHistory = [
    {
      date: new Date(2025, 4, 10), // May 10, 2025
      checkIn: '08:15:24',
      checkOut: '17:30:12',
      status: 'checked-in' as const,
    },
    {
      date: new Date(2025, 4, 9), // May 9, 2025
      checkIn: null,
      checkOut: null,
      status: 'not-checked-in' as const,
    },
  ]

  const handleCheckIn = () => {
    setIsCapturingCheckIn(true)
    setIsCapturingCheckOut(false)
  }

  const handleCheckOut = () => {
    setIsCapturingCheckOut(true)
    setIsCapturingCheckIn(false)
  }

  const getCurrentDate = () => {
    return format(new Date(), 'EEEE, MMMM d, yyyy')
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
        <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Attendance</h2>
            <p className='text-muted-foreground'>{getCurrentDate()}</p>
          </div>
        </div>

        <div className='grid gap-6 lg:grid-cols-2'>
          {/* Left Column - Camera & Check-in/out Controls */}
          <div className='flex flex-col gap-6'>
            <Card>
              <CardHeader className='pb-2'>
                <CardTitle>Attendance Capture</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='flex flex-col space-y-6'>
                  {/* Main Camera Preview Area */}
                  <div className='flex w-full flex-col items-center'>
                    <div className='bg-muted mx-auto flex h-64 w-full max-w-md items-center justify-center rounded-md border border-dashed'>
                      <p className='text-muted-foreground'>
                        Camera is Off
                      </p>
                    </div>
                  </div>

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

                      {!checkInImage &&
                        !isCapturingCheckIn &&
                        !isCapturingCheckOut && (
                          <Button
                            onClick={handleCheckIn}
                            className='w-full bg-zinc-800 text-white hover:bg-zinc-700'
                            disabled={
                              isCapturingCheckOut || checkInImage !== null
                            }
                          >
                            Check In
                          </Button>
                        )}
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

                      {checkInImage &&
                        !checkOutImage &&
                        !isCapturingCheckIn &&
                        !isCapturingCheckOut && (
                          <Button
                            onClick={handleCheckOut}
                            className='w-full bg-zinc-800 text-white hover:bg-zinc-700'
                            disabled={
                              isCapturingCheckIn ||
                              checkOutImage !== null ||
                              !checkInImage
                            }
                          >
                            Check Out
                          </Button>
                        )}
                    </div>
                  </div>
                  {/* Hidden canvas for capturing images */}
                  <canvas ref={canvasRef} className='hidden' />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Status & History */}
          <div className='flex flex-col gap-6'>
            <AttendanceStatus
              checkInTime={
                todayAttendance?.checkInTime
                  ? new Date(todayAttendance.checkInTime)
                  : null
              }
              checkOutTime={
                todayAttendance?.checkOutTime
                  ? new Date(todayAttendance.checkOutTime)
                  : null
              }
              isLoading={isLoadingAttendance}
            />

            <AttendanceHistory history={attendanceHistory} />
            {/* AttendanceDetail component uses useAttendanceDetail hook internally 
                to fetch and display detailed attendance information */}
            {todayAttendance?.id && (
              <AttendanceDetail id={todayAttendance.id} />
            )}
          </div>
        </div>
      </Main>
    </>
  )
}
