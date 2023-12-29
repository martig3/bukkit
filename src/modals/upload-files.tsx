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
import { useEffect, useState } from "react";
import { config } from "../utils/config";
import { useDisclosure } from "@mantine/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";

function UploadFiles() {
  const theme = useMantineTheme();
  const location = useLocation();
  const [uploads, setUploads] = useState<FileWithPath[]>([]);
  const [uploading, setUploading] = useState<FileWithPath>();
  const [progress, setProgress] = useState<number>(0);
  const [uploadOpened, { close, open }] = useDisclosure(false);
  const navigate = useNavigate();
  const onUploadError = () => {
    notifications.show({
      title: "Error Uploading File",
      message: `Failed to upload ${uploading?.name}, please try again later.`,
      color: "red",
    });
    setUploading(undefined);
  };
  const progressQueue = () => {
    console.log(uploads);
    const next = uploads[0];
    setUploading(next);
    setUploads(uploads.slice(1));
    setProgress(0);
  };
  useEffect(() => {
    const upload = async () => {
      if (!uploading) return;
      const file = uploading;
      const filename = file.path;
      const pathname = location.pathname.replace("/buckets/", "/bucket/");
      const url = `${config().baseURL}${pathname}/${filename}`;
      const chunkSize = 50_000_000;
      const totalParts = Math.ceil(file.size / chunkSize);
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
          let resp = await fetch(`${url}?${query.toString()}`, {
            method: "post",
            body: formData,
          });
          if (resp.status > 400) {
            onUploadError();
            return;
          }
          part++;
          setProgress((part / totalParts) * 100);
        } catch (error) {
          onUploadError();
          return;
        }
      }
      notifications.show({
        title: "File Uploaded",
        message: `Uploaded ${uploading?.name} successfully`,
        color: "green",
      });
      setUploading(undefined);
    };
    upload();
  }, [uploading]);

  useEffect(() => {
    if (uploading) {
      return;
    }
    progressQueue();
  }, [uploading]);

  function uploadFiles(files: FileWithPath[]) {
    if (uploads.length === 0 && files.length > 0 && !uploading) {
      setUploading(files[0]);
      if (files.length > 1) {
        setUploads([...files.slice(1)]);
      }
      return;
    }
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
        <div>{uploads.length}</div>
        {uploading ? (
          <Paper radius="md" mt={"md"}>
            <Text>{uploading.name}</Text>
            <Progress value={progress} animate />
            <Divider my="sm" />
          </Paper>
        ) : (
          <></>
        )}
        {uploads.map((u, i) => (
          <Paper radius="md" key={i}>
            <Text>{u.path}</Text>
            <Divider my="sm" />
          </Paper>
        ))}
      </Modal>
    </div>
  );
}

export default UploadFiles;
