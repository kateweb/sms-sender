function path(locale: string, root: string, sublink: string) {
  const localePrefix = `/${locale}`;
  if (root.startsWith(localePrefix)) {
    return `${root}${sublink}`;
  }
  return `/${locale}${root}${sublink}`;
}

const ROOTS_DASHBOARD = '/dashboard';
const ROOT_APPS = '/apps';
const ROOTS_PAGES = '/pages';
const ROOTS_INVOICES = '/invoices';
const ROOTS_TASKS = '/tasks';
const ROOTS_AUTH = '/authentication';
const ROOTS_ABOUT = '/pages/about';

export const PATH_DASHBOARD = (locale: string) => ({
  root: path(locale, ROOTS_DASHBOARD, ''),
  default: path(locale, ROOTS_DASHBOARD, '/default'),
  analytics: path(locale, ROOTS_DASHBOARD, '/analytics'),
});

export const PATH_APPS = (locale: string) => ({
  root: path(locale, ROOT_APPS, ''),
  calendar: path(locale, ROOT_APPS, '/calendar'),
  chat: path(locale, ROOT_APPS, '/chat'),
  invoices: {
    all: path(locale, ROOT_APPS, ROOTS_INVOICES + '/list'),
    sample: path(locale, ROOT_APPS, ROOTS_INVOICES + `/details/`),
    invoice_details: (id: string): string =>
      path(locale, ROOT_APPS, ROOTS_INVOICES + `/details/${id}`),
  },
  orders: path(locale, ROOT_APPS, '/orders'),
  profile: path(locale, ROOT_APPS, '/profile'),
  projects: path(locale, ROOT_APPS, '/projects'),
  settings: path(locale, ROOT_APPS, '/settings'),
  tasks: path(locale, ROOT_APPS, '/tasks'),
});

export const PATH_PAGES = (locale: string) => ({
  root: path(locale, ROOTS_PAGES, ''),
  pricing: path(locale, ROOTS_PAGES, '/pricing'),
  blank: path(locale, ROOTS_PAGES, '/blank'),
});

export const PATH_INVOICES = (locale: string) => ({
  root: path(locale, ROOTS_INVOICES, ''),
  invoices: {
    all: path(locale, ROOTS_INVOICES, '/list'),
    sample: path(locale, ROOTS_INVOICES, `/details/`),
    invoice_details: (id: string): string =>
      path(locale, ROOTS_INVOICES, `/details/${id}`),
  },
});

export const PATH_TASKS = (locale: string) => ({
  root: path(locale, ROOTS_TASKS, ''),
});

export const PATH_AUTH = (locale: string) => ({
  root: path(locale, ROOTS_AUTH, ''),
  signin: path(locale, ROOTS_AUTH, '/signin'),
  signup: path(locale, ROOTS_AUTH, '/signup'),
  passwordReset: path(locale, ROOTS_AUTH, '/password-reset'),
  clerk: path(locale, ROOTS_AUTH, '/clerk'),
  auth0: path(locale, ROOTS_AUTH, '/auth0'),
});

export const PATH_ABOUT = (locale: string) => ({
  root: path(locale, ROOTS_ABOUT, ''),
});
