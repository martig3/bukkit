import { ActionIcon, Group, Table, Text, UnstyledButton } from '@mantine/core';
import { FileInfo } from '../model/file-info';
import { Download, Folder, LineDashed } from 'tabler-icons-react';
import { formatFileSize } from '../../utils/file-size';

function FileList() {
  const files: FileInfo[] = [
    { name: 'folder', isDirectory: true, size: undefined, createdAt: new Date() },
    { name: 'archive.zip', isDirectory: false, size: 1_000_000, createdAt: new Date() },
    { name: 'file.png', isDirectory: false, size: 2_000_000, createdAt: new Date() },
  ]
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
          : <Text sx={(theme) => ({padding: theme.spacing.xs})}>{file.name}</Text>}
      </td>
      <td>{file.size ? formatFileSize(file.size) : <LineDashed/>}</td>
      <td>{file.createdAt.toLocaleDateString()}</td>
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

export default FileList
