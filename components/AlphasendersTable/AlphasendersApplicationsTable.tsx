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
import { AlphasendersStatus, AlphasendersApplicationsItem } from '@/types';

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
  data: AlphasendersApplicationsItem[];
  error?: ReactNode;
  loading?: boolean;
  onSelectedChange?: (selected: AlphasendersApplicationsItem[]) => void;
  onDataChange?: (updated: AlphasendersApplicationsItem[]) => void;
  search?: string;
  filter?: string;
};

const AlphasendersApplicationsTable = ({ data, error, loading, onSelectedChange, onDataChange, filter, search }: AlphasendersTableProps) => {
  const t = useTranslations();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [records, setRecords] = useState<AlphasendersApplicationsItem[]>(data.slice(0, pageSize));
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus<AlphasendersApplicationsItem>>({
    columnAccessor: 'name',
    direction: 'asc',
  });
  const [debouncedQuery] = useDebouncedValue(search, 200);
  const columns: DataTableProps<AlphasendersApplicationsItem>['columns'] = [
    {
      accessor: 'id',
      title: 'ID',
      sortable: true,
    },
    {
      accessor: 'name',
      title: t('alphasenders.alphaname'),

      render: (item: AlphasendersApplicationsItem) => (
        <Text fw={700} c="green">
          {item.name}
        </Text>
      ),
    },
    {
      accessor: 'company',
      title: t('alphasenders.company'),
      sortable: true,
      render: (item: AlphasendersApplicationsItem) => (
        <div>
          {item.company}
        </div>
      ),
    },
    {
      accessor: 'createdAt',
      title: t('history.created_at'),
    },
    {
      accessor: 'site',
      title: t('alphasenders.site'),
      sortable: true,
    },
    {
      accessor: 'status',
      title: t('history.status'),
      sortable: true,
      render: (item: AlphasendersApplicationsItem) => <StatusBadge status={item.status} />,
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

    const sorted = sortBy(filtered, sortStatus.columnAccessor);
    const sortedData = sortStatus.direction === 'desc' ? sorted.reverse() : sorted;

    setRecords(sortedData.slice(from, to));
  }, [sortStatus, data, page, pageSize, debouncedQuery, filter]);

  return error ? (
    <ErrorAlert title={t('alphasenders.error')} message={error.toString()} />
  ) : (
    <DataTable<AlphasendersApplicationsItem>
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

export default AlphasendersApplicationsTable;
