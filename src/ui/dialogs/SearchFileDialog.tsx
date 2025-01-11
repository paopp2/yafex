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
import { useFileSearch } from "@/core/fileSearch/useFileSearch";
import { useState } from "react";
import { File } from "@/core/fileSystem/fileNode";
import { useFileSystem } from "@/core/fileSystem/useFileSystem";
import { useDebouncedCallback } from "use-debounce";

export function SearchFileDialog() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [results, setResults] = useState<File[]>([]);
  const { search } = useFileSearch();
  const { navigateTo } = useFileSystem();

  const onChange = useDebouncedCallback(async (query: string) => {
    const results = await search(query);
    setResults(results);
  }, 200);

  const onSelect = (file: File) => {
    navigateTo(file.dirPath);
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
          Search files, folders, content...
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search files, folders, content..."
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
                  <FileIcon className="mr-2 h-4 w-4 " />
                  {file.name}
                </CommandItem>
              ) : (
                <CommandItem key={file.name} onSelect={() => onSelect(file)}>
                  <FolderIcon className="mr-2 h-4 w-4  text-gray-500 fill-gray-500" />
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
