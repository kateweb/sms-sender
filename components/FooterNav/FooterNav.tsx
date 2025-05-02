import {
  ActionIcon,
  Button,
  ButtonProps,
  Group,
  Menu,
  Text,
  rem,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconDots } from '@tabler/icons-react';

const FooterNav = () => {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const mobile_match = useMediaQuery('(max-width: 425px)');

  const BUTTON_PROPS: ButtonProps = {
    variant: 'subtle',
    style: {
      padding: `${rem(8)} ${rem(12)}`,
      color: colorScheme === 'dark' ? theme.white : theme.black,

      '&:hover': {
        transition: 'all ease 150ms',
        backgroundColor:
          colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2],
        textDecoration: 'none',
      },
    },
  };

  return (
    <Group justify="flex-end">
      <Text
        c="dimmed"
        fz="sm"
      >
        &copy;&nbsp;{new Date().getFullYear()}&nbsp;SMS Sender
      </Text>
    </Group>
  );
};

export default FooterNav;
