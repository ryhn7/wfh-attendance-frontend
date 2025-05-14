import { format, isSameDay } from 'date-fns'
import { ColumnDef } from '@tanstack/react-table'
import { AttendanceRecord } from '@/services/api'
import { toPascalCase } from '@/utils/string'
import { Badge } from '@/components/ui/badge'
import LongText from '@/components/long-text'
import { userTypes } from '../data/data'
import { DataTableColumnHeader } from './data-table-column-header'
import { ViewAttendanceLink } from './view-attendance-link'

const cellWrapper = (
  value: React.ReactNode,
  align: 'left' | 'right' | 'center' = 'left'
) => <div className={`px-3 py-2 text-sm text-${align}`}>{value}</div>

export const columns: ColumnDef<AttendanceRecord>[] = [
  {
    id: 'name',
    accessorKey: 'user.name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    cell: ({ row }) => {
      const name = row.original.user?.name || '-'
      return cellWrapper(
        <LongText className='max-w-36'>{name}</LongText>,
        'center'
      )
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Email' />
    ),
    cell: ({ row }) => {
      const email = row.original.user?.email || '-'
      return cellWrapper(
        <div className='max-w-[180px] truncate'>{email}</div>,
        'center'
      )
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    id: 'role',
    accessorKey: 'user.role',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Role' />
    ),
    cell: ({ row }) => {
      const role = row.original.user?.role || '-'
      const userType = userTypes.find(({ value }) => value === role)

      if (!userType) return cellWrapper('-', 'center')

      return cellWrapper(
        <div className='flex items-center gap-x-2 pl-6'>
          {userType.icon && (
            <userType.icon size={16} className='text-muted-foreground' />
          )}
          <span className='capitalize'>{toPascalCase(userType.value)}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
    enableHiding: false,
  },
  {
    accessorKey: 'checkInTime',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Check In' />
    ),
    cell: ({ row }) => {
      const time = row.original.checkInTime
      return cellWrapper(
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
      return cellWrapper(
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
    accessorKey: 'date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Date' />
    ),
    cell: ({ row }) => {
      const date = row.original.date || row.original.checkInTime
      return cellWrapper(
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
    id: 'actions',
    header: () => cellWrapper('Details', 'center'),
    cell: ({ row }) => {
      return cellWrapper(
        <ViewAttendanceLink attendanceId={row.original.id} />,
        'center'
      )
    },
  },
]
