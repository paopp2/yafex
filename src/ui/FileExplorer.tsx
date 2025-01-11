import { Input } from "@/components/ui/input";
import { FolderInputDialog } from "./dialogs/FolderInputDialog";
import { FileInputDialog } from "./dialogs/FileInputDialog";
import { FileList } from "./FileList";
import { Breadcrumbs } from "./Breadcrumbs";

export default function FileExplorer() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-auto w-full max-w-4xl space-y-4 p-4">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex gap-2">
            <FolderInputDialog />
            <FileInputDialog />
          </div>

          <div className="flex-1">
            <Input
              type="search"
              placeholder="Search files..."
              className="w-full"
            />
          </div>
        </div>

        <Breadcrumbs />

        <FileList />
      </div>
    </div>
  );
}
