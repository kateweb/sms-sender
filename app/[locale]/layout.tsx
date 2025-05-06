import { ColorSchemeScript } from '@mantine/core';
import { getMessages } from 'next-intl/server';
import type { Metadata } from 'next';
import RootLayoutClient from '@/components/RootLayoutClient';
import './globals.css';

export const metadata: Metadata = {
  title: 'SMS Sender',
  icons: {
    icon: '/favicon.png',
    apple: '/logo.svg',
  },
};

export default async function RootLayout({
 children,
 params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages({ locale });
  return (
    <html lang={locale}>
    <head>
      <ColorSchemeScript defaultColorScheme="auto" />
    </head>
    <body>
      <RootLayoutClient messages={messages} locale={locale}>{children}</RootLayoutClient>
    </body>
    </html>
  );
}
