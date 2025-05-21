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
import { Badge, Text } from '@mantine/core';
import {  AlphasendersAllItem } from '@/types';

const PAGE_SIZES = [5, 10, 20];

type AlphasendersAllTableProps = {
  data: AlphasendersAllItem[];
  error?: ReactNode;
  loading?: boolean;
  onSelectedChange?: (selected: AlphasendersAllItem[]) => void;
  onDataChange?: (updated: AlphasendersAllItem[]) => void;
  search?: string;
  filter?: string;
};

const AlphasendersTable = ({ data, error, loading, filter, search }: AlphasendersAllTableProps) => {
  const t = useTranslations();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [records, setRecords] = useState<AlphasendersAllItem[]>(data.slice(0, pageSize));
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus<AlphasendersAllItem>>({
    columnAccessor: 'name',
    direction: 'asc',
  });
  const [debouncedQuery] = useDebouncedValue(search, 200);
  const columns: DataTableProps<AlphasendersAllItem>['columns'] = [
    {
      accessor: 'name',
      title: t('sms.alpha_name'),
      sortable: true,
      render: (item: AlphasendersAllItem) => (
        <Text fw={700} c="green">
          {item.name}
        </Text>
      ),
    },
    {
      accessor: 'status',
      title: t('history.status'),
      sortable: true,
      render: ({ status }) => <Badge color="teal" variant="light">{status}</Badge>,
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
    <DataTable<AlphasendersAllItem>
      mt="md"
      minHeight="200px"
      verticalSpacing="xs"
      striped
      highlightOnHover
      // @ts-ignore
      columns={columns}
      records={records}
      totalRecords={
        debouncedQuery
          ? records.length
          : data.length
      }
      noRecordsText={t('no_results')}
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
