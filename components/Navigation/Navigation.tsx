import { useEffect } from 'react';

import { ActionIcon, Box, Flex, Group, ScrollArea } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import {
  IconAddressBook,
  IconChartBar,
  IconFileAnalytics,
  IconForbid,
  IconLayoutDashboard,
  IconListDetails,
  IconMessages,
  IconReportAnalytics,
  IconSend2, IconTemplate,
  IconX
} from '@tabler/icons-react';

import { SidebarState } from '@/app/[locale]/apps/layout';
import { Logo, UserProfileButton } from '@/components';
import { LinksGroup } from '@/components/Navigation/Links/Links';
import UserProfileData from '@/public/mocks/UserProfile.json';
import {
  PATH_DASHBOARD,
} from '@/routes';

import classes from './Navigation.module.css';
import { useTranslations } from 'next-intl';

type NavigationProps = {
  onClose: () => void;
  sidebarState: SidebarState;
  onSidebarStateChange: (state: SidebarState) => void;
};

const Navigation = ({
  onClose,
  onSidebarStateChange,
  sidebarState,
}: NavigationProps) => {
  const tablet_match = useMediaQuery('(max-width: 768px)');
  const t = useTranslations();

  const mockdata = [
    {
      links: [
        { label: t('nav.dashboard'), icon: IconLayoutDashboard, link: PATH_DASHBOARD.default },
        { label: "SMS", icon: IconMessages, link: "" },
        { label: t('nav.stat_filtering'), icon: IconChartBar, link: "" },
        { label: t('nav.stat_files'), icon: IconFileAnalytics, link: "" },
        { label: t('nav.phonebooks'), icon: IconAddressBook, link: "" },
        { label: t('nav.alphasenders'), icon: IconSend2, link: "" },
        { label: t('nav.alphasenders_list'), icon: IconListDetails, link: "" },
        { label: t('nav.templates'), icon: IconTemplate, link: "" },
        { label: t('nav.stats'), icon: IconReportAnalytics, link: "" },
        { label: t('nav.blacklists'), icon: IconForbid, link: "" },
      ],
    },
  ];
  const links = mockdata.map((m, index) => (
    <Box key={index} pl={0} mb={sidebarState === 'mini' ? 0 : 'md'}>
      {m.links.map((item) => (
        <LinksGroup
          key={item.label}
          {...item}
          isMini={sidebarState === 'mini'}
          closeSidebar={() => {
            setTimeout(() => {
              onClose();
            }, 250);
          }}
        />
      ))}
    </Box>
  ));

  useEffect(() => {
    if (tablet_match) {
      onSidebarStateChange('full');
    }
  }, [onSidebarStateChange, tablet_match]);

  return (
    <div className={classes.navbar} data-sidebar-state={sidebarState}>
      <div className={classes.header}>
        <Flex justify="space-between" align="center" gap="sm">
          <Group
            justify={sidebarState === 'mini' ? 'center' : 'space-between'}
            style={{ flex: tablet_match ? 'auto' : 1 }}
          >
            <Logo className={classes.logo} showText={sidebarState !== 'mini'} />
          </Group>
          {tablet_match && (
            <ActionIcon onClick={onClose} variant="transparent">
              <IconX color="white" />
            </ActionIcon>
          )}
        </Flex>
      </div>

      <ScrollArea className={classes.links}>
        <div className={classes.linksInner} data-sidebar-state={sidebarState}>
          {links}
        </div>
      </ScrollArea>

      <div className={classes.footer}>
        <UserProfileButton
          email={UserProfileData.email}
          image={UserProfileData.avatar}
          name={UserProfileData.name}
          showText={sidebarState !== 'mini'}
        />
      </div>
    </div>
  );
};

export default Navigation;
