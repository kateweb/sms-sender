import { Modal, Button, TextInput, Input, Group, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DateInput } from '@mantine/dates';
import { en, ru, uk  } from "intl-tel-input/i18n";
import IntlTelInput from "intl-tel-input/reactWithUtils";
import type { IntlTelInputRef } from 'intl-tel-input/reactWithUtils';
import "intl-tel-input/styles";
import classes from '@/app/[locale]/apps/sms/sms.module.css';
import { useTranslations } from 'next-intl';
import { useLocale } from '@/contexts/LocaleContext';
import dayjs from 'dayjs';
import { useRef } from 'react';

export function CreatePhonebookForm({ opened, onClose, onAdd }: { opened: boolean; onClose: () => void; onAdd: (item: any) => void }) {
  const t = useTranslations();
  const phoneInputRef = useRef<IntlTelInputRef>(null);
  const { locale } = useLocale();
  const phoneI18n = { uk, ru, en };
  const form = useForm({
    initialValues: {
      phone: '',
      name: '',
      surname: '',
      birthday: null,
      extra1: '',
      extra2: '',
      valid: false,
    },
    validate: {
      phone: (value) => (!value ? t('errors.required') : null),
      name: (value) => (!value ? t('errors.required') : null),
      surname: (value) => (!value ? t('errors.required') : null),
      birthday: (value) =>
        !value ? t('errors.required') : dayjs(value).isAfter(dayjs()) ? t('errors.date.future') : null,
    },
  });

  const handleSave = () => {
    const result = form.validate();
    if (result.hasErrors) return;
    const values = form.values;
    onAdd(values);
    onClose();
  };

  const handleSaveAndAddAnother = () => {
    const result = form.validate();
    if (result.hasErrors) return;
    onAdd(form.values);
    form.reset();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={t('phonebook.create_contact')}
      styles={{
        title: { fontWeight: 600, fontSize: 22 },
      }}
      size="lg"
      padding="xl">
      <form onSubmit={form.onSubmit(handleSave)}
      >
        <Stack gap="sm">
          <Input.Wrapper
            label={t('reg.phone')}
            required
            description={t('sms.phone_number_desc')}
            classNames={{
              label: classes.label,
              description: classes.description,
            }}
          >
            <IntlTelInput
              ref={phoneInputRef}
              initOptions={{
                initialCountry: 'ua',
                excludeCountries: ['ru', 'by'],
                separateDialCode: true,
                i18n: phoneI18n[locale as keyof typeof phoneI18n] || en,

              }}
              inputProps={{
                placeholder: '631234567',
                className: classes.input,
                name: 'phone',
                onBlur: () => {
                  const fullNumber = phoneInputRef.current?.getInstance()?.getNumber() || '';
                  form.setFieldValue('phone', fullNumber);
                  form.validateField('phone');
                }
              }}

            />
          </Input.Wrapper>
          <TextInput
            label={t('phonebook.name')}
            description={`${t('errors.max')} - 30`}
            maxLength={30}
            required
            {...form.getInputProps('name')}
          />
          <TextInput
            label={t('phonebook.surname')}
            required
            description={`${t('errors.max')} - 30`}
            maxLength={30}
            {...form.getInputProps('surname')}
          />

          <DateInput
            label={t('phonebook.birthday')}
            required
            placeholder={t('phonebook.dd_mm_yyyy')}
            description={t('errors.date.future')}
            valueFormat="DD.MM.YYYY"
            {...form.getInputProps('birthday')}
          />

          <TextInput
            label={t('phonebook.extra_info')}
            description={`${t('errors.max')} - 30`}
            maxLength={30}
            {...form.getInputProps('extra1')}
          />

          <TextInput
            label={`${t('phonebook.extra_info')} 2`}
            description={`${t('errors.max')} - 30`}
            maxLength={30}
            {...form.getInputProps('extra2')}
          />
        </Stack>

        <Group justify="space-between" mt="xl">
          <Group>
            <Button type="submit">{t('save')}</Button>
            <Button
              type="submit"
              variant="outline"
              onClick={(e) => {
                e.preventDefault()
                handleSaveAndAddAnother();
              }}
            >
              {t('phonebook.save_and_add')}
            </Button>
          </Group>
          <Button variant="subtle" onClick={onClose}>
            {t('close')}
          </Button>
        </Group>
      </form>
    </Modal>
  );
}
