import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export function UsersTableSkeleton() {
  // Create an array of 5 rows for skeleton
  const _skeletonRows = Array.from({ length: 5 }, (_, i) => i)

  return (
    <div className='rounded-md border'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px] text-center'>
              <div className='flex justify-center'>
                <Skeleton className='h-6 w-16' />
              </div>
            </TableHead>
            <TableHead className='text-center'>
              <div className='flex justify-center'>
                <Skeleton className='h-6 w-24' />
              </div>
            </TableHead>
            <TableHead className='text-center'>
              <div className='flex justify-center'>
                <Skeleton className='h-6 w-20' />
              </div>
            </TableHead>
            <TableHead className='text-center'>
              <div className='flex justify-center'>
                <Skeleton className='h-6 w-16' />
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {_skeletonRows.map((index) => (
            <TableRow key={`skeleton-${index}`}>
              <TableCell className='text-center'>
                <div className='flex justify-center'>
                  <Skeleton className='ml-3 h-6 w-24' />
                </div>
              </TableCell>
              <TableCell className='text-center'>
                <div className='flex justify-center'>
                  <Skeleton className='h-6 w-48' />
                </div>
              </TableCell>
              <TableCell className='text-center'>
                <div className='flex items-center justify-center gap-x-2'>
                  <Skeleton className='h-5 w-5 rounded-full' />
                  <Skeleton className='h-6 w-20' />
                </div>
              </TableCell>
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
