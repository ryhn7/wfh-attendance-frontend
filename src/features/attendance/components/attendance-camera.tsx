// ✅ Updated AttendanceCamera.tsx with refactored camera logic
import React, { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'

interface AttendanceCameraProps {
  isCapturingCheckIn: boolean
  isCapturingCheckOut: boolean
  onCheckInCapture: (imageSrc: string) => void
  onCheckOutCapture: (imageSrc: string) => void
  checkInImage?: string | null
  checkOutImage?: string | null
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
  const streamRef = useRef<MediaStream | null>(null)

  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        })

        if (!isMounted) return

        streamRef.current = mediaStream
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
      const stream = streamRef.current
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
        streamRef.current = null
        if (videoRef.current) {
          videoRef.current.srcObject = null
        }
      }
    }

    if (isCapturingCheckIn || isCapturingCheckOut) {
      startCamera()
    } else {
      stopCamera()
    }

    return () => {
      isMounted = false
      stopCamera()
    }
  }, [isCapturingCheckIn, isCapturingCheckOut])

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current

      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      const context = canvas.getContext('2d')
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height)
        const imageSrc = canvas.toDataURL('image/png')

        if (isCapturingCheckIn) {
          onCheckInCapture(imageSrc)
        } else if (isCapturingCheckOut) {
          onCheckOutCapture(imageSrc)
        }
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
      return (
        <div className='bg-muted mx-auto flex h-64 w-full max-w-md items-center justify-center rounded-md border border-dashed'>
          <p className='text-muted-foreground'>
            {checkInImage && checkOutImage ? 'All done for today!' : 'Camera preview will appear here'}
          </p>
        </div>
      )
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
