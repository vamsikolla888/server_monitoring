import React from 'react';
import ToolBar from "./components/ToolBar";
import Files from './components/FilesList';
import { useParams } from 'react-router-dom';
import FileManagerProvider from './context/FileManagerProvider';
import FileListView from './components/FileListView';

// interface FileManagerProps {
//   children: React.ReactNode
// }

const FileManager = () => {
  const params = useParams();
  return (
    <FileManagerProvider>
      <div className='flex flex-col w-full h-full'>
        <ToolBar />
        <Files fileId={params?.fileId}/>
        {/* <FileListView fileId={params?.fileId} /> */}

      </div>
    </FileManagerProvider>
  )
}

export default FileManager;