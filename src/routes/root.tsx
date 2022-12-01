import {
  ActionIcon,
  AppShell,
  Burger,
  Grid,
  Group,
  Header,
  Input,
  MediaQuery,
  Title,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core';
import { MoonStars, Search, Sun } from 'tabler-icons-react';
import Sidenav from '../appshell/sidenav';
import { useState } from 'react';
import { Outlet, useLoaderData } from 'react-router-dom';
import { config } from '../utils/config';


function Root() {
  const theme = useMantineTheme();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [opened, setOpened] = useState(false);
  const { buckets } = useLoaderData() as { buckets: string[] };
  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbar={
        <Sidenav opened={opened} buckets={buckets}/>
      }
      header={
        <Header height={70} p="md">
          <Grid sx={{ height: '100%' }} px={20} align={'center'}>
            <Grid.Col span={5}>
              <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                  <Burger
                    opened={opened}
                    onClick={() => setOpened((o) => !o)}
                    size="sm"
                    color={theme.colors.gray[6]}
                    mr="xl"
                  />
                </MediaQuery>
                <Title order={2}>Mert Bucket</Title>
              </div>
            </Grid.Col>
            <Grid.Col span={4}>
              <Input
                icon={<Search/>}
                placeholder="Search"
              />
            </Grid.Col>
            <Grid.Col span={2} offset={1}>
              <Group position={'right'}>
                <ActionIcon variant="default" onClick={() => toggleColorScheme()} size={30}>
                  {colorScheme === 'dark' ? <Sun size={16}/> : <MoonStars size={16}/>}
                </ActionIcon>
              </Group>
            </Grid.Col>
          </Grid>
        </Header>
      }
    >
      <Outlet/>
    </AppShell>
  )
}

export default Root;

export async function loader() {
  const resp = await fetch(`${config().baseURL}/buckets`);
  const buckets = await resp.json();
  return { buckets }
}
