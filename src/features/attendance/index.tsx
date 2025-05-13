import { useEffect, useRef, useState } from 'react'
import { format } from 'date-fns'
import { useAttendanceToday, useCheckIn, useCheckOut } from '@/services/api'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import {
  AttendanceCamera,
  AttendanceHistory,
  AttendanceStatus,
} from './components'

export default function Attendance() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [checkInImage, setCheckInImage] = useState<string | null>(null)
  const [checkOutImage, setCheckOutImage] = useState<string | null>(null)
  const [isCapturingCheckIn, setIsCapturingCheckIn] = useState(false)
  const [isCapturingCheckOut, setIsCapturingCheckOut] = useState(false)

  const { data: todayAttendance, isLoading: isLoadingAttendance } =
    useAttendanceToday()
  const { checkInMutation } = useCheckIn()
  const { checkOutMutation } = useCheckOut(todayAttendance?.id || '') // Pass the attendance ID to the checkOut mutation

  const isToday = (date: string | Date) => {
    const today = new Date()
    const target = new Date(date)
    return (
      today.getFullYear() === target.getFullYear() &&
      today.getMonth() === target.getMonth() &&
      today.getDate() === target.getDate()
    )
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

  // Set initial check-in/check-out images from API data when component mounts
  useEffect(() => {
    if (todayAttendance) {
      if (todayAttendance.checkInPhotoUrl) {
        setCheckInImage(todayAttendance.checkInPhotoUrl)
      }
      if (todayAttendance.checkOutPhotoUrl) {
        setCheckOutImage(todayAttendance.checkOutPhotoUrl)
      }
    }
  }, [todayAttendance])

  const handleCheckIn = () => {
    setIsCapturingCheckIn(true)
    setIsCapturingCheckOut(false)
  }

  const handleCheckOut = () => {
    setIsCapturingCheckOut(true)
    setIsCapturingCheckIn(false)
  }

  const handleCheckInCapture = async (imageSrc: string) => {
    setIsCapturingCheckIn(false)

    // Convert base64 image to File
    const blob = await (await fetch(imageSrc)).blob()
    const photo = new File([blob], 'checkin.png', { type: 'image/png' })

    checkInMutation.mutate(
      { photo },
      {
        onSuccess: () => {
          toast.success('Check-in successful!', {
            duration: 3000,
          })
        },
        onError: (err) => {
          toast.error('Check-in failed!, please try again.', {
            description: err.message,
            duration: 3000,
          })
        },
      }
    )
  }

  const handleCheckOutCapture = async (imageSrc: string) => {
    setIsCapturingCheckOut(false)

    // Convert base64 image to File
    const blob = await (await fetch(imageSrc)).blob()
    const photo = new File([blob], 'checkout.png', { type: 'image/png' })

    checkOutMutation.mutate(
      { photo },
      {
        onSuccess: () => {
          toast.success('Check-out successful!', {
            duration: 3000,
          })
        },
        onError: (err) => {
          toast.error('Check-out failed!, please try again.', {
            description: err.message,
            duration: 3000,
          })
        },
      }
    )
  }

  const checkInTime = todayAttendance?.checkInTime
  const checkOutTime = todayAttendance?.checkOutTime

  const isCheckInToday = checkInTime ? isToday(checkInTime) : false
  const isCheckOutToday = checkOutTime ? isToday(checkOutTime) : false

  const hasCheckedInToday = !!checkInTime && isCheckInToday
  const hasCheckedOutToday = !!checkOutTime && isCheckOutToday

  const allowCheckIn = !hasCheckedInToday
  const allowCheckOut = hasCheckedInToday && !hasCheckedOutToday

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
                  <AttendanceCamera
                    isCapturingCheckIn={isCapturingCheckIn}
                    isCapturingCheckOut={isCapturingCheckOut}
                    onCheckInCapture={handleCheckInCapture}
                    onCheckOutCapture={handleCheckOutCapture}
                  />

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
          </div>
        </div>
      </Main>
    </>
  )
}
