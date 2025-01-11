import { FolderInputDialog } from "./dialogs/FolderInputDialog";
import { FileInputDialog } from "./dialogs/FileInputDialog";
import { FileList } from "./FileList";
import { Breadcrumbs } from "./Breadcrumbs";
import { SearchFileDialog } from "./dialogs/SearchFileDialog";
import { FileTextIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FileExplorer() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-auto w-full max-w-4xl space-y-4 p-4">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex-1 flex gap-6">
            <FolderInputDialog />
            <FileInputDialog>
              <Button variant="outline">
                <FileTextIcon className="h-4 w-4 mr-2" />
                New File
              </Button>
            </FileInputDialog>
          </div>

          <div className="flex">
            <SearchFileDialog />
          </div>
        </div>

        <Breadcrumbs />

        <FileList />
      </div>
    </div>
  );
}
