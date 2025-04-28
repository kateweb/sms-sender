import { getMessages } from 'next-intl/server';

import RootLayoutClient from '@/components/RootLayoutClient';
import './globals.css';

export default async function RootLayout({
 children,
 params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();


  // Pass messages as a prop to the client component
  return <RootLayoutClient messages={messages} locale={locale}>{children}</RootLayoutClient>;
}
