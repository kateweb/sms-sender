'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';

import { AppShell, Container, rem, useMantineTheme } from '@mantine/core';
import { useDisclosure, useLocalStorage, useMediaQuery } from '@mantine/hooks';

import AppMain from '@/components/AppMain';
import FooterNav from '@/components/FooterNav';
import HeaderNav from '@/components/HeaderNav';
import Navigation from '@/components/Navigation';
import classes from '@/components/Navigation/Navigation.module.css';
import Loading from '@/app/[locale]/loading';

export type SidebarState = 'mini' | 'full';

type Props = {
  children: ReactNode;
};

export function MainLayout({ children }: Props) {
  const theme = useMantineTheme();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const tablet_match = useMediaQuery('(max-width: 991px)');
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();

  const [sidebarState, setSidebarState] = useLocalStorage<SidebarState>({
    key: 'mantine-nav-state',
    defaultValue: 'full',
  });

  const sidebarStateRef = useRef(sidebarState);

  useEffect(() => {
    sidebarStateRef.current = sidebarState;
  }, [sidebarState]);

  useEffect(() => {
    if (mounted && tablet_match && sidebarState !== 'mini') {
      setSidebarState('mini');
    }
  }, [tablet_match, mounted]);

  const toggleSidebarState = () => {
    const current = sidebarStateRef.current;
    const next = current === 'full' ? 'mini' : 'full';
    setSidebarState(next);
  };

  if (!mounted) return <Loading />;

  return (
    <AppShell
      layout="alt"
      header={{ height: 60 }}
      footer={{ height: 60 }}
      navbar={{
        width: tablet_match
          ? (sidebarState === 'full' ? '100%' : 60)
          : (sidebarState === 'full' ? 300 : 60),
        breakpoint: 0,
        collapsed: { mobile: false },
      }}
      padding={0}
    >
      <AppShell.Header
        style={{
          height: rem(60),
          boxShadow: tablet_match ? theme.shadows.md : theme.shadows.sm,
        }}
      >
        <Container fluid py="sm" px={{ base: '10px', md: 'lg' }}>
          <HeaderNav
            mobileOpened={mobileOpened}
            toggleMobile={toggleMobile}
            onSidebarStateChange={toggleSidebarState}
          />
        </Container>
      </AppShell.Header>

      <AppShell.Navbar>
        <Navigation
          onClose={toggleMobile}
          sidebarState={sidebarState}
          onSidebarStateChange={setSidebarState}
        />
      </AppShell.Navbar>
      <AppShell.Main
        classNames={{ main: classes.appshell_main }}
        data-sidebar-state={sidebarState}
        data-device={tablet_match ? 'mobile' : 'desktop'}
      >
        <AppMain>{children}</AppMain>
      </AppShell.Main>
      <AppShell.Footer p="md">
        <Container fluid px="lg">
          <FooterNav />
        </Container>
      </AppShell.Footer>
    </AppShell>
  );
}
