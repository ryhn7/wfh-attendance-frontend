import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/authStore'

export const Route = createFileRoute('/_authenticated/admin')({
  beforeLoad: () => {
    // Get user from auth store
    const user = useAuthStore.getState().auth.user
    // Check if user is admin
    if (!user || user.role !== 'ADMIN') {
      throw redirect({
        to: '/403',
        replace: true,
      })
    }
  },
  component: AdminLayoutComponent,
})

function AdminLayoutComponent() {
  return (
      <Outlet />
  )
}
