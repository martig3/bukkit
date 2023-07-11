export type FileInfo = {
  name: string;
  isDirectory: boolean;
  size: number;
  modifiedAt: string;
  createdBy?: string;
};
