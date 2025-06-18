'use client';

import {
  Button,
  Group,
  Stack,
  TextInput,
  Title,
  Collapse, Container, PaperProps, Grid, Paper
} from '@mantine/core';
import {  IconChevronUp, IconChevronDown } from '@tabler/icons-react';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from '@mantine/form';
import { useFetchData } from '@/hooks';
import BlacklistsTable from '@/components/BlacklistsTable/BlacklistsTable';

export default function BlacklistsPage() {
  const t = useTranslations();

  const PAPER_PROPS: PaperProps = {
    p: 'md',
    shadow: 'md',
    radius: 'md',
  };
  const form = useForm();
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');

  const [openedList, setOpenedList] = useState(true);
  const [openedForm, setOpenedForm] = useState(true);

  const {
    data: blacklistsData,
    error: blacklistsError,
    loading: blacklistsLoading,
  } = useFetchData('/mocks/Blacklists.json');

  return (
    <Container fluid py="md">
      <Title order={2} mb="md">
        {t('nav.blacklists')}
      </Title>
      <Grid gutter={{ base: 'md', md: 'xl', xl: 50 }}>
        <Grid.Col span={{ base: 12, lg: 7 }}>
          <Paper {...PAPER_PROPS}>
            <Group justify="space-between" mb="md">
              <Title order={4}>{t('blacklists.create')}</Title>
              <Button
                variant="subtle"
                size="xs"
                onClick={() => setOpenedForm((o) => !o)}
              >
                {openedForm ? <IconChevronUp size={20} /> : <IconChevronDown size={20} />}
              </Button>
            </Group>
            <Collapse in={openedForm}>
              <form
                onSubmit={form.onSubmit(() => {
                })}
              >
                <Stack gap="sm">
                  <TextInput
                    placeholder={t('blacklists.enter_name')}
                    value={name}
                    required
                    onChange={(e) => setName(e.currentTarget.value)}
                  />
                  <TextInput
                    placeholder={t('blacklists.desc')}
                    value={comment}
                    required
                    onChange={(e) => setComment(e.currentTarget.value)}
                  />
                  <Button fullWidth type="submit">
                    {t('save')}
                  </Button>
                </Stack>
              </form>
            </Collapse>
          </Paper>
        </Grid.Col>
        <Grid.Col span={{ base: 12 }}>
          <Paper {...PAPER_PROPS}>
            <Group justify="space-between">
              <Title order={4}>{t('blacklists.list')}</Title>
              <Button
                variant="subtle"
                size="xs"
                onClick={() => setOpenedList((o) => !o)}
              >
                {openedList ? <IconChevronUp size={20} /> : <IconChevronDown size={20} />}
              </Button>
            </Group>
            <Collapse in={openedList}>
              <div style={{ position: 'relative', overflow: 'hidden' }}>
                <BlacklistsTable
                  data={blacklistsData}
                  error={blacklistsError}
                  loading={blacklistsLoading}
                />
              </div>
            </Collapse>
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
