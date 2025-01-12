import { useState } from "react";
import {
  Dialog,
  DialogDescription,
  DialogTitle,
  DialogHeader,
  DialogContent,
} from "@/components/ui/dialog";
import { useFileSystem } from "@/core/fileSystem/useFileSystem";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

export type FileInput = {
  name: string;
  content?: string;
};

type Props = {
  name?: string;
  content?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export function FileInputDialog({
  name = "",
  content,
  open = false,
  setOpen,
}: Props) {
  const [fileName, setFileName] = useState(name);
  const [fileContent, setFileContent] = useState(content);
  const { createFile } = useFileSystem();

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleCreateFile({
        name: fileName,
        content: fileContent,
      });
    }
  };

  const handleCreateFile = ({ name, content }: FileInput) => {
    createFile(name, content);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        key={name}
        className="sm:max-w-[525px]"
        onKeyDown={handleKeyDown}
      >
        <DialogHeader>
          <DialogTitle>Create New File</DialogTitle>
          <DialogDescription>
            Enter a name and content for your new file
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div className="space-y-2">
            <label htmlFor="fileName" className="text-sm font-medium">
              File Name
            </label>
            <Input
              id="fileName"
              placeholder="Enter file name"
              required
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="fileContent" className="text-sm font-medium">
              File Content
            </label>
            <Textarea
              id="fileContent"
              placeholder="Enter file content"
              rows={8}
              value={fileContent}
              onChange={(e) => setFileContent(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            disabled={!fileName}
            onClick={() =>
              handleCreateFile({
                name: fileName,
                content: fileContent,
              })
            }
          >
            Create File
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
