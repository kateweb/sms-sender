'use client';

import {
  ActionIcon,
  Burger, Flex,
  Group,
  Tooltip
} from '@mantine/core';
import {
  IconCash,
  IconPower,
} from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { LanguagePicker } from '@/components';
import ThemeSwitcher from '@/components/ThemeSwitcher/ThemeSwitcher';
import { useLocale } from '@/contexts/LocaleContext';
import classes from '@/components/LanguagePicker/LanguagePicker.module.css';

const ICON_SIZE = 20;
type HeaderNavProps = {
  mobileOpened?: boolean;
  toggleMobile?: () => void;
  onSidebarStateChange: () => void;
};

const HeaderNav = (props: HeaderNavProps) => {
  const { toggleMobile, mobileOpened, onSidebarStateChange } = props;
  const { locale } = useLocale();
  const router = useRouter();
  const t = useTranslations();
  const handleLogout = async () => {
    await signOut({
      redirect: false,
    });
    router.push(`/${locale}/authentication/signin`); // Redirect to login page
  };
  return (
    <Group justify="space-between" wrap="nowrap">
      <Group gap={0} visibleFrom="md">
        {/* Desktop burger */}
        <Tooltip label={t('menu.toggle_sidebar')}>
          <Burger
            visibleFrom="md"
            size="sm"
            onClick={() => {
              onSidebarStateChange();
            }}
          />
        </Tooltip>
      </Group>
      <Flex gap={{ base: "xs", sm: "sm" }} align="center" ml="auto">
        <Tooltip label={t('menu.balance')}>
          <ActionIcon size="lg" title={t('menu.balance')} className={classes.balance_button}>
            <IconCash size={ICON_SIZE} className={classes.lang_icon}/>
            41560,11 {t('menu.uah')}
          </ActionIcon>
        </Tooltip>
        <LanguagePicker type="collapsed" locale={locale} />
        <ThemeSwitcher />
        <Tooltip label={t('menu.logout')}>
          <ActionIcon onClick={handleLogout}>
            <IconPower size={ICON_SIZE} />
          </ActionIcon>
        </Tooltip>
      </Flex>
    </Group>
  );
};

export default HeaderNav;
