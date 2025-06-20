'use client';

import {
  Card,
  Container,
  Group,
  Stack, Tabs, Title
} from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import {
  IconBell,
  IconFileText, IconMoneybag, IconSettings,
  IconShieldLock, IconSitemap,
  IconStack,
  IconUser,
} from '@tabler/icons-react';
import PersonalInfoForm from '@/components/Profile/PersonalInfoForm';
import AccountForm from '@/components/Profile/AccountForm';

function Profile() {
  const t = useTranslations();
  const [tab, setTab] = useState<string | null>('personal');

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      setTab(hash);
    }
  }, []);

  const handleTabChange = (newTab: string | null) => {
    if (newTab) {
      setTab(newTab);
      window.history.replaceState(null, '', `#${newTab}`);
    }
  };

  return (
    <Container fluid py="md">
      <Title order={2} mb="md">
        {t('nav.profile')}
      </Title>
      <Card p="md" radius="md">
        <Stack>
          <Group justify="space-between">
            <Tabs value={tab} onChange={handleTabChange}>
              <Tabs.List>
                <Tabs.Tab value="personal">
                  <Group gap={6} align="center">
                    <IconStack size={16} />
                    {t('profile.personal_info')}
                  </Group>
                </Tabs.Tab>
                <Tabs.Tab value="account">
                  <Group gap={6} align="center">
                    <IconUser size={16} />
                    {t('profile.account')}
                  </Group>
                </Tabs.Tab>
                <Tabs.Tab value="agreements">
                  <Group gap={6} align="center">
                    <IconFileText size={16} />
                    {t('profile.agreements')}
                  </Group>
                </Tabs.Tab>
                <Tabs.Tab value="password">
                  <Group gap={6} align="center">
                    <IconShieldLock size={16} />
                    {t('profile.change_password')}
                  </Group>
                </Tabs.Tab>
                <Tabs.Tab value="balance">
                  <Group gap={6} align="center">
                    <IconMoneybag size={16} />
                    {t('profile.balance')}
                  </Group>
                </Tabs.Tab>
                <Tabs.Tab value="notifications">
                  <Group gap={6} align="center">
                    <IconBell size={16} />
                    {t('profile.notifications')}
                  </Group>
                </Tabs.Tab>
                <Tabs.Tab value="settings">
                  <Group gap={6} align="center">
                    <IconSettings size={16} />
                    {t('profile.settings')}
                  </Group>
                </Tabs.Tab>
                <Tabs.Tab value="api">
                  <Group gap={6} align="center">
                    <IconSitemap size={16} />
                    API
                  </Group>
                </Tabs.Tab>
              </Tabs.List>
            </Tabs>
          </Group>
          <Tabs value={tab} onChange={setTab}>
            <Tabs.Panel value="personal">
              <PersonalInfoForm/>
            </Tabs.Panel>
            <Tabs.Panel value="account">
              <AccountForm/>
            </Tabs.Panel>
          </Tabs>
        </Stack>
      </Card>
    </Container>
  );
}

export default Profile;
