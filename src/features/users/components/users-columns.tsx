import { ColumnDef } from '@tanstack/react-table'
import { User as userAPI } from '@/services/api/user'
import { cn } from '@/lib/utils'
import { toPascalCase } from '@/utils/string'
import LongText from '@/components/long-text'
import { userTypes } from '../data/data'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

const cellWrapper = (
  value: React.ReactNode,
  align: 'left' | 'center' | 'right' = 'left'
) => (
  <div
    className={cn(
      `flex px-4 py-2 text-sm text-${align} justify-center whitespace-nowrap`
    )}
  >
    {value}
  </div>
)

export const columns: ColumnDef<userAPI>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    cell: ({ row }) =>
      cellWrapper(
        <LongText className='max-w-36 pr-6'>{row.getValue('name')}</LongText>,
        'center'
      ),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Email' />
    ),
    cell: ({ row }) =>
      cellWrapper(
        <div className='text-muted-foreground max-w-[200px] truncate text-sm'>
          {row.getValue('email')}
        </div>
      ),
  },

    {
    accessorKey: 'role',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Role' />
      ),
      cell: ({ row }) => {
            const { role } = row.original
        const userType = userTypes.find(({ value }) => value === role)
  
        if (!userType) return cellWrapper('-', 'center')
  
        return cellWrapper(
          <div className='flex items-center gap-x-2 pr-6'>
            {userType.icon && (
              <userType.icon size={16} className='text-muted-foreground' />
            )}
            <span className='capitalize'>{toPascalCase(userType.value)}</span>
          </div>
        )
      },
      filterFn: (row, id, value) => value.includes(row.getValue(id)),
      enableHiding: true,
    },
  {
    id: 'actions',
    cell: ({ row }) => cellWrapper(<DataTableRowActions row={row} />, 'right'),
    meta: { className: 'w-10 text-right' },
  },
]
