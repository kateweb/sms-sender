import React from 'react';
import { useTranslations } from 'next-intl';
import { Text } from '@mantine/core';

export default function ActivateClient({ error }) {
  const t = useTranslations();
  return (
    <Text size="md" ta="center">
      {t(`activate.errors.${error}`)}
    </Text>
  );
}
