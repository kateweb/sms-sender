'use client';

import {
  Group,
  Paper,
  PaperProps,
  Text,
  useMantineColorScheme,
  useMantineTheme,
  Select,
  Flex, Badge
} from '@mantine/core';
import { useState } from 'react';
import dynamic from 'next/dynamic';

import { Surface } from '@/components';
import { useTranslations } from 'next-intl';
import { useLocale } from '@/contexts/LocaleContext';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

type RevenueChartProps = PaperProps;

const MessagesChart = ({ ...others }: RevenueChartProps) => {
  const theme = useMantineTheme();
  const { locale } = useLocale();
  const { colorScheme } = useMantineColorScheme();
  const t = useTranslations();

  const [period, setPeriod] = useState('7');

  const series = [
    {
      name: 'sms',
      data: [11345, 5678, 87510, 65560, 98560, 109680],
    },
  ];

  const options: any = {
    chart: {
      height: 230,
      type: 'area',
      fontFamily: 'Open Sans, sans-serif',
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      type: 'datetime',
      categories: [
        '2025-04-29T00:00:00.000Z',
        '2025-04-30T01:30:00.000Z',
        '2025-05-01T02:30:00.000Z',
        '2025-05-02T03:30:00.000Z',
        '2025-05-03T04:30:00.000Z',
        '2025-05-04T05:30:00.000Z',
        '2025-05-05T06:30:00.000Z',
      ],
      labels: {
        style: {
          colors: colorScheme === 'dark' ? theme.white : theme.black,
        },
        formatter: (value: string) => {
          const date = new Date(value);
          return date.toLocaleDateString(locale, { day: '2-digit', month: 'short' }); // or use 'long' for full names
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: colorScheme === 'dark' ? theme.white : theme.black,
        },
      },
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm',
      },
    },
    colors: [
      theme.colors[theme.primaryColor][5],
      theme.colors[theme.primaryColor][2],
    ],
    legend: {
      labels: {
        colors: [colorScheme === 'dark' ? theme.white : theme.black],
      },
    },
  };

  return (
    <Surface component={Paper} {...others}>
      <Text size="lg" fw={600}>
        {t('messages.title')}
      </Text>
      <Flex justify="space-between" align="center" my="md">
        <Badge color="orange" variant="filled" radius="md" mx="auto" >
          SMS
        </Badge>
        <Select
          value={period}
          onChange={(value) => setPeriod(value!)}
          data={[
            { label: t('period.day'), value: '1' },
            { label: t('period.week'), value: '7' },
            { label: t('period.month'), value: '30' },
            { label: t('period.year'), value: '365' },
          ]}
          size="xs"
          w={100}
          variant="filled"
          radius="md"
          allowDeselect={false}
          styles={{
            input: {
              fontWeight: 500,
            },
          }}
        />
      </Flex>
      {/*@ts-ignore*/}
      <Chart
        options={options}
        series={series}
        type="area"
        height={230}
        width={'100%'}
      />
    </Surface>
  );
};

export default MessagesChart;
