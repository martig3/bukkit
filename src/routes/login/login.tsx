import { AppShell, Button, Card, Center, Flex } from "@mantine/core";
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
        <Card px={32} pb={64} w={300}>
          <h1>Login</h1>
          <Flex justify={"center"}>
            <Button
              leftIcon={<IconBrandDiscord />}
              onClick={async () => await login()}
              w={"100%"}
            >
              Discord
            </Button>
          </Flex>
        </Card>
      </Center>
    </AppShell>
  );
}
