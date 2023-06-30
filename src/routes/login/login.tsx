import { Button, Center } from "@mantine/core";
import { BrandDiscord } from "tabler-icons-react";
import { config } from "../../utils/config";
export function Login() {
  const login = async () => {
    window.location.href = `${config().baseURL}/auth/login`;
  };
  return (
    <div
      style={{
        width: "100vh",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button leftIcon={<BrandDiscord />} onClick={async () => await login()}>
        Login
      </Button>
    </div>
  );
}
