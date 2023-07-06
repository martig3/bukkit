import { ActionIcon, Menu } from "@mantine/core";
import { DotsVertical, Settings, Trash } from "tabler-icons-react";
import DeleteBucket from "./delete-bucket";
import { useDisclosure } from "@mantine/hooks";
export default function BucketMenu() {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <DeleteBucket opened={opened} close={close} />
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <ActionIcon>
            <DotsVertical />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item disabled={true} icon={<Settings size={14} />}>
            Settings
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item color="red" icon={<Trash size={14} />} onClick={open}>
            <span> Delete Bucket</span>
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
}
