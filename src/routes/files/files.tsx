import { ActionIcon, Anchor, Group, Table, Text, UnstyledButton } from '@mantine/core';
import { Download, FileX, Folder, LineDashed } from 'tabler-icons-react';
import { formatFileSize } from '../../utils/file-size';
import { useLoaderData, useLocation, useParams } from 'react-router-dom';
import { FileInfo } from '../../model/file-info';
import { config } from '../../utils/config';
import { useState } from 'react';


function Files() {
  const { bucket } = useParams();
  const { files } = useLoaderData() as { files: FileInfo[] };
  const location = useLocation();
  const params = useParams();
  const path = params['*'] ? params['*'] : '';
  const rows = files.map((file) => (
    <tr key={file.name}>
      <td>
        {file.isDirectory ?
          <div>
            <Anchor href={`${location.pathname}/${file.name}`}>
              <UnstyledButton
                sx={(theme) => ({
                  display: 'block',
                  width: 'fit-content',
                  padding: theme.spacing.xs,
                  borderRadius: theme.radius.sm,
                  color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
                  '&:hover': {
                    backgroundColor:
                      theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                  },
                })}
              >
                <Group spacing={4}>
                  <Folder />
                  <Text size="sm">{file.name}</Text>
                </Group>
              </UnstyledButton>
            </Anchor>
          </div>
          :
          <Anchor href={downloadUrl(file, bucket ? bucket : '', path)} download>
            <UnstyledButton
              sx={(theme) => ({
                display: 'block',
                width: 'fit-content',
                padding: theme.spacing.xs,
                borderRadius: theme.radius.sm,
                color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
                '&:hover': {
                  backgroundColor:
                    theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                },
              })}
            >
              <Text size="sm" weight={'normal'}>{file.name}</Text>
            </UnstyledButton>
          </Anchor>
        }
      </td>
      <td>{file.size && !file.isDirectory ? formatFileSize(file.size) : <LineDashed />}</td>
      <td>{new Date(file.modifiedAt).toLocaleDateString()}</td>
      <td>
        <Group>
          {bucket ?
            <ActionIcon radius="xl" size={26} variant={'filled'} onClick={() => deleteFile(file, bucket, path)}>
              <FileX size={18} color={'red'} />
            </ActionIcon>
            : ''}
        </Group>
      </td>
    </tr >
  ));

  return (
    <Table>
      <thead>
        <tr>
          <th></th>
          <th>Size</th>
          <th>Modified</th>
          <th></th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}

function downloadUrl(file: FileInfo, bucket: string, path: string) {
  return `${config().baseURL}/buckets/${bucket}/${path}${file.name}`;
}

async function deleteFile(file: FileInfo, bucket: string, path: string) {
  const url = `${config().baseURL}/buckets/${bucket}/${path}${file.name}`;
  const resp = await fetch(url, { method: 'DELETE' });
  if (resp.status === 204) {
    location.reload();
  }

}

async function getFiles(bucket: string, path: string): Promise<FileInfo[]> {
  const resp = await fetch(`${config().baseURL}/buckets/${bucket}/${path}`);
  return await resp.json();
}

export default Files

// @ts-ignore
export async function loader({ params }): Promise<{ files: FileInfo[] }> {
  const bucket = params.bucket;
  const path = params['*'];
  const files = await getFiles(bucket, path);
  return { files }
}

