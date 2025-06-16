import { ActionIcon, Box, Burger, Flex, Group, ScrollArea } from '@mantine/core';
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
  IconSend2,
  IconTemplate,
  IconX
} from '@tabler/icons-react';

import { SidebarState } from '@/app/[locale]/apps/layout';
import { Logo, UserProfileButton } from '@/components';
import { LinksGroup } from '@/components/Navigation/Links/Links';
import UserProfileData from '@/public/mocks/UserProfile.json';
import {
  PATH_APPS,
  PATH_DASHBOARD
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
  const tablet_match = useMediaQuery('(max-width: 991px)');
  const t = useTranslations();

  const mockdata = [
    {
      links: [
        { label: t('nav.dashboard'), icon: IconLayoutDashboard, link: PATH_DASHBOARD.default },
        { label: "SMS", icon: IconMessages, link: PATH_APPS.sms },
        { label: t('nav.stat_filtering'), icon: IconChartBar, link: PATH_APPS.report },
        { label: t('nav.stat_files'), icon: IconFileAnalytics, link: PATH_APPS.report_files },
        { label: t('nav.phonebooks'), icon: IconAddressBook, link: PATH_APPS.phonebook },
        { label: t('nav.alphasenders'), icon: IconSend2, link: PATH_APPS.alphasenders },
        { label: t('nav.alphasenders_list'), icon: IconListDetails, link: `${PATH_APPS.alphasenders}/applications`},
        { label: t('nav.templates'), icon: IconTemplate, link: PATH_APPS.templates },
        { label: t('nav.stats'), icon: IconReportAnalytics, link: "#" },
        { label: t('nav.blacklists'), icon: IconForbid, link: "#" },
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
  return (
    <div className={classes.navbar} data-sidebar-state={sidebarState}>
      <div className={classes.header}>
        <Flex justify="space-between" align="center" gap="sm" w="100%">
          <Group
            justify={sidebarState === 'mini' ? 'center' : 'space-between'}
            style={{ flex: tablet_match ? 'auto' : 1 }}
          >
            {!(tablet_match && sidebarState === 'mini') && (
              <Logo className={classes.logo} showText={sidebarState !== 'mini'} />
            )}
            {tablet_match && sidebarState === 'mini' && (
              <Burger
                hiddenFrom="md"
                opened={false}
                onClick={() => onSidebarStateChange('full')}
                size="sm"
                color="white"
              />
            )}
          </Group>
          {tablet_match && sidebarState === 'full' && (
            <ActionIcon onClick={() => {
              onSidebarStateChange('mini');
              onClose();
            }} variant="transparent">
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
