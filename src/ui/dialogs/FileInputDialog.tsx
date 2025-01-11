import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { FileInput, FileInputDialogContent } from "./FileInputDialogContent";
import { useFileSystem } from "@/core/fileSystem/useFileSystem";

type Props = {
  children: React.ReactNode;
  name?: string;
  content?: string;
};

export function FileInputDialog({ children, name = "", content = "" }: Props) {
  const [isFileDialogOpen, setIsFileDialogOpen] = useState(false);
  const { createFile } = useFileSystem();

  const handleCreateFile = ({ name, content }: FileInput) => {
    createFile(name, content);
    setIsFileDialogOpen(false);
  };

  return (
    <Dialog open={isFileDialogOpen} onOpenChange={setIsFileDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <FileInputDialogContent
        fileInput={{ name, content }}
        onSubmit={handleCreateFile}
        onClose={() => setIsFileDialogOpen(false)}
      />
    </Dialog>
  );
}
