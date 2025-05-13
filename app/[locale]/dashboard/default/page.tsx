'use client';

import {
  Button,
  Container,
  Grid,
  Group,
  Paper,
  PaperProps,
  Stack,
  Text,
  Collapse
} from '@mantine/core';
import { IconChevronDown, IconChevronRight, IconChevronUp } from '@tabler/icons-react';
import Link from 'next/link';

import {
  PageHeader,
  HistoryTable,
  MessagesChart,
  BalanceCard
} from '@/components';
import { useFetchData } from '@/hooks';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

const PAPER_PROPS: PaperProps = {
  p: 'md',
  shadow: 'md',
  radius: 'md',
  style: { height: '100%' },
};

function Page() {
  const {
    data: historyData,
    error: historyError,
    loading: historyLoading,
  } = useFetchData('/mocks/History.json');
  const [opened, setOpened] = useState(true);
  const t = useTranslations();
  return (
    <Container fluid>
      <Stack gap="lg">
        <PageHeader title={t('nav.dashboard')} withActions={true} />
        <Grid gutter={{ base: 'md', md: 'xl', xl: 50 }}>
          <Grid.Col span={{ base: 12, lg: 8 }}>
            <BalanceCard/>
          </Grid.Col>
          <Grid.Col span={{ base: 12, lg: 4 }}>
            <MessagesChart {...PAPER_PROPS} />
          </Grid.Col>
          <Grid.Col span={12}>
            <Paper {...PAPER_PROPS}>
              <Group justify="space-between" mb="md" >
                <Group justify="space-between" style={{ flex: 1, cursor: 'pointer' }} onClick={() => setOpened((o) => !o)}>
                  <Text size="lg" fw={600}>{t('history.title')}</Text>
                  {opened ? <IconChevronUp size={20} /> : <IconChevronDown size={20} />}
                </Group>
                <Button
                  variant="subtle"
                  component={Link}
                  href=""
                  rightSection={<IconChevronRight size={18} />}
                >
                  {t('more')}
                </Button>
              </Group>
              <Collapse in={opened}>
                <HistoryTable
                  data={historyData.slice(0, 5)}
                  error={historyError}
                  loading={historyLoading}
                />
              </Collapse>
            </Paper>
          </Grid.Col>
        </Grid>
      </Stack>
    </Container>
  );
}

export default Page;
