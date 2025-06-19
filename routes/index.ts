function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = '/dashboard';
const ROOT_APPS = '/apps';
const ROOTS_AUTH = '/authentication';

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  default: path(ROOTS_DASHBOARD, '/default'),
  analytics: path(ROOTS_DASHBOARD, '/analytics'),
};

export const PATH_APPS = {
  root: ROOT_APPS,
  sms: path(ROOT_APPS, '/sms'),
  report: path(ROOT_APPS, '/report'),
  report_files: path(ROOT_APPS, '/report_files'),
  phonebook: path(ROOT_APPS, '/phonebook'),
  alphasenders: path(ROOT_APPS, '/alphasenders'),
  templates: path(ROOT_APPS, '/templates'),
  statistics: path(ROOT_APPS, '/statistics'),
  blacklists: path(ROOT_APPS, '/blacklists'),
  profile: path(ROOT_APPS, '/profile'),

};

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  signin: path(ROOTS_AUTH, '/signin'),
  signup: path(ROOTS_AUTH, '/signup'),
  passwordReset: path(ROOTS_AUTH, '/password-reset'),
};
