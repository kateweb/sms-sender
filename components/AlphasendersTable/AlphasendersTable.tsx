'use client';

import { ReactNode, useEffect, useState } from 'react';

import { useDebouncedValue } from '@mantine/hooks';
import sortBy from 'lodash/sortBy';
import {
  DataTable,
  DataTableProps,
  DataTableSortStatus,
} from 'mantine-datatable';

import { ErrorAlert } from '@/components';
import { useTranslations } from 'next-intl';
import { Badge, MantineColor, Switch, Text } from '@mantine/core';
import { AlphasendersStatus, AlphasendersItem } from '@/types';

type StatusBadgeProps = {
  status: AlphasendersStatus;
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  let color: MantineColor;
  const t = useTranslations('alphasenders.statuses');
  switch (status) {
    case 'cancelled':
      color = 'red';
      break;
    case 'approved':
      color = 'green';
      break;
    case 'processing':
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

type AlphasendersTableProps = {
  data: AlphasendersItem[];
  error?: ReactNode;
  loading?: boolean;
  onSelectedChange?: (selected: AlphasendersItem[]) => void;
  onDataChange?: (updated: AlphasendersItem[]) => void;
  search?: string;
  filter?: string;
};

const AlphasendersTable = ({ data, error, loading, onSelectedChange, onDataChange, filter, search }: AlphasendersTableProps) => {
  const t = useTranslations();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [records, setRecords] = useState<AlphasendersItem[]>(data.slice(0, pageSize));
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus<AlphasendersItem>>({
    columnAccessor: 'name',
    direction: 'asc',
  });
  const [debouncedQuery] = useDebouncedValue(search, 200);
  const columns: DataTableProps<AlphasendersItem>['columns'] = [
    {
      accessor: 'name',
      title: t('sms.alpha_name'),
      sortable: true,
      render: (item: AlphasendersItem) => (
        <Text fw={700} c="green">
          {item.name}
        </Text>
      ),
    },
    {
      accessor: 'country',
      title: t('report.country'),
      sortable: true,
      render: (item: AlphasendersItem) => (
        <Text fw={700}>
          {item.country}
        </Text>
      ),
    },
    {
      accessor: 'company',
      title: t('alphasenders.company'),
      render: (item: AlphasendersItem) => (
        <div>
          {item.company}
          <Text size="xs" c="dimmed">
            {t('alphasenders.uin')}: <b>{item.userId}</b>
          </Text>
        </div>
      ),
    },
    {
      accessor: 'type',
      title: t('history.type'),
      render: (item: AlphasendersItem) => (
        <Text fw={700}>
          {item.type}
        </Text>
      ),
    },
    {
      accessor: 'site',
      title: t('alphasenders.site'),
    },
    {
      accessor: 'date',
      title: t('alphasenders.date'),
    },
    {
      accessor: 'status',
      title: t('history.status'),
      sortable: true,
      render: (item: AlphasendersItem) => <StatusBadge status={item.status} />,
    },
    {
      accessor: 'enabled',
      title: t('alphasenders.state'),
      render: (item: AlphasendersItem) =>
        <Switch
          defaultChecked
        />,
    },
    {
      accessor: 'blocked_status',
      title: t('alphasenders.blocked_status'),
    },
  ];

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;

    let filtered = [...data];

    if (debouncedQuery) {
      filtered = filtered.filter(({ name }) =>
        name.toLowerCase().includes(debouncedQuery.trim().toLowerCase())
      );
    }

    if (filter &&  filter !== 'all') {
      filtered = filtered.filter(({ type }) => type === filter);
    }

    const sorted = sortBy(filtered, sortStatus.columnAccessor);
    const sortedData = sortStatus.direction === 'desc' ? sorted.reverse() : sorted;

    setRecords(sortedData.slice(from, to));
  }, [sortStatus, data, page, pageSize, debouncedQuery, filter]);

  return error ? (
    <ErrorAlert title={t('alphasenders.error')} message={error.toString()} />
  ) : (
    <DataTable<AlphasendersItem>
      mt="md"
      minHeight="200px"
      verticalSpacing="xs"
      striped
      highlightOnHover
      noRecordsText={t('no_results')}
      // @ts-ignore
      columns={columns}
      records={records}
      totalRecords={
        debouncedQuery
          ? records.length
          : data.length
      }
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

export default AlphasendersTable;
