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

export function FileInputDialog() {
  const [isFileDialogOpen, setIsFileDialogOpen] = useState(false);

  return (
    <Dialog open={isFileDialogOpen} onOpenChange={setIsFileDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <FileTextIcon className="h-4 w-4 mr-2" />
          New File
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <form>
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
                name="path" // TODO: Include the whole path
                required
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
                name="content"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsFileDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Create File</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
