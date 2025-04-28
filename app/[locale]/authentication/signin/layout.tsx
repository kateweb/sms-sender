'use client';

import { ReactNode } from 'react';

import { Center, Stack } from '@mantine/core';

type AuthProps = {
  children: ReactNode;
};

function SignInLayout({ children }: AuthProps) {
  return (
    <Center
      style={{
        height: '100vh',
        width: '100vw',
      }}
    >
      <Stack style={{width: '100%'}}>
        {children}
      </Stack>
    </Center>
  );
}

export default SignInLayout;
