# Yafex (Yet Another File Explorer) 🗂️

A simple in-browser file explorer that could store text files and folders (note: as of writing, reloading would remove all your files and folders. So you know.. maybe not the best to save important stuff. **But other than that, it's great!**)

## Features

- **In-Memory File System**

  - Stored in a trie-based data structure for efficient file and directory operations

- **Fuzzy Search**
  - Search through file names, paths, and contents
  - Powered by [fuzzysort](https://github.com/farzher/fuzzysort)

## Technologies

- Built with React + Typescript (Vite)

### Installation

```bash
yarn install
```

### Development

To start the development server:

```bash
yarn start
```

This will launch the application in development mode with hot reload enabled.

## Project Structure

```
src/
├── core/                  # Core implementation
│   ├── fileSystem/        # File system implementation
│   └── fileSearch/        # Search functionality
├── components/            # Shadcn UI components
├── ui/                    # Main UI components
└── lib/                   # Utility functions
```

## TODO

- [ ] Persist files/folders on reload (I think it's more useful this way)
- [ ] Rename files/folders
- [ ] Delete files/folders
- [ ] Move files/folders
- [ ] Support other types than just text
