'use client';

import {
  TextInput,
  Container,
  Fieldset
} from '@mantine/core';

import { useState } from 'react';
import classes from './Profile.module.css';
import { useTranslations } from 'next-intl';
import { useLocale } from '@/contexts/LocaleContext';
import { useMemo } from 'react';

export default function AgreementsForm() {
  const t = useTranslations();
  const { locale } = useLocale();

  const [contract, setContract] = useState('general');
  const date = new Date('2029-12-31');

  const formattedDate = useMemo(() => {
    const localesMap: Record<string, string> = {
      en: 'en-US',
      ru: 'ru-RU',
      uk: 'uk-UA',
    };

    return new Intl.DateTimeFormat(localesMap[locale], {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  }, [locale]);

  return (
    <Container
      size="xs"
      px="0"
      py={{ base: 0, xs: 'xl' }}
    >
      <Fieldset
        legend={t('profile.agreements_title')}
        pb={{ base: 0, xs: 'lg' }}
        px={{ base: 0, xs: 'lg' }}
        classNames={{root: classes.fieldset }}
      >
        <TextInput
          label={t('profile.contact_type')}
          value={t(`profile.${contract}`)}
          readOnly
          variant="filled"
          onChange={(e) => setContract(e.currentTarget.value)}
          radius="md"
          mb="sm"
        />
        <TextInput
          label={t('profile.valid_date')}
          value={formattedDate}
          readOnly
          variant="filled"
          radius="md"
          mb="sm"
        />
      </Fieldset>
    </Container>
  );
}
