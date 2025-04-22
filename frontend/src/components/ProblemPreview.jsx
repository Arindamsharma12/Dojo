import { useState } from "react";
import Editor from "@monaco-editor/react";
import TestCase from "./TestCase";

const ProblemPreview = ({ problem }) => {
  const [code, setCode] = useState(problem.defaultCode || "");
  const [activeTab, setActiveTab] = useState("problem");
  const [testResults, setTestResults] = useState([]);

  const handleRun = () => {
    // Mock test results
    setTestResults(problem.testCases.map((tc, i) => ({
      id: i,
      input: tc.input,
      expected: tc.expected,
      actual: "Mock output", // Replace with actual API call
      passed: Math.random() > 0.5
    })));
  };

  const handleSubmit = () => {
    // Handle submission logic
    console.log("Submitting code:", code);
  };

  return (
    <div className="problem-preview">
      <div className="preview-header">
        <h2>{problem.title}</h2>
        <div className="problem-meta">
          <span className={`difficulty ${problem.difficulty.toLowerCase()}`}>
            {problem.difficulty}
          </span>
          <span className="topics">
            {problem.topics.join(", ")}
          </span>
        </div>
      </div>
      
      <div className="preview-tabs">
        <button 
          className={`tab-btn ${activeTab === "problem" ? "active" : ""}`}
          onClick={() => setActiveTab("problem")}
        >
          Problem
        </button>
        <button 
          className={`tab-btn ${activeTab === "submissions" ? "active" : ""}`}
          onClick={() => setActiveTab("submissions")}
        >
          Submissions
        </button>
        <button 
          className={`tab-btn ${activeTab === "discussion" ? "active" : ""}`}
          onClick={() => setActiveTab("discussion")}
        >
          Discussion
        </button>
      </div>
      
      <div className="preview-content">
        {activeTab === "problem" && (
          <>
            <div className="problem-statement">
              <div dangerouslySetInnerHTML={{ __html: problem.description }} />
            </div>
            
            <div className="test-cases">
              <h3>Test Cases</h3>
              {problem.testCases.map((testCase, index) => (
                <TestCase key={index} testCase={testCase} index={index} />
              ))}
            </div>
          </>
        )}
        
        {/* Other tabs content would go here */}
      </div>
      
      <div className="editor-section">
        <div className="editor-container">
          <Editor
            height="400px"
            defaultLanguage={problem.language || "javascript"}
            value={code}
            onChange={setCode}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              wordWrap: "on"
            }}
          />
        </div>
        
        <div className="editor-actions">
          <button className="btn-run" onClick={handleRun}>Run Code</button>
          <button className="btn-submit" onClick={handleSubmit}>Submit</button>
        </div>
        
        {testResults.length > 0 && (
          <div className="test-results">
            <h3>Test Results</h3>
            {testResults.map(result => (
              <div key={result.id} className={`test-result ${result.passed ? "passed" : "failed"}`}>
                <div>Input: {result.input}</div>
                <div>Expected: {result.expected}</div>
                <div>Actual: {result.actual}</div>
                <div>Status: {result.passed ? "✓ Passed" : "✗ Failed"}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProblemPreview;