import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PiFolderOpenDuotone } from "react-icons/pi";
import { PiFileTextDuotone } from "react-icons/pi";
import { EllipsisVertical } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { IFiles } from "../types/types";
import { FileManagerContext } from "../context/FileManagerProvider";


interface FileCardProps {
    file: IFiles
}
export default function FileCard({ file }: FileCardProps){
    const { setFileManagerHistory, setCurrentDirectoryPath } = useContext(FileManagerContext);
    const router = useNavigate();

    useEffect(() => {
        const handlePopState = () => {
            setFileManagerHistory((prevList) => prevList.slice(0, prevList.length - 1));
          };
          window.addEventListener("popstate", handlePopState);
          return () => {
            window.removeEventListener("popstate", handlePopState);
          };
    },[])
    const navigateToFolder = (file: IFiles) => {
        if (file.type === "dir") {
            router(`/filemanager/${file._id}`);
            setFileManagerHistory(prev => ([...prev, { href: `/filemanager/${file._id}`, title: file.name }]));
            setCurrentDirectoryPath(file.path);
        }
    }
    return (
        <div
            key={file._id}
            className='flex flex-col w-full border-[1px] border-neutral-200 rounded-md shadow-sm px-2 py-1 cursor-pointer hover:bg-gray-50 transition-colors duration-200 dark:bg-main_background dark:border-header_border dark:hover:bg-content_background'
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
                    <EllipsisVertical className='size-5 text-neutral-600' strokeWidth={2} />
                </button>
            </div>

            {file.type === "dir" ? (
                // Folder Layout - Stacked with align-end
                <div className='px-3 pb-2 w-full flex flex-col items-start'>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <p className='font-medium text-lg text-slate-800 dark:text-slate-300 truncate w-full'>
                                    {file.name}
                                </p>
                            </TooltipTrigger>
                            <TooltipContent
                                side="top"
                                className="bg-slate-800 text-white dark:text-neutral-300 px-3 py-1.5 rounded-md text-sm font-medium shadow-lg border-0"
                            >
                                {file.name}
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <div className='flex justify-between w-full items-end mt-1'>
                        <span className='text-xs text-zinc-500 dark:text-neutral-400'>
                            {file.noOfFiles} Files
                        </span>
                        {file.size && (
                            <span className="text-slate-700 dark:text-neutral-400 font-semibold text-sm">
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
                                    <p className='font-medium text-base text-slate-800 dark:text-neutral-300 truncate min-w-0 flex-1'>
                                        {file.name}
                                    </p>
                                </TooltipTrigger>
                                <TooltipContent
                                    side="top"
                                    className="bg-slate-800 text-white dark:text-neutral-300 px-3 py-1.5 rounded-md text-sm font-medium shadow-lg border-0"
                                >
                                    {file.name}
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        {file.size && (
                            <span className="text-slate-700 dark:text-neutral-400 font-semibold text-sm whitespace-nowrap flex-shrink-0">
                                {file.size}
                            </span>
                        )}
                    </div>
                </div>
            )}
        </div>

    )
}
