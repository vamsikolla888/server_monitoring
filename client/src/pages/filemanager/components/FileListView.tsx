import React, { useContext, useEffect, useState } from "react";
import { Search, Grid, List } from "lucide-react";
import FileCard from "./FileCard";
import { IFiles } from "../types/types";
import { PiFolderOpenDuotone, PiFileTextDuotone } from "react-icons/pi";
import { useGetFilesQuery, useSearchFilesMutation } from "@/redux/api/files.api";
import { FileManagerContext } from "../context/FileManagerProvider";

interface FileListViewProps {
  files?: IFiles[];
  fileId?: string;
  search?: string;
}

const FileListView: React.FC<FileListViewProps> = ({ fileId, search }: FileListViewProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isListView, setIsListView] = useState(false);
  const [files, setFiles] = useState<IFiles[]>([]);
  // const { data, refetch } = useGetFilesQuery(fileId ? { criteria: [{ key: "parentId", value: fileId, type: "eq"}]}: undefined);
  const context = useContext(FileManagerContext);
  const [searchFiles] = useSearchFilesMutation();
  useEffect (() => {
    searchFiles({search, directoryPath: context?.currentDirectoryPath}).then(res => {
      // console.log("RES", res);
      setFiles(res?.data?.files);
    })
  },[])
  // const filteredFiles = data?.files?.filter(file =>
  //   file.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );
  const filteredFiles = files?.filter(file =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full h-full p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">

        </div>
        {/* <button
          onClick={() => setIsListView(!isListView)}
          className="flex items-center space-x-1 px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
        >
          {isListView ? <Grid className="w-4 h-4" /> : <List className="w-4 h-4" />}
          <span>{isListView ? "Grid View" : "List View"}</span>
        </button> */}
      </div>

      {isListView ? (
        <div className="space-y-2">
          {filteredFiles?.map((file) => (
            <div key={file._id} className="flex items-center p-2 border rounded-md">
              <div className="flex-1">
                {file.type === "dir" ? (
                  <div className="flex items-center">
                    <PiFolderOpenDuotone className="w-6 h-6 text-amber-600" />
                    <span className="ml-2">{file.name}</span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <PiFileTextDuotone className="w-6 h-6 text-sky-800" />
                    <span className="ml-2">{file.name}</span>
                  </div>
                )}
              </div>
              {file.size && <span className="text-slate-700 font-semibold text-sm">{file.size}</span>}
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredFiles?.map((file) => (
            <FileCard key={file._id} file={file} />
          ))}
        </div>
      )}

      {filteredFiles?.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="text-slate-400 text-lg">No files found</div>
        </div>
      )}
    </div>
  );
};

export default FileListView; 