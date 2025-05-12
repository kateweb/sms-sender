'use client';

import {
  Box,
  Button,
  Container, FileInput,
  Grid,
  Group, Input, Modal,
  Paper,
  Radio,
  Select,
  Stack,
  Text,
  Textarea,
  Divider,
  Title, UnstyledButton, Collapse, PaperProps
} from '@mantine/core';
import { useState } from 'react';
import { useForm } from '@mantine/form';
import { en, ru, uk  } from "intl-tel-input/i18n";
import IntlTelInput from "intl-tel-input/reactWithUtils";
import { useTranslations } from 'next-intl';

import "intl-tel-input/styles";
import classes from './sms.module.css';
import { useLocale } from '@/contexts/LocaleContext';
import {
  IconCalendarWeek, IconChevronDown, IconChevronRight, IconChevronUp,
  IconFile,
  IconFileTypeCsv,
  IconFileTypeXls
} from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { DateTimePicker } from '@mantine/dates';
import { HistoryTable } from '@/components';
import { useFetchData } from '@/hooks';

export default function SendSmsPage() {
  const [recipientType, setRecipientType] = useState('one');
  const [message, setMessage] = useState('');
  const [alphaName, setAlphaName] = useState('');
  const [openedExample, setOpenedExample] = useState(false);
  const messageParts = Math.ceil(message.length / 160);
  const t = useTranslations();
  const { locale } = useLocale();
  const phoneI18n = { uk, ru, en };
  const form = useForm();

  const PAPER_PROPS: PaperProps = {
    p: 'md',
    shadow: 'md',
    radius: 'md',
    style: { height: '100%' },
  };
  const {
    data: historyData,
    error: historyError,
    loading: historyLoading,
  } = useFetchData('/mocks/History.json');
  const [opened, setOpened] = useState(true);

  //Example for template choose
  const [selectedTemplate, setSelectedTemplate] = useState('none');
  const templateOptions = [
    { label: t('sms.no_template'), value: 'none' },
    { label: 'Test', value: 'test' },
  ];

  const handleTemplateChange = (value: string | null) => {
    const val = value ?? 'none';
    setSelectedTemplate(val);
    if (val === 'test') {
      setMessage('Даруємо 555 FS з БЕЗДЕПОМ!\nПРОМОКОД- VCR31Y\nhttps://bit.ly/3RC0i0I');
    } else {
      setMessage('');
    }
  };

  //Modal planned
  const [openedPlannedModal, { open, close }] = useDisclosure(false);
  const [date, setDate] = useState<Date | null>(new Date());

  return (
    <Container fluid py="md">
      <Title order={2} mb="md">
        {t('sms.title')}
      </Title>
      <Paper {...PAPER_PROPS}>
        <Grid gutter="xl">
          <Grid.Col span={{ base: 12, md: 4 }}>
            <form
              onSubmit={form.onSubmit(() => {})}
            >
              <Stack gap="md">
                <Group align="end">
                  <Select
                    label={t('sms.alpha_name')}
                    placeholder={t('sms.choose_alpha_name')}
                    description={t('sms.alpha_name_desc')}
                    data={['Cash10min', 'Credit']}
                    value={alphaName}
                    onChange={(value) => value && setAlphaName(value)}
                    style={{ flex: 1 }}
                    withAsterisk
                    searchable
                    required
                  />
                  <Button>{t('create')}</Button>
                </Group>
                <Radio.Group
                  label={t('sms.recipients')}
                  value={recipientType}
                  onChange={setRecipientType}
                >
                  <Group mt="xs">
                    <Radio value="one" label={t('sms.one_number')} />
                    <Radio value="book" label={t('sms.phonebook')} />
                    <Radio value="file" label={t('sms.file')} />
                  </Group>
                </Radio.Group>
                {recipientType === 'one' && (
                  <Input.Wrapper
                    label={t('sms.phone_number')}
                    required
                    classNames={{ label: classes.label }}
                  >
                    <IntlTelInput
                      initOptions={{
                        initialCountry: 'ua',
                        excludeCountries: ['ru', 'by'],
                        separateDialCode: true,
                        i18n: phoneI18n[locale as keyof typeof phoneI18n] || en
                      }}
                      inputProps={{
                        placeholder: '63 123 4567',
                        className: classes.input
                      }}
                    />
                    <Text size="xs" c="dimmed" mt="xs">
                      {t('sms.phone_number_decs')}
                    </Text>
                  </Input.Wrapper>
                )}

                {recipientType === 'book' && (
                  <Select
                    label={t('sms.phonebook')}
                    data={['Test']}
                    style={{ flex: 1 }}
                    required
                    allowDeselect={false}
                  />
                )}

                {recipientType === 'file' && (
                  <Stack gap="xs">
                    <FileInput
                      rightSection={<IconFile size={18} stroke={1.5} />}
                      label={t('sms.file')}
                      placeholder={t('sms.file_not_choosed')}
                      withAsterisk
                      required
                      rightSectionPointerEvents="none"
                    />
                    <Text size="xs" c="dimmed">
                      {t('sms.file_desc')}<br />
                      {t('sms.file_format')}
                    </Text>
                    <UnstyledButton c="green" fw="bold" onClick={() => setOpenedExample(true)} className={classes.example_btn}>
                      {t('sms.download_example')}
                    </UnstyledButton>
                    <Modal
                      opened={openedExample}
                      onClose={() => setOpenedExample(false)}
                      withCloseButton
                      centered
                      size="lg"
                      padding="lg"
                      styles={{
                        header: { paddingBottom: 0 },
                        title: { fontWeight: 600, fontSize: 22, color: '#1a1a1a' },
                        body: { paddingTop: 0 },
                      }}
                      title={t('sms.file_examples')}
                    >
                      <Box>
                        <Divider my="sm" />
                        <Text size="md" c="dark" mb="sm">
                          {t('sms.file_desc')}
                        </Text>
                        <Divider my="sm" />
                        <Stack gap="sm">
                          <Group gap="xs">
                            <IconFileTypeXls size={18} color="gray" />
                            <Text
                              size="sm"
                              c="green"
                              component="a"
                              href="files/xlsx-example.xlsx"
                              target="_blank"
                            >
                              Excel - {t('sms.download_example')}
                            </Text>
                          </Group>
                          <Group gap="xs">
                            <IconFileTypeCsv size={18} color="gray"/>
                            <Text
                              size="sm"
                              c="green"
                              component="a"
                              href="files/csv-example.csv"
                              target="_blank"
                            >
                              CSV - {t('sms.download_example')}
                            </Text>
                          </Group>
                        </Stack>
                        <Divider my="lg" />
                        <Group justify="flex-end">
                          <Button
                            variant="subtle"
                            color="green"
                            onClick={() => setOpenedExample(false)}
                          >
                            {t('close')}
                          </Button>
                        </Group>
                      </Box>
                    </Modal>
                  </Stack>
                )}
                <Group align="end">
                  <Select
                    label={t('sms.template')}
                    placeholder={t('sms.no_template')}
                    description={t('sms.choose_template')}
                    data={templateOptions}
                    defaultValue={t('sms.no_template')}
                    style={{ flex: 1 }}
                    searchable
                    withAsterisk
                    required
                    allowDeselect={false}
                    onChange={handleTemplateChange}
                  />
                  <Button>{t('create')}</Button>
                </Group>
                <Textarea
                  label={t('sms.enter_text')}
                  value={message}
                  maxLength={612}
                  autosize
                  minRows={10}
                  required
                  disabled={selectedTemplate === 'test'}
                  onChange={(e) => setMessage(e.currentTarget.value)}
                />
                <Text size="sm">
                  {t('sms.length')}: {message.length} {t('sms.parts')}: {messageParts}/4
                </Text>
                <Button.Group>
                  <Button type="submit" fullWidth>
                    {t('send')}
                  </Button>

                  <Button
                    onClick={open}
                    variant="outline"
                  >
                    <IconCalendarWeek size={18} />
                  </Button>
                </Button.Group>
                <Modal
                  opened={openedPlannedModal}
                  onClose={close}
                  title={t('sms.choose_date_and_time_to_send')}
                  centered
                  size="md"
                >
                  <Divider mb="lg" />
                  <Stack>
                    <DateTimePicker
                      value={date}
                      onChange={setDate}
                      placeholder={t('sms.choose_date_and_time')}
                      valueFormat="DD/MM/YYYY HH:mm"
                      mx="auto"
                      size="md"
                      w="100%"
                      rightSection={<IconCalendarWeek size={16} />}
                    />
                    <Text size="xs" c="dimmed">
                      {t('sms.max_days')}: 365
                    </Text>
                    <Divider my="lg" />
                    <Button
                      fullWidth
                      onClick={close}
                    >
                      {t('save')}
                    </Button>
                  </Stack>
                </Modal>
              </Stack>
            </form>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Stack gap="md">
              <Box>
                <div className={classes.preview_message}>
                  <div className={classes.preview_container}>
                    {alphaName && (
                      <div className={classes.preview_alpha}>
                        <Text>
                          {alphaName}
                        </Text>
                      </div>
                    )}
                    <div className={classes.preview_scroll}>
                      <Box>
                        {message || (
                          <Text c="dimmed" size="11px">
                            {t('sms.sms_placeholder')}
                          </Text>
                        )}
                      </Box>
                    </div>
                  </div>
                </div>
              </Box>
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Box className={classes.details}>
              <Stack gap="md">
                <Title order={5} mb="xs">
                  {t('sms.mailing_options')}
                </Title>
                <Stack gap="xs">
                  <Text size="sm"> {t('sms.total')}: 1</Text>
                  <Text size="sm"> {t('sms.cost')}: 0.91</Text>
                  <Text size="sm"> {t('sms.parts_number')}: {messageParts}</Text>
                  <Text size="sm">
                    {t('sms.total_cost')}: {(messageParts * 0.91).toFixed(2)}
                  </Text>
                </Stack>
              </Stack>
            </Box>
          </Grid.Col>
        </Grid>
      </Paper>
      <Grid mt={"md"}>
        <Grid.Col span={12}>
          <Paper {...PAPER_PROPS}>
            <Group justify="space-between" mb="md" >
              <Group justify="space-between" style={{ flex: 1, cursor: 'pointer' }} onClick={() => setOpened((o) => !o)}>
                <Text size="lg" fw={600}>{t('nav.stats')}</Text>
                {opened ? <IconChevronUp size={20} /> : <IconChevronDown size={20} />}
              </Group>
            </Group>
            <Collapse in={opened}>
              <HistoryTable
                data={historyData}
                error={historyError}
                loading={historyLoading}
                withPagination={true}
              />
            </Collapse>
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
