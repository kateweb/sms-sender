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

const PAGE_SIZES = [5, 10, 20];

type ContactsItem = {
  id: string;
  phone: string;
  valid: boolean;
  name: string;
  surname: string;
  birthday: string;
  extraInfo: string;
  extraInfo2: string;
};

type ContactsTableProps = {
  data: ContactsItem[];
  error?: ReactNode;
  loading?: boolean;
  onSelectedChange?: (selected: ContactsItem[]) => void;
  onDataChange?: (updated: ContactsItem[]) => void;
};

const ContactsTable = ({ data, error, loading, onSelectedChange, onDataChange }: ContactsTableProps) => {
  const t = useTranslations();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [selectedRecords, setSelectedRecords] = useState<ContactsItem[]>([]);
  const [records, setRecords] = useState<ContactsItem[]>(data.slice(0, pageSize));
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus<ContactsItem>>({
    columnAccessor: 'name',
    direction: 'asc',
  });
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebouncedValue(query, 200);

  const columns: DataTableProps<ContactsItem>['columns'] = [
    {
      accessor: 'phone',
      title: t('reg.phone'),
      sortable: true,
    },
    {
      accessor: 'valid',
      title: t('phonebook.valid'),
      sortable: true,
      render: ({ valid }) =>
        valid ? (
          <IconCheck color="green" size={18} />
        ) : (
          <IconX color="red" size={18} />
        ),
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
      accessor: 'birthday',
      title: t('phonebook.birthday'),
      sortable: true,
    },
    {
      accessor: 'extraInfo',
      title: t('phonebook.extra_info'),
      sortable: true,
    },
    {
      accessor: 'extraInfo2',
      title: `${t('phonebook.extra_info')} 2`,
      sortable: true,
    },
  ];

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    const d = sortBy(data, sortStatus.columnAccessor) as ContactsItem[];
    const dd = sortStatus.direction === 'desc' ? d.reverse() : d;
    let filtered = dd.slice(from, to) as ContactsItem[];

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
    <ErrorAlert title={t('phonebook.error')} message={error.toString()} />
  ) : (
    <DataTable<ContactsItem>
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

export default ContactsTable;
