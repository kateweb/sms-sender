'use client';

import {
  ActionIcon,
  Burger,
  Group,
  Tooltip,
} from '@mantine/core';
import {
  IconCash,
  IconPower,
} from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import { SidebarState } from '@/app/[locale]/apps/layout';
import { LanguagePicker } from '@/components';
import ThemeSwitcher from '@/components/ThemeSwitcher/ThemeSwitcher';
import { useLocale } from '@/contexts/LocaleContext';
import classes from '@/components/LanguagePicker/LanguagePicker.module.css';

const ICON_SIZE = 20;
type HeaderNavProps = {
  mobileOpened?: boolean;
  toggleMobile?: () => void;
  sidebarState: SidebarState;
  onSidebarStateChange: () => void;
};

const HeaderNav = (props: HeaderNavProps) => {
  const { toggleMobile, mobileOpened, onSidebarStateChange } = props;
  const { locale } = useLocale();
  const t = useTranslations();
  return (
    <Group justify="space-between">
      <Group gap={0}>
        <Tooltip label={t('menu.toggle_sidebar')}>
          <Burger visibleFrom="md" size="sm" onClick={onSidebarStateChange} />
        </Tooltip>
        <Burger
          opened={mobileOpened}
          onClick={toggleMobile}
          hiddenFrom="md"
          size="sm"
        />
      </Group>
      <Group>
        <Tooltip label={t('menu.balance')}>
          <ActionIcon size="lg" title={t('menu.balance')} className={classes.balance_button}>
            <IconCash size={ICON_SIZE} className={classes.lang_icon}/>
            41560,11 {t('menu.uah')}
          </ActionIcon>
        </Tooltip>
        <LanguagePicker type="collapsed" locale={locale} />
        <ThemeSwitcher />
        <Tooltip label={t('menu.logout')}>
          <ActionIcon>
            <IconPower size={ICON_SIZE} />
          </ActionIcon>
        </Tooltip>
      </Group>
    </Group>
  );
};

export default HeaderNav;
