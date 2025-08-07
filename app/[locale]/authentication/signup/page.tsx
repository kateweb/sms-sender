'use client';

import { useTranslations } from 'next-intl';
import { useLocale } from '@/contexts/LocaleContext';
import AuthLayout from '@/components/AuthLayout/AuthLayout';
import { PATH_AUTH } from '@/routes';

import { TextInput, PasswordInput, Button, Input } from '@mantine/core';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import type { FormikHelpers } from 'formik';

import * as Yup from 'yup';
import Link from 'next/link';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';

import classes from '../auth.module.css';
import dynamic from 'next/dynamic';

export default function Page() {
  const t = useTranslations();
  const { locale } = useLocale();
  const router = useRouter();
  const PhoneInput = dynamic(() => import('@/components/PhoneInput/PhoneInput'), {
    ssr: false,
  });

  interface FormValues {
    login: string;
    name: string;
    surname: string;
    email: string;
    phone: string;
    password: string;
    confirm_password: string;
  }

  const validationSchema = Yup.object().shape({
    login: Yup.string().required(t('errors.required')),
    name: Yup.string().required(t('errors.required')),
    surname: Yup.string().required(t('errors.required')),
    email: Yup.string().email(t('errors.email.invalid')).required(t('errors.required')),
    phone: Yup.string()
      .required(t('errors.required'))
      .matches(/^\d+$/, t('errors.phone.invalid'))
      .max(13, t('errors.max_length', { max: 13 })),
    password: Yup.string()
      .min(8, t('errors.password.min', { min: 8 }))
      .matches(/[A-Z]/, t('errors.password.uppercase'))
      .matches(/\d/, t('errors.password.number'))
      .required(t('errors.required')),
    confirm_password: Yup.string()
      .oneOf([Yup.ref('password')], t('errors.password.confirm_password'))
      .required(t('errors.required')),
  });

  const handleSubmit = async (
    values: FormValues,
    { setErrors }: FormikHelpers<FormValues>
  ) => {
    try {
      const response = await fetch('/api/registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          locale,
        }),
      });

      if (response.status === 200) {
        const data = await response.json(); // получи сообщение от API
        notifications.show({
          message: data.message || t('reg.registration_success'),
          color: 'green',
        });
        setTimeout(() => {
          router.push('/authentication/confirmation');
        }, 2000);
        return;
      } else {
        const data = await response.json();
        if (response.status === 400 && data.message) {
          notifications.show({
            message: data.message,
            color: 'red',
          });
          return;
        }
        if (data.errors && typeof data.errors === 'object') {
          const fieldErrors: Partial<Record<keyof FormValues, string>> = {};
          Object.entries(data.errors).forEach(([field, messages]) => {
            if (Array.isArray(messages) && messages.length > 0) {
              fieldErrors[field as keyof FormValues] = messages[0];
            }
          });
          setErrors(fieldErrors);
        } else {
          notifications.show({
            message: data.message || t('errors.server_error'),
            color: 'red',
          });
        }
      }
    } catch (error: any) {
      notifications.show({
        message: t('errors.server_error'),
        color: 'red',
      });
    }
  };

  return (
    <AuthLayout heading={t('reg.title')} subheading={t('reg.reg_text')}>
      <Formik
        initialValues={{
          login: '',
          name: '',
          surname: '',
          email: '',
          phone: '',
          password: '',
          confirm_password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue, errors, touched }) => (
          <Form>
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
            <div className="form-control mb-3">
              <Field
                as={TextInput}
                name="name"
                label={t('reg.name')}
                placeholder={t('reg.your_name')}
                required
                classNames={{ label: classes.label }}
              />
              <ErrorMessage name="name" component="p" className="text-error" />
            </div>
            <div className="form-control mb-3">
              <Field
                as={TextInput}
                name="surname"
                label={t('reg.surname')}
                placeholder={t('reg.your_surname')}
                required
                classNames={{ label: classes.label }}
              />
              <ErrorMessage name="surname" component="p" className="text-error" />
            </div>

            <div className="form-control mb-3">
              <Field
                as={TextInput}
                name="email"
                label="Email"
                placeholder="example@gmail.com"
                required
                classNames={{ label: classes.label }}
              />
              <ErrorMessage name="email" component="p" className="text-error" />
            </div>

            <PhoneInput locale={locale} setFieldValue={setFieldValue} />

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

            <Button fullWidth mt="xl" type="submit" loading={isSubmitting}>
              {t('reg.submit')}
            </Button>
          </Form>
        )}
      </Formik>

      <Button
        fullWidth
        variant="outline"
        mt="sm"
        component={Link}
        href={`/${locale}${PATH_AUTH.signin}`}
      >
        {t('reg.have_account')}
      </Button>
    </AuthLayout>
  );
}
