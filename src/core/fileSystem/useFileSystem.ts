import { FileSystem } from "./fileSystem";
import { useMemo } from "react";
import { atom, useAtom } from "jotai";
import { File } from "./fileNode";

export const fileSystemAtom = atom<FileSystem>(new FileSystem());

const currentPathAtom = atom<string>("/");

export const useFileSystem = () => {
  const [fileSystem, setFileSystem] = useAtom(fileSystemAtom);
  const [currentPath, setCurrentPath] = useAtom(currentPathAtom);

  const currentPathFiles: File[] = useMemo(() => {
    return fileSystem.listNodes(currentPath).map((node) => node.asFile());
  }, [fileSystem, currentPath]);

  const createFile = (fileName: string) => {
    fileSystem.insertNode(`${currentPath}/${fileName}`, { isFile: true });
    setFileSystem(fileSystem.clone());
  };

  const createFolder = (folderName: string) => {
    fileSystem.insertNode(`${currentPath}/${folderName}`, { isFile: false });
    setFileSystem(fileSystem.clone());
  };

  const navigateTo = (path: string) => {
    setCurrentPath(path);
  };

  return {
    createFile,
    createFolder,
    navigateTo,
    currentPath,
    currentPathFiles,
  };
};
