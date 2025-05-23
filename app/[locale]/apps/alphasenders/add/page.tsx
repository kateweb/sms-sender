'use client';

import {
  Button,
  Group,
  Title,
  Container, PaperProps, Grid, Paper, Breadcrumbs, Anchor, Radio, Stack
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useTranslations } from 'next-intl';
import { PATH_APPS } from '@/routes';
import CountrySelect from '@/components/CountrySelect/CountrySelect';
import { InputWithTooltip } from '@/components';

export default function AddAlphasenderPage() {
  const t = useTranslations();

  const PAPER_PROPS: PaperProps = {
    p: 'md',
    shadow: 'md',
    radius: 'md',
  };
  const form = useForm({
    initialValues: {
      type: 'sms',
      alphaname: '',
      country: '',
      company: '',
      ipn: '',
      site: '',
      description: '',
    },
    validate: {
      type: (value) => (!value ? t('errors.required') : null),
      alphaname: (value) => {
        if (!value) return t('errors.required');
        const regex = /^[A-Za-z0-9 .\-_]+$/;
        if (!regex.test(value)) return t('errors.invalid_format');
        if (value.length > 11) return t('errors.max_length', { max: 11 });
        return null;
      },
      country: (value) => (!value ? t('errors.required') : null),
      company: (value) => (!value ? t('errors.required') : null),
      ipn: (value) => {
        if (!value) return t('errors.required');
        if (!/^\d+$/.test(value)) return t('errors.only_digits');
        if (value.length > 10) return t('errors.max_length', { max: 10 });
        return null;
      },
      site: (value) => {
        if (!value) return t('errors.required');
        try {
          const url = new URL(value.startsWith('http') ? value : `http://${value}`);
          if (value.length > 255) return t('errors.max_length', { max: 255 });
        } catch {
          return t('errors.invalid_url');
        }
        return null;
      },
      description: (value) => {
        if (!value) return t('errors.required');
        if (value.length < 10) return t('errors.min_length', { min: 10 });
        if (value.length > 1000) return t('errors.max_length', { max: 1000 });
        return null;
      },
    },
  });

  const handleSave = () => {
    const result = form.validate();
    if (result.hasErrors) return;
    const values = form.values;
  };

  return (
    <Container fluid py="md">
      <Title order={2} mb="md">
        {t('nav.alphasenders')}
      </Title>
      <Breadcrumbs pb="md">
        <Anchor href={PATH_APPS.alphasenders}>{t('all')} {t('nav.alphasenders')}</Anchor>
        <span>{t('create')} {t('sms.alpha_name')}</span>
      </Breadcrumbs>
      <Grid>
        <Grid.Col span={{ base: 12}}>
          <Paper {...PAPER_PROPS}>
            <form onSubmit={form.onSubmit(handleSave)}>
              <Stack gap="sm">
                <Radio.Group
                  label={t('alphasenders.message_type')} {...form.getInputProps('type')}>
                  <Group mt="5">
                    <Radio value="sms" label="SMS" />
                  </Group>
                </Radio.Group>
                <InputWithTooltip
                  label={t('alphasenders.alphaname')}
                  tooltip={t('alphasenders.alphaname_info')}
                  withAsteriskSymbol
                  {...form.getInputProps('alphaname')}
                />
                <CountrySelect required={true} withAsterisk={true} labelProps={{ style: { marginBottom: 5 } }} {...form.getInputProps('country')} />
                <InputWithTooltip
                  label={t('alphasenders.company_name')}
                  tooltip={t('alphasenders.company_name_info')}
                  withAsteriskSymbol
                  {...form.getInputProps('company')}
                />
                <InputWithTooltip
                  label={t('alphasenders.inn')}
                  tooltip={t('alphasenders.inn_info')}
                  description={t('alphasenders.inn_desc')}
                  withAsteriskSymbol
                  {...form.getInputProps('ipn')}
                />
                <InputWithTooltip
                  label={t('alphasenders.website')}
                  tooltip={t('alphasenders.website_info')}
                  description={t('alphasenders.website_desc')}
                  withAsteriskSymbol
                  {...form.getInputProps('site')}
                />
                <InputWithTooltip
                  label={t('alphasenders.description')}
                  tooltip={t('alphasenders.description_info')}
                  description={t('alphasenders.description_desc')}
                  withAsteriskSymbol
                  isTextarea
                  autosize
                  minRows={10}
                  {...form.getInputProps('description')}
                />
                <Group mt="md">
                  <Button type="submit">{t('save')}</Button>
                </Group>
              </Stack>
            </form>
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
