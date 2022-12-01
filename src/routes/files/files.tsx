import { ActionIcon, Group, Table, Text, UnstyledButton } from '@mantine/core';
import { Download, Folder, LineDashed } from 'tabler-icons-react';
import { formatFileSize } from '../../utils/file-size';
import { useLoaderData } from 'react-router-dom';
import { FileInfo } from '../../model/file-info';
import { config } from '../../utils/config';


function Files() {
  const { files } = useLoaderData() as { files: FileInfo[] };
  console.log(files);
  const rows = files.map((file) => (
    <tr key={file.name}>
      <td>
        {file.isDirectory ?
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
          : <Text sx={(theme) => ({ padding: theme.spacing.xs })}>{file.name}</Text>}
      </td>
      <td>{file.size ? formatFileSize(file.size) : <LineDashed/>}</td>
      <td>{file.modifiedAt.toLocaleDateString()}</td>
      <td>
        <ActionIcon radius="xl" size={26} variant={'filled'}>
          <Download size={18}/>
        </ActionIcon>
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

export default Files

// @ts-ignore
export async function loader({ params }): Promise<{ files: FileInfo[] }> {
  const bucket_name = params.bucket;
  const resp = await fetch(`${config().baseURL}/buckets/${bucket_name}`);
  const files = await resp.json();
  return { files }
}
