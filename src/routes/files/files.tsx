import {
  ActionIcon,
  Anchor,
  Group,
  Table,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { FileX, Folder, LineDashed } from "tabler-icons-react";
import { formatFileSize } from "../../utils/file-size";
import {
  Link,
  LoaderFunctionArgs,
  useLoaderData,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { FileInfo } from "../../model/file-info";
import { config } from "../../utils/config";

function Files() {
  const { bucket } = useParams();
  const { files } = useLoaderData() as { files: FileInfo[] };
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const path = params["*"] ? params["*"] : "";
  const rows = files.map((file) => (
    <tr key={file.name} id="parent-row">
      <td>
        {file.isDirectory ? (
          <div>
            <Link to={`${location.pathname}/${file.name}`}>
              <UnstyledButton
                sx={(theme) => ({
                  display: "block",
                  width: "fit-content",
                  padding: theme.spacing.xs,
                  borderRadius: theme.radius.sm,
                  color:
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[0]
                      : theme.black,
                  "&:hover": {
                    backgroundColor:
                      theme.colorScheme === "dark"
                        ? theme.colors.dark[6]
                        : theme.colors.gray[0],
                  },
                })}
              >
                <Group spacing={4}>
                  <Folder />
                  <Text size="sm">{file.name}</Text>
                </Group>
              </UnstyledButton>
            </Link>
          </div>
        ) : (
          <Anchor href={downloadUrl(file, bucket ? bucket : "", path)} download>
            <UnstyledButton
              sx={(theme) => ({
                display: "block",
                width: "fit-content",
                padding: theme.spacing.xs,
                borderRadius: theme.radius.sm,
                color:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[0]
                    : theme.black,
                "&:hover": {
                  backgroundColor:
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[6]
                      : theme.colors.gray[0],
                },
              })}
            >
              <Text size="sm" weight={"normal"}>
                {file.name}
              </Text>
            </UnstyledButton>
          </Anchor>
        )}
      </td>
      <td>
        {file.size && !file.isDirectory ? (
          formatFileSize(file.size)
        ) : (
          <LineDashed />
        )}
      </td>
      <td>{new Date(file.modifiedAt).toLocaleDateString()}</td>
      <td>{file.createdBy !== "" ? file.createdBy : <LineDashed />}</td>
      <td>
        <Group className="delete-button">
          {bucket ? (
            <ActionIcon
              radius="xl"
              size={26}
              variant={"filled"}
              onClick={() => deleteFile(file, bucket, path, navigate)}
            >
              <FileX size={18} color={"red"} />
            </ActionIcon>
          ) : (
            ""
          )}
        </Group>
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
          <th>Updated By</th>
          <th></th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}

function downloadUrl(file: FileInfo, bucket: string, path: string) {
  return `${config().baseURL}/bucket/${bucket}/${
    path === "" ? "" : `${path}/`
  }${file.name}`;
}

async function deleteFile(
  file: FileInfo,
  bucket: string,
  path: string,
  navigate: any
) {
  const url = `${config().baseURL}/bucket/${bucket}/${path}/${file.name}`;
  const resp = await fetch(url, { method: "DELETE", credentials: "include" });
  if (resp.status === 204) {
    navigate(window.location.pathname);
  }
}

async function getFiles(bucket: string, path: string): Promise<FileInfo[]> {
  const resp = await fetch(`${config().baseURL}/bucket/${bucket}/${path}`, {
    credentials: "include",
  });
  return await resp.json();
}

export default Files;

export async function loader({
  params,
}: LoaderFunctionArgs): Promise<{ files: FileInfo[] }> {
  const bucket = params.bucket ?? "";
  const path = params["*"] ?? "";
  const files = await getFiles(bucket, path);
  return { files };
}
