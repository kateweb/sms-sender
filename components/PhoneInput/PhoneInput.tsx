'use client';

import { useRef, useEffect } from 'react';
import { ErrorMessage } from 'formik';
import { Input } from '@mantine/core';
import { en, ru, uk } from "intl-tel-input/i18n";
import IntlTelInput from "intl-tel-input/reactWithUtils";
import type { IntlTelInputRef } from 'intl-tel-input/reactWithUtils';
import "intl-tel-input/styles";

import classes from '@/app/[locale]/authentication/auth.module.css';

interface Props {
  locale: string;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}

const PhoneInput = ({ locale, setFieldValue }: Props) => {
  const phoneInputRef = useRef<IntlTelInputRef>(null);

  const phoneI18n = { uk, ru, en };

  return (
    <Input.Wrapper
      label="Телефон"
      required
      mb="md"
      classNames={{ label: classes.label }}
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
          placeholder: '63 123 4567',
          className: classes.input,
          onBlur: () => {
            const phone = phoneInputRef.current?.getInstance()?.getNumber() || '';
            const digitsOnly = phone.replace(/\D/g, '');
            setFieldValue('phone', digitsOnly);
          }
        }}
      />
      <ErrorMessage name="phone" component="p" className="text-error" />
    </Input.Wrapper>
  );
};

export default PhoneInput;
