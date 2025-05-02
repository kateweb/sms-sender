'use client';

import {
  Button,
  Center,
  Checkbox,
  Group,
  PasswordInput,
  Text,
  TextInput,
  TextProps,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import AuthLayout from '@/components/AuthLayout/AuthLayout';
import { PATH_AUTH } from '@/routes';

import classes from '../auth.module.css';

const LINK_PROPS: TextProps = {
  className: classes.link,
};

function Page() {
  const t = useTranslations();
  const form = useForm({
    validate: {
      email: (value: string) => (/^\S+@\S+$/.test(value) ? null : t('errors.email.invalid')),
      password: (value: string) =>
        value && value?.length < 6
          ? t('errors.password.min', {min: 6})
          : null,
    },
  });

  return (
    <AuthLayout heading={t('login.welcome_back')} subheading={t('login.login_title')}>
      <form
        onSubmit={form.onSubmit(() => {
        })}
      >
        <TextInput
          label="Email"
          placeholder="example@gmail.com"
          required
          classNames={{ label: classes.label }}
          {...form.getInputProps('email')}
        />
        <PasswordInput
          label={t('login.password')}
          placeholder={t('login.your_password')}
          required
          mt="md"
          classNames={{ label: classes.label }}
          {...form.getInputProps('password')}
        />
        <Group justify="space-between" mt="lg">
          <Checkbox
            label={t('login.remember_me')}
            classNames={{ label: classes.label }}
          />
          <Text
            component={Link}
            href={PATH_AUTH.passwordReset}
            size="sm"
            {...LINK_PROPS}
          >
            {t('login.forgot_password')}
          </Text>
        </Group>
        <Button fullWidth mt="xl" type="submit">
          {t('login.login_now')}
        </Button>
      </form>
      <Center mt="md">
        <Text
          fz="sm"
          ta="center"
        >
          {t('login.dont_have_account')}
        </Text>
      </Center>
      <Center>
        <Text
          fz="sm"
          ta="center"
          component={Link}
          href={PATH_AUTH.signup}
          {...LINK_PROPS}
        >
          {t('login.join_free_today')}
        </Text>
      </Center>
    </AuthLayout>
  );
}
export default Page;
