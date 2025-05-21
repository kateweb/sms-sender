'use client';

import {
  Button,
  Group,
  Select,
  Stack,
  Tabs,
  TextInput,
  Card,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { useFetchData } from '@/hooks';
import { AlphasendersTable, AlphasendersTableAll } from '@/components';
import { IconUserPlus } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import {  AlphasendersItem, AlphasendersAllItem } from '@/types';

export default function AlphaNamesPage() {
  const t = useTranslations();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState<string | null>('personal');
  const [alphasenders, setAlphasenders] = useState<AlphasendersItem[]>([]);

  const {
    data: alphasendersData,
    error: alphasendersError,
    loading: alphasendersLoading,
  } = useFetchData('/mocks/Alphasenders.json');

  const {
    data: alphasendersAllData,
    error: alphasendersAllError,
    loading: alphasendersAllLoading,
  } = useFetchData('/mocks/AlphasendersAll.json');

  useEffect(() => {
    if (alphasendersData) {
      setAlphasenders(alphasendersData);
    }
  }, [alphasendersData]);
  return (
    <Card p="lg" radius="md" withBorder>
      <Stack>
        <Group justify="space-between">
          <Group>
            <TextInput
              placeholder={t('alphasenders.search')}
              value={search}
              onChange={(e) => setSearch(e.currentTarget.value)}
            />
            {tab === 'personal' && (
              <Select
                data={[
                  { label: t('all'), value: 'all' },
                  { label: 'SMS', value: 'sms' },
                  { label: 'Email', value: 'email' },
                ]}
                value={filter}
                onChange={(val) => setFilter(val || 'all')}
              />
            )}
          </Group>
          <Button>
            <Group gap={5}>
              <IconUserPlus size={15} />
              <span>{t('alphasenders.new')}</span>
            </Group>
          </Button>
        </Group>

        <Tabs value={tab} onChange={setTab}>
          <Tabs.List>
            <Tabs.Tab value="personal">{t('alphasenders.personal')}</Tabs.Tab>
            <Tabs.Tab value="all">{t('alphasenders.all_alphanames')}</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="personal">
            <AlphasendersTable
              data={alphasendersData}
              error={alphasendersError}
              loading={alphasendersLoading}
              onDataChange={setAlphasenders}
              search={search}
              filter={filter}
            />
          </Tabs.Panel>
          <Tabs.Panel value="all">
            <AlphasendersTableAll
              data={alphasendersAllData}
              error={alphasendersAllError}
              loading={alphasendersAllLoading}
              search={search}
              filter={filter}
            />
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </Card>
  );
}
