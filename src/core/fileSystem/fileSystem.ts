import { FileNode } from "./fileNode";
import _ from "lodash";

export const DELIMITER = "/";

export class FileSystem {
  private root: FileNode;

  constructor() {
    this.root = new FileNode(DELIMITER);
  }

  clone(): FileSystem {
    return _.cloneDeep(this);
  }

  insertNode(
    path: string,
    { isFile = false }: { isFile?: boolean } = {}
  ): FileNode {
    let node: FileNode = this.root;
    const parts = path.split(DELIMITER).filter(Boolean);

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (!node.children.has(part)) {
        // - Remove duplicate DELIMITERs e.g. ("/a/b//c" -> "/a/b/c")
        const sanitizedPath = path.replace(
          new RegExp(`\\${DELIMITER}+`, "g"),
          DELIMITER
        );

        node.children.set(part, new FileNode(sanitizedPath, false));
      }
      node = node.children.get(part) as FileNode;
    }

    node.isFile = isFile;
    if (isFile) {
      node.path = parts[parts.length - 1];
    }

    return node;
  }

  listNodes(path: string): FileNode[] {
    const result: FileNode[] = [];
    const node = this.searchNode(path);

    if (!node) {
      return result;
    }

    if (node.isFile) {
      result.push(node);
    } else {
      for (const childName of node.children.keys()) {
        result.push(node.children.get(childName) as FileNode);
      }
    }

    result.sort((a, b) => {
      // Return folders before files
      if (a.isFile !== b.isFile) {
        return a.isFile ? 1 : -1;
      }
      return a.name.localeCompare(b.name);
    });
    return result;
  }

  private searchNode(path: string): FileNode | null {
    let node: FileNode = this.root;
    const parts = path.split(DELIMITER).filter(Boolean);

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (!node.children.has(part)) {
        return null;
      }
      node = node.children.get(part) as FileNode;
    }

    return node;
  }
}
