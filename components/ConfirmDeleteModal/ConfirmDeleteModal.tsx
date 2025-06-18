'use client';

import { Button, Center, Modal, Stack, Text } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

type ConfirmDeleteModalProps = {
  opened: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
};

export const ConfirmDeleteModal = ({
   opened,
   onClose,
   onConfirm,
   message,
 }: ConfirmDeleteModalProps) => {
  const t = useTranslations();
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      withCloseButton={false}
      radius="md"
      padding="lg"
      size="sm"
      overlayProps={{ backgroundOpacity: 0.3 }}
    >
      <Center mb="md">
        <IconAlertCircle size="48px" color="#84b94e" stroke={1.5} />
      </Center>

      <Text ta="center" fw={600} fz="lg" mb="xs">
        {t('are_you_sure')}
      </Text>
      <Text ta="center" c="dimmed" mb="lg">
        {message}
      </Text>

      <Stack gap="xs">
        <Button fullWidth radius="md" onClick={onConfirm}>
          {t('yes_delete')}
        </Button>
        <Button variant="default" fullWidth radius="md" onClick={onClose}>
          {t('no')}
        </Button>
      </Stack>
    </Modal>
  );
};
