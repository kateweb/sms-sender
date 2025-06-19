'use client';

import { TemplateForm } from '@/components/TemplateForm/TemplateForm';
import { Anchor, Breadcrumbs, Container, Title } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { PATH_APPS } from '@/routes';
import { useParams } from 'next/navigation';
import { useFetchData } from '@/hooks';
import { UserTemplatesItem } from '@/types';

export default function UpdateTemplatePage() {
  const t = useTranslations();
  const { id } = useParams();
  const {
    data: userTemplatesData,
    loading: userTemplatesLoading,
    error: userTemplatesError,
  } = useFetchData('/mocks/UserTemplates.json');

  const {
    data: generalTemplatesData,
    loading: generalTemplatesLoading,
    error: generalTemplatesError,
  } = useFetchData('/mocks/GeneralTemplates.json');

  let template = null;
  if (userTemplatesData) {
    template = (userTemplatesData as UserTemplatesItem[]).find(t => String(t.id) === id);
  }
  if (!template && generalTemplatesData) {
    template = (generalTemplatesData as UserTemplatesItem[]).find(t => String(t.id) === id);
  }

  if (!template && (userTemplatesLoading || generalTemplatesLoading)) {
    return <div>{t('loading')}</div>;
  }

  if (!template && (userTemplatesError || generalTemplatesError)) {
    return <div>{t('no_results')}</div>;
  }

  if (!template) {
    return <div>{t('no_results')}</div>;
  }

  const handleSubmit = async (values: { name: string; text: string }) => {

  };
  return (
    <Container fluid py="md">
      <Title order={2} mb="md">
        {t('templates.edit_template')}
      </Title>
      <Breadcrumbs pb="md">
        <Anchor href={PATH_APPS.templates}>{t('templates.all_templates')}</Anchor>
        <span>{t('templates.edit_template')}</span>
      </Breadcrumbs>
      <TemplateForm mode="edit" onSubmit={handleSubmit} initialValues={{ name: template.name, text: template.text }}/>
    </Container>
  );
}
