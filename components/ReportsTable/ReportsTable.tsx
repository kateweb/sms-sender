'use client';

import { ReactNode, useEffect, useState } from 'react';
import { Badge, MantineColor } from '@mantine/core';
import { DataTable, DataTableProps } from 'mantine-datatable';
import { ErrorAlert } from '@/components';
import { OrderStatus, Reports } from '@/types';
import { useTranslations } from 'next-intl';

type StatusBadgeProps = {
  status: OrderStatus;
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  let color: MantineColor;
  const t = useTranslations('history.statuses');
  console.log(status);
  switch (status) {
    case 'In Progress':
      color = 'blue';
      break;
    case 'Cancelled':
      color = 'red';
      break;
    case 'delivered':
      color = 'green';
      break;
    case 'Pending':
      color = 'orange';
      break;
    default:
      color = 'gray';
  }

  return (
    <Badge color={color} variant="filled" radius="sm" style={{ minWidth: 'max-content' }}>
      {t(status)}
    </Badge>
  );
};

const PAGE_SIZES = [5, 10, 20];

type ReportsTableProps = {
  data: Reports[];
  error?: ReactNode;
  loading?: boolean;
};

const ReportsTable = ({ data, loading, error }: ReportsTableProps) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [records, setRecords] = useState<Reports[]>(data.slice(0, PAGE_SIZES[0]));
  const t = useTranslations();

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setRecords(data.slice(from, to));
  }, [data, page, pageSize]);

  const columns: DataTableProps<Reports>['columns'] = [
    { accessor: 'id',
      title: 'ID',
      render: (item) => (
        <div style={{ maxWidth: 100, textAlign: 'center'}}>
          {item.id}
        </div>
      ),
    },
    { accessor: 'phone', title: t('sms.phone_number') },
    { accessor: 'operator', title: t('report.operator') },
    { accessor: 'alpha',  title: t('sms.alpha_name') },
    { accessor: 'createDate', title: t('report.created_date') },
    { accessor: 'sendDate', title: t('report.send_date') },
    { accessor: 'scheduledDate',
      title: (
        <div style={{ maxWidth: 200, whiteSpace: 'normal' }}>
          {t('report.scheduled_date')}
        </div>
      ),
    },
    { accessor: 'deliveryDate', title: t('report.delivery_date') },
    {
      accessor: 'status',
      title: t('history.status'),
      render: (item: Reports) => <StatusBadge status={item.status} />,
    },
    { accessor: 'text',
      title: t('history.text'),
      render: (item) => (
        <div style={{ maxWidth: 200, minWidth: 150 }}>
          {item.text}
        </div>
      ),
    },
  ];

  if (error) {
    return <ErrorAlert title={t('history.error')} message={error.toString()} />;
  }

  return (
    <DataTable
      style={{ width: '100%' }}
      minHeight={200}
      verticalSpacing="sm"
      striped
      columns={columns}
      records={records}
      totalRecords={data.length}
      recordsPerPage={pageSize}
      recordsPerPageLabel={t('per_page')}
      page={page}
      onPageChange={setPage}
      recordsPerPageOptions={PAGE_SIZES}
      onRecordsPerPageChange={setPageSize}
      fetching={loading}
    />
  );
};

export default ReportsTable;
