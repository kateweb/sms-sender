'use client';

import { TemplateForm } from '@/components/TemplateForm/TemplateForm';
import { Anchor, Breadcrumbs, Container, Title } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { PATH_APPS } from '@/routes';

export default function AddTemplatePage() {
  const t = useTranslations();

  const handleSubmit = async (values: { name: string; text: string }) => {

  };
  return (
    <Container fluid py="md">
      <Title order={2} mb="md">
        {t('templates.create')}
      </Title>
      <Breadcrumbs pb="md">
        <Anchor href={PATH_APPS.templates}>{t('templates.all_templates')}</Anchor>
        <span>{t('templates.create')}</span>
      </Breadcrumbs>
      <TemplateForm mode="create" onSubmit={handleSubmit} />
    </Container>
  );
}
