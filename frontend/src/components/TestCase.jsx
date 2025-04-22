import React, { useState } from 'react';

const TestCase = ({ testCase, index, isCustom = false, onDelete, onUpdate }) => {
  const [expanded, setExpanded] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [input, setInput] = useState(testCase.input);
  const [expectedOutput, setExpectedOutput] = useState(testCase.output);
  const [result, setResult] = useState(testCase.result || null);

  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    onUpdate(index, { input, output: expectedOutput });
    setEditMode(false);
  };

  const handleCancel = () => {
    setInput(testCase.input);
    setExpectedOutput(testCase.output);
    setEditMode(false);
  };

  const getStatusClass = () => {
    if (!result) return '';
    return result.passed ? 'passed' : 'failed';
  };

  return (
    <div className={`test-case ${getStatusClass()}`}>
      <div className="test-case-header" onClick={handleToggleExpand}>
        <div className="test-case-title">
          <span className="test-case-number">#{index + 1}</span>
          {result && (
            <span className={`test-status ${result.passed ? 'passed' : 'failed'}`}>
              {result.passed ? 'Passed' : 'Failed'}
            </span>
          )}
        </div>
        <div className="test-case-actions">
          {isCustom && !editMode && (
            <>
              <button className="btn btn-small" onClick={(e) => { e.stopPropagation(); handleEdit(); }}>Edit</button>
              <button className="btn btn-small btn-danger" onClick={(e) => { e.stopPropagation(); onDelete(index); }}>Delete</button>
            </>
          )}
          <span className="expand-icon">{expanded ? '▼' : '▶'}</span>
        </div>
      </div>
      
      {expanded && (
        <div className="test-case-content">
          {editMode ? (
            <div className="test-case-edit">
              <div className="input-group">
                <label>Input:</label>
                <textarea 
                  value={input} 
                  onChange={(e) => setInput(e.target.value)}
                  className="test-input"
                  rows={3}
                />
              </div>
              <div className="input-group">
                <label>Expected Output:</label>
                <textarea 
                  value={expectedOutput} 
                  onChange={(e) => setExpectedOutput(e.target.value)}
                  className="test-output"
                  rows={3}
                />
              </div>
              <div className="test-case-edit-actions">
                <button className="btn btn-primary" onClick={handleSave}>Save</button>
                <button className="btn" onClick={handleCancel}>Cancel</button>
              </div>
            </div>
          ) : (
            <>
              <div className="test-info">
                <h4>Input:</h4>
                <pre>{testCase.input}</pre>
              </div>
              <div className="test-info">
                <h4>Expected Output:</h4>
                <pre>{testCase.output}</pre>
              </div>
              {result && (
                <div className="test-info">
                  <h4>Your Output:</h4>
                  <pre>{result.output}</pre>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default TestCase;