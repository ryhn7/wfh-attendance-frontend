import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CalendarIcon, Cross2Icon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'
import { userTypes } from '../data/data'
import { DataTableFacetedFilter } from './data-table-faceted-filter'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

    // Format date for display in the date picker
    const _formatSelectedDate = () => {
      const dateFilter = table.getColumn('date')?.getFilterValue() as
        | string
        | undefined
  
      if (!dateFilter) return null
  
      try {
        // If it's already in dd-MM-yyyy format, display as is
        if (dateFilter.match(/^\d{2}-\d{2}-\d{4}$/)) {
          return dateFilter
        }
  
        // Otherwise, assume it's an ISO date and format it
        return format(new Date(dateFilter), 'dd-MM-yyyy')
      } catch {
        return null
      }
    }
  
    // Parse a selected date from calendar picker
    const _handleDatePickerChange = (date: Date | undefined) => {
      if (!date) {
        table.getColumn('date')?.setFilterValue(undefined)
        return
      }
  
      // Format to ISO 8601 date (midnight UTC of that day)
      const isoDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      ).toISOString()
  
      table.getColumn('date')?.setFilterValue(isoDate)
    }

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2'>
        <Input
          placeholder='Filter user name...'
          value={
            (table.getColumn('name')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className='h-8 w-[150px] lg:w-[250px]'
        />
                {table.getColumn('date') && (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                size='sm'
                className={cn(
                  'h-8 border-dashed',
                  table.getColumn('date')?.getFilterValue()
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'text-muted-foreground'
                )}
              >
                <CalendarIcon className='mr-2 h-3.5 w-3.5' />
                {_formatSelectedDate() ? _formatSelectedDate() : 'Pick a date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='start'>
              <Calendar
                mode='single'
                selected={
                  _formatSelectedDate()
                    ? new Date(
                        _formatSelectedDate()?.split('-').reverse().join('-') ||
                          ''
                      )
                    : undefined
                }
                onSelect={_handleDatePickerChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        )}
        <div className='flex gap-x-2'>
          {table.getColumn('role') && (
            <DataTableFacetedFilter
              column={table.getColumn('role')}
              title='Role'
              options={userTypes.map((t) => ({ ...t }))}
            />
          )}
        </div>
        {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => table.resetColumnFilters()}
            className='h-8 px-2 lg:px-3'
          >
            Reset
            <Cross2Icon className='ml-2 h-4 w-4' />
          </Button>
        )}
      </div>
    </div>
  )
}
