'use client';

import { ReactNode, useEffect, useState } from 'react';
import { Badge, MantineColor, Text } from '@mantine/core';
import { DataTable, DataTableProps } from 'mantine-datatable';
import { ErrorAlert } from '@/components';
import { OrderStatus, ReportFiles } from '@/types';
import { useTranslations } from 'next-intl';

type StatusBadgeProps = {
  status: OrderStatus;
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  let color: MantineColor;
  const t = useTranslations('report.statuses');
  console.log(status);
  switch (status) {
    case 'failed':
      color = 'red';
      break;
    case 'completed':
      color = 'green';
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
  data: ReportFiles[];
  error?: ReactNode;
  loading?: boolean;
};

const ReportFilesTable = ({ data, loading, error }: ReportsTableProps) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [records, setRecords] = useState<ReportFiles[]>(data.slice(0, PAGE_SIZES[0]));
  const t = useTranslations();

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setRecords(data.slice(from, to));
  }, [data, page, pageSize]);

  const columns: DataTableProps<ReportFiles>['columns'] = [
    { accessor: 'fileName',
      title: (
        <div style={{ maxWidth: 200, textAlign: 'center' }}>
          {t('report.file_name')}
        </div>
      ),
      render: (item) => (
        <div style={{ maxWidth: 200, textAlign: 'center'}}>
          {item.fileName}
        </div>
      ),
    },
    {
      accessor: 'status',
      title: t('history.status'),
      render: (item: ReportFiles) => <StatusBadge status={item.status} />,
    },
    { accessor: 'createdAt', title: t('report.created_date') },
    {
      accessor: 'downloadLink',
      title: t('download'),
      render: (item) =>
        item.downloadLink ? (
            <Text
              size="sm"
              c="green"
              component="a"
              href={item.downloadLink}
              download
            >
              {t('download')}
            </Text>
        ) : (
          <span style={{ color: '#adb5bd' }}>{t('report.unavailable')}</span>
        ),
    }
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

export default ReportFilesTable;
