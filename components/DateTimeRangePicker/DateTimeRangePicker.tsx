'use client';

import { useDisclosure } from '@mantine/hooks';
import { Popover, TextInput, Group, Button } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { IconCalendarWeek, IconCheck } from '@tabler/icons-react';
import { useState } from 'react';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';

export default function DateTimeRangeInput() {
  const [opened, { open, close }] = useDisclosure(false);
  const t = useTranslations();
  const [range, setRange] = useState<[Date | null, Date | null]>([null, null]);

  const formattedValue = range[0] && range[1]
    ? `${dayjs(range[0]).format('DD-MM-YYYY HH:mm')} - ${dayjs(range[1]).format('DD-MM-YYYY HH:mm')}`
    : '';

  return (
    <Popover opened={opened} onClose={close} position="bottom-start" width={350} trapFocus>
      <Popover.Target>
        <TextInput
          readOnly
          value={formattedValue}
          onClick={open}
          label={t('report.date_range')}
          placeholder={t('report.select_date_range')}
          rightSection={<IconCalendarWeek size={16} />}
        />
      </Popover.Target>

      <Popover.Dropdown>
        <Group grow>
          <DateTimePicker
            label={t('from')}
            value={range[0]}
            onChange={(date) => setRange([date, range[1]])}
            maxDate={range[1] || undefined}
          />
          <DateTimePicker
            label={t('to')}
            value={range[1]}
            onChange={(date) => setRange([range[0], date])}
            minDate={range[0] || undefined}
          />
        </Group>

        <Group justify="flex-end" mt="md">
          <Button size="xs" variant="light" onClick={close}><IconCheck/></Button>
        </Group>
      </Popover.Dropdown>
    </Popover>
  );
}
