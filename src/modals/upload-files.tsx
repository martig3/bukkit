import { Button, Divider, Group, Loader, Modal, Paper, Progress, Text, useMantineTheme } from '@mantine/core';
import { Dropzone, FileWithPath } from '@mantine/dropzone';
import { FileUpload, Upload, X } from 'tabler-icons-react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { config } from '../utils/config';
import { useDisclosure } from '@mantine/hooks';

function UploadFiles() {
  const theme = useMantineTheme();
  const [paths] = useState(location.pathname.split('/').slice(2));
  const [uploads, setUploads] = useState<FileWithPath[]>([]);
  const [progress, setProgress] = useState<number>(0);
  const [uploadOpened, { close, open }] = useDisclosure(false);
  const client = axios.create({
    baseURL: `${config().baseURL}/buckets`,
  })

  useEffect(() => {
    if (uploads.length === 0) return;
    const file = uploads[0]
    const filename = file.path;
    client.post(`${paths.join('/')}/${filename}`, file, {
      onUploadProgress: progressEvent => {
        const percent = Math.floor(progressEvent.progress ? progressEvent.progress * 100 : 0.01 * 100);
        setProgress(percent);
      }
    }).then(() => {
      const updated = [...uploads];
      updated.shift()
      setUploads(updated);
    });
  }, [uploads])

  function uploadFiles(files: FileWithPath[]) {
    setUploads([...uploads, ...files]);
  }

  return (
    <div>
      <Button onClick={open}
        leftIcon={uploads.length > 0 ? <Loader size="sm" color='white' /> : <FileUpload />}>
        Upload
      </Button>
      <Modal
        opened={uploadOpened}
        centered
        onClose={() => {
          close();
          location.reload();
        }}
        title="Upload Files"
      >
        <Dropzone
          onDrop={(files) => uploadFiles(files)}
        >
          <Group position="center" spacing="xl" style={{ minHeight: 100, pointerEvents: 'none' }}>
            <Dropzone.Accept>
              <Upload
                size={50}
                color={theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]}
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <X
                size={50}
                color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
              />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <FileUpload size={50} />
            </Dropzone.Idle>

            <Group position={'center'}>
              <Text size="xl" inline>
                Drag files here or click to select files
              </Text>
              <Text size="sm" color="dimmed" inline mt={7}>
                You can drag multiple files at a time
              </Text>
            </Group>
          </Group>
        </Dropzone>
        {uploads.length > 0 ?
          <Paper shadow="xs" radius="md" p="md" mt={24}>
            {uploads.map((u, i) =>
            (
              <div key={i}><Text>{u.path}</Text><Progress value={i === 0 ? progress : 0} animate /><Divider my="sm" /></div>
            ))}
          </Paper>
          : <></>
        }
      </Modal>
    </div >
  )
}

export default UploadFiles