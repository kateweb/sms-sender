'use client';

import { useState } from 'react';

import {
  Anchor,
  Box,
  Button,
  Container,
  FileButton,
  Grid,
  Group,
  Image,
  Paper,
  PaperProps,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconCloudUpload, IconDeviceFloppy } from '@tabler/icons-react';

import { PageHeader, Surface, TextEditor } from '@/components';
import { PATH_DASHBOARD } from '@/routes';

const items = [
  { title: 'Dashboard', href: PATH_DASHBOARD.default },
  { title: 'Apps', href: '#' },
  { title: 'Settings', href: '#' },
].map((item, index) => (
  <Anchor href={item.href} key={index}>
    {item.title}
  </Anchor>
));

const ICON_SIZE = 16;

const PAPER_PROPS: PaperProps = {
  p: 'md',
  shadow: 'md',
  radius: 'md',
  style: { height: '100%' },
};

const BIO =
  '';

function Settings() {
  const [file, setFile] = useState<File | null>(null);

  const accountForm = useForm({
    initialValues: {
      username: 'kate',
      biograghy:
        '',
    },
  });

  const accountInfoForm = useForm({
    initialValues: {
      firstname: 'kate',
      lastname: 'kucherenko',
      email: 'k.burlachenko@treeum.net',
      address: '',
      apartment: '',
      city: '',
      state: '',
      zip: '',
    },
  });

  return (
    <>
      <>
        <title>Settings </title>
        <meta
          name="description"
          content="Explore our versatile dashboard website template featuring a stunning array of themes and meticulously crafted components. Elevate your web project with seamless integration, customizable themes, and a rich variety of components for a dynamic user experience. Effortlessly bring your data to life with our intuitive dashboard template, designed to streamline development and captivate users. Discover endless possibilities in design and functionality today!"
        />
      </>
      <Container fluid>
        <Stack gap="lg">
          <PageHeader title="Settings" breadcrumbItems={items} />
          <Grid>
            <Grid.Col span={{ base: 12, md: 8 }}>
              <Surface component={Paper} {...PAPER_PROPS}>
                <Text size="lg" fw={600} mb="md">
                  User information
                </Text>
                <Grid gutter={{ base: 5, xs: 'md', md: 'md', lg: 'lg' }}>
                  <Grid.Col span={{ base: 12, md: 6, lg: 9, xl: 9 }}>
                    <Stack>
                      <TextInput
                        label="User Name"
                        placeholder="user name"
                        {...accountForm.getInputProps('username')}
                      />
                      <TextEditor content={BIO} label="Biography" />
                      <Button
                        style={{ width: 'fit-content' }}
                        leftSection={<IconDeviceFloppy size={ICON_SIZE} />}
                      >
                        Save Changes
                      </Button>
                    </Stack>
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, md: 6, lg: 3, xl: 3 }}>
                    <Stack align="center">
                      <Image
                        src="https://hub.treeum.net/hub/api/rest/avatar/ce7f3866-55d9-466a-8a93-045bb2653a6f?etag=MjQtNTQ0&s=40&dpr=2&v=1"
                        h={128}
                        w={128}
                        radius="50%"
                        alt=""
                      />
                      <FileButton
                        onChange={setFile}
                        accept="image/png,image/jpeg"
                      >
                        {(props) => (
                          <Button
                            {...props}
                            variant="subtle"
                            leftSection={<IconCloudUpload size={ICON_SIZE} />}
                          >
                            Upload image
                          </Button>
                        )}
                      </FileButton>
                      <Text ta="center" size="xs" c="dimmed">
                        For best results, use an image at least 128px by 128px
                        in .jpg format
                      </Text>
                    </Stack>
                  </Grid.Col>
                </Grid>
              </Surface>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Surface component={Paper} {...PAPER_PROPS}>
                <Stack>
                  <Text size="lg" fw={600}>
                    Account information
                  </Text>
                  <Group grow>
                    <TextInput
                      label="First name"
                      placeholder="first name"
                      {...accountInfoForm.getInputProps('firstname')}
                    />
                    <TextInput
                      label="Last name"
                      placeholder="last name"
                      {...accountInfoForm.getInputProps('lastname')}
                    />
                  </Group>
                  <TextInput
                    label="Email"
                    placeholder="email"
                    {...accountInfoForm.getInputProps('email')}
                  />
                  <TextInput
                    label="Address"
                    placeholder="address"
                    {...accountInfoForm.getInputProps('address')}
                  />
                  <TextInput
                    label="Apartment/Studio/Floor"
                    placeholder="apartment, studio, or floor"
                    {...accountInfoForm.getInputProps('apartment')}
                  />
                  <Group grow>
                    <TextInput
                      label="City"
                      placeholder="city"
                      {...accountInfoForm.getInputProps('city')}
                    />
                    <TextInput
                      label="State"
                      placeholder="state"
                      {...accountInfoForm.getInputProps('state')}
                    />
                    <TextInput
                      label="Zip"
                      placeholder="zip"
                      {...accountInfoForm.getInputProps('zip')}
                    />
                  </Group>
                  <Box style={{ width: 'auto' }}>
                    <Button leftSection={<IconDeviceFloppy size={16} />}>
                      Save changes
                    </Button>
                  </Box>
                </Stack>
              </Surface>
            </Grid.Col>
          </Grid>
        </Stack>
      </Container>
    </>
  );
}

export default Settings;
