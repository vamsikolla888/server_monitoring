import { Dispatch, SetStateAction } from "react";

export interface IFiles {
  _id: string;
  name: string;
  path: string;
  type: "dir" | "file"
  relativePath?: string;
  isRoot: boolean;
  parentId: string;
  size: string;
  noOfFiles: number;
}

export interface IFilter {
  criteria: ICriteria[],
  sortField?: string;
  direction?: string;
  limit?: number;
  page?: number;
}

export interface ICriteria {
  key: string;
  value: string | number | boolean | undefined;
  type: string;
}

export interface IFilesResponse {
  files: IFiles[];
}

export interface FileManagerHistory {
  href: string;
  title: string;
}

export interface IFileManagerContext {
  fileManagerHistory: FileManagerHistory[] | null
  setFileManagerHistory: Dispatch<SetStateAction<FileManagerHistory[]>>;
}

export const defaultFilter = {
  criteria: [],
  sortField: "created",
  direction: "desc",
  limit: 20,
  page: 1
}