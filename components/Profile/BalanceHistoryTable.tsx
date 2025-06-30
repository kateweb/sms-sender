'use client';

import { ReactNode, useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import {
  DataTable,
  DataTableSortStatus,
} from 'mantine-datatable';

import { ErrorAlert } from '@/components';
import { useTranslations } from 'next-intl';
import { Badge, MantineColor, Text } from '@mantine/core';
import { BalanceStatus, BalanceHistoryItem } from '@/types';

type StatusBadgeProps = {
  status: BalanceStatus;
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  let color: MantineColor;
  const t = useTranslations('profile.statuses');
  switch (status) {
    case 'cancelled':
      color = 'red';
      break;
    case 'confirm':
      color = 'green';
      break;
    case 'pending':
      color = 'orange'
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

type BalanceHistoryTableProps = {
  data: BalanceHistoryItem[];
  error?: ReactNode;
  loading?: boolean;
};

const BalanceHistoryTable = ({ data, error, loading }: BalanceHistoryTableProps) => {
  const t = useTranslations();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [records, setRecords] = useState<BalanceHistoryItem[]>(data.slice(0, pageSize));
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus<BalanceHistoryItem>>({
    columnAccessor: 'name',
    direction: 'asc',
  });

  const columns = [
    {
      accessor: 'date',
      title: t('alphasenders.date'),
      sortable: true,
    },
    {
      accessor: 'isRefunded',
      title: t('profile.is_refunded'),
      sortable: true,
      render: (item: BalanceHistoryItem) => String(item.isRefunded),
    },
    {
      accessor: 'payment_system',
      title: t('profile.payment_system'),
      sortable: true,
    },
    {
      accessor: 'amount',
      title: t('history.sum'),
      sortable: true,
    },
    {
      accessor: 'fee',
      title: t('profile.fee'),
    },
    {
      accessor: 'currency',
      title: t('profile.currency'),
      sortable: true,
    },
    {
      accessor: 'status',
      title: t('history.status'),
      sortable: true,
      render: (item: BalanceHistoryItem) => <StatusBadge status={item.status} />,
    },
  ];

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;

    let filtered = [...data];

    const sorted = sortBy(filtered, sortStatus.columnAccessor);
    const sortedData = sortStatus.direction === 'desc' ? sorted.reverse() : sorted;

    setRecords(sortedData.slice(from, to));
  }, [sortStatus, data, page, pageSize]);

  return error ? (
    <ErrorAlert title={t('profile.balance_error')} message={error.toString()} />
  ) : (
    <DataTable<BalanceHistoryItem>
      mt="md"
      minHeight="200px"
      verticalSpacing="xs"
      striped
      highlightOnHover
      noRecordsText={t('no_results')}
      columns={columns}
      records={records}
      totalRecords={records.length}
      recordsPerPage={pageSize}
      recordsPerPageLabel={t('per_page')}
      page={page}
      onPageChange={(p) => setPage(p)}
      recordsPerPageOptions={PAGE_SIZES}
      onRecordsPerPageChange={setPageSize}
      sortStatus={sortStatus}
      onSortStatusChange={setSortStatus}
      fetching={loading}

    />
  );
};

export default BalanceHistoryTable;
