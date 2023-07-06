import { Button, Modal, Stack, TextInput, Text } from "@mantine/core";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Trash } from "tabler-icons-react";

export default function DeleteBucket(props: { opened: boolean; close: any }) {
  const location = useLocation();
  const [name, setName] = useState("");
  const paths = location.pathname.split("/");
  const bucketNameIndex = paths.indexOf("buckets") + 1;
  const bucketName = paths[bucketNameIndex];
  return (
    <>
      <Modal
        opened={props.opened}
        onClose={() => props.close()}
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
            placeholder="Folder name"
            mb={16}
            value={name}
            onChange={(e) => {
              setName(e.currentTarget.value);
            }}
          />
          <Button
            disabled={name !== bucketName}
            color="red"
            leftIcon={<Trash />}
          >
            Confirm Delete
          </Button>
        </Stack>
      </Modal>
    </>
  );
}
