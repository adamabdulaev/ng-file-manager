export interface IDirectoryDTO {
  id: number;
  title: string;
  children?: IDirectoryDTO[];
}

export interface IDirectoryTreeItem {
  id: number;
  title: string;
  isOpen: boolean;
  type: TreeItemTypes;
  isLoading: boolean;
  children: IDirectoryTreeItem[];
  icon: string;
}

export enum TreeItemTypes {
  File = 'file',
  Directory = 'directory',
}
