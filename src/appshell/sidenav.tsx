import {
  ActionIcon,
  Avatar,
  Box,
  Flex,
  Group,
  Menu,
  Navbar,
  NavLink,
  Text,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import {
  Bucket,
  ChevronLeft,
  ChevronRight,
  CirclePlus,
  Login,
  Logout,
} from "tabler-icons-react";
import NewBucket from "../modals/new-bucket";
import { useDisclosure } from "@mantine/hooks";
import { Link, redirect, useNavigate, useParams } from "react-router-dom";
import { config } from "../utils/config";
import { UserInfo } from "../model/user-info";

function Sidenav(props: {
  opened: boolean;
  buckets: string[];
  user: UserInfo;
}) {
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const { bucket } = useParams();
  const logout = async () => {
    await fetch(`${config().baseURL}/auth/logout`, { credentials: "include" });
    navigate("/login");
  };

  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!props.opened}
      width={{ sm: 300 }}
    >
      <Navbar.Section>
        <Box
          sx={{
            paddingTop: theme.spacing.sm,
            paddingBottom: theme.spacing.sm,
            borderBottom: `1px solid ${
              theme.colorScheme === "dark"
                ? theme.colors.dark[4]
                : theme.colors.gray[2]
            }`,
          }}
        >
          <Flex justify={"space-between"}>
            <Bucket />
            <Text weight={"bold"}>Buckets</Text>
            <span style={{ flex: "1 1 auto" }}></span>
            <NewBucket />
          </Flex>
        </Box>
      </Navbar.Section>
      <Navbar.Section grow mt="xs">
        {props.buckets.map((b) => (
          <Link key={b} to={`/buckets/${b}`}>
            <NavLink
              label={b}
              variant={"filled"}
              mb={8}
              active={bucket === b}
            ></NavLink>
          </Link>
        ))}
      </Navbar.Section>
      <Navbar.Section>
        <Menu position="right-end">
          <Menu.Target>
            <Box
              sx={{
                paddingTop: theme.spacing.sm,
                borderTop: `1px solid ${
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[4]
                    : theme.colors.gray[2]
                }`,
              }}
            >
              <UnstyledButton
                sx={{
                  display: "block",
                  width: "100%",
                  padding: theme.spacing.xs,
                  borderRadius: theme.radius.sm,
                  color:
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[0]
                      : theme.black,

                  "&:hover": {
                    backgroundColor:
                      theme.colorScheme === "dark"
                        ? theme.colors.dark[6]
                        : theme.colors.gray[0],
                  },
                }}
              >
                <Group>
                  <Avatar
                    size={"lg"}
                    radius="xl"
                    src={props.user.discord_avatar}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Text size="md" weight={600}>
                      {props.user?.name}
                    </Text>
                    <Text color="dimmed" size="xs">
                      {props.user?.email}
                    </Text>
                  </Box>
                  {theme.dir === "ltr" ? (
                    <ChevronRight size={18} />
                  ) : (
                    <ChevronLeft size={18} />
                  )}
                </Group>
              </UnstyledButton>
            </Box>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item icon={<Logout />} onClick={async () => logout()}>
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Navbar.Section>
    </Navbar>
  );
}

export default Sidenav;
