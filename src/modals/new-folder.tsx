import { ActionIcon, Button, Modal, TextInput } from "@mantine/core";
import { useDebouncedState, useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CirclePlus } from "tabler-icons-react";
import { config } from "../utils/config";
import { notifications } from "@mantine/notifications";

export function NewFolder() {
  const navigate = useNavigate();
  const { bucket } = useParams();
  const [name, setName] = useState("");
  const [nameDebounced, setNameDebounced] = useDebouncedState("", 500);
  const [opened, { close, open }] = useDisclosure(false);
  const params = useParams();
  const path = params["*"] ? params["*"] : "";
  return (
    <div>
      <ActionIcon onClick={() => open()}>
        <CirclePlus size={22}></CirclePlus>
      </ActionIcon>
      <Modal opened={opened} centered onClose={close} title="New Folder">
        <TextInput
          placeholder="Folder name"
          label="Name"
          mb={16}
          error={errorText(nameDebounced)}
          value={name}
          onChange={(e) => {
            const val = e.target.value.replace(" ", "-");
            setName(val);
            setNameDebounced(val);
          }}
        />
        <Button
          disabled={name.length === 0}
          onClick={() => {
            const error = errorText(name);
            if (error) {
              return;
            }
            const success = createFolder(
              name,
              bucket ? bucket : "unknown",
              path
            );
            if (!success) {
              notifications.show({
                title: "Error creating folder",
                message: "Could not create folder, please try again later",
              });
              return;
            }
            setName("");
            close();
            navigate(location.pathname);
          }}
        >
          Create Folder
        </Button>
      </Modal>
    </div>
  );

  async function createFolder(name: string, bucket: string, path: string) {
    const url = `${config().baseURL}/bucket/${bucket}/${
      path ? `${path}/` : ""
    }${name}`;
    const resp = await fetch(url, { method: "POST", credentials: "include" });
    return resp.status === 204;
  }

  function errorText(input: string): string | null {
    const minLengthError = "Name must be longer than 5 characters";
    const maxLengthError = "Name must less than 25 characters";
    if (input.length === 0) {
      return null;
    }
    if (!minLength(input)) {
      return minLengthError;
    }
    if (!maxLength(input)) {
      return maxLengthError;
    }
    return null;
  }

  function minLength(input: string) {
    return input.length >= 5;
  }

  function maxLength(input: string) {
    return input.length <= 25;
  }
}
