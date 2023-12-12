import { createBrowserRouter } from 'react-router-dom'

import {
  ATMS_LandingPage,
  ATMS_SettingsPage,
  ATMS_TicketsPage,
  ATMS_TicketDetailPage,
  ATMS_HomePage,
  ATMS_MainDashboard,
  ATMS_TicketDetailsEmbed,
  ATMS_WidgetsPage,
  ATMS_AddTicketEmbed,
} from '../container/index'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <ATMS_LandingPage />,
  },

  {
    path: '/',
    element: <ATMS_HomePage />,
    children: [
      {
        path: 'dashboard',
        element: <ATMS_MainDashboard />,
      },
      {
        path: 'tickets',
        element: <ATMS_TicketsPage />,
      },
      {
        path: 'ticket/:ticketId',
        element: <ATMS_TicketDetailPage />,
      },
      {
        path: 'settings',
        element: <ATMS_SettingsPage />,
      },
    ],
  },

  {
    path: '/ticket-details',
    element: <ATMS_TicketDetailsEmbed />,
  },

  {
    path: '/widgets',
    element: <ATMS_WidgetsPage />,
  },

  {
    path: '/add-ticket',
    element: <ATMS_AddTicketEmbed />,
  },
])
