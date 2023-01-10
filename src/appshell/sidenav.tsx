import { ActionIcon, Avatar, Box, Group, Menu, Navbar, NavLink, Text, UnstyledButton, useMantineTheme } from '@mantine/core';
import { Bucket, ChevronLeft, ChevronRight, CirclePlus, Login, Logout } from 'tabler-icons-react';
import NewBucket from '../modals/new-bucket';
import { useDisclosure } from '@mantine/hooks';
import { Link, useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

function Sidenav(props: { opened: boolean, buckets: string[] }) {
  const theme = useMantineTheme();
  const [opened, { close, open }] = useDisclosure(false);
  const { bucket } = useParams();
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <Navbar p="md" hiddenBreakpoint="sm" hidden={!props.opened} width={{ sm: 300 }}>
      <Navbar.Section>
        <Box
          sx={{
            paddingTop: theme.spacing.sm,
            paddingBottom: theme.spacing.sm,
            borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
              }`,
          }}
        >
          <Group spacing={2} position={'center'}>
            <Bucket />
            <Text weight={'bold'}>Buckets</Text>
            <span style={{ flex: '1 1 auto' }}></span>

            <ActionIcon radius="xl" size={26} variant={'transparent'}>
              <CirclePlus onClick={open} />
            </ActionIcon>
            <NewBucket opened={opened} close={close}></NewBucket>
          </Group>
        </Box>
      </Navbar.Section>
      <Navbar.Section grow mt="xs">
        {props.buckets.map(b =>
          <Link
            key={b}
            to={`/buckets/${b}`}>
            <NavLink
              label={b}
              variant={'filled'}
              mb={8}
              active={bucket === b}
            >
            </NavLink>
          </Link>
        )}
      </Navbar.Section>
      <Navbar.Section>
        <Menu position='right-end'>
          <Menu.Target>
            <Box
              sx={{
                paddingTop: theme.spacing.sm,
                borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
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
                      {user?.name}
                    </Text>
                    <Text color="dimmed" size="xs">
                      {user?.email}
                    </Text>
                  </Box>
                  {theme.dir === 'ltr' ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                </Group>
              </UnstyledButton>
            </Box>
          </Menu.Target>
          <Menu.Dropdown>
            {!isAuthenticated ?
              <Menu.Item icon={<Login />} onClick={() => loginWithRedirect()}>Login</Menu.Item>
              : <Menu.Item icon={<Logout />} onClick={() => logout()}>Logout</Menu.Item>}
          </Menu.Dropdown>
        </Menu>

      </Navbar.Section>
    </Navbar>
  )
}

export default Sidenav;
