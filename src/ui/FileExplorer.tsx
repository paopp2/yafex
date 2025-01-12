import { FolderInputDialog } from "./dialogs/FolderInputDialog";
import { FileInputDialog } from "./dialogs/FileInputDialog";
import { FileList } from "./FileList";
import { Breadcrumbs } from "./Breadcrumbs";
import { SearchFileDialog } from "./dialogs/SearchFileDialog";
import { FileTextIcon, FolderPlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function FileExplorer() {
  const [fileInputOpen, setFileInputOpen] = useState(false);
  const [folderInputOpen, setFolderInputOpen] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-auto w-full max-w-4xl space-y-4 p-4">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex-1 flex gap-6">
            <Button variant="outline" onClick={() => setFolderInputOpen(true)}>
              <FolderPlusIcon className="h-4 w-4 mr-2" />
              New Folder
            </Button>
            <FolderInputDialog
              open={folderInputOpen}
              setOpen={setFolderInputOpen}
            />

            <Button variant="outline" onClick={() => setFileInputOpen(true)}>
              <FileTextIcon className="h-4 w-4 mr-2" />
              New File
            </Button>
            <FileInputDialog
              name=""
              content=""
              open={fileInputOpen}
              setOpen={setFileInputOpen}
            />
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
