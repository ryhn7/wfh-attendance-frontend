import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAttendance, useAttendanceDetail } from '@/services/api'
import { useRef, useState } from 'react'
import {
  AttendanceCamera,
  AttendanceHistory,
  AttendanceStatus,
} from './components'
import { format } from 'date-fns'

export default function Attendance() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [checkInImage, setCheckInImage] = useState<string | null>(null)
  const [checkOutImage, setCheckOutImage] = useState<string | null>(null)
  const [isCapturingCheckIn, setIsCapturingCheckIn] = useState(false)
  const [isCapturingCheckOut, setIsCapturingCheckOut] = useState(false)
  const [attendanceId, setAttendanceId] = useState<string | null>(null)

  const { checkInMutation } = useAttendance()
  const { data: attendanceDetail } = useAttendanceDetail(attendanceId || '', {
    enabled: !!attendanceId,
  })

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
        onSuccess: (data) => {
          setCheckInImage(imageSrc)
          setAttendanceId(data.data.id)
        },
        onError: (err) => {
          console.error('Check-in failed:', err)
        },
      }
    )
  }

  const checkInTime = attendanceDetail?.data?.checkInTime
const checkOutTime = attendanceDetail?.data?.checkOutTime

const isCheckInToday = checkInTime ? isToday(checkInTime) : false
const isCheckOutToday = checkOutTime ? isToday(checkOutTime) : false

const hasCheckedInToday = !!checkInTime && isCheckInToday
const hasCheckedOutToday = !!checkOutTime && isCheckOutToday

const allowCheckIn = !hasCheckedInToday
const allowCheckOut = hasCheckedInToday && !hasCheckedOutToday

  const handleCheckOutCapture = (imageSrc: string) => {
    setCheckOutImage(imageSrc)
    setCheckOutTime(new Date())
    setIsCapturingCheckOut(false)
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
                  <AttendanceCamera
                    isCapturingCheckIn={isCapturingCheckIn}
                    isCapturingCheckOut={isCapturingCheckOut}
                    onCheckInCapture={handleCheckInCapture}
                    onCheckOutCapture={handleCheckOutCapture}
                    checkInImage={checkInImage}
                    checkOutImage={checkOutImage}
                  />

                  {/* Check-In / Check-Out Photos and Buttons */}
                  <div className='grid grid-cols-2 gap-6'>
                    {/* Left Column (Check-In) */}
                    <div className='flex flex-col space-y-4'>
                      <div className='flex h-32 items-center justify-center overflow-hidden rounded-md border'>
                        {checkInImage ? (
                          <img
                            src={checkInImage}
                            alt='Check-in'
                            className='h-full w-full object-cover'
                          />
                        ) : (
                          <p className='text-sm text-slate-500'>
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
                      <div className='flex h-32 items-center justify-center overflow-hidden rounded-md border'>
                        {checkOutImage ? (
                          <img
                            src={checkOutImage}
                            alt='Check-out'
                            className='h-full w-full object-cover'
                          />
                        ) : (
                          <p className='text-sm text-slate-500'>
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
                attendanceDetail?.data?.checkInTime
                  ? new Date(attendanceDetail.data.checkInTime)
                  : null
              }
              checkOutTime={
                attendanceDetail?.data?.checkOutTime
                  ? new Date(attendanceDetail.data.checkOutTime)
                  : null
              }
              checkInImage={attendanceDetail?.data?.checkInPhotoUrl || null}
              checkOutImage={attendanceDetail?.data?.checkOutPhotoUrl || null}
            />

            <AttendanceHistory history={attendanceHistory} />
          </div>
        </div>
      </Main>
    </>
  )
}
