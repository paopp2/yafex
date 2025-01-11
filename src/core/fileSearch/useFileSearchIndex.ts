import { useAtom } from "jotai";
import { File } from "../fileSystem/fileNode";
import fuzzysort from "fuzzysort";
import { pathToFileMapAtom } from "../store";

export const useFileSearchIndex = () => {
  const [pathToFileMap, setPathToFileMap] = useAtom(pathToFileMapAtom);

  const addToIndex = (file: File) => {
    setPathToFileMap((prev) => ({ ...prev, [file.path]: file }));
  };

  const search = (query: string): File[] => {
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
