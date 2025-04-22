import React, { useState } from 'react';
import MonacoEditor from '@monaco-editor/react';

const Editor = ({ value, onChange, language = 'javascript', theme = 'vs-dark' }) => {
  const [editorHeight, setEditorHeight] = useState('400px');

  const handleEditorDidMount = (editor, monaco) => {
    // You can add additional editor configuration here
  };

  return (
    <div className="editor-container">
      <MonacoEditor
        height={editorHeight}
        language={language}
        value={value}
        onChange={onChange}
        theme={theme}
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          wordWrap: 'on',
        }}
        onMount={handleEditorDidMount}
      />
      <div className="editor-resize">
        <button 
          className="resize-btn"
          onClick={() => setEditorHeight(prev => prev === '400px' ? '600px' : '400px')}
        >
          {editorHeight === '400px' ? 'Expand Editor' : 'Collapse Editor'}
        </button>
      </div>
    </div>
  );
};

export default Editor;