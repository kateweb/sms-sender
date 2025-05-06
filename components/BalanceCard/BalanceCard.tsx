import { Card, Text, Box, Collapse, Group, Center } from '@mantine/core';
import { IconChevronUp, IconChevronDown } from '@tabler/icons-react';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import classes from './balance_card.module.css';

export default function BalanceCard() {
  const [opened, setOpened] = useState(true);
  const t = useTranslations();
  return (
    <Card shadow="sm" radius="md" padding="lg" style={{ height: !opened ? 'auto' : '100%', transition: 'height 1s ease' }}>
      <Group justify="space-between" onClick={() => setOpened((o) => !o)} style={{ cursor: 'pointer' }}>
        <Text size="lg" fw={600}>{t('balance.title')}</Text>
        {opened ? <IconChevronUp size={20} /> : <IconChevronDown size={20} />}
      </Group>

      <Collapse in={opened}>
        <Box w={200} mt="md" p="lg" className={classes.box}>
          <Center>
            <Text size="md" color="green" mb="xs">
              SMS
            </Text>
          </Center>
          <Center>
            <Text size="34px" fw={700} mb="md">
              +109680
            </Text>
          </Center>
        </Box>
      </Collapse>
    </Card>
  );
}
