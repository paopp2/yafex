import { ChevronRightIcon, FileIcon, FolderIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// TODO: Remove this once we have a proper type for the file
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function File(file: any) {
  return (
    <div
      key={file.path}
      className={cn(
        "flex items-center gap-2 p-2 hover:bg-muted cursor-pointer",
        file.type === "folder" && "bg-muted/50"
      )}
      onDoubleClick={() => {
        if (file.type === "folder") {
          // TODO: Nav to folder
          console.log(`TODO: Nav to ${file.name}`);
        }

        // TODO: Open file
        console.log(`TODO: Open ${file.name}`);
      }}
    >
      {file.type === "folder" ? (
        <FolderIcon className="h-4 w-4 text-gray-500 fill-gray-500" />
      ) : (
        <FileIcon className="h-4 w-4 text-gray-500" />
      )}
      <span className="flex-1">{file.name}</span>
      {file.type === "folder" && (
        <ChevronRightIcon className="h-4 w-4 text-gray-500" />
      )}
    </div>
  );
}
