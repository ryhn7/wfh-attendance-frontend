import { useState, useRef, useEffect, useCallback } from 'react'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import { AttendanceHistory, AttendanceStatus } from './components'

export default function Attendance() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [checkInImage, setCheckInImage] = useState<string | null>(null)
  const [checkOutImage, setCheckOutImage] = useState<string | null>(null)
  const [checkInTime, setCheckInTime] = useState<Date | null>(null)
  const [checkOutTime, setCheckOutTime] = useState<Date | null>(null)
  const [isCapturingCheckIn, setIsCapturingCheckIn] = useState(false)
  const [isCapturingCheckOut, setIsCapturingCheckOut] = useState(false)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [isCameraStarting, setIsCameraStarting] = useState(true)
  const [error, setError] = useState<string | null>(null)
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

  const handleCheckInCapture = (imageSrc: string) => {
    setCheckInImage(imageSrc)
    setCheckInTime(new Date())
    setIsCapturingCheckIn(false)
  }

  const handleCheckOutCapture = (imageSrc: string) => {
    setCheckOutImage(imageSrc)
    setCheckOutTime(new Date())
    setIsCapturingCheckOut(false)
  } // Function to stop the camera with useCallback
  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
      if (videoRef.current) {
        videoRef.current.srcObject = null
      }
    }
  }, [stream])

  // Function to start the camera with useCallback
  const startCamera = useCallback(async () => {
    if (checkInImage && checkOutImage) {
      // If both check-in and check-out are done, don't activate camera
      setIsCameraStarting(false)
      return
    }

    setIsCameraStarting(true)
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      })

      setStream(mediaStream)
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
      setError(null)
    } catch (err) {
      console.error('Error accessing camera:', err)
      setError(
        'Unable to access camera. Please ensure you have given permission.'
      )
    } finally {
      setIsCameraStarting(false)
    }
  }, [checkInImage, checkOutImage, setIsCameraStarting, setStream, setError]) // Start camera when component mounts
  useEffect(() => {
    // Start camera immediately when page loads
    startCamera()

    // Clean up - stop camera when component unmounts
    return () => {
      stopCamera()
    }
  }, [startCamera, stopCamera]) // Include startCamera and stopCamera in deps

  // Handle camera state when check-in/out images change
  useEffect(() => {
    if (checkInImage && checkOutImage) {
      // Stop camera if both check-in and check-out are complete
      stopCamera()
    }
  }, [checkInImage, checkOutImage, stopCamera])

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
              </CardHeader>{' '}
              <CardContent>
                <div className='flex flex-col space-y-6'>
                  {' '}
                  {/* Main Camera Preview Area */}
                  <div className='flex h-64 items-center justify-center overflow-hidden rounded-md bg-slate-50'>
                    {isCameraStarting ? (
                      <p className='text-base text-slate-500'>
                        Camera is starting...
                      </p>
                    ) : error ? (
                      <p className='px-4 text-center text-base text-red-500'>
                        {error}
                      </p>
                    ) : checkInImage && checkOutImage ? (
                      <p className='text-base text-green-600'>
                        Check-in and check-out completed
                      </p>
                    ) : (
                      <div className='flex h-full w-full items-center justify-center'>
                        <video
                          ref={videoRef}
                          autoPlay
                          playsInline
                          muted
                          className='h-full w-full object-cover'
                        />
                      </div>
                    )}
                  </div>
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

                      {isCapturingCheckIn && (
                        <Button
                          onClick={() => {
                            if (videoRef.current && canvasRef.current) {
                              const video = videoRef.current
                              const canvas = canvasRef.current

                              canvas.width = video.videoWidth
                              canvas.height = video.videoHeight

                              const context = canvas.getContext('2d')
                              if (context) {
                                context.drawImage(
                                  video,
                                  0,
                                  0,
                                  canvas.width,
                                  canvas.height
                                )
                                const imageSrc = canvas.toDataURL('image/png')
                                handleCheckInCapture(imageSrc)
                              }
                            }
                          }}
                          className='w-full bg-zinc-800 text-white hover:bg-zinc-700'
                        >
                          Capture
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

                      {isCapturingCheckOut && (
                        <Button
                          onClick={() => {
                            if (videoRef.current && canvasRef.current) {
                              const video = videoRef.current
                              const canvas = canvasRef.current

                              canvas.width = video.videoWidth
                              canvas.height = video.videoHeight

                              const context = canvas.getContext('2d')
                              if (context) {
                                context.drawImage(
                                  video,
                                  0,
                                  0,
                                  canvas.width,
                                  canvas.height
                                )
                                const imageSrc = canvas.toDataURL('image/png')
                                handleCheckOutCapture(imageSrc)
                              }
                            }
                          }}
                          className='w-full bg-zinc-800 text-white hover:bg-zinc-700'
                        >
                          Capture
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
              checkInTime={checkInTime}
              checkOutTime={checkOutTime}
              checkInImage={checkInImage}
              checkOutImage={checkOutImage}
            />

            <AttendanceHistory history={attendanceHistory} />
          </div>
        </div>
      </Main>
    </>
  )
}
