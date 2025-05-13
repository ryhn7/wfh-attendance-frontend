import { useUserAttendances } from '../context/user-attendances-context'
import { UserAttendancesActionDialog } from './user-attendances-action-dialog'
import { UserAttendancesDeleteDialog } from './user-attendances-delete-dialog'

export function UserAttendancesDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useUserAttendances()
  return (
    <>
      <UserAttendancesActionDialog
        key='user-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />

      {currentRow && (
        <>
          <UserAttendancesActionDialog
            key={`user-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <UserAttendancesDeleteDialog
            key={`user-delete-${currentRow.id}`}
            open={open === 'delete'}
            onOpenChange={() => {
              setOpen('delete')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />
        </>
      )}
    </>
  )
}
