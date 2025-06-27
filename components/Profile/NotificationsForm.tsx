'use client';

import {
  Text,
  TextInput,
  Container,
  Fieldset, Stack, Group, Select, Button, Checkbox
} from '@mantine/core';

import classes from './Profile.module.css';
import { useTranslations } from 'next-intl';
import { IconBrandTelegram, IconMail } from '@tabler/icons-react';
import { useForm } from '@mantine/form';

export default function NotificationsForm() {
  const t = useTranslations();
  type Channel = 'telegram' | 'email';

  const form = useForm<{
    channels: Channel[];
    username: string;
    chatId: string;
    limit: string;
    notifications: string[];
  }>({
    initialValues: {
      channels: [],
      username: '',
      chatId: '',
      limit: '1',
      notifications: [],
    },
  });

  const isTelegram = form.values.channels.includes('telegram');

  return (
    <Container
      size="xs"
      px="0"
      py={{ base: 0, xs: 'xl' }}
    >
      <Fieldset
        legend={t('profile.notifications')}
        pb={{ base: 0, xs: 'lg' }}
        px={{ base: 0, xs: 'lg' }}
        classNames={{ root: classes.fieldset }}
      >
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <Stack gap="md">
            <Group grow classNames={{root: classes.channelGroup}}>
              <Checkbox
                classNames={{ root: classes.checkboxRoot, body: classes.checkbox, labelWrapper: classes.labelWrapper }}
                value="telegram"
                label={
                  <Group gap="xs">
                    <span>Telegram</span>
                    <IconBrandTelegram color="#8ecc4d" style={{ marginLeft: 'auto' }} />
                  </Group>
                }
                checked={form.values.channels.includes('telegram')}
                onChange={(event) => {
                  const checked = event.currentTarget.checked;
                  form.setFieldValue(
                    'channels',
                    checked
                      ? [...form.values.channels, 'telegram']
                      : form.values.channels.filter((c) => c !== 'telegram')
                  );
                }}
              />

              <Checkbox
                classNames={{ root: classes.checkboxRoot, body: classes.checkbox, labelWrapper: classes.labelWrapper  }}
                value="email"
                label={
                  <Group gap="xs">
                    <span>Email</span>
                    <IconMail color="#8ecc4d" style={{ marginLeft: 'auto' }}/>
                  </Group>
                }
                checked={form.values.channels.includes('email')}
                onChange={(event) => {
                  const checked = event.currentTarget.checked;
                  form.setFieldValue(
                    'channels',
                    checked
                      ? [...form.values.channels, 'email']
                      : form.values.channels.filter((c) => c !== 'email')
                  );
                }}
              />
            </Group>

            {isTelegram && (
              <>
                <TextInput
                  label={t('profile.telegram_username_info')}
                  description={
                    <>
                      {t('profile.start_chat')}{' '}
                      <Text
                        span
                        component="a"
                        href="https://t.me/Sms_Sender_Info_bot"
                        target="_blank"
                        c="green"
                        fz="xs"
                      >
                        https://t.me/Sms_Sender_Info_bot
                      </Text>
                    </>
                  }
                  {...form.getInputProps('username')}
                />
                <TextInput
                  label={t('profile.chat_id')}
                  description={
                    <>
                      {t('profile.get_id')}{' '}
                      <Text
                        span
                        component="a"
                        href="https://t.me/getmyid_bot"
                        target="_blank"
                        c="green"
                        fz="xs"
                      >
                        https://t.me/getmyid_bot
                      </Text>
                    </>
                  }
                  {...form.getInputProps('chatId')}
                />
              </>
            )}

            <TextInput
              label={
                <Group gap={4}>
                  <Text fz="sm" fw="500">{t('profile.balance_alert_limit')}</Text>
                  <Text fz="sm" fw="500" span c="green">₴</Text>
                </Group>
              }
              description={t('profile.set_limit')}
              {...form.getInputProps('limit')}
            />

            <Select
              label={t('profile.alerts')}
              placeholder={t('profile.select_alerts')}
              description={t('profile.select_alerts')}
              data={[
                { value: 'viber_not_transactional', label: 'Viber not transactional' },
              ]}
              {...form.getInputProps('notifications')}
            />
            <Button type="submit" w="max-content">
              {t('save')}
            </Button>
          </Stack>
        </form>
      </Fieldset>
    </Container>
  );
}
