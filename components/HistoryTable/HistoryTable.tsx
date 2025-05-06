import { ReactNode, useState } from 'react';

import { ActionIcon, Badge, Group, MantineColor, Text, Stack, Tooltip } from '@mantine/core';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';

import { ErrorAlert } from '@/components';
import { useTranslations } from 'next-intl';
import { IconDownload, IconReload, IconChevronRight, IconChevronDown } from '@tabler/icons-react';
import sortBy from 'lodash/sortBy';

type Status = 'In Progress' | 'Cancelled' | 'Completed' | 'Pending' | string;

const StatusBadge = ({ status }: { status: Status }) => {
  const t = useTranslations('history.statuses');
  let color: MantineColor = '';

  switch (status) {
    case 'In Progress':
      color = 'blue';
      break;
    case 'Cancelled':
      color = 'red';
      break;
    case 'Finished':
      color = 'green';
      break;
    case 'Pending':
      color = 'orange';
      break;
    default:
      color = 'gray';
  }

  return (
    <Badge color={color} variant="filled" radius="sm" style={{minWidth: 'max-content'}}>
      {t(status)}
    </Badge>
  );
};

type HistoryItem = {
  id: string;
  recipient: string;
  created_at: string;
  type: string;
  status: Status;
  delivered: string;
  sum: string;
  template?: string;
  text?: string;
  delivery_status?: string;
  delivery_amount?: string;
};

type HistoryTableProps = {
  data?: HistoryItem[];
  error: ReactNode;
  loading: boolean;
};
const HistoryTable = ({ data, error, loading }: HistoryTableProps) => {
  const t = useTranslations();
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus<HistoryItem>>({
    columnAccessor: 'created_at',
    direction: 'asc',
  });

  const handleExpansionToggle = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  // Sorting the data based on the current sortStatus
  const sortedData = data ? sortBy(data, (item) => {
    if (sortStatus.columnAccessor === 'created_at') {
      return new Date(item.created_at);
    }
    // @ts-ignore
    return item[sortStatus.columnAccessor];
  }) : [];

  if (sortStatus.direction === 'desc') {
    sortedData.reverse();
  }

  return error ? (
    <ErrorAlert title={t('history.error')} message={error.toString()} />
  ) : (
    <DataTable<HistoryItem>
      verticalSpacing="sm"
      highlightOnHover
      height="auto"
      minHeight="150px"
      records={sortedData}
      fetching={loading}
      columns={[
        {
          accessor: 'expand',
          title: '',
          render: ({ id }) => (
            <ActionIcon
              variant="subtle"
              onClick={() => handleExpansionToggle(id)}
            >
              {expandedRow === id ? (
                <IconChevronDown size={16} />
              ) : (
                <IconChevronRight size={16} />
              )}
            </ActionIcon>
          ),
          width: 40,
        },
        { accessor: 'id', title: 'ID'},
        {
          accessor: 'recipient',
          title: t('history.recipient'),
          render: ({ recipient }) => <Badge color="teal" variant="light">{recipient}</Badge>,
        },
        { accessor: 'created_at', title: t('history.created_at'), sortable: true},
        { accessor: 'type', title: t('history.type') },
        {
          accessor: 'status',
          title: t('history.status'),
          render: ({ status }) => <StatusBadge status={status} />,
        },
        { accessor: 'delivered', title: t('history.statuses.delivered')},
        { accessor: 'sum', title: t('history.sum') },
        {
          accessor: 'actions',
          title: t('history.actions'),
          render: (record) => (
            <Group gap="xs" wrap="nowrap">
              <Tooltip label={t('download')}>
                <ActionIcon variant="subtle" color="default" onClick={() => console.log('Download', record)}>
                  <IconDownload size={18} />
                </ActionIcon>
              </Tooltip>
              <Tooltip label={t('repeat')}>
                <ActionIcon variant="subtle" color="default" onClick={() => console.log('Repeat', record)}>
                  <IconReload size={18} />
                </ActionIcon>
              </Tooltip>
            </Group>
          ),
        },

      ]}
      rowExpansion={{
        content: ({ record }) => (
          <Stack p="sm" gap="xs">
            <Text size="sm">
              <strong>{t('history.template')}:</strong> {record.template || t('history.custom_text')}
            </Text>
            <Text size="sm">
              <strong>{t('history.text')}:</strong> {record.text || ''}
            </Text>
            <Text size="sm">
              <strong>{t('history.delivery_status')}: </strong>
              {record.delivery_status ? t(`history.statuses.${record.delivery_status}`) : record.delivery_status || ''}:
              {record.delivery_amount || ''}
            </Text>
          </Stack>
        ),
      }}
      sortStatus={sortStatus}
      onSortStatusChange={setSortStatus}
    />
  );
};

export default HistoryTable;
