import React, { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'

interface AttendanceCameraProps {
  isCapturingCheckIn: boolean
  isCapturingCheckOut: boolean
  onCheckInCapture: (imageSrc: string) => void
  onCheckOutCapture: (imageSrc: string) => void
  checkInImage: string | null
  checkOutImage: string | null
}

const AttendanceCamera: React.FC<AttendanceCameraProps> = ({
  isCapturingCheckIn,
  isCapturingCheckOut,
  onCheckInCapture,
  onCheckOutCapture,
  checkInImage,
  checkOutImage,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Start camera when capturing begins
    if (isCapturingCheckIn || isCapturingCheckOut) {
      startCamera()
    } else {
      // Stop camera when not capturing
      stopCamera()
    }

    return () => {
      stopCamera()
    }
  }, [isCapturingCheckIn, isCapturingCheckOut])

  const startCamera = async () => {
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
    }
  }

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
      if (videoRef.current) {
        videoRef.current.srcObject = null
      }
    }
  }

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current

      // Set canvas dimensions to match video
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      // Draw current video frame to canvas
      const context = canvas.getContext('2d')
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height)

        // Convert canvas to data URL
        const imageSrc = canvas.toDataURL('image/png')

        // Call appropriate capture handler
        if (isCapturingCheckIn) {
          onCheckInCapture(imageSrc)
        } else if (isCapturingCheckOut) {
          onCheckOutCapture(imageSrc)
        }

        // Stop camera
        stopCamera()
      }
    }
  }

  const renderCameraOrImage = () => {
    if (isCapturingCheckIn || isCapturingCheckOut) {
      return (
        <div className='relative mx-auto w-full max-w-md'>
          {error ? (
            <div className='bg-destructive/20 text-destructive rounded-md p-4 text-center'>
              {error}
            </div>
          ) : (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className='border-border w-full rounded-md border shadow-md'
              />
              <Button onClick={captureImage} className='bg-primary mt-2 w-full'>
                Capture
              </Button>
            </>
          )}
        </div>
      )
    } else if (!isCapturingCheckIn && !isCapturingCheckOut) {
      if (checkInImage && !checkOutImage) {
        return (
          <div className='mx-auto flex w-full max-w-md flex-col space-y-2'>
            <p className='text-center text-sm font-medium'>Check-in captured</p>
            <img
              src={checkInImage}
              alt='Check-in'
              className='border-border w-full rounded-md border shadow-md'
            />
          </div>
        )
      } else if (checkInImage && checkOutImage) {
        return (
          <div className='mx-auto flex w-full max-w-md flex-col space-y-4'>
            <div>
              <p className='text-center text-sm font-medium'>Check-in</p>
              <img
                src={checkInImage}
                alt='Check-in'
                className='border-border w-full rounded-md border shadow-md'
              />
            </div>
            <div>
              <p className='text-center text-sm font-medium'>Check-out</p>
              <img
                src={checkOutImage}
                alt='Check-out'
                className='border-border w-full rounded-md border shadow-md'
              />
            </div>
          </div>
        )
      } else {
        return (
          <div className='bg-muted mx-auto flex h-64 w-full max-w-md items-center justify-center rounded-md border border-dashed'>
            <p className='text-muted-foreground'>
              Camera preview will appear here
            </p>
          </div>
        )
      }
    }
  }

  return (
    <div className='flex w-full flex-col items-center'>
      {renderCameraOrImage()}
      <canvas ref={canvasRef} className='hidden' />
    </div>
  )
}

export default AttendanceCamera
