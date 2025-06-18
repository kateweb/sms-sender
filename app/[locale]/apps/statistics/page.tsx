'use client';

import {
  Container,
  Grid,
  Paper,
  Title, PaperProps, Tabs
} from '@mantine/core';
import { useTranslations } from 'next-intl';
import { HistoryTable } from '@/components';
import { useFetchData } from '@/hooks';
import { useState } from 'react';

export default function StatisticsPage() {
  const t = useTranslations();
  const [tab, setTab] = useState<string | null>('completed');

  const PAPER_PROPS: PaperProps = {
    p: 'md',
    shadow: 'md',
    radius: 'md',
    style: { height: '100%' },
  };
  const {
    data: historyData,
    error: historyError,
    loading: historyLoading,
  } = useFetchData('/mocks/History.json');
  const {
    data: historyPlannedData,
    error: historyPlannedError,
    loading: historyPlannedLoading,
  } = useFetchData('/mocks/HistoryPlanned.json');

  return (
    <Container fluid py="md">
      <Title order={2} mb="md">
        {t('nav.stats')}
      </Title>
      <Grid mt={"md"}>
        <Grid.Col span={12}>
          <Paper {...PAPER_PROPS}>
            <Tabs value={tab} onChange={setTab}>
              <Tabs.List>
                <Tabs.Tab value="planned">{t('history.planned')}</Tabs.Tab>
                <Tabs.Tab value="completed">{t('history.completed')}</Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="planned">
                <HistoryTable
                  data={historyPlannedData}
                  error={historyPlannedError}
                  loading={historyPlannedLoading}
                  withPagination={true}
                />
              </Tabs.Panel>
              <Tabs.Panel value="completed">
                <HistoryTable
                  data={historyData}
                  error={historyError}
                  loading={historyLoading}
                  withPagination={true}
                />
              </Tabs.Panel>
            </Tabs>

          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
