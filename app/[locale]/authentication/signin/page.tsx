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
import React, { useState } from "react";
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { signIn } from "next-auth/react";

import AuthLayout from '@/components/AuthLayout/AuthLayout';
import { PATH_AUTH } from '@/routes';

import classes from '../auth.module.css';
import { useLocale } from '@/contexts/LocaleContext';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { notifications } from '@mantine/notifications';

const LINK_PROPS: TextProps = {
  className: classes.link,
};

function Page() {
  const t = useTranslations();
  const { locale } = useLocale();
  const router = useRouter();
  const [pending, setPending] = useState(false);

  const validationSchema = Yup.object().shape({
    username: Yup.string().required(t('errors.required')),
    password: Yup.string()
      .min(8, t('errors.password.min', { min: 8 }))
      .matches(/[A-Z]/, t('errors.password.uppercase'))
      .matches(/\d/, t('errors.password.number'))
      .required(t('errors.required')),
  });

  const loginFormSubmitted = async (values:any) => {
    setPending(true);
    try {
      const res = await signIn('credentials', {
        redirect: false,
        username: values.username,
        password: values.password,
        locale
      });
      if (res?.error) {
        notifications.show({
          message: res.error,
          color: 'red',
        });
        setPending(false);
      } else {
        setPending(false);
        router.push(`/${locale}/dashboard/default`);
      }
    } catch (error) {
      console.error("Login error:", error);
      setPending(false);
    }
  };

  return (
    <AuthLayout heading={`${t('login.welcome_back')}!`} subheading={t('login.login_title')}>
      <Formik
        initialValues={{username: '', password: '', rememberMe: false}}
        validationSchema={validationSchema}
        onSubmit={loginFormSubmitted}>
        {({isSubmitting}) => (
          <Form className="w-full">
            <div className="form-control mb-3">
              <Field
                as={TextInput}
                name="username"
                label={t('reg.username')}
                placeholder={t('reg.enter_username')}
                required
                classNames={{ label: classes.label }}
              />
              <ErrorMessage name="username" component="p" className="text-error" />
            </div>
            <div className="form-control">
              <Field
                as={PasswordInput}
                name="password"
                label={t('login.password')}
                placeholder={t('login.your_password')}
                required
                classNames={{ label: classes.label }}
              />
              <ErrorMessage name="password" component="p" className="text-error" />
            </div>
            <Group justify="space-between" mt="lg">
              <Field name="rememberMe">
                {({ field }: any) => (
                  <Checkbox
                    {...field}
                    label={t('login.remember_me')}
                    classNames={{ label: classes.label }}
                    checked={field.value}
                  />
                )}
              </Field>
              <Text
                component={Link}
                href={`/${locale}${PATH_AUTH.passwordReset}`}
                size="sm"
                {...LINK_PROPS}
              >
                {t('login.forgot_password')}
              </Text>
            </Group>
            <Button fullWidth mt="xl" type="submit" loading={isSubmitting}>
              {t('login.login_now')}
            </Button>
          </Form>
        )}
      </Formik>
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
          href={`/${locale}${PATH_AUTH.signup}`}
          {...LINK_PROPS}
        >
          {t('login.join_free_today')}
        </Text>
      </Center>
    </AuthLayout>
  );
}
export default Page;
