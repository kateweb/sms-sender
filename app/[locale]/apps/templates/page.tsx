'use client';

import {
  Button,
  Checkbox,
  Group,
  Menu,
  Stack,
  Tabs,
  TextInput,
  Title, Container, Card
} from '@mantine/core';
import { useState } from 'react';
import { IconChevronDown, IconPlus, IconSearch } from '@tabler/icons-react';
import { PATH_APPS } from '@/routes';
import { useTranslations } from 'next-intl';
import { GeneralTemplatesTable, UserTemplatesTable } from '@/components';
import { useFetchData } from '@/hooks';

export default function TemplatesPage() {
  const t = useTranslations();
  const [tab, setTab] = useState<string| null>('user');
  const [search, setSearch] = useState('');
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

  const statuses = [
    { value: 'ready' },
    { value: 'new' },
    { value: 'processing' },
    { value: 'rejected' },
  ];

  const {
    data: userTemplatesData,
    error: userTemplatesError,
    loading: userTemplatesLoading,
  } = useFetchData('/mocks/UserTemplates.json');

  const {
    data: generalTemplatesData,
    error: generalTemplatesError,
    loading: generalTemplatesLoading,
  } = useFetchData('/mocks/GeneralTemplates.json');

  const toggleStatus = (status: string) => {
    setSelectedStatuses((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    );
  };

  return (
    <Container fluid py="md">
      <Title order={2} mb="md">
        {t('nav.templates')}
      </Title>
      <Card p="lg" radius="md" >
        <Stack>
          <Group justify="space-between" wrap="wrap">
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Button fw={400} variant="default" rightSection={<IconChevronDown size={14} />}>
                  {t('templates.filter_status')}
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                <Stack px="sm" py="xs">
                  {statuses.map((s) => (
                    <Checkbox
                      key={s.value}
                      label={t(`templates.statuses.${s.value}`)}
                      checked={selectedStatuses.includes(s.value)}
                      onChange={() => toggleStatus(s.value)}
                    />
                  ))}
                </Stack>
              </Menu.Dropdown>
            </Menu>

            <TextInput
              placeholder={t('templates.search')}
              value={search}
              onChange={(e) => setSearch(e.currentTarget.value)}
              leftSection={<IconSearch size={16} />}
            />

            <Button component="a" href={`${PATH_APPS.templates}/add`}>
              <Group gap={5}>
                <IconPlus size={15} />
                <span>{t('templates.new')}</span>
              </Group>
            </Button>
          </Group>
          <Tabs value={tab} onChange={setTab}>
            <Tabs.List>
              <Tabs.Tab value="user">{t('templates.user_templates')}</Tabs.Tab>
              <Tabs.Tab value="general">{t('templates.general_templates')}</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="user" >
              <UserTemplatesTable
                data={userTemplatesData}
                error={userTemplatesError}
                loading={userTemplatesLoading}
                search={search}
                filter={selectedStatuses}
              />
            </Tabs.Panel>
            <Tabs.Panel value="general">
              <GeneralTemplatesTable
                data={generalTemplatesData}
                error={generalTemplatesError}
                loading={generalTemplatesLoading}
                search={search}
                filter={selectedStatuses}
              />
            </Tabs.Panel>
          </Tabs>
        </Stack>
      </Card>
    </Container>
  );
}
