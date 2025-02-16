export interface IFiles {
  _id: string;
  name: string;
  path: string;
  type: "dir" | "file"
  relativePath?: string;
  isRoot: boolean;
  parentId: string;
  size: string;
}

export interface IFilter {
  criteria: ICriteria[],
  sortField?: string;
  direction?: string;
  limit?: number;
}

export interface ICriteria {
  key: string;
  value: string | number | boolean | undefined;
  type: string;
}

export interface IFilesResponse {
  files: IFiles[];
}