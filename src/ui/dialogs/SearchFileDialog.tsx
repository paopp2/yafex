import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileIcon, FolderIcon, Search } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useFileSearchIndex } from "@/core/fileSearch/useFileSearchIndex";
import { useState } from "react";
import { File } from "@/core/fileSystem/fileNode";
import { useFileSystem } from "@/core/fileSystem/useFileSystem";

export function SearchFileDialog() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [results, setResults] = useState<File[]>([]);
  const { search } = useFileSearchIndex();
  const { navigateTo } = useFileSystem();

  const onChange = (query: string) => {
    const results = search(query);
    setResults(results);
  };

  const onSelect = (file: File) => {
    navigateTo(file.path);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-[300px] justify-start text-muted-foreground"
        >
          <Search className="mr-2 h-4 w-4" />
          Search files...
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search files..."
            value={value}
            onValueChange={(value) => {
              setValue(value);
              onChange(value);
            }}
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {results.map((file) =>
              file.isFile ? (
                <CommandItem
                  key={file.name}
                  value={file.name}
                  onSelect={() => onSelect(file)}
                >
                  <FileIcon className="mr-2 h-4 w-4" />
                  {file.name}
                </CommandItem>
              ) : (
                <CommandItem key={file.name} onSelect={() => onSelect(file)}>
                  <FolderIcon className="mr-2 h-4 w-4" />
                  {file.name}
                </CommandItem>
              )
            )}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
