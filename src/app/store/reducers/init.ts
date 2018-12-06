export const Catalogues = [
  {
    active: true,
    color: '#4e342e',
    icon: 'filter_1',
    param: 'custom',
    title: 'custom catalog'
  },
  {
    active: false,
    color: '#883B3E',
    icon: 'filter_2',
    param: 'cornerstone',
    title: 'cornerstone'
  },
  {
    active: true,
    color: '#FFFF7C',
    icon: 'filter_3',
    param: 'lighthouse',
    title: 'lighthouse'
  },
  {
    active: false,
    color: '#00FF99',
    icon: 'filter_4',
    param: 'modal',
    title: 'modal'
  },
  {
    active: true,
    color: '#00FF99',
    icon: 'filter_5',
    param: 'modcon',
    title: 'modcon vanities'
  }
];

export const Categories = [
  {
    image: '../../../assets/images/nc.jpg',
    link: 'catalog',
    title: 'Nickels Catalogues',
    color: 'blue-grey darken-1',
    hidden: false,
    Catalogues,
    icon: 'dialpad'
  },
  {
    image: '../../../assets/images/SOP.jpg',
    link: 'sop',
    title: 'SOP system',
    color: 'red darken-3',
    hidden: true,
    icon: 'voicemail'
  },
  {
    image: '../../../assets/images/mds.jpg',
    link: 'mds',
    title: 'MDS system',
    color: 'orange darken-3',
    hidden: true,
    icon: 'notifications_off'
  }
];

export const Header = [
  { button: 'dashboard', icon: 'account_circle', click: 'button' },
  { icon: 'search', link: 'search', click: 'link' },
  { button: 'categories', icon: 'more_vert', click: 'button' }
];

export const Slides = [
  {
    description: 'Black walnut with clean lines',
    image: '../../../assets/images/09.jpg',
    title: 'Retro modern'
  },
  {
    description: 'Combing latest materials on more classical styles',
    image: '../../../assets/images/img_8297-1024x708.jpg',
    title: 'Old and new'
  },
  {
    description: 'Clean integrated handles accross all cabinets',
    image: '../../../assets/images/oseen-kitchen-1024x579.jpg',
    title: 'Clean modern kitchens'
  }
];

export const Dashboard = [
  {
    default_disabled: true,
    icon: 'dashboard',
    link: ['dashboard'],
    title: 'dashboard'
  },
  {
    default_disabled: true,
    icon: 'person_pin',
    link: ['dashboard', 'profile'],
    title: 'profile'
  },
  {
    default_disabled: true,
    icon: 'recent_actors',
    link: ['dashboard', 'users'],
    title: 'users'
  },
  {
    default_disabled: true,
    default_hidden: true,
    icon: 'eject',
    link: ['dashboard', 'logout'],
    title: 'logout'
  },
  {
    default_disabled: false,
    icon: 'settings_power',
    link: ['login'],
    title: 'login'
  },
  {
    default_disabled: true,
    icon: 'inbox',
    link: ['dashboard', 'inbox'],
    title: 'inbox'
  }
];

export const Section = {
  title: 'Nickels Custom Cabinets',
  dropdown: Catalogues,
  button: false
};

export const Init = {
  Categories,
  Header,
  Slides,
  Dashboard,
  Section
};
