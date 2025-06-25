'use client';

import {
  Button,
  Group,
  Stack,
  Text,
  TextInput,
  Title,
  Tooltip,
  ActionIcon,
  Collapse, Container, PaperProps, Grid, Paper, Modal, Center
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit, IconTrash, IconSend, IconChevronUp, IconChevronDown, IconAlertCircle } from '@tabler/icons-react';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from '@mantine/form';
import { DataTable, type DataTableColumn } from 'mantine-datatable';
import { PATH_APPS } from '@/routes';
import { useRouter } from 'next/navigation';
import { ConfirmDeleteModal } from '@/components';

export default function PhoneBooksPage() {
  const t = useTranslations();
  const router = useRouter();
  const PAPER_PROPS: PaperProps = {
    p: 'md',
    shadow: 'md',
    radius: 'md',
  };
  const form = useForm();
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [search, setSearch] = useState('');

  const [books] = useState([
    { id: 1, name: 'Test', status: t('phonebook.ready_to_send') },
    { id: 2, name: 'First', status: t('phonebook.ready_to_send') },
  ]);
  const [openedStats, setOpenedStats] = useState(true);
  const [openedList, setOpenedList] = useState(true);

  const filteredBooks = books.filter((book) =>
    book.name.toLowerCase().includes(search.toLowerCase())
  );
  const [openedConfirmModal, { open, close }] = useDisclosure(false);

  const handleDelete = () => {
    close();
  };

  const columns: DataTableColumn<{id: number; name: string; status: string }>[] = [
    {
      accessor: 'name',
      title: t('phonebook.name'),
      textAlign: 'left',
    },
    {
      accessor: 'status',
      title: t('history.status'),
      textAlign: 'left',
      render: ({ status }) => <Text c="dimmed">{status}</Text>,
    },
    {
      accessor: 'actions',
      title: t('history.actions'),
      textAlign: 'left',
      render: ({id}) => (
        <Group gap="xs">
          <Tooltip label={t('phonebook.send_bulk_sms')}>
            <ActionIcon variant="subtle" color="gray" component="a" href={PATH_APPS.sms}>
              <IconSend size={16} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label={t('phonebook.edit_phonebook')}>
            <ActionIcon variant="subtle" color="gray"  onClick={() => router.push(`phonebook/${id}`)}>
              <IconEdit size={16} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label={t('phonebook.delete_phonebook')}>
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
  ];

  return (
    <Container fluid py="md">
      <Title order={2} mb="md">
        {t('nav.phonebooks')}
      </Title>
      <Grid gutter={{ base: 'md', md: 'xl', xl: 50 }}>
        <Grid.Col span={{ base: 12, lg: 7 }}>
          <Paper {...PAPER_PROPS}>
            <form
              onSubmit={form.onSubmit(() => {
              })}
            >
              <Stack gap="sm">
                <Title order={4}>{t('phonebook.create')}</Title>
                <TextInput
                  placeholder={t('phonebook.name')}
                  value={name}
                  required
                  onChange={(e) => setName(e.currentTarget.value)}
                />
                <TextInput
                  placeholder={t('phonebook.comment')}
                  value={comment}
                  required
                  onChange={(e) => setComment(e.currentTarget.value)}
                />
                <Button fullWidth type="submit">
                  {t('save')}
                </Button>
              </Stack>
            </form>
          </Paper>
        </Grid.Col>
        <Grid.Col span={{ base: 12, lg: 5 }}>
        <Paper {...PAPER_PROPS}>
            <Group justify="space-between">
              <Title order={4}>{t('nav.stats')}</Title>
              <Button
                variant="subtle"
                size="xs"
                onClick={() => setOpenedStats((o) => !o)}
              >
                {openedStats ? <IconChevronUp size={20} /> : <IconChevronDown size={20} />}
              </Button>
            </Group>
            <Collapse in={openedStats}>
              <TextInput mt="sm" placeholder="" disabled />
            </Collapse>
          </Paper>
        </Grid.Col>
        <Grid.Col span={{ base: 12, lg: 7 }}>
          <Paper {...PAPER_PROPS}>
            <Group justify="space-between">
              <Title order={4}>{t('phonebook.list')}</Title>
              <Button
                variant="subtle"
                size="xs"
                onClick={() => setOpenedList((o) => !o)}
              >
                {openedList ? <IconChevronUp size={20} /> : <IconChevronDown size={20} />}
              </Button>
            </Group>

            <Collapse in={openedList}>
              <TextInput
                placeholder={t('phonebook.search')}
                mt="sm"
                value={search}
                onChange={(e) => setSearch(e.currentTarget.value)}
              />
              <div style={{ position: 'relative', overflow: 'hidden' }}>
                <DataTable
                  mt="sm"
                  minHeight={150}
                  noRecordsText={t('no_results')}
                  highlightOnHover
                  borderRadius="md"
                  withTableBorder={false}
                  records={filteredBooks}
                  columns={columns}
                />
              </div>
            </Collapse>
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
