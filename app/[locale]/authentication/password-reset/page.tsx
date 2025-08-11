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
import { useState } from 'react';

import { PATH_AUTH } from '@/routes';

import AuthLayout from '@/components/AuthLayout/AuthLayout';
import { useLocale } from '@/contexts/LocaleContext';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import classes from '@/app/[locale]/authentication/auth.module.css';
import React from 'react';

function Page() {
  const mobile_match = useMediaQuery('(max-width: 425px)');
  const { locale } = useLocale();
  const t = useTranslations();

  const validationSchema = Yup.object().shape({
    login: Yup.string().required(t('errors.required')),
  });
  const handleSubmit = async (values, { setErrors }) => {
    try {
      const response = await fetch('/api/password-recovery/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
        }),
      });
      if (response.status === 200) {
        // @ts-ignore
        document.querySelector('.forgot-password-form').classList.add('opacity-0', 'h-px')
        // @ts-ignore
        document.querySelector('.forgot-password-confirmation').classList.replace("opacity-0", "opacity-100");
      }
    } catch (error:any) {
      if(error.response.data.errors) {
        error.response.data.errors.forEach(error => {
          if (error && error.includes('not found')) {
            toast.error(t('Activate.errors.user_not_found'))
          } else {
            toast.error(error);
          }
        });
      } else {
        toast.error(t('Auth.errors.server_error'));
      }
    }
  };

  return (
    <AuthLayout heading={t('password.forgot')} subheading={t('password.reset_text')}>
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
              >
                {t('password.reset')}
              </Button>
            </Group>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
}

export default Page;
