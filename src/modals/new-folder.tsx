import { ActionIcon, Button, Modal, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { CirclePlus } from "tabler-icons-react";
import { config } from "../utils/config";

export function NewFolder() {
  const { bucket } = useParams();
  const [name, setName] = useState("");
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
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <Button
          disabled={name.length === 0}
          onClick={() => {
            const success = createFolder(
              name,
              bucket ? bucket : "unknown",
              path
            );
            if (!success) {
              return;
            }
            setName("");
            close();
            location.reload();
          }}
        >
          Create Folder
        </Button>
      </Modal>
    </div>
  );

  async function createFolder(name: string, bucket: string, path: string) {
    const url = `${config().baseURL}/buckets/${bucket}/${path}/${name}`;
    const resp = await fetch(url, { method: "POST", credentials: "include" });
    return resp.status === 204;
  }
}
