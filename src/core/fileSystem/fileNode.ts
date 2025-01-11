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

  get dirPath() {
    if (!this.isFile) return this.path;

    // Return the path without the file name
    const lastDelimiterIdx = this.path.lastIndexOf(DELIMITER);
    return lastDelimiterIdx === -1
      ? DELIMITER
      : this.path.substring(0, lastDelimiterIdx);
  }

  get name() {
    return this.path.split(DELIMITER).filter(Boolean).pop() ?? "";
  }

  asFile(): File {
    return {
      name: this.name,
      path: this.dirPath,
      isFile: this.isFile,
    };
  }
}
