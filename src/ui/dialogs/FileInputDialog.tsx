import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { FileTextIcon } from "lucide-react";
import { useState } from "react";
import { useFileSystem } from "@/core/fileSystem/useFileSystem";

export function FileInputDialog() {
  const [isFileDialogOpen, setIsFileDialogOpen] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileContent, setFileContent] = useState("");
  const { createFile } = useFileSystem();

  const handleCreateFile = () => {
    createFile(fileName);
    setIsFileDialogOpen(false);
  };

  return (
    <Dialog open={isFileDialogOpen} onOpenChange={setIsFileDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <FileTextIcon className="h-4 w-4 mr-2" />
          New File
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
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
          <Button variant="outline" onClick={() => setIsFileDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreateFile}>Create File</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
