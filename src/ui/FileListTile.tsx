import { ChevronRightIcon, FileIcon, FolderIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFileSystem } from "@/core/fileSystem/useFileSystem";
import { File } from "@/core/fileSystem/fileNode";

export function FileListTile(file: File) {
  const { navigateTo } = useFileSystem();

  return (
    <div
      key={file.path}
      className={cn(
        "flex items-center gap-2 p-2 hover:bg-muted cursor-pointer",
        !file.isFile && "bg-muted/50"
      )}
      onDoubleClick={() => {
        if (!file.isFile) {
          navigateTo(file.path);
        }

        // TODO: Open file
      }}
    >
      {!file.isFile ? (
        <FolderIcon className="h-4 w-4 text-gray-500 fill-gray-500" />
      ) : (
        <FileIcon className="h-4 w-4 text-gray-500" />
      )}
      <span className="flex-1">{file.name}</span>
      {!file.isFile && <ChevronRightIcon className="h-4 w-4 text-gray-500" />}
    </div>
  );
}