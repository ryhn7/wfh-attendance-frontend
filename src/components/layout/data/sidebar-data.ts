import {
  IconCalendarEvent,
  IconClipboardList,
  IconClock,
  IconUsers
} from '@tabler/icons-react'
import { AudioWaveform, Command, GalleryVerticalEnd } from 'lucide-react'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  user: {
    name: 'test',
    email: 'test@gmail.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Shadcn Admin',
      logo: Command,
      plan: 'Vite + ShadcnUI',
    },
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
  ],
  navGroups: [
    {
      title: 'Administration',
      items: [
        {
          title: 'Users Management',
          url: '/admin',
          icon: IconUsers,
        },
        {
          title: 'User Attendances',
          url: '/admin/user-attendances',
          icon: IconClipboardList,
        },
      ],
    },
    {
      title: 'My Attendance',
      items: [
        {
          title: 'Attendance',
          url: '/attendance',
          icon: IconCalendarEvent,
        },
        {
          title: 'Attendance History',
          url: '/attendance-history',
          icon: IconClock,
        },
      ],
    },
  ],
}
