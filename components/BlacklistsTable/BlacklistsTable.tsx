import { ReactNode, useEffect, useMemo, useState } from 'react';
import {
  ActionIcon,
  Badge, Flex,
  Group,
  MantineColor, Menu, Switch, Text,
  Tooltip
} from '@mantine/core';
import {
  DataTable,
  DataTableSortStatus,
} from 'mantine-datatable';
import { useTranslations } from 'next-intl';
import {
  IconChevronDown,
  IconDownload, IconEdit, IconFileTypeCsv, IconFileTypeTxt, IconFileTypeXls, IconTrash
} from '@tabler/icons-react';
import sortBy from 'lodash/sortBy';

import { ErrorAlert } from '@/components';
import { BlacklistsItem, BlacklistsStatus } from '@/types';
import { useRouter } from 'next/navigation';
import { ConfirmDeleteModal } from '@/components';
import { useDisclosure } from '@mantine/hooks';

const StatusBadge = ({ status }: { status: BlacklistsStatus }) => {
  const t = useTranslations('blacklists.statuses');
  let color: MantineColor = '';
  switch (status) {
    case 'active':
      color = 'green';
      break;
    case 'disabled':
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

type BlacklistsTableProps = {
  data: BlacklistsItem[];
  error: ReactNode;
  loading: boolean;
};

const PAGE_SIZES = [5, 10, 20];

const BlackListsTable = ({ data, error, loading }: BlacklistsTableProps) => {
  const t = useTranslations();
  const router  = useRouter();
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus<BlacklistsItem>>({
    columnAccessor: 'created_at',
    direction: 'asc',
  });

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [records, setRecords] = useState<BlacklistsItem[]>(data.slice(0, pageSize));

  const [openedConfirmModal, { open, close }] = useDisclosure(false);

  const handleDelete = () => {
    close();
  };

  const sortedData = useMemo(() => {
    const sorted = sortBy(data, (item) =>
      sortStatus.columnAccessor === 'created_at'
        ? new Date(item.created_at)
        : item[sortStatus.columnAccessor as keyof BlacklistsItem]
    );
    return sortStatus.direction === 'desc' ? sorted.reverse() : sorted;
  }, [data, sortStatus]);

  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setRecords(sortedData.slice(from, to));
  }, [sortedData, page, pageSize]);

  return error ? (
    <ErrorAlert title={t('blacklists.error')} message={error.toString()} />
  ) : (
    <DataTable<BlacklistsItem>
      verticalSpacing="sm"
      highlightOnHover={false}
      height="auto"
      minHeight="200px"
      noRecordsText={t('no_results')}
      records={records}
      fetching={loading}
      totalRecords={sortedData.length}
      recordsPerPage={pageSize}
      recordsPerPageLabel={t('per_page')}
      page={ page }
      onPageChange={ setPage }
      recordsPerPageOptions={PAGE_SIZES}
      onRecordsPerPageChange={setPageSize}
      sortStatus={sortStatus}
      onSortStatusChange={setSortStatus}
      columns={[
        {
          accessor: 'name',
          title: t('phonebook.name'),
          sortable: true,
          render: (item: BlacklistsItem) => (
            <Text fw={700} c="green" style={{ cursor: 'pointer' }} onClick={() => router.push(`blacklists/update/${item.id}`)}>
              {item.name}
            </Text>
          ),
        },
        {
          accessor: 'desc',
          title: t('phonebook.comment'),
          sortable: true
        },
        {
          accessor: 'amount',
          title: t('blacklists.numbers_amount'),
          sortable: true
        },
        { accessor: 'created_at', title: t('history.created_at'), sortable: true },
        {
          accessor: 'status',
          title: t('history.status'),
          sortable: true,
          render: ({ status }) => <StatusBadge status={status} />,
        },
        {
          accessor: 'active',
          title: t('blacklists.statuses.active'),
          render: (item: BlacklistsItem) =>
            <Switch
              checked={item.status === 'active'}
              onChange={() => {
                const updated = records.map((record) =>
                  record.id === item.id
                    ? {
                      ...record,
                      status: record.status === 'active' ? 'disabled' : 'active',
                    }
                    : record
                );
                setRecords(updated);
              }}
            />,
        },
        {
          accessor: 'actions',
          title: t('history.actions'),
          render: (item: BlacklistsItem) => (
            <Group gap="xs" wrap="nowrap">
              <Menu shadow="md">
                  <Menu.Target>
                    <Tooltip label={t('download')}>
                      <ActionIcon
                        variant="subtle"
                        color="gray"
                        w="auto"
                      >
                        <Flex align="center" gap={2}>
                          <IconDownload size={18} />
                          <IconChevronDown size={16}/>
                        </Flex>

                      </ActionIcon>
                    </Tooltip>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Text size="xs" fw={700} px="sm" my="sm" c="green" tt="uppercase">{t('phonebook.choose_format')}:</Text>
                    <Menu.Item
                      leftSection={<IconFileTypeXls size={16} />}
                      component="a"
                      href="/files/blacklist-example.xls"
                      download
                    >
                      Excel(xls)
                    </Menu.Item>
                    <Menu.Item
                      leftSection={<IconFileTypeXls size={16} />}
                      component="a"
                      href="/files/blacklist-example.xlsx"
                      download
                    >
                      Excel(xlsx)
                    </Menu.Item>
                    <Menu.Item
                      leftSection={<IconFileTypeCsv size={16} />}
                      component="a"
                      href="/files/blacklist-example.csv"
                      download
                    >
                      CSV
                    </Menu.Item>
                    <Menu.Item
                      leftSection={<IconFileTypeTxt size={16} />}
                      component="a"
                      href="/files/blacklist-example.txt"
                      download
                    >
                      TXT
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              <Tooltip label={t('blacklists.edit_blacklist')}>
                <ActionIcon variant="subtle" color="gray"  onClick={() => router.push(`blacklists/update/${item.id}`)}>
                  <IconEdit size={16} />
                </ActionIcon>
              </Tooltip>
              <Tooltip label={t('blacklists.delete_blacklist')}>
                <ActionIcon variant="subtle" color="gray" onClick={open}>
                  <IconTrash size={16} />
                </ActionIcon>
              </Tooltip>
              <ConfirmDeleteModal
                opened={openedConfirmModal}
                onClose={close}
                onConfirm={handleDelete}
                message={t('phonebook.confirm_delete')}
              />
            </Group>
          ),
        },
      ]}
    />
  );
};

export default BlackListsTable;
