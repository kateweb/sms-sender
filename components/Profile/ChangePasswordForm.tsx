'use client';

import {
  Container,
  Fieldset, Input, PasswordInput, Button, Group
} from '@mantine/core';

import { useState } from 'react';
import classes from './Profile.module.css';
import { en, ru, uk  } from "intl-tel-input/i18n";
import IntlTelInput from "intl-tel-input/reactWithUtils";
import { useTranslations } from 'next-intl';
import "intl-tel-input/styles";
import "intl-tel-input/styles";
import { useLocale } from '@/contexts/LocaleContext';
import { useForm } from '@mantine/form';

export default function ChangePasswordForm() {
  const t = useTranslations();
  const { locale } = useLocale();
  const phoneI18n = { uk, ru, en };
  const [phone, setPhone] = useState('+380634461629');

  const form = useForm({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validate: {
      password: (value) =>
        value.length < 8 ? t('errors.password.min', {min: 8}) : null,
      confirmPassword: (value, values) =>
        value !== values.password ? t('errors.password.confirm_password') : null,
    },
  });

  return (
    <Container
      size="xs"
      px="0"
      py={{ base: 0, xs: 'xl' }}
    >
      <Fieldset
        legend={t('profile.password_title')}
        pb={{ base: 0, xs: 'lg' }}
        px={{ base: 0, xs: 'lg' }}
        classNames={{ root: classes.fieldset }}
      >
        <Input.Wrapper
          mb="sm"
          label={t('sms.phone_number')}
          classNames={{ label: classes.label }}
        >
          <Group gap="md"  classNames={{ root: classes.phoneGroup }}>
            <div style={{ flex: 1 }}>
              <IntlTelInput
                initialValue={phone}
                initOptions={{
                  initialCountry: 'ua',
                  excludeCountries: ['ru', 'by'],
                  separateDialCode: false,
                  formatOnDisplay: false,
                  i18n: phoneI18n[locale as keyof typeof phoneI18n] || en,
                }}
                inputProps={{
                  placeholder: '631234567',
                  className: classes.input,
                }}
              />
            </div>
            <Button>{t('profile.send_code')}</Button>
          </Group>
        </Input.Wrapper>
        <form onSubmit={form.onSubmit((values) => console.log('Submit:', values))}>
          <PasswordInput
            label={t('profile.new_password')}
            radius="md"
            mb="md"
            {...form.getInputProps('password')}
          />
          <PasswordInput
            label={t('profile.confirm_password')}
            radius="md"
            mb="md"
            {...form.getInputProps('confirmPassword')}
          />
          <Button type="submit">
            {t('save')}
          </Button>
        </form>
      </Fieldset>
    </Container>
);
}
