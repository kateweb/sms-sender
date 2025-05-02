'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { ActionIcon, Group, Menu, Tooltip } from '@mantine/core';
import { IconChevronDown, IconWorld } from '@tabler/icons-react';

import { usePathname } from '@/i18n/routing';
import { useLocale } from '@/contexts/LocaleContext';
import classes from './LanguagePicker.module.css';

const data = [
  { label: 'UK' },
  { label: 'EN' },
  { label: 'RU' },
];

const ICON_SIZE = 20;

type LanguagePickerProps = {
  type: 'collapsed' | 'expanded';
};

const LanguagePicker = ({ type }: LanguagePickerProps) => {
  const router = useRouter();
  const pathname = usePathname(); // Custom hook to get current path
  const searchParams = useSearchParams();
  const { locale } = useLocale();
  const t = useTranslations();

  const queryString = searchParams.toString();
  const fullPath = queryString ? `${pathname}?${queryString}` : pathname;

  const currentLocale = pathname.split('/')[1] || 'uk';

  const [selected, setSelected] = useState(
    data.find((lang) => lang.label.toLowerCase() === currentLocale.toLowerCase()) || data[0]
  );

  useEffect(() => {
    setSelected(
      data.find((lang) => lang.label.toLowerCase() === locale.toLowerCase()) || data[0]
    );
  }, [locale]);

  const handleLocaleChange = async (newLocale: string) => {
    const found = data.find((item) => item.label.toLowerCase() === newLocale);
    setSelected(found ?? { label: newLocale.toUpperCase() });
    router.push(`/${newLocale.toLowerCase()}${fullPath}`);
  };
  const items = data.map((item) => (
    <Menu.Item
      key={item.label}
      onClick={() => handleLocaleChange(item.label.toLowerCase())}
    >
      {item.label}
    </Menu.Item>
  ));

  return (
    <Menu
      radius="sm"
      withinPortal
      width={200}
    >
      <Menu.Target>
        <Tooltip label={t('menu.switch_language')}>
          <ActionIcon size="lg" className={classes.lang_button}>
            <IconWorld size={ICON_SIZE}  className={classes.lang_icon} />
            <Group gap="xs">
              {selected.label}
              {type === 'expanded' && (
                <span className={classes.label}>{selected.label}</span>
              )}
            </Group>
            {type === 'expanded' && (
              <IconChevronDown
                size="1rem"
                className={classes.icon}
                stroke={1.5}
              />
            )}
          </ActionIcon>
        </Tooltip>
      </Menu.Target>
      <Menu.Dropdown>{items}</Menu.Dropdown>
    </Menu>
  );
};

export default LanguagePicker;
