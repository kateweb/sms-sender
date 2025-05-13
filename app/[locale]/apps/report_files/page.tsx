'use client';

import {
  Container,
  Group,
  Paper, PaperProps,
  Title
} from '@mantine/core';

import { useFetchData } from '@/hooks';
import { useTranslations } from 'next-intl';
import {ReportFilesTable} from '@/components';

export default function ReportPage() {
  const t = useTranslations();
  const PAPER_PROPS: PaperProps = {
    p: 'md',
    shadow: 'md',
    radius: 'md',
    style: { height: '100%' },
  };
  const {
    data: reportsData,
    loading: reportsLoading,
    error: reportsError,
  } = useFetchData('/mocks/Report_files.json');

  return (
    <Container fluid py="md">
      <Title order={2} mb="md">
        {t('nav.stat_files')}
      </Title>
      <Paper {...PAPER_PROPS}>
        <Group>
          <ReportFilesTable
            data={reportsData}
            error={reportsError}
            loading={reportsLoading}
          />
        </Group>
      </Paper>

    </Container>
  );
}
