import { File } from "./File";

export interface FileItem {
  name: string;
  type: "file" | "folder";
  path: string;
  content?: string;
}

const files: FileItem[] = [
  { name: "Documents", type: "folder", path: "/documents" },
  { name: "Images", type: "folder", path: "/images" },
  { name: "report.pdf", type: "file", path: "/report.pdf" },
  { name: "presentation.pptx", type: "file", path: "/presentation.pptx" },
  { name: "budget.xlsx", type: "file", path: "/budget.xlsx" },
  {
    name: "notes.txt",
    type: "file",
    path: "/notes.txt",
    content: "Sample notes content",
  },
];

export function FileList() {
  return (
    <div className="border rounded-lg">
      {files.length === 0 ? (
        <div className="p-4 text-center text-muted-foreground">
          No files found
        </div>
      ) : (
        // TODO: Remove this once we have a proper type for the file
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        files.map((file: any, index) => (
          <>
            <File key={file.path} {...file} />
            {index < files.length - 1 && <div className="h-px bg-border" />}
          </>
        ))
      )}
    </div>
  );
}
