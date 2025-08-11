import {
  Loader, Stack,
} from '@mantine/core';

import AuthLayout from '@/components/AuthLayout/AuthLayout';
import ActivateClient from './ActivateClient';
import { redirect } from 'next/navigation';

async function fetchActivationToken(searchParams: any, locale: string) {
  const token = searchParams.token;
  if (!token) {
    return "no_token_provided";
  }
  const data = {
    activationToken: token,
  };
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/activate`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const contentType = res.headers.get('content-type');

  if (!contentType?.includes('application/json')) {
    return 'activation_failed';
  }
  const resData = await res.json();

  if (res.ok) {
    redirect(`/${locale}/authentication/signin`);
  } else {
    return resData.errors?.toString().toLowerCase().replace(/\s+/g, '_') || "activation_failed";
  }
}

type PageProps = {
  searchParams: { token?: string };
  params: { locale: string };
};

export default async function Activate({ searchParams, params }: PageProps) {
  const locale = params.locale;
  const error = await fetchActivationToken(searchParams, locale);
  return (
    <AuthLayout>
      <Stack align="center">
        <ActivateClient error={error} />
      </Stack>
    </AuthLayout>
  );
}
