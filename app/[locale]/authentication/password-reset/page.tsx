'use client';

import React from 'react';

import {
  Button,
  Group,
  Paper,
  Text,
  TextInput,
  Title,
  UnstyledButton,
  rem,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMediaQuery } from '@mantine/hooks';
import { IconChevronLeft } from '@tabler/icons-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { Surface } from '@/components';
import { PATH_AUTH } from '@/routes';

import classes from '../auth.module.css';

function Page() {
  const mobile_match = useMediaQuery('(max-width: 425px)');
  const t = useTranslations();
  const form = useForm({
    initialValues: {
      email: '',
    },
    validate: {
      email: (value: string) => (/^\S+@\S+$/.test(value) ? null : t('errors.email.invalid')),
    },
  });
  return (
    <>
      <>
        <title>{t('password.reset')}</title>
        <meta
          name="description"
          content={t('password.forgot')}
        />
      </>
      <div className={classes.wrapper}>
        <div className={classes.leftSection} />
        <div className={classes.rightSection}>
          <div>
            <Title className={classes.title}  ta="center">{t('password.forgot')}</Title>
            <Text ta="center">{t('password.reset_text')}</Text>
            <Surface component={Paper} className={classes.card}>
              <form
                onSubmit={form.onSubmit(() => {
                })}
              >
                <TextInput
                  label="Email"
                  placeholder="example@gmail.com"
                  required
                  {...form.getInputProps('email')}/>
                <Group justify="space-between" mt="lg" >
                  <UnstyledButton
                    component={Link}
                    href={PATH_AUTH.signin}
                    color="dimmed"
                  >
                    <Group gap={2} align="center">
                      <IconChevronLeft
                        stroke={1.5}
                        style={{ width: rem(14), height: rem(14) }}
                      />
                      <Text size="sm" ml={5}>
                        {t('password.back_to_login')}
                      </Text>
                    </Group>
                  </UnstyledButton>
                  <Button
                    fullWidth={mobile_match}
                    type="submit"
                  >
                    {t('password.reset')}
                  </Button>
                </Group>
              </form>
            </Surface>
          </div>
        </div>
      </div>
    </>
);
}

export default Page;
