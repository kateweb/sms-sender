'use client';

import {
  Box,
  Button,
  Container,
  Grid,
  Group,
  Paper,
  Radio,
  Select,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';
import { useState } from 'react';

import classes from './sms.module.css';

export default function SendSmsPage() {
  const [recipientType, setRecipientType] = useState('one');
  const [message, setMessage] = useState('');
  const [alphaName, setAlphaName] = useState('Cash10min');
  const messageParts = Math.ceil(message.length / 160);

  return (
    <Container fluid py="md">
      <Title order={2} mb="md">
        Отправить SMS
      </Title>
      <Paper p="lg" radius="md" shadow="md" withBorder>
        <Grid gutter="xl">
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack gap="md">
              <Group align="end">
                <Select
                  label="Альфа-имя *"
                  placeholder="Выберите альфа-имя"
                  data={['Cash10min', 'OtherName']}
                  value={alphaName}
                  onChange={(value) => value && setAlphaName(value)}
                  style={{ flex: 1 }}
                />
                <Button>Создать</Button>
              </Group>

              <Radio.Group
                label="Получатели"
                value={recipientType}
                onChange={setRecipientType}
              >
                <Group mt="xs">
                  <Radio value="one" label="Один номер" />
                  <Radio value="book" label="Телефонная книга" />
                  <Radio value="file" label="Файл" />
                </Group>
              </Radio.Group>

              <TextInput
                label="Номер телефона"
                placeholder="+380501234567"
                defaultValue="+380634461629"
                withAsterisk
              />
              <Group align="end">
                <Select
                  label="Шаблон *"
                  placeholder="Без шаблона"
                  data={['Без шаблона']}
                  defaultValue="Без шаблона"
                  style={{ flex: 1 }}
                />
                <Button>Создать</Button>
              </Group>
              <Textarea
                label="Введите текст сообщения"
                value={message}
                onChange={(e) => setMessage(e.currentTarget.value)}
                minRows={4}
              />

              <Text size="sm">
                Длина: {message.length} Части: {messageParts}/4
              </Text>

              <Button fullWidth>
                Отправить
              </Button>
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack gap="md">
              <Box>
                <div className={classes.preview_message}>
                  <div className={classes.preview_container}>
                    <div className={classes.preview_alpha}>
                      <Text mb="xs">
                        {alphaName}
                      </Text>
                    </div>
                    <div className={classes.preview_scroll}>
                      <Box>
                        {message || (
                          <Text c="dimmed" size="sm">
                            Ваше сообщение отобразится здесь...
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
            <Stack gap="md">
              <Title order={5} mb="xs">
                Детали рассылки
              </Title>
              <Stack gap="xs">
                <Text size="sm">Общее количество сообщений: 1</Text>
                <Text size="sm">Вартість однієї частини повідомлення: 0.91</Text>
                <Text size="sm">Количество частей сообщения: {messageParts}</Text>
                <Text size="sm">
                  Итоговая стоимость отправки: {(messageParts * 0.91).toFixed(2)}
                </Text>
              </Stack>
            </Stack>
          </Grid.Col>
        </Grid>
      </Paper>
    </Container>
  );
}
