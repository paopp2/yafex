import { FileListTile } from "./FileListTile";
import { useFileSystem } from "@/core/fileSystem/useFileSystem";
import { File } from "@/core/fileSystem/fileNode";

export function FileList() {
  const { currentPathFiles: files } = useFileSystem();

  return (
    <div className="border rounded-lg divide-y">
      {files.length === 0 ? (
        <div className="p-4 text-center text-muted-foreground">
          No files found
        </div>
      ) : (
        files.map((file: File) => <FileListTile key={file.name} {...file} />)
      )}
    </div>
  );
}
