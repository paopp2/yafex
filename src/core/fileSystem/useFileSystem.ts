import { useMemo } from "react";
import { useAtom, useAtomValue } from "jotai";
import { File } from "./fileNode";
import { useFileSearch } from "../fileSearch/useFileSearch";
import { fileSystemAtom, pathToFileMapAtom, currentPathAtom } from "../store";

export const useFileSystem = () => {
  const pathToFileMap = useAtomValue(pathToFileMapAtom);
  const [fileSystem, setFileSystem] = useAtom(fileSystemAtom);
  const [currentPath, setCurrentPath] = useAtom(currentPathAtom);
  const { addToIndex } = useFileSearch();

  const currentPathFiles: File[] = useMemo(() => {
    return fileSystem
      .listNodes(currentPath)
      .map((node) => node.asFile(pathToFileMap[node.path]?.content));
  }, [fileSystem, currentPath, pathToFileMap]);

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
