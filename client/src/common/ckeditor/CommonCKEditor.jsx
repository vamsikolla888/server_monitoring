import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const CommonCKEditor = ({ content }) => {
  console.log('CONTENT', content);
  const [editorData, setEditorData] = useState(content);

  return (
    <div className="html-viewer">
      <CKEditor
        editor={ClassicEditor}
        data={editorData}
        disabled={true} // To make it read-only
        config={{
          toolbar: [], // Hide the toolbar if you want
          readOnly: true,
        }}
        onReady={(editor) => {
          // You can access the editor if needed
        }}
      />
    </div>
  );
};

export default CommonCKEditor;
