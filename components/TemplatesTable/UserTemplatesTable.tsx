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
import { Badge, MantineColor, Text } from '@mantine/core';
import { TemplatesStatus, UserTemplatesItem } from '@/types';

type StatusBadgeProps = {
  status: TemplatesStatus;
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  let color: MantineColor;
  const t = useTranslations('templates.statuses');
  switch (status) {
    case 'rejected':
      color = 'red';
      break;
    case 'ready':
      color = 'green';
      break;
    case 'processing':
      color = 'orange'
      break;
    case 'new':
      color = 'blue'
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

type UserTemplatesTableProps = {
  data: UserTemplatesItem[];
  error?: ReactNode;
  loading?: boolean;
  onSelectedChange?: (selected: UserTemplatesItem[]) => void;
  onDataChange?: (updated: UserTemplatesItem[]) => void;
  search?: string;
  filter?: string[];
};

const UserTemplatesTable = ({ data, error, loading, onSelectedChange, onDataChange, filter, search }: UserTemplatesTableProps) => {
  const t = useTranslations();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [records, setRecords] = useState<UserTemplatesItem[]>(data.slice(0, pageSize));
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus<UserTemplatesItem>>({
    columnAccessor: 'name',
    direction: 'asc',
  });
  const [debouncedQuery] = useDebouncedValue(search, 200);
  const columns: DataTableProps<UserTemplatesItem>['columns'] = [
    {
      accessor: 'name',
      title: t('phonebook.name'),
      sortable: true,
      render: (item: UserTemplatesItem) => (
        <Text fw={700} c="green">
          {item.name}
        </Text>
      ),
    },
    {
      accessor: 'status',
      title: t('history.status'),
      sortable: true,
      render: (item: UserTemplatesItem) => <StatusBadge status={item.status} />,
    },
    {
      accessor: 'type',
      title: t('history.type'),
      sortable: true,
      render: (item: UserTemplatesItem) => (
        <Text fw={700}>
          {item.type}
        </Text>
      ),
    },
    {
      accessor: 'date',
      sortable: true,
      title: t('alphasenders.date'),
    },
    {
      accessor: 'actions',
      title: t('history.actions'),
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

    if (Array.isArray(filter) && filter.length > 0) {
      filtered = filtered.filter(({ status }) => filter.includes(status));
    }

    const sorted = sortBy(filtered, sortStatus.columnAccessor);
    const sortedData = sortStatus.direction === 'desc' ? sorted.reverse() : sorted;

    setRecords(sortedData.slice(from, to));
  }, [sortStatus, data, page, pageSize, debouncedQuery, filter]);

  return error ? (
    <ErrorAlert title={t('alphasenders.error')} message={error.toString()} />
  ) : (
    <DataTable<UserTemplatesItem>
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

export default UserTemplatesTable;
