import { Button } from "@/components/ui/button";
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { FolderPlusIcon } from "lucide-react";
import { useState } from "react";

export function FolderInputDialog() {
  const [isFolderDialogOpen, setIsFolderDialogOpen] = useState(false);

  return (
    <Dialog open={isFolderDialogOpen} onOpenChange={setIsFolderDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <FolderPlusIcon className="h-4 w-4 mr-2" />
          New Folder
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form>
          <DialogHeader>
            <DialogTitle>Create New Folder</DialogTitle>
            <DialogDescription>
              Enter a name for your new folder
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="Enter folder name"
              name="path"
              required={true}
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsFolderDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Create Folder</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
