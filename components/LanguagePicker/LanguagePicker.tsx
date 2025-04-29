'use client';

import { useState } from 'react';

import { Group, Image, Menu, UnstyledButton } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';

import classes from './LanguagePicker.module.css';

const data = [
  {
    label: 'EN',
  },
  {
    label: 'UK',
  },
  {
    label: 'RU',
  },
];

type LanguagePickerProps = {
  type: 'collapsed' | 'expanded';
};

const LanguagePicker = ({ type }: LanguagePickerProps) => {
  const [opened, setOpened] = useState(false);
  const [selected, setSelected] = useState(data[0]);
  const items = data.map((item) => (
    <Menu.Item
      onClick={() => setSelected(item)}
      key={item.label}
    >
      {item.label}
    </Menu.Item>
  ));

  return (
    <Menu
      onOpen={() => setOpened(true)}
      onClose={() => setOpened(false)}
      radius="sm"
      withinPortal
      width={200}
    >
      <Menu.Target>
        <UnstyledButton className={classes.control}>
          <Group gap="xs">
            {selected.label}
            {type === 'expanded' && (
              <span className={classes.label}>{selected.label}</span>
            )}
          </Group>
          {type === 'expanded' && (
            <IconChevronDown
              size="1rem"
              className={classes.icon}
              stroke={1.5}
            />
          )}
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>{items}</Menu.Dropdown>
    </Menu>
  );
};

export default LanguagePicker;
