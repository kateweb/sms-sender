'use client';

import { ReactNode } from 'react';
import { ActionIcon, Group, Paper, Text, Title, Tooltip } from '@mantine/core';
import { LanguagePicker, Surface } from '@/components';
import classes from './auth_layout.module.css';
import { IconCash, IconPower } from '@tabler/icons-react';
import ThemeSwitcher from '@/components/ThemeSwitcher/ThemeSwitcher';

interface AuthLayoutProps {
  heading: string;
  subheading?: string;
  children: ReactNode;
}

export default function AuthLayout({heading,subheading,children}: AuthLayoutProps) {
  return (
    <div className={classes.wrapper}>
      <div className={classes.leftSection} />
      <div className={classes.rightSection}>
        <Group className={classes.menu}>
          <LanguagePicker type="collapsed" />
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
