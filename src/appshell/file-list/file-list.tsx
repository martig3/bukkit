import { ActionIcon, Table } from '@mantine/core';
import { FileInfo } from '../model/file-info';
import { Download } from 'tabler-icons-react';
import { formatFileSize } from '../../utils/file-size';

function FileList() {
  const files: FileInfo[] = [
    { name: 'file.png', size: 2_000_000, createdAt: new Date() },
    { name: 'archive.zip', size: 1_000_000, createdAt: new Date() },
  ]
  const rows = files.map((file) => (
    <tr key={file.name}>
      <td>{file.name}</td>
      <td>{formatFileSize(file.size)}</td>
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
        <th>Filename</th>
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
