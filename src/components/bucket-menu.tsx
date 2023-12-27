import { ActionIcon, Menu } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useLocation } from "react-router-dom";
import { IconDotsVertical, IconSettings, IconTrash } from "@tabler/icons-react";
import DeleteBucket from "./delete-bucket";
export default function BucketMenu() {
  const [opened, { open, close }] = useDisclosure(false);
  const location = useLocation();
  return (
    <>
      <DeleteBucket opened={opened} close={close} />
      <Menu
        shadow="md"
        width={200}
        disabled={!location.pathname.includes("buckets/")}
      >
        <Menu.Target>
          <ActionIcon disabled={!location.pathname.includes("buckets/")}>
            <IconDotsVertical />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item disabled={true} icon={<IconSettings size={14} />}>
            Settings
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item color="red" icon={<IconTrash size={14} />} onClick={open}>
            <span> Delete Bucket</span>
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
}
