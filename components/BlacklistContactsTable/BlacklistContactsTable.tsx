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
import { IconCheck, IconX } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { BlacklistContactsItem } from '@/types';

const PAGE_SIZES = [5, 10, 20];

type BlacklistContactsTableProps = {
  data: BlacklistContactsItem[];
  error?: ReactNode;
  loading?: boolean;
  onSelectedChange?: (selected: BlacklistContactsItem[]) => void;
  onDataChange?: (updated: BlacklistContactsItem[]) => void;
};

const BlacklistContactsTable = ({ data, error, loading, onSelectedChange, onDataChange }: BlacklistContactsTableProps) => {
  const t = useTranslations();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [selectedRecords, setSelectedRecords] = useState<BlacklistContactsItem[]>([]);
  const [records, setRecords] = useState<BlacklistContactsItem[]>(data.slice(0, pageSize));
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus<BlacklistContactsItem>>({
    columnAccessor: 'name',
    direction: 'asc',
  });
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebouncedValue(query, 200);

  const columns: DataTableProps<BlacklistContactsItem>['columns'] = [
    {
      accessor: 'phone',
      title: t('reg.phone'),
      sortable: true,
    },
    {
      accessor: 'name',
      title: t('phonebook.name'),
      sortable: true,
    },
    {
      accessor: 'surname',
      title: t('phonebook.surname'),
      sortable: true,
    },
    {
      accessor: 'extraInfo',
      title: t('phonebook.extra_info'),
      sortable: true,
    },
  ];

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    const d = sortBy(data, sortStatus.columnAccessor) as BlacklistContactsItem[];
    const dd = sortStatus.direction === 'desc' ? d.reverse() : d;
    let filtered = dd.slice(from, to) as BlacklistContactsItem[];

    if (debouncedQuery) {
      filtered = data
        .filter(({ name }) => {
          if (
            debouncedQuery !== '' &&
            !name
              .toLowerCase()
              .includes(debouncedQuery.trim().toLowerCase())
          ) {
            return false;
          }
          return true;
        })
        .slice(from, to);
    }

    setRecords(filtered);
  }, [sortStatus, data, page, pageSize, debouncedQuery]);

  return error ? (
    <ErrorAlert title={t('blacklists.error')} message={error.toString()} />
  ) : (
    <DataTable<BlacklistContactsItem>
      mt="md"
      minHeight="200px"
      verticalSpacing="xs"
      striped
      highlightOnHover
      // @ts-ignore
      columns={columns}
      records={records}
      selectedRecords={selectedRecords}
      onSelectedRecordsChange={(sel) => {
        setSelectedRecords(sel);
        onSelectedChange?.(sel);
      }}
      totalRecords={
        debouncedQuery
          ? records.length
          : data.length
      }
      recordsPerPage={pageSize}
      recordsPerPageLabel={t('per_page')}
      noRecordsText={t('no_results')}
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

export default BlacklistContactsTable;
