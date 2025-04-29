import { Center, Loader, Stack, Text } from '@mantine/core';
import { useTranslations } from 'next-intl';

export default function Loading() {
  const t = useTranslations();
  return (
    <Center pt={80}>
      <Stack align="center">
        <Loader />
        <Text>{t('loading')}...</Text>
      </Stack>
    </Center>
  );
}
