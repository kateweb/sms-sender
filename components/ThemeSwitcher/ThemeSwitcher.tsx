'use client';

import {
  ActionIcon,
  Menu,
  Tooltip,
} from '@mantine/core';
import {
  IconCircleHalf2,
  IconMoonStars,
  IconSunHigh,
} from '@tabler/icons-react';
import { useState, useEffect } from 'react';
import { useMantineColorScheme } from '@mantine/core';
import { useTranslations } from 'next-intl';

const ICON_SIZE = 20;

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { setColorScheme, colorScheme } = useMantineColorScheme();
  const t = useTranslations();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  const icon =
    colorScheme === 'auto' ? (
      <IconCircleHalf2 size={ICON_SIZE} />
    ) : colorScheme === 'dark' ? (
      <IconMoonStars size={ICON_SIZE} />
    ) : (
      <IconSunHigh size={ICON_SIZE} />
    );

  return (
    <Menu shadow="lg" width={200}>
      <Menu.Target>
        <Tooltip label={t('menu.switch_color_theme')}>
          <ActionIcon size="lg" aria-label={t('menu.switch_color_theme')}>
            {icon}
          </ActionIcon>
        </Tooltip>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          leftSection={<IconSunHigh size={16} />}
          onClick={() => setColorScheme('light')}
        >
          {t('menu.light')}
        </Menu.Item>
        <Menu.Item
          leftSection={<IconMoonStars size={16} />}
          onClick={() => setColorScheme('dark')}
        >
          {t('menu.dark')}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ThemeSwitcher;
