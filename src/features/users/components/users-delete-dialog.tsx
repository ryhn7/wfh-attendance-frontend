'use client'

import { IconAlertTriangle } from '@tabler/icons-react'
import { useDeleteUser } from '@/services/api/user'
import { User as userAPI } from '@/services/api/user'
import { toast } from 'sonner'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { ConfirmDialog } from '@/components/confirm-dialog'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: userAPI
}

export function UsersDeleteDialog({ open, onOpenChange, currentRow }: Props) {
  const deleteUserMutation = useDeleteUser()

  const handleDelete = () => {
    deleteUserMutation.mutate(currentRow.id, {
      onSuccess: () => {
        onOpenChange(false)
        toast.success('User deleted successfully', {
          duration: 3000,
        })
      },
      onError: (error) => {
        toast.error('Failed to delete user', {
          description:
            error instanceof Error ? error.message : 'Unknown error occurred',
          duration: 3000,
        })
      },
    })
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title={
        <span className='text-destructive inline-flex items-center gap-2'>
          <IconAlertTriangle size={18} />
          Delete User
        </span>
      }
      handleConfirm={handleDelete}
      disabled={deleteUserMutation.isPending}
      isLoading={deleteUserMutation.isPending}
      desc={
        <div className='flex flex-col gap-2'>
          <p>
            Are you sure you want to delete{' '}
            <span className='font-bold'>{currentRow.name}</span>?
            <br />
            This action will permanently remove the user with the role of{' '}
            <span className='font-bold'>
              {currentRow.role.toUpperCase()}
            </span>{' '}
            from the system. This cannot be undone.
          </p>

          <Alert variant='destructive'>
            <AlertTitle>Warning!</AlertTitle>
            <AlertDescription>
              Please be careful, this operation cannot be rolled back.
            </AlertDescription>
          </Alert>
        </div>
      }
      confirmText='Delete'
      destructive
    />
  )
}
