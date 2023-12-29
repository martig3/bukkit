import {
  Button,
  Divider,
  Group,
  Loader,
  Modal,
  Paper,
  Progress,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { Dropzone, FileWithPath } from "@mantine/dropzone";
import { IconFileUpload, IconUpload, IconX } from "@tabler/icons-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { config } from "../utils/config";
import { useDisclosure } from "@mantine/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";

function UploadFiles() {
  const theme = useMantineTheme();
  const location = useLocation();
  const [uploads, setUploads] = useState<FileWithPath[]>([]);
  const [progress, setProgress] = useState<number>(0);
  const [uploadOpened, { close, open }] = useDisclosure(false);
  const navigate = useNavigate();
  const client = axios.create({
    baseURL: config().baseURL,
    withCredentials: true,
  });

  useEffect(() => {
    const upload = async () => {
      if (uploads.length === 0) return;
      const file = uploads[0];
      const filename = file.path;
      const pathname = location.pathname.replace("/buckets/", "/bucket/");
      const url = `${config().baseURL}${pathname}/${filename}`;
      const chunkSize = 2_000_000;
      const totalParts = Math.max(1, Math.round(file.size / chunkSize));
      let part = 1;
      for (let start = 0; start < file.size; start += chunkSize) {
        const chunk = file.slice(start, start + chunkSize);
        const formData = new FormData();
        formData.set("data", chunk);
        const query = new URLSearchParams([
          ["part", part.toString()],
          ["total_parts", totalParts.toString()],
        ]);
        try {
          await fetch(`${url}?${query.toString()}`, {
            method: "post",
            body: formData,
            credentials: "include",
          });
          part++;
          setProgress((part / totalParts) * 100);
        } catch (error) {
          const updated = [...uploads];
          const uploaded = updated.shift();
          setUploads(updated);
          setProgress(0);
          notifications.show({
            title: "Error Uploading File",
            message: `Failed to upload ${uploaded?.name}, please try again later.`,
            color: "red",
          });
          break;
        }
      }
      const updated = [...uploads];
      const uploaded = updated.shift();
      setProgress(0);
      setUploads(updated);
      notifications.show({
        title: "File Uploaded",
        message: `Uploaded ${uploaded?.name} successfully`,
        color: "green",
      });
    };

    upload();
  }, [uploads]);

  function uploadFiles(files: FileWithPath[]) {
    setUploads([...uploads, ...files]);
  }

  return (
    <div>
      <Button
        onClick={open}
        disabled={!window.location.href.includes("/buckets/")}
        leftIcon={
          uploads.length > 0 ? (
            <Loader size="sm" color="white" />
          ) : (
            <IconFileUpload />
          )
        }
      >
        Upload
      </Button>
      <Modal
        opened={uploadOpened}
        centered
        onClose={() => {
          close();
          navigate(location.pathname);
        }}
        title="Upload Files"
      >
        <Dropzone onDrop={(files) => uploadFiles(files)}>
          <Group
            position="center"
            spacing="xl"
            style={{ minHeight: 100, pointerEvents: "none" }}
          >
            <Dropzone.Accept>
              <IconUpload
                size={50}
                color={
                  theme.colors[theme.primaryColor][
                    theme.colorScheme === "dark" ? 4 : 6
                  ]
                }
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX
                size={50}
                color={theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]}
              />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconFileUpload size={50} />
            </Dropzone.Idle>

            <Group position={"center"}>
              <Text size="xl" inline>
                Drag files here or click to select files
              </Text>
              <Text size="sm" color="dimmed" inline mt={7}>
                You can drag multiple files at a time
              </Text>
            </Group>
          </Group>
        </Dropzone>
        {uploads.length > 0 ? (
          <Paper shadow="xs" radius="md" p="md" mt={24}>
            {uploads.map((u, i) => (
              <div key={i}>
                <Text>{u.path}</Text>
                <Progress value={i === 0 ? progress : 0} animate />
                <Divider my="sm" />
              </div>
            ))}
          </Paper>
        ) : (
          <></>
        )}
      </Modal>
    </div>
  );
}

export default UploadFiles;
