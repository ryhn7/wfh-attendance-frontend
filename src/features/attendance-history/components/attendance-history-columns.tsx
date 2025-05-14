import {
  format,
  differenceInHours,
  differenceInMinutes,
  isSameDay,
} from 'date-fns'
import { ColumnDef } from '@tanstack/react-table'
import { AttendanceRecord } from '@/services/api'
import { CheckCircle, Clock, XCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { DataTableColumnHeader } from './data-table-column-header'
import { ViewAttendanceLink } from './view-attendance-link'

const _cellWrapper = (
  value: React.ReactNode,
  align: 'left' | 'right' | 'center' = 'left'
) => <div className={`px-3 py-2 text-sm text-${align}`}>{value}</div>

/**
 * Calculate work duration from check-in and check-out times
 */
const _calculateWorkDuration = (
  checkInTime: string | null,
  checkOutTime: string | null
): string => {
  if (!checkInTime || !checkOutTime) return '-'

  try {
    const checkIn = new Date(checkInTime)
    const checkOut = new Date(checkOutTime)

    const hours = differenceInHours(checkOut, checkIn)
    const minutes = differenceInMinutes(checkOut, checkIn) % 60

    return `${hours}h ${minutes}m`
  } catch {
    return '-'
  }
}

/**
 * Determine attendance status by analyzing check-in/out data and date
 * Status logic:
 * - Complete: Has both check-in and check-out times
 * - In Progress: Has check-in but no check-out, and is today's record
 * - Incomplete: Either missing data for a past date, or no check-in at all
 */
const _getAttendanceStatus = (
  checkInTime: string | null,
  checkOutTime: string | null,
  date: string | null
) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0) // Reset time part for date comparison

  const attendanceDate = date ? new Date(date) : null
  attendanceDate?.setHours(0, 0, 0, 0) // Reset time part for date comparison

  const isPastDate = attendanceDate && attendanceDate < today

  // Incomplete if it's a past date with missing check-in or check-out
  if (isPastDate && (!checkInTime || !checkOutTime)) {
    return (
      <Badge
        variant='outline'
        className='bg-destructive/10 border-destructive/20 text-destructive dark:text-destructive-foreground'
      >
        <XCircle className='mr-1 h-3.5 w-3.5' />
        Incomplete
      </Badge>
    )
  }

  // Otherwise, use standard logic
  if (checkInTime && checkOutTime) {
    return (
      <Badge
        variant='outline'
        className='border-green-200 bg-green-100/50 text-green-900 dark:text-green-200'
      >
        <CheckCircle className='mr-1 h-3.5 w-3.5' />
        Complete
      </Badge>
    )
  } else if (checkInTime && !checkOutTime) {
    return (
      <Badge
        variant='outline'
        className='border-amber-200 bg-amber-100/50 text-amber-900 dark:text-amber-200'
      >
        <Clock className='mr-1 h-3.5 w-3.5' />
        In Progress
      </Badge>
    )
  } else {
    return (
      <Badge
        variant='outline'
        className='bg-destructive/10 border-destructive/20 text-destructive dark:text-destructive-foreground'
      >
        <XCircle className='mr-1 h-3.5 w-3.5' />
        Incomplete
      </Badge>
    )
  }
}

/**
 * Determine the attendance status string for filtering purposes
 * This method should return consistent string values that match filter options
 */
const _getAttendanceStatusValue = (
  checkInTime: string | null,
  checkOutTime: string | null,
  date: string | null
): 'complete' | 'in-progress' | 'incomplete-past' | 'incomplete' => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const attendanceDate = date ? new Date(date) : null
  attendanceDate?.setHours(0, 0, 0, 0)

  const isPastDate = attendanceDate && attendanceDate < today

  // Past date with missing data is a special incomplete case
  if (isPastDate && (!checkInTime || !checkOutTime)) {
    return 'incomplete-past'
  }

  if (checkInTime && checkOutTime) {
    return 'complete'
  } else if (checkInTime && !checkOutTime) {
    return 'in-progress'
  } else {
    return 'incomplete'
  }
}

