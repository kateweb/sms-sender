'use client';

import {
  TextInput,
  Button,
  Container,
  Fieldset, Select
} from '@mantine/core';

import { useState } from 'react';
import classes from './PersonalInfoForm.module.css';
import { useTranslations } from 'next-intl';
import "intl-tel-input/styles";
import { useLocale } from '@/contexts/LocaleContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { usePathname } from '@/i18n/routing';

export default function PersonalInfoForm() {
  const t = useTranslations();
  const { locale } = useLocale();

  const [login, setLogin] = useState('kateweb');
  const [language, setLanguage] = useState(locale);

  const languageOptions = [
    { value: 'uk', label: t('profile.language.uk') },
    { value: 'ru', label: t('profile.language.ru') },
    { value: 'en', label: t('profile.language.en') },
  ];

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();
  let hash = '';
  if (typeof window !== 'undefined') {
    hash = window.location.hash || '';
  }
  const fullPath = queryString ? `${pathname}?${queryString}${hash}` : `${pathname}${hash}`;

  const handleLanguageChange = async (newLocale: string | null) => {
    if (!newLocale) return;
    router.push(`/${newLocale.toLowerCase()}${fullPath}`);
  };

  return (
    <Container
      size="xs"
      px="0"
      py={{ base: 0, xs: 'xl' }}
    >
      <Fieldset
        legend={t('profile.account')}
        pb={{ base: 0, xs: 'lg' }}
        px={{ base: 0, xs: 'lg' }}
        classNames={{root: classes.fieldset }}
      >
        <TextInput
          label={t('reg.username')}
          value={login}
          onChange={(e) => setLogin(e.currentTarget.value)}
          radius="md"
          mb="sm"
        />
        <Select
          label={t('profile.language.title')}
          value={language}
          onChange={(val) => {
            setLanguage(val || '');
            handleLanguageChange(val);
          }}
          data={languageOptions}
          searchable
        />
        <Button mt="md" radius="md">
          {t('save')}
        </Button>
      </Fieldset>
    </Container>
  );
}
