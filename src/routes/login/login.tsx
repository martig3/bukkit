import {
  AppShell,
  Avatar,
  Button,
  Card,
  Center,
  Flex,
  Title,
  Text,
} from "@mantine/core";
import { config } from "../../utils/config";
import { IconBrandDiscord } from "@tabler/icons-react";
export function Login() {
  const login = async () => {
    window.location.href = `${config().baseURL}/auth/login`;
  };
  return (
    <AppShell
      styles={() => ({
        main: {},
      })}
    >
      <Center maw={400} h={"100%"} mx="auto">
        <Card p={"xl"} w={300}>
          <Flex dir="row" mb={16}>
            <Avatar
              bg={"orange"}
              radius={"xl"}
              mx={8}
              src={"/android-chrome-192x192.png"}
            />
            <Title order={2}>Bukkit</Title>
          </Flex>
          <Flex justify={"center"}>
            <Button
              leftIcon={<IconBrandDiscord />}
              onClick={async () => await login()}
              miw={"fit-content"}
              maw={"100%"}
            >
              Continue with Discord
            </Button>
          </Flex>
        </Card>
      </Center>
    </AppShell>
  );
}
