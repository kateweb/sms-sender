// components/LabelWithTooltip.tsx
'use client';

import { Group, Tooltip, ActionIcon } from '@mantine/core';
import { IconHelpCircle } from '@tabler/icons-react';
import { ReactNode } from 'react';

interface LabelWithTooltipProps {
  label: ReactNode;
  tooltip: string;
}

export default function LabelWithTooltip({ label, tooltip }: LabelWithTooltipProps) {
  return (
    <Group gap={5} align="center">
      {label}
      <Tooltip
        withArrow
        position="top-start"
        multiline
        w={220}
        transitionProps={{ transition: 'pop', duration: 150 }}
        label={tooltip}
      >
        <ActionIcon variant="transparent" color="gray" size="sm">
          <IconHelpCircle size={16} />
        </ActionIcon>
      </Tooltip>
    </Group>
  );
}
