'use client';

import {
  TextInput,
  ActionIcon,
  Tooltip,
  Breadcrumbs,
  Anchor,
  Group,
  Button,
  Title,
  PaperProps,
  Container, Grid, Paper, Flex,
  Text
} from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { ContactsTable, CreatePhonebookForm, ImportPhonebookModal } from '@/components';
import { useTranslations } from 'next-intl';
import { useFetchData } from '@/hooks';
import dayjs from 'dayjs';
import { ContactsItem } from '@/types';
import { PATH_APPS } from '@/routes';

export default function PhonebookPage({ params }: { params: { id: string } }) {
  const t = useTranslations();
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState('First');

  const [isEditingComment, setIsEditingComment] = useState(false);
  const [comment, setComment] = useState('Comment');

  const {
    data: contactsData,
    error: contactsError,
    loading: contactsLoading,
  } = useFetchData('/mocks/Contacts.json');

  const [importOpened, setImportOpened] = useState(false);
  const [createOpened, setCreateOpened] = useState(false);
  const [contacts, setContacts] = useState<ContactsItem[]>(contactsData);
  const [selected, setSelected] = useState<ContactsItem[]>([]);

  useEffect(() => {
    if (contactsData) {
      setContacts(contactsData);
    }
  }, [contactsData]);

  const PAPER_PROPS: PaperProps = {
    p: 'md',
    shadow: 'md',
    radius: 'md',
  };

  const handleEditTitle = () => setIsEditingTitle(true);
  const handleEditComment = () => setIsEditingComment(true);

  const handleSubmitTitle = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsEditingTitle(false);
    }
  };

  const handleSubmitComment = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsEditingComment(false);
    }
  };

  const handleDeleteSelected = () => {
    const idsToDelete = new Set(selected.map((item) => item.id));
    const updated = contacts.filter((item) => !idsToDelete.has(item.id));
    setContacts(updated);
    setSelected([]);
  };

  const handleDeleteAll = () => {
    setContacts([]);
    setSelected([]);
  };

  return (
    <Container fluid py="md">
      <Title order={2} mb="md">
        {t('phonebook.edit_phonebook')}
      </Title>
      <Breadcrumbs pb="md">
        <Anchor href={PATH_APPS.phonebook}> {t('phonebook.all_phonebooks')}</Anchor>
        <span> {t('phonebook.edit_phonebook')}</span>
      </Breadcrumbs>
      <Grid>
        <Grid.Col span={{ base: 12}}>
          <Paper {...PAPER_PROPS}>
            <Flex justify="space-between" w="100%" wrap="wrap">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  {isEditingTitle ? (
                    <TextInput
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      onKeyDown={handleSubmitTitle}
                      autoFocus
                    />
                  ) : (
                    <>
                      <Title size="lg" py="sm">{title}</Title>
                      <Tooltip label={t('edit')}>
                        <ActionIcon onClick={handleEditTitle}>
                          <IconEdit size={16} />
                        </ActionIcon>
                      </Tooltip>
                    </>
                  )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  {isEditingComment ? (
                    <TextInput
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      onKeyDown={handleSubmitComment}
                      autoFocus
                    />
                  ) : (
                    <>
                      <Text>{comment}</Text>
                      <Tooltip label={t('phonebook.edit_comment')}>
                        <ActionIcon onClick={handleEditComment}>
                          <IconEdit size={14} />
                        </ActionIcon>
                      </Tooltip>
                    </>
                  )}
                </div>
              </div>
              <div>
                <CreatePhonebookForm
                  opened={createOpened}
                  onClose={() => setCreateOpened(false)}
                  onAdd={(item) =>
                    setContacts((prev) => [
                      ...prev,
                      {
                        ...item,
                        id: crypto.randomUUID(),
                        valid: true,
                        birthday: dayjs(item.birthday).format('DD.MM.YYYY'),
                        extraInfo: item.extra1,
                        extraInfo2: item.extra2,
                      }
                    ])
                  }
                />
                <ImportPhonebookModal
                  opened={importOpened}
                  onClose={() => setImportOpened(false)}
                />
                <Group mt="md">
                  <Button onClick={() => setImportOpened(true)}>{t('import')}</Button>
                  <Button variant="outline" onClick={() => setCreateOpened(true)}>{t('create')}</Button>
                  <Button color="red" variant="outline" onClick={handleDeleteSelected}>{t('delete_choosed')}</Button>
                  <Button color="red" onClick={handleDeleteAll}>{t('delete_all')}</Button>
                </Group>
              </div>
            </Flex>
            <ContactsTable
              data={contacts}
              error={contactsError}
              loading={contactsLoading}
              onSelectedChange={setSelected}
              onDataChange={setContacts}
            />
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
