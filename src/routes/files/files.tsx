import { ActionIcon, Anchor, Group, Table, Text, UnstyledButton } from '@mantine/core';
import { Download, Folder, LineDashed } from 'tabler-icons-react';
import { formatFileSize } from '../../utils/file-size';
import { useLoaderData, useLocation, useParams } from 'react-router-dom';
import { FileInfo } from '../../model/file-info';
import { config } from '../../utils/config';


function Files() {
  const { bucket } = useParams();
  const { files } = useLoaderData() as { files: FileInfo[] };
  const location = useLocation();
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
                  <Folder/>
                  <Text size="sm">{file.name}</Text>
                </Group>
              </UnstyledButton>
            </Anchor>
          </div>
          : <Text sx={(theme) => ({ padding: theme.spacing.xs })}>{file.name}</Text>}
      </td>
      <td>{file.size && !file.isDirectory ? formatFileSize(file.size) : <LineDashed/>}</td>
      <td>{new Date(file.modifiedAt).toLocaleDateString()}</td>
      <td>
        {!file.isDirectory && bucket ?
          <a href={downloadUrl(file, bucket)} download>
            <ActionIcon radius="xl" size={26} variant={'filled'}>
              <Download size={18}/>
            </ActionIcon>
          </a>
          : ''}
      </td>
    </tr>
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

function downloadUrl(file: FileInfo, bucket: string) {
  return `${config().baseURL}/buckets/${bucket}/${file.name}`;
}

export default Files

// @ts-ignore
export async function loader({ params }): Promise<{ files: FileInfo[] }> {
  const bucket_name = params.bucket;
  const path = params['*'];
  const resp = await fetch(`${config().baseURL}/buckets/${bucket_name}/${path}`);
  const files = await resp.json();
  return { files }
}
