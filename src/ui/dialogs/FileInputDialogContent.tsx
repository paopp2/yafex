import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export type FileInput = {
  name: string;
  content?: string;
};

type Props = {
  fileInput: FileInput;
  onSubmit: (input: FileInput) => void;
  onClose: () => void;
};

export function FileInputDialogContent({
  fileInput: { name, content },
  onSubmit,
  onClose,
}: Props) {
  const [fileName, setFileName] = useState(name);
  const [fileContent, setFileContent] = useState(content);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      onSubmit({
        name: fileName,
        content: fileContent,
      });
    }
  };

  return (
    <DialogContent className="sm:max-w-[525px]" onKeyDown={handleKeyDown}>
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
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button
          onClick={() =>
            onSubmit({
              name: fileName,
              content: fileContent,
            })
          }
        >
          Create File
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
