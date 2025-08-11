'use client';

import { ReactNode } from 'react';
import { Group, Paper, Text, Title } from '@mantine/core';
import { LanguagePicker, Surface } from '@/components';
import classes from './auth_layout.module.css';
import ThemeSwitcher from '@/components/ThemeSwitcher/ThemeSwitcher';
import { useLocale } from '@/contexts/LocaleContext';

interface AuthLayoutProps {
  heading?: string;
  subheading?: string;
  children: ReactNode;
}

export default function AuthLayout({heading,subheading,children}: AuthLayoutProps) {
  const { locale } = useLocale();
  return (
    <div className={classes.wrapper}>
      <div className={classes.leftSection} />
      <div className={classes.rightSection}>
        <Group className={classes.menu}>
          <LanguagePicker type="collapsed" locale={locale} />
          <ThemeSwitcher />
        </Group>
        <div>
          <Title className={classes.title} ta="center">
            {heading}
          </Title>
          {subheading && (
            <Text ta="center">{subheading}</Text>
          )}
          <Surface component={Paper} className={classes.card}>
            {children}
          </Surface>
          </div>
      </div>
    </div>
  );
}
