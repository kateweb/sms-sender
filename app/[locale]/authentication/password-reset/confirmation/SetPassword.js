import React from 'react';
import { useTranslations } from 'next-intl';
import { Button, Group, PasswordInput, rem, Stack, Text, TextInput, UnstyledButton } from '@mantine/core';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import classes from '@/app/[locale]/authentication/auth.module.css';
import * as Yup from 'yup';
import Link from 'next/link';
import { PATH_AUTH } from '@/routes';
import { IconChevronLeft } from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';
import { useLocale } from '@/contexts/LocaleContext';


export default function SetPassword({ onSubmitPassword, isSubmitting: submittingFromParent, isSubmitted }) {
  const t = useTranslations();
  const { locale } = useLocale();
  const mobile_match = useMediaQuery('(max-width: 425px)');
  const validationSchema = Yup.object().shape({
    login: Yup.string().required(t('errors.required')),
    password: Yup.string()
      .min(8, t('errors.password.min', { min: 8 }))
      .matches(/[A-Z]/, t('errors.password.uppercase'))
      .matches(/\d/, t('errors.password.number'))
      .required(t('errors.required')),
    confirm_password: Yup.string()
      .oneOf([Yup.ref('password')], t('errors.password.confirm_password'))
      .required(t('errors.required')),
  });

  return (
    <div>
      {!isSubmitted ? (
      <Formik
        initialValues={{login: '', password: ''}}
        validationSchema={validationSchema}
        onSubmit={onSubmitPassword}
      >
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
            <div className="form-control mb-3 mt-4">
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
            <div className="form-control mb-3">
              <Field
                as={PasswordInput}
                name="confirm_password"
                label={t('reg.confirm_password')}
                placeholder={t('reg.confirm_password')}
                required
                classNames={{ label: classes.label }}
              />
              <ErrorMessage name="confirm_password" component="p" className="text-error" />
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
        <Text size="md" ta="center" className="forgot-password-confirmation" style={{ opacity: 1 }}>
          {t(`password.set_password_confirmation_text`)}
        </Text>
      )}
    </div>
  );
}
