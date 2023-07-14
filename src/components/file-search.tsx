import { Autocomplete, Input } from "@mantine/core";
import { useEffect, useState } from "react";
import { Search } from "tabler-icons-react";
import { config } from "../utils/config";
import { useLocation, useNavigate } from "react-router-dom";
import { useDebouncedState } from "@mantine/hooks";

export default function FileSearch() {
  const location = useLocation();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [debounce, setDebounce] = useDebouncedState("", 300);
  const [data, setData] = useState<any>([]);
  useEffect(() => {
    const getFiles = async () => {
      const bucketName = location.pathname.split("/")[2];
      if (!bucketName || search === "") {
        return;
      }
      const req = await fetch(
        `${config().baseURL}/search/bucket/${bucketName}?search=${search}`,
        { credentials: "include" }
      );
      const files = await req.json();
      setData(files);
    };
    getFiles();
  }, [debounce]);
  return (
    <Autocomplete
      icon={<Search />}
      value={search}
      disabled={!location.pathname.includes("buckets/")}
      onChange={(value) => {
        setDebounce(value);
        setSearch(value);
      }}
      onItemSubmit={(value: { value: string; path: string }) => {
        const paths = value.path.split("/");
        const folder = paths.slice(0, -1);
        navigate(`/buckets/${folder.join("/")}`);
        setSearch("");
      }}
      data={data.map((d: any) => ({ value: d.fileName, path: d.fullPath }))}
      placeholder="Search files"
    />
  );
}
