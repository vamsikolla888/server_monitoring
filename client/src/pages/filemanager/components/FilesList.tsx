
import { useContext, useEffect, useState } from "react";
import { debounce } from "lodash"
import { IFiles } from "../types/types";
import FileCard from "./FileCard";
import SectionHeader from "./SectionHeader";
import { useGetFilesQuery, useSearchFilesMutation } from "@/redux/api/files.api";
import { FileManagerContext } from "../context/FileManagerProvider";


interface IFilesList {
  fileId?: string;
}
const FilesList = ({ fileId }: IFilesList) => {
  const _context = useContext(FileManagerContext);
  const search = _context?.search

  /**@States */
  const [searchedFiles, setSearchedFiles] = useState<IFiles[]>([]);
  const { data, refetch } = useGetFilesQuery(fileId ? { criteria: [{ key: "parentId", value: fileId, type: "eq"}]}: undefined, { skip: !!search });
  const [searchFiles] = useSearchFilesMutation();

  useEffect(() => {
    refetch();
  },[fileId]);

  useEffect(() => {
    // Debounced API call
    const debouncedSearch = debounce((searchTerm) => {
      searchFiles({ search: searchTerm, directoryPath: _context?.currentDirectoryPath })
        .then(response => {
          setSearchedFiles(response.data?.files as IFiles[]);
        });
    }, 300); // Adjust delay as needed (e.g., 300ms)
  
    if (search) {
      debouncedSearch(search); // Call the debounced function
    }
  
    // Cleanup on unmount or when search changes to avoid memory leaks
    return () => {
      debouncedSearch.cancel();
    };
  }, [search, _context?.currentDirectoryPath]);
  // Separate folders and files
  const folders: IFiles[] = search ? searchedFiles?.filter(file => file.type === "dir") : data?.files.filter(file => file.type === "dir") || [];
  const documents: IFiles[] = search ? searchedFiles?.filter(file => file.type !== "dir") : data?.files.filter(file => file.type !== "dir") || [];

  return (
    <div className='w-full h-full pt-6 px-4 space-y-8'>
      {/* Folders Section */}
      {folders.length > 0 && (
        <div>
          <SectionHeader title="Folders" count={folders.length} />
          <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
            {folders.map((folder) => (
              <FileCard key={folder._id} file={folder} />
            ))}
          </div>
        </div>
      )}

      {/* Files Section */}
      {documents.length > 0 && (
        <div>
          <SectionHeader title="Files" count={documents.length} />
          <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
            {documents.map((file) => (
              <FileCard key={file._id} file={file} />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {data?.files?.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="text-slate-400 text-lg">No files or folders found</div>
        </div>
      )}
    </div>
  )
}

export default FilesList;