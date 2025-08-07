'use client';

import {
  Text,
} from '@mantine/core';

import { useTranslations } from 'next-intl';
import AuthLayout from '@/components/AuthLayout/AuthLayout';

function Page() {
  const t = useTranslations();
  return (
    <AuthLayout>
      <Text size="md" ta="center">
        {t('reg.confirmation')}
      </Text>
    </AuthLayout>
  );
}

export default Page;
