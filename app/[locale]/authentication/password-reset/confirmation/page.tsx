'use client';

import AuthLayout from '@/components/AuthLayout/AuthLayout';
import SetPassword from './SetPassword';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { notifications } from '@mantine/notifications';

type PageProps = {
  searchParams: { token?: string };
  params: { locale: string };
};


export default function ResetPassword({ searchParams, params }: PageProps) {
  const locale = params.locale;
  const token = searchParams.token;
  const t = useTranslations();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmitPassword = async (values:any) => {
    setIsSubmitting(true);
    if (!token) {
      notifications.show({
        message: t('activate.errors.no_token_provided'),
        color: 'red',
      });
      setIsSubmitting(false);
      return;
    }
    const dataValues = {
      token: token,
      login: values.login,
      password: values.password,
    };

    try {
      const response = await fetch(`/api/password-recovery/reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataValues),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        notifications.show({
          message: t('password.set_password_confirmation_text'),
          color: 'green',
        });
        setTimeout(() => {
          router.push(`/${locale}/authentication/signin`);
        }, 1500);
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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout heading={!isSubmitted ? t('password.enter_new_password') : undefined}>
      <SetPassword onSubmitPassword={onSubmitPassword} isSubmitting={isSubmitting} isSubmitted={isSubmitted} />
    </AuthLayout>
  );
}
