import { LoaderFunctionArgs, Outlet, useLoaderData } from "react-router-dom";
import { UserInvite } from "../../model/user-invite";
import { config } from "../../utils/config";
import {
  ActionIcon,
  AppShell,
  Avatar,
  Grid,
  Group,
  Header,
  List,
  Title,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { MoonStars, Sun } from "tabler-icons-react";

export function Admin() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
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
      header={
        <Header height={70} p="md">
          <Grid
            sx={{ height: "100%" }}
            px={20}
            align={"center"}
            justify={"space-between"}
          >
            <Grid.Col span={5}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <Avatar mx={8} src={"/android-chrome-192x192.png"} />
                <Title order={2}>Mert Bucket</Title>
              </div>
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
      <Outlet />
    </AppShell>
  );
}
export default Admin;