export const columns: ColumnDef<AttendanceRecord>[] = [
  {
    accessorKey: 'date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Date' />
    ),
    cell: ({ row }) => {
      const date = row.original.date 
      return _cellWrapper(
        date ? format(new Date(date), 'dd-MM-yyyy') : '-',
        'center'
      )
    },
    enableSorting: true,
    enableHiding: false,
    // Fix date filter to work with dd-MM-yyyy format
    filterFn: (row, columnId, filterValue) => {
      // Skip empty filter
      if (!filterValue) return true

      const rowDate = row.getValue(columnId) as string | null
      if (!rowDate) return false

      // Handle formatted date string filter
      if (typeof filterValue === 'string') {
        try {
          // For direct text input (dd-MM-yyyy format)
          if (filterValue.match(/^\d{2}-\d{2}-\d{4}$/)) {
            return rowDate === filterValue
          }

          // For date picker (ISO string)
          const filterDate = new Date(filterValue)
          const recordDate = new Date(rowDate)
          return isSameDay(filterDate, recordDate)
        } catch (_error) {
          return false
        }
      }

      return false
    },
  },
  {
    accessorKey: 'checkInTime',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Check In' />
    ),
    cell: ({ row }) => {
      const time = row.original.checkInTime
      return _cellWrapper(
        time ? (
          <Badge
            variant='outline'
            className='border-teal-200 bg-teal-100/30 text-teal-900 dark:text-teal-200'
          >
            {format(new Date(time), 'HH:mm:ss')}
          </Badge>
        ) : (
          <Badge
            variant='outline'
            className='bg-destructive/10 dark:bg-destructive/50 text-destructive dark:text-primary border-destructive/10'
          >
            -
          </Badge>
        ),
        'center'
      )
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'checkOutTime',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Check Out' />
    ),
    cell: ({ row }) => {
      const time = row.original.checkOutTime
      return _cellWrapper(
        time ? (
          <Badge
            variant='outline'
            className='border-teal-200 bg-teal-100/30 text-teal-900 dark:text-teal-200'
          >
            {format(new Date(time), 'HH:mm:ss')}
          </Badge>
        ) : (
          <Badge
            variant='outline'
            className='bg-destructive/10 dark:bg-destructive/50 text-destructive dark:text-primary border-destructive/10'
          >
            -
          </Badge>
        ),
        'center'
      )
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    id: 'workDuration',
    header: () => _cellWrapper('Work Duration', 'center'),
    cell: ({ row }) => {
      const duration = _calculateWorkDuration(
        row.original.checkInTime,
        row.original.checkOutTime
      )
      return _cellWrapper(
        <span className='font-medium'>{duration}</span>,
        'center'
      )
    },
    enableSorting: false,
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: () => _cellWrapper('Status', 'center'),
    cell: ({ row }) => {
      return _cellWrapper(
        _getAttendanceStatus(
          row.original.checkInTime,
          row.original.checkOutTime,
          row.original.date
        ),
        'center'
      )
    },
    // Enhanced filter function that handles complex status logic
    filterFn: (row, _id, value) => {
      // Get a consistent status string to match against filter values
      const statusValue = _getAttendanceStatusValue(
        row.original.checkInTime,
        row.original.checkOutTime,
        row.original.date
      )

      // Handle filtering for the special "incomplete-past" case
      if (statusValue === 'incomplete-past') {
        // If "incomplete" is selected in filter, include past-incomplete items
        if (value.includes('incomplete')) {
          return true
        }
        // Otherwise, only include if explicitly filtered for
        return value.includes('incomplete-past')
      }

      return value.includes(statusValue)
    },
    enableSorting: false,
  },
  {
    id: 'actions',
    header: () => _cellWrapper('Details', 'center'),
    cell: ({ row }) => {
      return _cellWrapper(
        <ViewAttendanceLink attendanceId={row.original.id} />,
        'center'
      )
    },
  },
]
