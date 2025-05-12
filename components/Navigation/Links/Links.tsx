import { Box, Tooltip, UnstyledButton } from '@mantine/core';
import { usePathname, useRouter } from 'next/navigation';

import classes from './Links.module.css';

interface LinksGroupProps {
  icon?: any;
  label: string;
  link?: string;
  closeSidebar: () => void;
  isMini?: boolean;
}

export function LinksGroup(
  {
     icon: Icon,
     label,
     link,
     closeSidebar,
     isMini,
   }: LinksGroupProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = pathname?.slice(3) === link;

  const handleClick = () => {
    if (link) {
      router.push(link);
      closeSidebar();
    }
  };

  return (
    <UnstyledButton
      onClick={handleClick}
      className={classes.control}
      data-active={isActive || undefined}
      data-mini={isMini}
    >
      {isMini ? (
        <Tooltip label={label} position="right" withArrow={false}>
          <Icon size={24} />
        </Tooltip>
      ) : (
        <Box style={{ display: 'flex', alignItems: 'center' }}>
          <Icon size={18} />
          <Box ml="md">{label}</Box>
        </Box>
      )}
    </UnstyledButton>
  );
}
