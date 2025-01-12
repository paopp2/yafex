import { Button } from "@/components/ui/button";
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useFileSystem } from "@/core/fileSystem/useFileSystem";
import { useState } from "react";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export function FolderInputDialog({ open, setOpen }: Props) {
  const [folderName, setFolderName] = useState("");
  const { createFolder } = useFileSystem();

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleCreateFolder();
    }
  };

  const handleCreateFolder = () => {
    createFolder(folderName);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent onKeyDown={handleKeyDown}>
        <DialogHeader>
          <DialogTitle>Create New Folder</DialogTitle>
          <DialogDescription>
            Enter a name for your new folder
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Input
            placeholder="Enter folder name"
            required={true}
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button disabled={!folderName} onClick={handleCreateFolder}>
            Create Folder
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
