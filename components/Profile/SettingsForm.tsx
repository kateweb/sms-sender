'use client';

import {
  Button, Container, Fieldset,
  Group,
  Stack,
  Switch,
  Text,
  Title
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconCheck } from '@tabler/icons-react';
import classes from '@/components/Profile/Profile.module.css';
import { useTranslations } from 'next-intl';

export default function SettingsForm() {
  const t = useTranslations();
  const form = useForm({
    initialValues: {
      twoFactorAuth: false,
      showIntroTour: true,
    },
  });

  return (
    <Container
      size="xs"
      px="0"
      py={{ base: 0, xs: 'xl' }}
    >
      <Fieldset
        legend={t('profile.security_settings')}
        pb={{ base: 0, xs: 'lg' }}
        px={{ base: 0, xs: 'lg' }}
        classNames={{ root: classes.fieldset }}
      >
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <Stack gap="lg">
            <Group justify="space-between">
              <Text className={classes.switchText}>{t('profile.two_factor_auth')}</Text>
              <Switch
                size="lg"
                color="green"
                thumbIcon={
                  form.values.twoFactorAuth ? (
                    <IconCheck size={14} color="var(--mantine-primary-color-filled)" stroke={3} />
                  ) : undefined
                }
                offLabel=""
                {...form.getInputProps('twoFactorAuth', { type: 'checkbox' })}
              />
            </Group>

            <Group justify="space-between">
              <Text className={classes.switchText}>{t('profile.activate_start_tour')}</Text>
              <Switch
                size="lg"
                color="green"
                thumbIcon={
                  form.values.showIntroTour ? (
                    <IconCheck size={14} color="var(--mantine-primary-color-filled)" stroke={3} />
                  ) : undefined
                }
                offLabel=""
                {...form.getInputProps('showIntroTour', { type: 'checkbox' })}
              />
            </Group>

            <Button type="submit" w="max-content">
              {t('save')}
            </Button>
          </Stack>
        </form>
      </Fieldset>
    </Container>
  );
}
