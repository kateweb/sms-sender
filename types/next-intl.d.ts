declare module 'next-intl' {
  import React, { ReactNode } from 'react';

  interface IntlProviderProps {
    messages: Record<string, any>;
    locale: string;
    children: ReactNode;
  }


  export function useTranslations(namespace?: string): (key: string, values?: Record<string, string | number>) => string;

  export function IntlProvider(props: IntlProviderProps): JSX.Element;

  export const NextIntlClientProvider: React.ComponentType<{
    messages: any,
    children: React.ReactNode,
    locale?: string,
    timeZone?: string
  }>;
}
