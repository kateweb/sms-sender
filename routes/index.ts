function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = '/dashboard';
const ROOT_APPS = '/apps';
const ROOTS_PAGES = '/pages';
const ROOTS_INVOICES = '/invoices';
const ROOTS_TASKS = '/tasks';
const ROOTS_AUTH = '/authentication';
const ROOTS_ABOUT = '/pages/about';

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  default: path(ROOTS_DASHBOARD, '/default'),
  analytics: path(ROOTS_DASHBOARD, '/analytics'),
};

export const PATH_APPS = {
  root: ROOT_APPS,
  calendar: path(ROOT_APPS, '/calendar'),
  chat: path(ROOT_APPS, '/chat'),
  invoices: {
    all: path(ROOT_APPS, ROOTS_INVOICES + '/list'),
    sample: path(ROOT_APPS, ROOTS_INVOICES + `/details/`),
    invoice_details: (id: string): string =>
      path(ROOT_APPS, ROOTS_INVOICES + `/details/${id}`),
  },
  orders: path(ROOT_APPS, '/orders'),
  profile: path(ROOT_APPS, '/profile'),
  projects: path(ROOT_APPS, '/projects'),
  settings: path(ROOT_APPS, '/settings'),
  tasks: path(ROOT_APPS, '/tasks'),
  fileManager: {
    root: path(ROOT_APPS, '/file-manager'),
  },
};

export const PATH_PAGES = {
  root: ROOTS_PAGES,
  pricing: path(ROOTS_PAGES, '/pricing'),
  blank: path(ROOTS_PAGES, '/blank'),
};

export const PATH_INVOICES = {
  root: ROOTS_INVOICES,
  invoices: {
    all: path(ROOTS_INVOICES, '/list'),
    sample: path(ROOTS_INVOICES, `/details/`),
    invoice_details: (id: string): string =>
      path(ROOTS_INVOICES, `/details/${id}`),
  },
};

export const PATH_TASKS = {
  root: ROOTS_TASKS,
};

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  signin: path(ROOTS_AUTH, '/signin'),
  signup: path(ROOTS_AUTH, '/signup'),
  passwordReset: path(ROOTS_AUTH, '/password-reset'),
};

export const PATH_ABOUT = {
  root: ROOTS_ABOUT,
};
