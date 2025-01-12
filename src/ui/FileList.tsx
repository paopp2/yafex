import { FileListTile } from "./FileListTile";
import { useFileSystem } from "@/core/fileSystem/useFileSystem";
import { File } from "@/core/fileSystem/fileNode";

export function FileList() {
  const {
    currentPathFiles: files,
    currentPathCounts: { fileCount, folderCount },
  } = useFileSystem();

  return (
    <>
      <div className="border rounded-lg divide-y">
        {files.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            No files found
          </div>
        ) : (
          files.map((file: File) => (
            <FileListTile key={file.name} file={file} />
          ))
        )}
      </div>
      <div className="text-sm text-muted-foreground text-right mt-2">
        {fileCount} files, {folderCount} folders
      </div>
    </>
  );
}
