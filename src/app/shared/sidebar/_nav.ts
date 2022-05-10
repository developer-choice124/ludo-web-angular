import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Realtime Dashboard',
    url: '/home',
    icon: 'icon-speedometer',
  },
  {
    name: 'Analytics Dashboard',
    url: '/home/analytics',
    icon: 'icon-speedometer',
  },
  {
    name: 'Bot Analytics Dashboard',
    url: '/home/botanalytics',
    icon: 'icon-speedometer',
  },
  {
    name: 'Reffered List',
    url: '/home/refer',
    icon: 'icon-list',
  },
  {
    name: 'Redeem List',
    url: '/home/redeem',
    icon: 'icon-list',
  },
  {
    name: 'Room Coins',
    url: '/buttons',
    icon: 'icon-pencil',
    children: [
      {
        name: 'Create Room Coins',
        url: '/home/room/post-room-coins',
        icon: 'icon-note',
        badge: {
          variant: 'danger',
          text: 'NEW'
        }
      },
      {
        name: 'Room Coins List',
        url: '/home/room/room-coin-list',
        icon: 'icon-list',
        badge: {
          variant: 'info',
          text: 'LIST'
        }
      },
    ]
  },
  {
    name: 'Buy Coins',
    url: '/buttons',
    icon: 'icon-pencil',
    children: [
      {
        name: 'Create Buy Coins',
        url: '/home/buy/post-buy-coins',
        icon: 'icon-note',
        badge: {
          variant: 'danger',
          text: 'NEW'
        }
      },
      {
        name: 'Buy Coins List',
        url: '/home/buy/buy-coin-list',
        icon: 'icon-list',
        badge: {
          variant: 'info',
          text: 'LIST'
        }
      },
    ]
  },
  {
    name: 'App Update',
    url: '/buttons',
    icon: 'icon-pencil',
    children: [
      {
        name: 'Create App Update',
        url: '/home/update/create-app-update',
        icon: 'icon-note',
        badge: {
          variant: 'danger',
          text: 'NEW'
        }
      },
      {
        name: 'Buy Coins List',
        url: '/home/update/app-update-list',
        icon: 'icon-list',
        badge: {
          variant: 'info',
          text: 'LIST'
        }
      },
    ]
  },
  {
    name: 'Password Reset',
    url: '/home/reset',
    icon: 'icon-refresh',
  },
  {
    name: 'Logout',
    url: '/home/logout',
    icon: 'icon-logout',
  },
  // {
  //   name: 'Disabled',
  //   url: '/dashboard',
  //   icon: 'icon-ban',
  //   badge: {
  //     variant: 'secondary',
  //     text: 'NEW'
  //   },
  //   attributes: { disabled: true },
  // },
  // {
  //   name: 'Download CoreUI',
  //   url: 'http://coreui.io/angular/',
  //   icon: 'icon-cloud-download',
  //   class: 'mt-auto',
  //   variant: 'success',
  //   attributes: { target: '_blank', rel: 'noopener' }
  // },
  // {
  //   name: 'Try CoreUI PRO',
  //   url: 'http://coreui.io/pro/angular/',
  //   icon: 'icon-layers',
  //   variant: 'danger',
  //   attributes: { target: '_blank', rel: 'noopener' }
  // }
];
