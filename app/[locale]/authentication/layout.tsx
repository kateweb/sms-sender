'use client';

import { ReactNode } from 'react';
import { Center, Stack } from '@mantine/core';

type AuthProps = {
  children: ReactNode;
};

function AuthWrapper({ children }: AuthProps) {
  return (
    <Center
      style={{
        height: 'auto',
        width: '100vw',
      }}
    >
      <Stack style={{ width: '100%' }}>
        {children}
      </Stack>
    </Center>
  );
}

export default AuthWrapper;
