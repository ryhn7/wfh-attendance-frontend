import LongText from '@/components/long-text'
import { cn } from '@/lib/utils'
import { User as userAPI } from '@/services/api/user'
import { toPascalCase } from '@/utils/string'
import { ColumnDef } from '@tanstack/react-table'
import { userTypes } from '../data/data'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

export const columns: ColumnDef<userAPI>[] = [
  // {
  //   id: 'select',
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && 'indeterminate')
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label='Select all'
  //       className='translate-y-[2px]'
  //     />
  //   ),
  //   meta: {
  //     className: cn(
  //       'sticky md:table-cell left-0 z-10 rounded-tl',
  //       'bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted'
  //     ),
  //   },
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label='Select row'
  //       className='translate-y-[2px]'
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36'>{row.getValue('name')}</LongText>
    ),
    meta: { className: 'w-36' },
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Email' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36'>{row.getValue('email')}</LongText>
    ),
    meta: {
      className: cn(
        'drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)] lg:drop-shadow-none',
        'bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted',
        'sticky left-6 md:table-cell'
      ),
    },
    enableHiding: false,
  },
  {
    accessorKey: 'role',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Role' />
    ),
    cell: ({ row }) => {
      const { role } = row.original
      const userType = userTypes.find(({ value }) => value === role)

      if (!userType) {
        return null
      }

      return (
        <div className='flex items-center gap-x-2'>
          {userType.icon && (
            <userType.icon size={16} className='text-muted-foreground' />
          )}
          <span className='text-sm capitalize'>{toPascalCase(userType.value)}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    enableSorting: false,
    enableHiding: false,
  },
  // {
  //   accessorKey: 'createdAt',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title='Created At' />
  //   ),
  //   cell: ({ row }) => {
  //     const date = row.getValue('createdAt') as Date
  //     return <div>{format(date, 'PPP')}</div>
  //   },
  //   enableSorting: true,
  // },
  // {
  //   accessorKey: 'updatedAt',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title='Updated At' />
  //   ),
  //   cell: ({ row }) => {
  //     const date = row.getValue('updatedAt') as Date
  //     return <div>{format(date, 'PPP')}</div>
  //   },
  //   enableSorting: true,
  // },
  {
    id: 'actions',
    cell: DataTableRowActions,
  },
]
