import {
  LoaderFunctionArgs,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { UserInvite } from "../../../model/user-invite";
import { config } from "../../../utils/config";
import {
  ActionIcon,
  Button,
  Card,
  Flex,
  Group,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useState } from "react";
import { IconPlus, IconTrash } from "@tabler/icons-react";

export function Invites() {
  const { invites } = useLoaderData() as { invites: UserInvite[] };
  const location = useLocation();
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  return (
    <>
      <Title mb={"xl"}>Invites</Title>
      <Flex direction={"row"}>
        <TextInput
          placeholder="User email"
          mb={16}
          w={"200px"}
          error={errorText(input, invites)}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          radius={"xs"}
        />
        <Button
          rightIcon={<IconPlus />}
          sx={() => ({
            borderRadius: "0 8px 8px 0",
          })}
          disabled={input === ""}
          onClick={async () => {
            await putInvite(input.trim());
            setInput("");
            navigate(location.pathname);
          }}
        >
          Add
        </Button>
      </Flex>
      <Flex direction={"column"} gap={16} miw={"fit-content"} maw={500}>
        {invites.map((i) => (
          <Card key={i.id}>
            <Group position="apart">
              <Text>{i.email}</Text>
              <ActionIcon
                color={"red"}
                onClick={async () => {
                  await deleteInvite(i);
                  navigate(location.pathname);
                }}
              >
                <IconTrash />
              </ActionIcon>
            </Group>
          </Card>
        ))}
      </Flex>
    </>
  );
}

function errorText(input: string, invites: UserInvite[]): string | null {
  if (input.length === 0) {
    return null;
  }
  const inviteEmails = invites.map((i) => i.email);
  if (inviteEmails.includes(input.trim())) return "Email already exists";
  return null;
}
export default Invites;
async function deleteInvite(invite: UserInvite): Promise<void> {
  await fetch(`${config().baseURL}/admin/invites`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(invite),
  });
}
async function putInvite(email: string): Promise<UserInvite> {
  const resp = await fetch(`${config().baseURL}/admin/invites`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: 0,
      email,
    }),
  });
  return await resp.json();
}
async function getInvites(): Promise<[UserInvite]> {
  const resp = await fetch(`${config().baseURL}/admin/invites`);
  return await resp.json();
}

export async function loader({
  params,
}: LoaderFunctionArgs): Promise<{ invites: UserInvite[] }> {
  const invites = await getInvites();
  return { invites };
}
