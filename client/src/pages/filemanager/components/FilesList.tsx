import { useEffect, useState } from "react";
import { PiFolderOpenDuotone } from "react-icons/pi";
import { PiFileTextDuotone } from "react-icons/pi";
import { EllipsisVertical } from 'lucide-react';
import { IFiles } from "../types/types";
import { useNavigate } from 'react-router-dom';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const FilesList = () => {

  const [files, setFiles] = useState<IFiles[]>([]);

  const router = useNavigate();
  // Separate folders and files
  const folders = files.filter(file => file.type === "dir");
  const documents = files.filter(file => file.type !== "dir");

  const navigateToFolder = (file: IFiles) => {
    if (file.type === "dir") {
      router(`/filemanager/${file._id}`);
    }
  }

  const FileCard = ({ file }: { file: IFiles }) => (
    <div 
      key={file._id}
      className='flex flex-col w-full border-[1px] border-neutral-200 rounded-md shadow-sm px-2 py-1 cursor-pointer hover:bg-gray-50 transition-colors duration-200'
      onDoubleClick={() => navigateToFolder(file)}
    >
      <div className='flex w-full justify-between px-2 pt-3 pb-1'>
        {file.type === "dir" ? (
          <div className="flex-1">
            <PiFolderOpenDuotone className='size-14 text-amber-600' fill="#ffa000" />
          </div>
        ) : (
          <div className="flex-1">
            <PiFileTextDuotone className='size-14 text-sky-800' fill="#38bdf8" />
          </div>
        )}
        <button 
          className="hover:bg-gray-100 rounded-full w-6 h-6 flex items-center justify-center -mr-1"
          onClick={(e) => {
            e.stopPropagation();
            // Add your menu handling logic here
          }}
        >
          <EllipsisVertical className='size-5 text-neutral-600' strokeWidth={2}/>
        </button>
      </div>

      {file.type === "dir" ? (
        // Folder Layout - Stacked with align-end
        <div className='px-3 pb-2 w-full flex flex-col items-start'>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <p className='font-medium text-lg text-slate-800 truncate w-full'>
                  {file.name}
                </p>
              </TooltipTrigger>
              <TooltipContent 
                side="top" 
                className="bg-slate-800 text-white px-3 py-1.5 rounded-md text-sm font-medium shadow-lg border-0"
              >
                {file.name}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className='flex justify-between w-full items-end mt-1'>
            <span className='text-xs text-zinc-500'>
              {Math.floor(Math.random() * 1000)} Files
            </span>
            {file.size && (
              <span className="text-slate-700 font-semibold text-sm">
                {file.size}
              </span>
            )}
          </div>
        </div>
      ) : (
        // File Layout - Single line with size
        <div className='px-3 pb-2 w-full'>
          <div className='flex items-center justify-between w-full gap-2'>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <p className='font-medium text-base text-slate-800 truncate min-w-0 flex-1'>
                    {file.name}
                  </p>
                </TooltipTrigger>
                <TooltipContent 
                  side="top" 
                  className="bg-slate-800 text-white px-3 py-1.5 rounded-md text-sm font-medium shadow-lg border-0"
                >
                  {file.name}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {file.size && (
              <span className="text-slate-700 font-semibold text-sm whitespace-nowrap flex-shrink-0">
                {file.size}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );

  const SectionHeader = ({ title, count }: { title: string; count: number }) => (
    <div className="flex items-center gap-2 mb-4">
      <h2 className="text-xl font-semibold text-slate-800">{title}</h2>
      <span className="text-sm text-slate-500">({count})</span>
    </div>
  );

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
      {files.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="text-slate-400 text-lg">No files or folders found</div>
        </div>
      )}
    </div>
  )
}

export default FilesList;