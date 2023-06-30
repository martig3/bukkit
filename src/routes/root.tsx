import {
  ActionIcon,
  Anchor,
  AppShell,
  Breadcrumbs,
  Burger,
  Button,
  Flex,
  Grid,
  Group,
  Header,
  Input,
  MediaQuery,
  Title,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { MoonStars, Search, Sun } from "tabler-icons-react";
import Sidenav from "../appshell/sidenav";
import { useEffect, useState } from "react";
import {
  Link,
  Outlet,
  redirect,
  useLoaderData,
  useLocation,
} from "react-router-dom";
import { config } from "../utils/config";
import UploadFiles from "../modals/upload-files";
import { NewFolder } from "../modals/new-folder";

function Root() {
  const theme = useMantineTheme();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [sidenavOpened, setSidenavOpened] = useState(false);
  const { buckets, user } = useLoaderData() as {
    buckets: string[];
    user: { name: string; email: string };
  };
  const location = useLocation();
  const genBreadCrumbElements = (location: any) => {
    const paths: string[] = location.pathname.split("/").slice(2);
    return paths.map((item, index, array) => (
      <Link to={"/buckets/" + array.slice(0, index + 1).join("/")} key={index}>
        {item}
      </Link>
    ));
  };
  const [breadcrumbs, setBreadcrumbs] = useState(
    genBreadCrumbElements(location)
  );
  useEffect(() => setBreadcrumbs(genBreadCrumbElements(location)), [location]);

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbar={<Sidenav opened={sidenavOpened} buckets={buckets} user={user} />}
      header={
        <Header height={70} p="md">
          <Grid sx={{ height: "100%" }} px={20} align={"center"}>
            <Grid.Col span={5}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                  <Burger
                    opened={sidenavOpened}
                    onClick={() => setSidenavOpened((o) => !o)}
                    size="sm"
                    color={theme.colors.gray[6]}
                    mr="xl"
                  />
                </MediaQuery>
                <Title order={2}>Mert Bucket</Title>
              </div>
            </Grid.Col>
            <Grid.Col span={4}>
              <Input icon={<Search />} placeholder="Search" />
            </Grid.Col>
            <Grid.Col span={2} offset={1}>
              <Group position={"right"}>
                <ActionIcon
                  variant="default"
                  onClick={() => toggleColorScheme()}
                  size={30}
                >
                  {colorScheme === "dark" ? (
                    <Sun size={16} />
                  ) : (
                    <MoonStars size={16} />
                  )}
                </ActionIcon>
              </Group>
            </Grid.Col>
          </Grid>
        </Header>
      }
    >
      <Group position={"apart"}>
        <Flex direction={"row"} gap={8} align={"center"}>
          <Breadcrumbs>{breadcrumbs}</Breadcrumbs>
          {breadcrumbs.length > 0 ? <NewFolder /> : <span />}
        </Flex>
        <UploadFiles />
      </Group>
      <Outlet />
    </AppShell>
  );
}

export default Root;

export async function loader() {
  const user_resp = await fetch(`${config().baseURL}/user/me`, {
    credentials: "include",
  });
  if (user_resp.status === 401) {
    throw redirect("/login");
  }
  const resp = await fetch(`${config().baseURL}/buckets`, {
    credentials: "include",
  });
  const buckets = await resp.json();
  const user = await user_resp.json();
  return { buckets, user };
}
