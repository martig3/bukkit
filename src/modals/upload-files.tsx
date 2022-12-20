import { Divider, Group, Modal, Paper, Progress, Text, useMantineTheme } from '@mantine/core';
import { Dropzone, FileWithPath } from '@mantine/dropzone';
import { FileUpload, Upload, X } from 'tabler-icons-react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { config } from '../utils/config';

function UploadFiles(props: { opened: boolean, close: any }) {
  const theme = useMantineTheme();
  const location = useLocation();
  const [paths] = useState(location.pathname.split('/').slice(2));
  const [progress, setProgress] = useState(-1);
  const [filename, setFilename] = useState('');
  const client = axios.create({
    baseURL: `${config().baseURL}/buckets`,
  })

  function uploadFiles(files: FileWithPath[]) {
    const file = files[0];
    if (!file?.path) {return;}
    setFilename(file?.path.toString());
    client.post(`${paths.join('/')}/${file.path}`, files[0], {
      onUploadProgress: progressEvent => {
        const percent = Math.floor(progressEvent.progress ? progressEvent.progress * 100 : 0.01 * 100);
        setProgress(percent)
      }
    }).then(() => {
      setFilename('');
      setProgress(-1);
    });
  }

  return (
    <div>
      <Modal
        opened={props.opened}
        centered
        onClose={props.close}
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
              <FileUpload size={50}/>
            </Dropzone.Idle>

            <Group position={'center'}>
              <Text size="xl" inline>
                Drag files here or click to select files
              </Text>
              <Text size="sm" color="dimmed" inline mt={7}>
                Attach as many files as you like
              </Text>
            </Group>
          </Group>
        </Dropzone>
        {filename !== '' ?
          <Paper shadow="xs" radius="md" p="md" mt={24}>
            <Text>{filename}</Text>
            {progress > 0 ? <><Progress value={progress} animate/><Divider my="sm"/></> : <span/>}
          </Paper>
          : <span/>
        }
      </Modal>
    </div>
  )
}

export default UploadFiles
