'use client';

import {
  Box,
  Button, Container,
  Grid,
  Group,
  Paper, PaperProps,
  Select,
  Text,
  TextInput, Title
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useState } from 'react';
import CountrySelect from '@/components/CountrySelect/CountrySelect';
import { ReportsTable } from '@/components';
import { useFetchData } from '@/hooks';
import { useTranslations } from 'next-intl';
import { IconCalendarWeek } from '@tabler/icons-react';
import DateTimeRangeInput from '@/components/DateTimeRangePicker/DateTimeRangePicker';

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
  } = useFetchData('/mocks/Reports.json');

  return (
    <Container fluid py="md">
      <Title order={2} mb="md">
        {t('report.title')}
      </Title>
      <Paper {...PAPER_PROPS}>
        <Box mb="md">
          <Text>
            <strong>{t('report.total')}:</strong> 1
          </Text>
          <Text>
            <strong>{t('history.statuses.delivered')}:</strong> 1 (100.00%)
          </Text>
        </Box>

        <Grid gutter="sm">
          <Grid.Col span={{ base: 12, md: 4 }}>
            <DateTimeRangeInput/>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <TextInput label={t('sms.alpha_name')} placeholder={t('report.enter_alpha_names')} />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <TextInput label={t('sms.phone_number')} placeholder={t('report.enter_phone_numbers')} />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <CountrySelect />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Select label={t('report.operator')} placeholder={t('report.choose_operator')} data={['Beeline UA', 'Lifecell', 'Kyivstar JSC (Kyivstar)']} />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Select label={t('history.status')} placeholder={t('report.choose_status')} data={['Created', 'Queued', 'Sent', 'Delivered', 'Failed', 'No balance', 'Blacklisted', 'Repeat', 'Spam', 'On moderation', 'Rejected', 'Ready to send']} />
          </Grid.Col>
        </Grid>

        <Group mt="md">
          <Button type="submit">{t('search')}</Button>
          <Button variant="default">{t('report.download_report')}</Button>
        </Group>
        <Group mt="xl">
          <ReportsTable
            data={reportsData}
            error={reportsError}
            loading={reportsLoading}
          /></Group>
      </Paper>

    </Container>
  );
}
