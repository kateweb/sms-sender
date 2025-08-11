'use client';

import {
  Button,
  Group,
  Text,
  TextInput,
  UnstyledButton,
  rem,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconChevronLeft } from '@tabler/icons-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { PATH_AUTH } from '@/routes';

import AuthLayout from '@/components/AuthLayout/AuthLayout';
import { useLocale } from '@/contexts/LocaleContext';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import classes from '@/app/[locale]/authentication/auth.module.css';
import React, { useState } from 'react';
import { notifications } from '@mantine/notifications';

function Page() {
  const mobile_match = useMediaQuery('(max-width: 425px)');
  const { locale } = useLocale();
  const t = useTranslations();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validationSchema = Yup.object().shape({
    login: Yup.string().required(t('errors.required')),
  });
  const handleSubmit = async (values:any) => {
    try {
      const response = await fetch('/api/password-recovery/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        if (response.status === 500) {
          notifications.show({
            message: t('activate.errors.user_not_found'),
            color: 'red',
          });
          return;
        }

        if (data?.errors?.length) {
          data.errors.forEach((err: string) => {
            notifications.show({
              message: err,
              color: 'red',
            });
          });
        } else {
          notifications.show({
            message: data?.message || t('errors.server_error'),
            color: 'red',
          });
        }
      }
    } catch (error) {
      notifications.show({
        message: t('errors.server_error'),
        color: 'red',
      });
    }
  };

  return (
    <AuthLayout
      heading={!isSubmitted ? t('password.forgot') : undefined}
      subheading={!isSubmitted ? t('password.reset_text') : undefined}
    >
      {!isSubmitted ? (
      <Formik
        initialValues={{login: ''}}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        {({isSubmitting}) => (
          <Form className="w-full">
            <div className="form-control mb-3">
              <Field
                as={TextInput}
                name="login"
                label={t('reg.username')}
                placeholder={t('reg.enter_username')}
                required
                classNames={{ label: classes.label }}
              />
              <ErrorMessage name="login" component="p" className="text-error" />
            </div>
            <Group justify="space-between" mt="lg">
              <UnstyledButton
                component={Link}
                href={`/${locale}${PATH_AUTH.signin}`}
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
                loading={isSubmitting}
              >
                {t('password.reset')}
              </Button>
            </Group>
          </Form>
        )}
      </Formik>
      ) : (
        <Text size="md" ta="center">
          {t(`password.forgot_password_confirmation_text`)}
        </Text>
      )}
    </AuthLayout>
  );
}

export default Page;
