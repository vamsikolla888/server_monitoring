import React from 'react';
import ToolBar from "./components/ToolBar";
import Files from './components/FilesList';

// interface FileManagerProps {
//   children: React.ReactNode
// }

const FileManager = () => {
  return (
    <div className='flex flex-col w-full h-full'>
      <ToolBar />
      <Files />
    </div>
  )
}

export default FileManager;