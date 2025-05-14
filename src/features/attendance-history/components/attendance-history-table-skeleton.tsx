import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export function AttendanceHistoryTableSkeleton() {
  // Create an array of 5 rows for skeleton
  const _skeletonRows = Array.from({ length: 5 }, (_, i) => i)

  return (
    <div className='rounded-md border'>
      <Table>
        <TableHeader>
          <TableRow>
            {/* Date column */}
            <TableHead className='text-center'>
              <div className='flex justify-center'>
                <Skeleton className='h-6 w-20' />
              </div>
            </TableHead>
            {/* Check In column */}
            <TableHead className='text-center'>
              <div className='flex justify-center'>
                <Skeleton className='h-6 w-24' />
              </div>
            </TableHead>
            {/* Check Out column */}
            <TableHead className='text-center'>
              <div className='flex justify-center'>
                <Skeleton className='h-6 w-24' />
              </div>
            </TableHead>
            {/* Work Duration column */}
            <TableHead className='text-center'>
              <div className='flex justify-center'>
                <Skeleton className='h-6 w-28' />
              </div>
            </TableHead>
            {/* Status column */}
            <TableHead className='text-center'>
              <div className='flex justify-center'>
                <Skeleton className='h-6 w-20' />
              </div>
            </TableHead>
            {/* Details column */}
            <TableHead className='text-center'>
              <div className='flex justify-center'>
                <Skeleton className='h-6 w-20' />
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {_skeletonRows.map((index) => (
            <TableRow key={`skeleton-${index}`}>
              {/* Date column */}
              <TableCell className='text-center'>
                <div className='flex justify-center'>
                  <Skeleton className='h-6 w-24' />
                </div>
              </TableCell>
              {/* Check In column */}
              <TableCell className='text-center'>
                <div className='flex justify-center'>
                  <Skeleton className='h-8 w-28 rounded-md' />
                </div>
              </TableCell>
              {/* Check Out column */}
              <TableCell className='text-center'>
                <div className='flex justify-center'>
                  <Skeleton className='h-8 w-28 rounded-md' />
                </div>
              </TableCell>
              {/* Work Duration column */}
              <TableCell className='text-center'>
                <div className='flex justify-center'>
                  <Skeleton className='h-6 w-16' />
                </div>
              </TableCell>
              {/* Status column */}
              <TableCell className='text-center'>
                <div className='flex justify-center'>
                  <Skeleton className='h-8 w-24 rounded-md' />
                </div>
              </TableCell>
              {/* Details column */}
              <TableCell className='text-center'>
                <div className='flex justify-center'>
                  <Skeleton className='h-8 w-8 rounded-md' />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
