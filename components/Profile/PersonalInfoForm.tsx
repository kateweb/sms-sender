'use client';

import {
  TextInput,
  Button,
  Text,
  Container,
  Input, Fieldset, Tooltip
} from '@mantine/core';
import { IconAt, IconCheck } from '@tabler/icons-react';
import { useState } from 'react';

import classes from './PersonalInfoForm.module.css';

import { en, ru, uk  } from "intl-tel-input/i18n";
import IntlTelInput from "intl-tel-input/reactWithUtils";
import { useTranslations } from 'next-intl';

import "intl-tel-input/styles";
import { useLocale } from '@/contexts/LocaleContext';

export default function PersonalInfoForm() {
  const t = useTranslations();
  const { locale } = useLocale();
  const phoneI18n = { uk, ru, en };
  const [phone, setPhone] = useState('+380634461629');
  const [email, setEmail] = useState('k.burlachenko@treeum.net');
  const [name, setName] = useState('Kate');
  const [surname, setSurname] = useState('Kucherenko');

  return (
    <Container
      size="xs"
      px="0"
      py={{ base: 0, xs: 'xl' }}
    >
      <Fieldset
        legend={t('profile.personal_info')}
        pb={{ base: 0, xs: 'lg' }}
        px={{ base: 0, xs: 'lg' }}
        classNames={{root: classes.fieldset }}
      >
        <TextInput
          label={t('phonebook.name')}
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          radius="md"
          mb="sm"
        />
        <TextInput
          label={t('phonebook.surname')}
          value={surname}
          onChange={(e) => setSurname(e.currentTarget.value)}
          radius="md"
          mb="sm"
        />
        <Input.Wrapper
          label={t('sms.phone_number')}
          classNames={{ label: classes.label }}
        >
          <div style={{ position: 'relative' }}>
            <IntlTelInput
              initialValue={phone}
              initOptions={{
                initialCountry: 'ua',
                excludeCountries: ['ru', 'by'],
                separateDialCode: false,
                formatOnDisplay: false,
                i18n: phoneI18n[locale as keyof typeof phoneI18n] || en
              }}
              inputProps={{
                placeholder: '631234567',
                className: classes.input
              }}

            />
            <Tooltip label={t('profile.phone_verified')} withArrow position="top">
              <IconCheck
                size={20}
                color="green"
                style={{
                  position: 'absolute',
                  right: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 10,
                  cursor: 'default',
                }}
              />
            </Tooltip>
          </div>
        </Input.Wrapper>
        <Text size="xs" c="dimmed" mt={4} mb="sm">
          {t('profile.confidentiality_phone_info')}
        </Text>
        <TextInput
          leftSection={<IconAt size={16} stroke={1.5} />}
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          radius="md"
          rightSection={
            <Tooltip label={t('profile.email_verified')} withArrow position="top">
              <IconCheck size={20} color="green" />
            </Tooltip>
          }
        />
        <Text size="xs" c="dimmed" mt={4}>
          {t('profile.confidentiality_email_info')}
        </Text>
        <Button mt="md" radius="md">
          {t('save')}
        </Button>
      </Fieldset>
    </Container>
  );
}
