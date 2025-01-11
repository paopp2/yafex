import { atom, useAtom } from "jotai";
import { File } from "../fileSystem/fileNode";
import fuzzysort from "fuzzysort";

export const idToFileAtom = atom<Record<string, File>>({});

export const useFileSearchIndex = () => {
  const [idToFile, setIdToFile] = useAtom(idToFileAtom);

  const addToIndex = (file: File) => {
    setIdToFile((prev) => ({ ...prev, [file.path]: file }));
  };

  const search = (query: string): File[] => {
    return fuzzysort
      .go(query, Object.values(idToFile), {
        keys: ["path", "name"],
      })
      .map((result) => result.obj);
  };

  return {
    addToIndex,
    search,
  };
};
