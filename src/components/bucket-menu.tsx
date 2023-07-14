import { ActionIcon, Menu } from "@mantine/core";
import { DotsVertical, Settings, Trash } from "tabler-icons-react";
import DeleteBucket from "./delete-bucket";
import { useDisclosure } from "@mantine/hooks";
import { useLocation } from "react-router-dom";
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
