import { DELIMITER } from "./fileSystem";

export interface File {
  name: string;
  path: string;
  isFile: boolean;
}

export class FileNode {
  path: string;
  children: Map<string, FileNode>;
  isFile: boolean;

  constructor(name: string, isFile: boolean = false) {
    this.path = name;
    this.children = new Map<string, FileNode>();
    this.isFile = isFile;
  }

  get name() {
    return this.path.split(DELIMITER).filter(Boolean).pop() ?? "";
  }

  asFile(): File {
    return {
      name: this.name,
      path: this.path,
      isFile: this.isFile,
    };
  }
}
