export type Id = string | number;

export type KanbanColumn = {
  id: Id;
  title: string;
};

export type KanbanTask = {
  id: Id;
  columnId: Id;
  content: string;
  title?: string;
  status?: 'to do' | 'in progress' | 'done' | 'unassigned' | string;
  comments?: number;
  users?: number;
};

export type OrderStatus = 'shipped' | 'processing' | 'cancelled' | string;

export type AlphasendersStatus = 'approved' | 'processing' | 'cancelled' | string;

export type AlphasendersItem = {
  id: number;
  name: string;
  country: boolean;
  company: string;
  userId: string;
  type: string;
  site: string;
  date: string;
  status: string;
  enabled: boolean;
  blocked_status: boolean
}

export type AlphasendersApplicationsItem = {
  id: number;
  name: string;
  company: string;
  createdAt: string;
  site: string;
  status: string;
}

export type AlphasendersAllItem = {
  id: number;
  name: string;
  status: string;
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

export type TemplatesStatus = 'ready' |  'new' | 'processing' | 'rejected' | string;

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

export type Orders = {
  id: string;
  product: string;
  date: string;
  total: number;
  status: OrderStatus;
  payment_method: string;
};

export type Reports = {
  id: string;
  phone: string;
  operator: string;
  alpha: string;
  createDate: string;
  sendDate: string;
  scheduledDate: string;
  deliveryDate: string;
  status: OrderStatus;
  text: string;
};

export type ReportFiles = {
  fileName: string;
  status: OrderStatus;
  downloadLink: string;
};

export type InvoiceStatus =
  | 'pending'
  | 'sent'
  | 'cancelled'
  | 'approved'
  | 'suspended'
  | string;

export type Invoices = {
  id: string;
  full_name: string;
  email: string;
  address: string;
  country: string;
  status: InvoiceStatus;
  amount: number;
  issue_date: string;
  description: string;
  client_email: string;
  client_address: string;
  client_country: string;
  client_name: string;
  client_company: string;
};
