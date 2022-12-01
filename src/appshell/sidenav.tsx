import { ActionIcon, Avatar, Box, Group, Navbar, Text, UnstyledButton, useMantineTheme } from '@mantine/core';
import { ChevronLeft, ChevronRight, CirclePlus, FileDatabase } from 'tabler-icons-react';
import NewBucket from '../modals/new-bucket';
import { useDisclosure } from '@mantine/hooks';
import { Link } from 'react-router-dom';

function Sidenav(props: { opened: boolean, buckets: string[] }) {
  const theme = useMantineTheme();
  const [opened, { close, open }] = useDisclosure(false);

  return (
    <Navbar p="md" hiddenBreakpoint="sm" hidden={!props.opened} width={{ sm: 300 }}>
      <Navbar.Section>
        <Box
          sx={{
            paddingTop: theme.spacing.sm,
            paddingBottom: theme.spacing.sm,
            borderBottom: `1px solid ${
              theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
            }`,
          }}
        >
          <Group spacing={2} position={'center'}>
            <FileDatabase/>
            Buckets
            <span style={{ flex: '1 1 auto' }}></span>

            <ActionIcon radius="xl" size={26} variant={'transparent'}>
              <CirclePlus onClick={open}/>
            </ActionIcon>
            <NewBucket opened={opened} close={close}></NewBucket>
          </Group>
        </Box>
      </Navbar.Section>
      <Navbar.Section grow mt="xs">
        {props.buckets.map(bucket =>
          <UnstyledButton
            key={bucket}
            sx={(theme) => ({
              display: 'block',
              width: '100%',
              padding: theme.spacing.xs,
              borderRadius: theme.radius.sm,
              color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

              '&:hover': {
                backgroundColor:
                  theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
              },
            })}
          >
            <Link to={`/buckets/${bucket}`}>
              <Group>
                <Text>{bucket}</Text>
              </Group>
            </Link>
          </UnstyledButton>
        )}
      </Navbar.Section>
      <Navbar.Section>
        <Box
          sx={{
            paddingTop: theme.spacing.sm,
            borderTop: `1px solid ${
              theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
            }`,
          }}
        >
          <UnstyledButton
            sx={{
              display: 'block',
              width: '100%',
              padding: theme.spacing.xs,
              borderRadius: theme.radius.sm,
              color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

              '&:hover': {
                backgroundColor:
                  theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
              },
            }}
          >
            <Group>
              <Avatar
                radius="xl"
              />
              <Box sx={{ flex: 1 }}>
                <Text size="sm" weight={500}>
                  Amy Horsefighter
                </Text>
                <Text color="dimmed" size="xs">
                  ahorsefighter@gmail.com
                </Text>
              </Box>

              {theme.dir === 'ltr' ? <ChevronRight size={18}/> : <ChevronLeft size={18}/>}
            </Group>
          </UnstyledButton>
        </Box>
      </Navbar.Section>
    </Navbar>
  )
}

export default Sidenav;
