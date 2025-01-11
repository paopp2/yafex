import { FileSystem } from "./fileSystem";
import { useMemo } from "react";
import { atom, useAtom, useAtomValue } from "jotai";
import { File } from "./fileNode";
import {
  idToFileAtom,
  useFileSearchIndex,
} from "../fileSearch/useFileSearchIndex";

export const fileSystemAtom = atom<FileSystem>(new FileSystem());

const currentPathAtom = atom<string>("/");

export const useFileSystem = () => {
  const idToFile = useAtomValue(idToFileAtom);
  const [fileSystem, setFileSystem] = useAtom(fileSystemAtom);
  const [currentPath, setCurrentPath] = useAtom(currentPathAtom);
  const { addToIndex } = useFileSearchIndex();

  const currentPathFiles: File[] = useMemo(() => {
    return fileSystem
      .listNodes(currentPath)
      .map((node) => node.asFile(idToFile[node.path]?.content));
  }, [fileSystem, currentPath, idToFile]);

  const createFile = (fileName: string, fileContent?: string) => {
    const newNode = fileSystem.insertNode(`${currentPath}/${fileName}`, {
      isFile: true,
    });
    addToIndex(newNode.asFile(fileContent));
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
