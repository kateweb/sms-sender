'use client';

import {
  Breadcrumbs,
  BreadcrumbsProps,
  Divider,
  Flex,
  Paper,
  PaperProps,
  Stack,
  Text,
  Title,
  rem,
  useMantineTheme,
} from '@mantine/core';
import { useColorScheme } from '@mantine/hooks';
import { useSession } from "next-auth/react";
import { Surface } from '@/components';
import { useTranslations } from 'next-intl';

type PageHeaderProps = {
  title: string;
  withActions?: boolean;
  breadcrumbItems?: any;
} & PaperProps;

const PageHeader = (props: PageHeaderProps) => {
  const { withActions, breadcrumbItems, title, ...others } =
    props;
  const theme = useMantineTheme();
  const colorScheme = useColorScheme();
  const t = useTranslations();
  const { data: session, status } = useSession();
  const isAuthorized = status === "authenticated";

  const BREADCRUMBS_PROPS: Omit<BreadcrumbsProps, 'children'> = {
    style: {
      a: {
        padding: rem(8),
        borderRadius: theme.radius.sm,
        fontWeight: 500,
        color: colorScheme === 'dark' ? theme.white : theme.black,

        '&:hover': {
          transition: 'all ease 150ms',
          backgroundColor:
            colorScheme === 'dark'
              ? theme.colors.dark[5]
              : theme.colors.gray[2],
          textDecoration: 'none',
        },
      },
    },
  };

  return (
    <>
      <Surface
        component={Paper}
        style={{ backgroundColor: 'transparent' }}
        {...others}
      >
        {withActions ? (
          <Flex
            justify="space-between"
            direction={{ base: 'column', sm: 'row' }}
            gap={{ base: 'sm', sm: 4 }}
          >
            <Stack gap={4}>
              <Title order={3}>{title}</Title>
              <Text>
                {t('login.welcome_back')},{' '}
                {isAuthorized && session?.user?.username ? session.user.username : ''}
                !
              </Text>
            </Stack>
          </Flex>
        ) : (
          <Stack gap="sm">
            <Title order={3}>{title}</Title>
            <Breadcrumbs {...BREADCRUMBS_PROPS}>{breadcrumbItems}</Breadcrumbs>
          </Stack>
        )}
      </Surface>
      <Divider />
    </>
  );
};

export default PageHeader;
