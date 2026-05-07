export type Id = string | number;

export type OrderStatus = 'shipped' | 'processing' | 'cancelled';

export type ReportFileStatus = 'failed' | 'completed';

export type ReportsStatus = 'In Progress' | 'Cancelled' | 'delivered' | 'Pending';

export type AlphasendersStatus = 'approved' | 'processing' | 'cancelled';

export type AlphasendersItem = {
  id: number;
  name: string;
  country: boolean;
  company: string;
  userId: string;
  type: string;
  site: string;
  date: string;
  status: AlphasendersStatus;
  enabled: boolean;
  blocked_status: boolean
}

export type AlphasendersApplicationsItem = {
  id: number;
  name: string;
  company: string;
  createdAt: string;
  site: string;
  status: AlphasendersStatus;
}

export type AlphasendersAllItem = {
  id: number;
  name: string;
  status: AlphasendersStatus;
}

export type ContactsItem = {
  id: string;
  phone: string;
  valid: boolean;
  name: string;
  surname: string;
  birthday: string;
  extraInfo: string;
  extraInfo2: string;
}

export type BlacklistContactsItem = {
  id: string;
  phone: string;
  name: string;
  surname: string;
  extraInfo: string;
}
export type HistoryStatus = 'In Progress' | 'Cancelled' | 'Completed' | 'Pending';

export type HistoryItem = {
  id: string;
  recipient: string;
  created_at: string;
  type: string;
  status: HistoryStatus;
  delivered: string;
  sum: string;
  template?: string;
  text?: string;
  delivery_status?: string;
  delivery_amount?: string;
};

export type BlacklistsStatus = 'active' | 'disabled';

export type BlacklistsItem = {
  id: string;
  name: string;
  desc: string;
  amount: number;
  created_at: string;
  status: BlacklistsStatus;
  active: boolean;
  sum: string;
  template?: string;
  text?: string;
  delivery_status?: string;
  delivery_amount?: string;
};

export type TemplatesStatus = 'ready' | 'new' | 'processing' | 'rejected';

export type UserTemplatesItem = {
  id: number;
  name: string;
  status: TemplatesStatus;
  type: string;
  date: string;
  text: string;
}

export type GeneralTemplatesItem = {
  id: number;
  name: string;
  status: TemplatesStatus;
  text: string;
}

export type BalanceStatus = 'confirm' | 'cancelled' | 'pending';

export type BalanceHistoryItem = {
  id: number;
  date: string;
  isRefunded: boolean;
  payment_system: string;
  amount: number;
  fee: number;
  currency: string;
  status: BalanceStatus;
}

export type BillsItem = {
  id: number;
  amount: number;
  date: string;
  status: BalanceStatus;
}

export type Reports = {
  id: string;
  phone: string;
  operator: string;
  alpha: string;
  createDate: string;
  sendDate: string;
  scheduledDate: string;
  deliveryDate: string;
  status: ReportsStatus;
  text: string;
};

export type ReportFiles = {
  fileName: string;
  status: ReportFileStatus;
  downloadLink: string;
};
