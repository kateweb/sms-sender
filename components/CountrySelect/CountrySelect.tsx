'use client';

import { useEffect, useState } from 'react';
import { Select, SelectProps } from '@mantine/core';
import { useLocale } from '@/contexts/LocaleContext';
import countries from 'i18n-iso-countries';
import uk from 'i18n-iso-countries/langs/uk.json';
import en from 'i18n-iso-countries/langs/en.json';
import ru from 'i18n-iso-countries/langs/ru.json';
import { useTranslations } from 'next-intl';

countries.registerLocale(en);
countries.registerLocale(uk);
countries.registerLocale(ru);

const getCountryOptions = (lang: 'uk' | 'en' | 'ru' = 'uk') => {
  const countryNames = countries.getNames(lang, { select: 'official' });
  return Object.entries(countryNames).map(([code, name]) => ({
    value: code,
    label: name,
  }));
};

type CountrySelectProps = {
  labelProps?: SelectProps['labelProps'];
  withAsterisk?: boolean;
  required?: boolean;
};

export default function CountrySelect({ labelProps, withAsterisk = false, required = false }: CountrySelectProps) {
  const [options, setOptions] = useState<{ value: string; label: string }[]>([]);
  const { locale } = useLocale();
  const t = useTranslations();

  useEffect(() => {
    const localizedCountries = getCountryOptions(locale as 'uk' | 'en' | 'ru');
    setOptions(localizedCountries);
  }, [locale]);

  return (
    <Select
      label={t('report.country')}
      placeholder={t('report.choose_country')}
      searchable
      data={options}
      maxDropdownHeight={300}
      labelProps={labelProps}
      withAsterisk={withAsterisk}
      required={required}
    />
  );
}
