import { FileSystem } from "./fileSystem";
import { useMemo } from "react";
import { atom, useAtom } from "jotai";
import { File } from "./fileNode";
import { useFileSearchIndex } from "../fileSearch/useFileSearchIndex";

export const fileSystemAtom = atom<FileSystem>(new FileSystem());

const currentPathAtom = atom<string>("/");

export const useFileSystem = () => {
  const [fileSystem, setFileSystem] = useAtom(fileSystemAtom);
  const [currentPath, setCurrentPath] = useAtom(currentPathAtom);
  const { addToIndex } = useFileSearchIndex();

  const currentPathFiles: File[] = useMemo(() => {
    return fileSystem.listNodes(currentPath).map((node) => node.asFile());
  }, [fileSystem, currentPath]);

  const createFile = (fileName: string) => {
    const newNode = fileSystem.insertNode(`${currentPath}/${fileName}`, {
      isFile: true,
    });
    addToIndex(newNode.asFile());
    setFileSystem(fileSystem.clone());
  };

  const createFolder = (folderName: string) => {
    const newNode = fileSystem.insertNode(`${currentPath}/${folderName}`, {
      isFile: false,
    });
    addToIndex(newNode.asFile());
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
