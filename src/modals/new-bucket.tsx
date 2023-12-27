import { ActionIcon, Button, Modal, TextInput } from "@mantine/core";
import { useState } from "react";
import { useDebouncedState, useDisclosure } from "@mantine/hooks";
import { config } from "../utils/config";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import { IconCirclePlus } from "@tabler/icons-react";

function NewBucket() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [nameDebounced, setNameDebounced] = useDebouncedState("", 500);
  const [opened, { close, open }] = useDisclosure(false);
  return (
    <div>
      <ActionIcon size={26} variant={"subtle"}>
        <IconCirclePlus onClick={open} />
      </ActionIcon>
      <Modal opened={opened} centered onClose={close} title="New Bucket">
        <TextInput
          placeholder="Bucket name"
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
          disabled={!minLength(name)}
          onClick={() => {
            const error = errorText(name);
            if (error) {
              return;
            }
            const success = createBucket(name);
            if (!success) {
              notifications.show({
                title: "Error creating bucket",
                message: "Could not create bucket, please try again later",
              });
              return;
            }
            setName("");
            setNameDebounced("");
            close();
            navigate(window.location);
          }}
        >
          Add
        </Button>
      </Modal>
    </div>
  );
}
async function createBucket(name: string) {
  const url = `${config().baseURL}/buckets/${name.trim()}`;
  const resp = await fetch(url, { method: "PUT", credentials: "include" });
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
export default NewBucket;
