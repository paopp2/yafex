import { useAtom } from "jotai";
import { File } from "../fileSystem/fileNode";
import fuzzysort from "fuzzysort";
import { pathToFileMapAtom } from "../store";

export const useFileSearch = () => {
  const [pathToFileMap, setPathToFileMap] = useAtom(pathToFileMapAtom);

  const addToIndex = (file: File) => {
    setPathToFileMap((prev) => ({ ...prev, [file.path]: file }));
  };

  const search = async (query: string): Promise<File[]> => {
    // TODO: Just for demo purposes, should be removed in the future
    await new Promise((resolve) => setTimeout(resolve, 100));

    return fuzzysort
      .go(query, Object.values(pathToFileMap), {
        keys: ["path", "name", "content"],
      })
      .map((result) => result.obj);
  };

  return {
    addToIndex,
    search,
  };
};
