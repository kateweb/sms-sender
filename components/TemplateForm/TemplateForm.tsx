'use client';

import { useForm } from '@mantine/form';
import {
  Button,
  Stack,
  TextInput,
  Textarea,
  Title,
  Text,
  Group, Card, Paper, CopyButton, Tooltip, Code
} from '@mantine/core';
import { useTranslations } from 'next-intl';
import { IconCheck, IconCopy, IconTool } from '@tabler/icons-react';
import { useState } from 'react';

type TemplateFormProps = {
  mode: 'create' | 'edit';
  initialValues?: {
    name: string;
    text: string;
  };
  loading?: boolean;
  onSubmit(values: { name: string; text: string }): void;
};

export const TemplateForm = ({
   mode,
   initialValues = { name: '', text: '' },
   loading = false,
   onSubmit,
 }: TemplateFormProps) => {
  const t = useTranslations();

  const form = useForm({
    initialValues,
    validate: {
      name: (value) => (value.trim().length < 1 ? t('errors.required') : null),
      text: (value) => (value.trim().length < 1 ? t('errors.required') : null),
    },
  });

  const handleSubmit = () => {
    const result = form.validate();
    if (!result.hasErrors) {
      onSubmit(form.values);
    }
  };
  // Textarea
  const [length, setLength] = useState(initialValues.text.length);
  const MAX_PARTS = 4;
  const PART_SIZE = 160;
  const MAX_LENGTH = MAX_PARTS * PART_SIZE;

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.currentTarget.value;
    setLength(value.length);
    form.setFieldValue('text', value);
  };

  const parts = Math.ceil(length / PART_SIZE);
  const clampedParts = Math.min(parts, MAX_PARTS);

  //Prompt
  const nameVars = [
    { label: '{NAME}', descriptionKey: 'templates.var_name' },
    { label: '{SURNAME}', descriptionKey: 'templates.var_surname' },
    { label: '{INFO}', descriptionKey: 'templates.var_info' },
    { label: '{INFO2}', descriptionKey: 'templates.var_info' },
  ];

  const percentVars = Array.from({ length: 9 }, (_, i) => `%${i + 1}%`);

  return (
    <Card p="md" radius="md">
      <Stack gap="md">
        <Title size="lg" order={3}>
          {mode === 'create' ? t('templates.new') : t('templates.edit_template')}
        </Title>

        <TextInput
          label={t('phonebook.name')}
          {...form.getInputProps('name')}
        />

        <Textarea
          label={t('history.text')}
          autosize
          minRows={4}
          maxLength={MAX_LENGTH}
          value={form.values.text}
          onChange={handleChange}
          error={form.errors.text}
          onBlur={() => form.validateField('text')}
        />

        <Text size="sm" mt="xs">
          {t('templates.length_info', {
            length,
            parts: clampedParts,
            max: MAX_PARTS,
          })}
        </Text>

        <Paper radius="md" p="md">
          <Stack gap="xs">
            <Text  size="sm" c="dimmed">{t('templates.variables_note')}</Text>
            {nameVars.map((v) => (
              <Group key={v.label} gap="xs">
                <CopyButton value={v.label} timeout={1500}>
                  {({ copied, copy }) => (
                    <Tooltip label={copied ? t('copied') : t('copy')} withArrow>
                      <Code
                        onClick={copy}
                        style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4 }}
                        bg={copied ? 'var(--mantine-color-teal-light)' : undefined}
                      >
                        {copied ? (
                          <IconCheck size={14} style={{ marginLeft: 4 }} />
                        ) : (
                          <IconCopy size={14} style={{ marginLeft: 4 }} />
                        )}
                        {v.label}
                      </Code>
                    </Tooltip>
                  )}
                </CopyButton>

                <Text size="sm" c="dimmed">
                  – {t(v.descriptionKey)}
                </Text>
              </Group>
            ))}

            <Group wrap="wrap" gap="xs" mt="xs">
              {percentVars.map((v) => (
                <CopyButton key={v} value={v} timeout={1500}>
                  {({ copied, copy }) => (
                    <Tooltip label={copied ? t('copied') : t('copy')} withArrow>
                      <Code
                        onClick={copy}
                        style={{cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4 }}
                        bg={copied ? 'var(--mantine-color-teal-light)' : undefined}
                      >
                        {copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
                        {v}
                      </Code>
                    </Tooltip>
                  )}
                </CopyButton>
              ))}
              <Text size="sm" c="dimmed">
                – {t('templates.var_percent')}
              </Text>
            </Group>
          </Stack>
        </Paper>

        <Group  mt="md">
          <Button onClick={handleSubmit} loading={loading}>
            {mode === 'create' ? t('templates.draft') : t('update')}
          </Button>
          <Button variant="outline" onClick={handleSubmit} loading={loading} leftSection={<IconTool size={18} />} >
            {mode === 'create' ? t('create') : t('save')} {t('templates.submit_for_moderation')}
          </Button>
        </Group>
      </Stack>
    </Card>
  );
};
