import { Modal, Button, Select, Group, Menu, Text, Flex, List } from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import {
  IconChevronDown,
  IconDownload,
  IconFileTypeXls,
  IconFileTypeCsv, IconFileTypeTxt
} from '@tabler/icons-react';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

export function ImportPhonebookModal(
  {
    opened,
    onClose,
  }: {
  opened: boolean;
  onClose: () => void;
}) {
  const FILES_MIME_TYPES = {
    'text/csv': [],
    'text/plain': [],
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [], // .xlsx
    'application/vnd.ms-excel': [] // .xls
  }
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const t = useTranslations();
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={t('phonebook.import_contacts')}
      size="80%"
      styles={{
        title: { fontWeight: 600, fontSize: 22 },
      }}
    >
      <Dropzone
        onDrop={(files) => setUploadedFiles(files)}
        accept={FILES_MIME_TYPES}
        styles={{
          root: { minHeight: 160 }
        }}
      >
        <Dropzone.Idle>
          <div style={{ padding: 40, textAlign: 'center' }}>
            {t('phonebook.dropzone_title')}
            <br />
            <Text size="xs" c="dimmed" mt="xs" style={{ wordBreak: 'break-word' }}>{t('phonebook.dropzone_info')}</Text>
          </div>
        </Dropzone.Idle>
        <Dropzone.Accept>
          <div style={{ padding: 40, textAlign: 'center' }}>
            ✅ {t('phonebook.file_success')}
          </div>
        </Dropzone.Accept>

        <Dropzone.Reject>
          <div style={{ padding: 40, textAlign: 'center', color: 'red' }}>
            ❌{t('phonebook.file_error')}
          </div>
        </Dropzone.Reject>
      </Dropzone>
      {uploadedFiles.length > 0 && (
        <>
          <Text mt="md" fw={500}>{t('phonebook.loaded_files')}:</Text>
          <List spacing="xs" size="sm" mt="xs">
            {uploadedFiles.map((file, idx) => (
              <List.Item key={idx}>{file.name}</List.Item>
            ))}
          </List>
        </>
      )}
      <div style={{ marginTop: 24 }}>
        <Group justify="space-between" align="flex-end">
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <Button variant="default" leftSection={<IconDownload size={16} />}
                      rightSection={<IconChevronDown size={16} />}>
                {t('sms.download_example')}
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Text size="xs" fw={700} pl="sm" my="sm" c="green" tt="uppercase">{t('phonebook.choose_format')}:</Text>
              <Menu.Item
                leftSection={<IconFileTypeXls size={16} />}
                component="a"
                href="/files/xlsx-example-phonebook.xlsx"
                download
              >
                Excel
              </Menu.Item>
              <Menu.Item
                leftSection={<IconFileTypeCsv size={16} />}
                component="a"
                href="/files/csv-example-phonebook.csv"
                download
              >
                CSV
              </Menu.Item>
              <Menu.Item
                leftSection={<IconFileTypeTxt size={16} />}
                component="a"
                href="/files/txt-example-phonebook.txt"
                download
              >
                TXT
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
          <Flex gap="sm" wrap="wrap"  w={{ base: '100%', xs: 'auto' }} direction={{ base: 'column', xs: 'row' }}>
            <Select
              placeholder={t('phonebook.choose_book')}
              data={['Test']}
              w={{ base: '100%', xs: 'auto' }}
            />
            <Button onClick={onClose}>{t('import')}</Button>
          </Flex>
          <Button variant="subtle" onClick={onClose}>{t('close')}</Button>
        </Group>
      </div>
    </Modal>
  );
}
