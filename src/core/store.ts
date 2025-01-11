import { atom } from "jotai";
import { File } from "./fileSystem/fileNode";
import { FileSystem } from "./fileSystem/fileSystem";

export const pathToFileMapAtom = atom<Record<string, File>>({});

export const fileSystemAtom = atom<FileSystem>(new FileSystem());

export const currentPathAtom = atom<string>("/");
