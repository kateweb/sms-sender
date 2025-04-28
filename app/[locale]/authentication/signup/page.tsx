'use client';

import {
  Button,
  Center,
  Flex,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  TextProps,
  Title,
  useMantineTheme,
} from '@mantine/core';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { Surface } from '@/components';
import { PATH_AUTH, PATH_DASHBOARD } from '@/routes';

import classes from '../auth.module.css';

function Page() {
  const t = useTranslations();
  const LINK_PROPS: TextProps = {
    className: classes.link,
  };

  return (
    <>
      <>
        <title>{t('reg.title')}</title>
        <meta
          name="description"
          content={t('reg.reg_title')}
        />
      </>
      <div className={classes.wrapper}>
        <div className={classes.leftSection} />
        <div className={classes.rightSection}>
          <div>
            <Title ta="center">Welcome!</Title>
            <Text ta="center">Create your account to continue</Text>

            <Surface component={Paper} className={classes.card}>
              <Flex direction={{ base: 'column', sm: 'row' }} gap={{ base: 'md' }}>
                <TextInput
                  label="First name"
                  placeholder="John"
                  required
                  classNames={{ label: classes.label }}
                />
                <TextInput
                  label="Last name"
                  placeholder="Doe"
                  required
                  classNames={{ label: classes.label }}
                />
              </Flex>
              <TextInput
                label="Email"
                placeholder="example@gmail.com"
                required
                mt="md"
                classNames={{ label: classes.label }}
              />
              <PasswordInput
                label={t('login.password')}
                placeholder={t('login.your_password')}
                required
                mt="md"
                classNames={{ label: classes.label }}
              />
              <PasswordInput
                label="Confirm Password"
                placeholder="Confirm password"
                required
                mt="md"
                classNames={{ label: classes.label }}
              />
              <Button
                fullWidth
                mt="xl"
                component={Link}
                href={PATH_DASHBOARD.default}
              >
                Create account
              </Button>
              <Center mt="md">
                <Text
                  fz="sm"
                  ta="center"
                >
                  Already have an account?
                </Text>
              </Center>
              <Center>
                <Text
                  size="sm"
                  component={Link}
                  href={PATH_AUTH.signin}
                  {...LINK_PROPS}
                >
                   Sign in
                </Text>
              </Center>
            </Surface>
          </div>
        </div>
      </div>
    </>
    );
    }

    export default Page;
