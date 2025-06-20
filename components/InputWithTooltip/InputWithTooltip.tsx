'use client';

import { TextInput, Textarea, Text, TextareaProps, TextInputProps } from '@mantine/core';
import LabelWithTooltip from '@/components/InputWithTooltip/LabelWithTooltip';

type Props = {
  label: string;
  tooltip: string;
  withAsteriskSymbol?: boolean;
  isTextarea?: boolean;
} & (TextInputProps | TextareaProps);

export default function InputWithTooltip({ label, tooltip, withAsteriskSymbol = false, isTextarea = false, ...props }: Props) {
  const labelNode = (
    <LabelWithTooltip
      label={
        <>
          {label} {withAsteriskSymbol && <Text span c="red">*</Text>}
        </>
      }
      tooltip={tooltip}
    />
  );

  const sharedProps = {
    label: labelNode,
    ...props,
  };

  if (isTextarea) {
    return <Textarea {...(sharedProps as TextareaProps)} />;
  }

  return <TextInput {...(sharedProps as TextInputProps)} />;
}
