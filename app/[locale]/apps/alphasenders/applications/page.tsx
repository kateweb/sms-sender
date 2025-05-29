'use client';

import {
  Button,
  Group,
  Stack,
  Tabs,
  Card, Title, Container
} from '@mantine/core';
import { useState } from 'react';
import { useFetchData } from '@/hooks';
import { AlphasendersApplicationsTable } from '@/components';
import { IconUserPlus } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import { PATH_APPS } from '@/routes';

export default function AlphaNamesPage() {
  const t = useTranslations();
  const [tab, setTab] = useState<string | null>('sms');

  const {
    data: alphasendersApplicationsData,
    error: alphasendersApplicationsError,
    loading: alphasendersApplicationsLoading,
  } = useFetchData('/mocks/AlphasendersApplications.json');

  return (
    <Container fluid py="md">
      <Title order={2} mb="md">
        {t('nav.alphasenders_list')}
      </Title>
      <Card p="lg" radius="md" withBorder>
        <Stack>
          <Group justify="space-between">
            <Tabs value={tab} onChange={setTab}>
              <Tabs.List>
                <Tabs.Tab value="sms">{t('alphasenders.applications_for_sms')}</Tabs.Tab>
              </Tabs.List>
            </Tabs>
            <Button component="a" href={`${PATH_APPS.alphasenders}/add`} ml="auto">
              <Group gap={5}>
                <IconUserPlus size={15} />
                <span>{t('alphasenders.new')}</span>
              </Group>
            </Button>
          </Group>

          <Tabs value={tab} onChange={setTab}>
            <Tabs.Panel value="sms">
              <AlphasendersApplicationsTable
                data={alphasendersApplicationsData}
                error={alphasendersApplicationsError}
                loading={alphasendersApplicationsLoading}
              />
            </Tabs.Panel>
          </Tabs>
        </Stack>
      </Card>
    </Container>
  );
}
