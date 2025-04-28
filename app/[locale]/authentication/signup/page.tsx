'use client';

import {
  Button,
  Input,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { en, ru, uk  } from "intl-tel-input/i18n";
import IntlTelInput from "intl-tel-input/reactWithUtils";
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import "intl-tel-input/styles";

import { Surface } from '@/components';
import { useLocale } from '@/contexts/LocaleContext';
import { PATH_AUTH, PATH_DASHBOARD } from '@/routes';

import classes from '../auth.module.css';

function Page() {
  const t = useTranslations();
  const { locale } = useLocale();
  const phoneI18n = { uk, ru, en };
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
    <>
      <>
        <title>{t('reg.title')}</title>
        <meta
          name="description"
          content={t('reg.title')}
        />
      </>
      <div className={classes.wrapper}>
        <div className={classes.leftSection} />
        <div className={classes.rightSection}>
          <div>
            <Title ta="center">{t('reg.title')}</Title>
            <Text ta="center">{t('reg.reg_text')}</Text>

            <Surface component={Paper} className={classes.card}>
              <form
                onSubmit={form.onSubmit(() => {
                })}
              >
                <TextInput
                  label={t('reg.username')}
                  placeholder="username"
                  required
                  classNames={{ label: classes.label }}
                />
                <TextInput
                  label="Email"
                  placeholder="example@gmail.com"
                  required
                  mt="md"
                  classNames={{ label: classes.label }}
                  {...form.getInputProps('email')}
                />
                <Input.Wrapper
                  label={t('reg.phone')}
                  required
                  mt="md"
                  classNames={{ label: classes.label }}
                >
                  <IntlTelInput
                    initOptions={{
                      initialCountry: 'ua',
                      excludeCountries: ["ru", "by"],
                      separateDialCode: true,
                      i18n: phoneI18n[locale as keyof typeof phoneI18n] || en
                    }}
                    inputProps={{
                      placeholder: '63 123 4567',
                      className: classes.input,
                    }}
                  />
                </Input.Wrapper>
                <PasswordInput
                  label={t('login.password')}
                  placeholder={t('login.your_password')}
                  required
                  mt="md"
                  classNames={{ label: classes.label }}
                  {...form.getInputProps('password')}
                />
                <PasswordInput
                  label={t('reg.confirm_password')}
                  placeholder={t('reg.confirm_password')}
                  required
                  mt="md"
                  classNames={{ label: classes.label }}
                  {...form.getInputProps('confirm_password')}
                />
                <Button
                  fullWidth
                  mt="xl"
                  type="submit"
                >
                  {t('reg.submit')}
                </Button>
              </form>
              <Button
                fullWidth
                variant="outline"
                mt="sm"
                component={Link}
                href={PATH_AUTH.signin}
              >
                {t('reg.have_account')}
              </Button>
            </Surface>
          </div>
        </div>
      </div>
    </>
);
}

export default Page;
