// app/components/RootLayoutClient.tsx
'use client';

import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { Open_Sans } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { AbstractIntlMessages } from 'use-intl';

import { LocaleProvider } from '@/contexts/LocaleContext';
import { myTheme } from '@/theme';

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/tiptap/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/notifications/styles.css';
import 'mantine-datatable/styles.layer.css';
import '@mantine/dropzone/styles.css';
import '@mantine/charts/styles.css';

const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayoutClient({
   children,
   messages,
   locale,
 }: {
  children: React.ReactNode;
  messages: AbstractIntlMessages;
  locale: string;
}) {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return (
    <NextIntlClientProvider timeZone={timeZone} messages={messages} locale={locale}>
      <LocaleProvider locale={locale}>
        <MantineProvider theme={myTheme} defaultColorScheme="light">
          <Notifications position="bottom-right" zIndex={1000} />
          <ModalsProvider>{children}</ModalsProvider>
        </MantineProvider>
      </LocaleProvider>
    </NextIntlClientProvider>
  );
}
