import { ReactNode } from 'react';

import { MainLayout } from '@/layout/Main';

export type SidebarState = 'mini' | 'full';

type Props = {
  children: ReactNode;
};

function AppsLayout({ children }: Props) {
  return <MainLayout>{children}</MainLayout>;
}

export default AppsLayout;
