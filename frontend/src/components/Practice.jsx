// src/components/Editor.jsx

import React, { useState } from 'react';
import MonacoEditor from '@monaco-editor/react';
import axios from 'axios';

const Editor = () => {
  const [code, setCode] = useState('');
  const [results, setResults] = useState([]);
  const [editorHeight, setEditorHeight] = useState('400px');

  const testCases = [
    { input: '1\n', expected: '1\n' },
    { input: '2\n', expected: '2\n' }
  ];

  const handleRunCode = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/run-code', {
        source_code: code,
        language_id: 54, // C++ as an example
        test_cases: testCases,
      });
      setResults(response.data.results);
    } catch (error) {
      console.error('Run Error:', error.response?.data || error.message);
      setResults([{ status: 'Error', message: 'Execution failed. Try again.' }]);
    }
  };

  return (
    <div className="editor-container">
      <MonacoEditor
        height={editorHeight}
        language="cpp"
        value={code}
        onChange={setCode}
        theme="vs-dark"
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          wordWrap: 'on',
        }}
      />
      <div className="editor-actions">
        <button onClick={handleRunCode}>Run Code</button>
        <button onClick={() => setEditorHeight(editorHeight === '400px' ? '600px' : '400px')}>
          {editorHeight === '400px' ? 'Expand Editor' : 'Collapse Editor'}
        </button>
      </div>
      <div className="test-results">
        {results.map((res, index) => (
          <div key={index} style={{ margin: '10px 0', color: res.status === 'Passed' ? 'green' : 'red' }}>
            <strong>Test Case {res.testCase}:</strong> {res.status}<br />
            <strong>Input:</strong> {res.input}
            <br />
            <strong>Expected:</strong> {res.expected}
            <br />
            <strong>Actual:</strong> {res.actual || res.error || res.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Editor;
