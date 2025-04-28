// app/components/RootLayoutClient.tsx
'use client';

import { ColorSchemeScript, MantineProvider } from '@mantine/core';
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
  return (
    <html lang={locale} className={openSans.className}>
    <head>
      <title>SMS Sender</title>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/logo.svg"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon.svg"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon.svg"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width"
      />
      <meta
        name="description"
        content=""
      />
      <ColorSchemeScript defaultColorScheme="auto" />
    </head>
    <body>
      <NextIntlClientProvider messages={messages} locale={locale}>
        <LocaleProvider locale={locale}>
          <MantineProvider theme={myTheme} defaultColorScheme="light">
            <Notifications position="bottom-right" zIndex={1000} />
            <ModalsProvider>{children}</ModalsProvider>
          </MantineProvider>
        </LocaleProvider>
      </NextIntlClientProvider>
    </body>
    </html>
  );
}
