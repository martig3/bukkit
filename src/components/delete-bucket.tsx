import { Button, Modal, Stack, TextInput, Text } from "@mantine/core";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { config } from "../utils/config";
import { notifications } from "@mantine/notifications";
import { IconTrash } from "@tabler/icons-react";

export default function DeleteBucket(props: { opened: boolean; close: any }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const paths = location.pathname.split("/");
  const bucketNameIndex = paths.indexOf("buckets") + 1;
  const bucketName = paths[bucketNameIndex];
  return (
    <>
      <Modal
        opened={props.opened}
        onClose={() => {
          setName("");
          props.close();
        }}
        title="Delete Bucket"
      >
        <Stack>
          <Text>
            Enter the bucket name:{" "}
            <Text component="span" fs={"oblique"} color="red.4">
              {bucketName + " "}
            </Text>
            to confirm.
          </Text>
          <TextInput
            mb={16}
            value={name}
            onChange={(e) => {
              setName(e.currentTarget.value);
            }}
          />
          <Button
            disabled={name !== bucketName}
            color="red"
            leftIcon={<IconTrash />}
            onClick={async () => {
              const success = await deleteBucket(bucketName);
              if (!success) {
                notifications.show({
                  title: "Error deleting bukkit",
                  message: "Could not create bukkit, please try again later",
                });
                return;
              }
              props.close();
              navigate("/");
            }}
          >
            Confirm Delete
          </Button>
        </Stack>
      </Modal>
    </>
  );
}
async function deleteBucket(name: string) {
  const url = `${config().baseURL}/buckets/${name.trim()}`;
  const resp = await fetch(url, { method: "DELETE", credentials: "include" });
  return resp.status === 204;
}
