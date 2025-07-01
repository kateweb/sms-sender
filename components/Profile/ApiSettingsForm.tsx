'use client';

import {
  Button,
  Code,
  Collapse,
  Container,
  CopyButton,
  Fieldset, Flex,
  Group,
  Stack,
  Switch,
  Text,
  TextInput,
  Title
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { IconCheck, IconClipboard, IconCopy } from '@tabler/icons-react';
import { useState } from 'react';
import classes from '@/components/Profile/Profile.module.css';
import { useTranslations } from 'next-intl';

function generateToken() {
  return 'Token ' + Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
}

export default function ApiSettingsForm() {
  const t = useTranslations();
  const [opened, { toggle }] = useDisclosure(false);
  const [token, setToken] = useState(generateToken());

  const form = useForm({
    initialValues: {
      apiEnabled: true,
    },
  });

  const handleGenerate = () => {
    const newToken = generateToken();
    setToken(newToken);
  };

  return (
    <Container
      size="xs"
      px="0"
      py={{ base: 0, xs: 'xl' }}
    >
      <Fieldset
        legend={t('profile.api_settings')}
        pb={{ base: 0, xs: 'lg' }}
        px={{ base: 0, xs: 'lg' }}
        classNames={{ root: classes.fieldset }}
      >
        <Stack gap="md">
          <Group justify="space-between" gap="xs">
            <Text className={classes.switchText}>{t('profile.enable_token_api')}</Text>
            <Switch
              size="lg"
              color="green"
              checked={form.values.apiEnabled}
              onChange={(event) => {
                const enabled = event.currentTarget.checked;
                form.setFieldValue('apiEnabled', enabled);
                if (enabled) setToken(generateToken());
              }}
              thumbIcon={
                form.values.apiEnabled ? (
                  <IconCheck size={14} color="var(--mantine-primary-color-filled)" stroke={3} />
                ) : undefined
              }
            />
          </Group>
          <Group justify="space-between" gap="xs">
            <Text className={classes.switchText}>{t('profile.link_to_api')}:</Text>
            <Text component="a" href="https://sms-sender-stage.sd-app.net/userapi/" target="_blank" c="green" fz="sm">
              https://sms-sender-stage.sd-app.net/userapi/
            </Text>
          </Group>
          {form.values.apiEnabled && (
            <Group align="end" wrap="wrap" gap="sm" mt="sm">
              <TextInput
                readOnly
                variant="filled"
                value={token}
                className={classes.tokenInput}
                rightSection={
                  <CopyButton value={token}>
                    {({ copied, copy }) => (
                      <Button size="xs" p="0" onClick={copy} variant="subtle">
                        {copied ? <IconCheck /> : <IconCopy />}
                      </Button>
                    )}
                  </CopyButton>
                }
              />

              <Button onClick={handleGenerate} w="fit-content">
                {t('profile.reissue')}
              </Button>
            </Group>
          )}

          <Button variant="outline" mt="md" onClick={toggle} w="fit-content">
            {t('profile.documentation.title')}
          </Button>

          <Collapse in={opened}>
            <Stack gap="xs" style={{ textAlign: 'justify' }}>
              <Text size="sm">
                {t('profile.documentation.text_1')}
                <Code color="var(--mantine-color-green-light)" ml="xs">Token &lt;token_key&gt;</Code>.
              </Text>

              <Text size="sm">{t('profile.documentation.text_2')}:</Text>

              <Code classNames={{root: classes.code}} color="var(--mantine-color-green-light)" >
                curl -H 'Authorization: {form.values.apiEnabled ? token : '{token}'}' https://my.smsfinance.com.ua/api/client/templates/
              </Code>

              <Text size="sm">
                {t('profile.documentation.text_3')}
              </Text>

              <Text size="sm">
                {t('profile.documentation.text_4')}
              </Text>

              <Text size="sm">
                {t('profile.documentation.text_5')}
              </Text>
            </Stack>
          </Collapse>
        </Stack>
      </Fieldset>
    </Container>
  );
}
