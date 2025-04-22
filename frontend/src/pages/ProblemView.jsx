import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import problems from '../data/problems';
import Editor from '../components/Editor';
import TestCase from '../components/TestCase';

const ProblemView = () => {
  const { id } = useParams();
  const problem = problems.find(p => p.id === Number(id));
  
  const [code, setCode] = useState('//Write your code here\n\n');
  const [language, setLanguage] = useState('javascript');
  const [testCases, setTestCases] = useState([
    { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]' },
    { input: 'nums = [3,2,4], target = 6', output: '[1,2]' },
    { input: 'nums = [3,3], target = 6', output: '[0,1]' },
  ]);
  const [customTestCases, setCustomTestCases] = useState([]);
  const [activeTab, setActiveTab] = useState('description');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Initialize problem-specific test cases if available
    if (problem && problem.testCases) {
      setTestCases(problem.testCases);
    }
  }, [problem]);

  if (!problem) {
    return <div className="container">Problem not found</div>;
  }

  const handleRunCode = () => {
    setLoading(true);
    
    // Simulate code execution with a delay
    setTimeout(() => {
      // Mock results - in a real app you would evaluate the code against test cases
      const mockResults = testCases.map(testCase => ({
        input: testCase.input,
        output: testCase.output,
        passed: Math.random() > 0.3, // Random pass/fail for demonstration
        yourOutput: testCase.output, // In a real app this would be the actual output
      }));
      
      setResults(mockResults);
      setLoading(false);
    }, 1500);
  };

  const handleSubmitCode = () => {
    setLoading(true);
    
    // Simulate submission with a delay
    setTimeout(() => {
      // Mock submission results
      const mockResults = testCases.map(testCase => ({
        input: testCase.input,
        output: testCase.output,
        passed: Math.random() > 0.2, // Random pass/fail for demonstration
        yourOutput: testCase.output, // In a real app this would be the actual output
      }));
      
      setResults(mockResults);
      setLoading(false);
      
      // Show success message or navigate to results page
      alert('Solution submitted successfully!');
    }, 2000);
  };

  const addCustomTestCase = () => {
    setCustomTestCases([...customTestCases, { input: '', output: '' }]);
  };

  const updateCustomTestCase = (index, updatedCase) => {
    const updated = [...customTestCases];
    updated[index] = updatedCase;
    setCustomTestCases(updated);
  };

  const deleteCustomTestCase = (index) => {
    setCustomTestCases(customTestCases.filter((_, i) => i !== index));
  };

  return (
    <div className="problem-view">
      <div className="problem-view-container">
        <div className="problem-panel">
          <div className="problem-header">
            <h2>{problem.title}</h2>
            <div className="problem-meta">
              <span className={`difficulty ${problem.difficulty.toLowerCase()}`}>
                {problem.difficulty}
              </span>
              <span className="genre">{problem.genre}</span>
            </div>
          </div>
          
          <div className="problem-tabs">
            <button 
              className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button 
              className={`tab-btn ${activeTab === 'test-cases' ? 'active' : ''}`}
              onClick={() => setActiveTab('test-cases')}
            >
              Test Cases
            </button>
            <button 
              className={`tab-btn ${activeTab === 'submissions' ? 'active' : ''}`}
              onClick={() => setActiveTab('submissions')}
            >
              Submissions
            </button>
          </div>
          
          <div className="problem-content">
            {activeTab === 'description' && (
              <div className="problem-description">
                <p>{problem.statement}</p>
                
                <h3>Example:</h3>
                <div className="example">
                  <pre>
                    Input: nums = [2,7,11,15], target = 9
                    Output: [0,1]
                    Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
                  </pre>
                </div>
                
                <h3>Constraints:</h3>
                <ul>
                  <li>2 &lt;= nums.length &lt;= 10^4</li>
                  <li>-10^9 &lt;= nums[i] &lt;= 10^9</li>
                  <li>-10^9 &lt;= target &lt;= 10^9</li>
                  <li>Only one valid answer exists.</li>
                </ul>
              </div>
            )}
            
            {activeTab === 'test-cases' && (
              <div className="test-cases">
                <h3>Example Test Cases</h3>
                {testCases.map((testCase, index) => (
                  <TestCase 
                    key={index} 
                    testCase={testCase} 
                    index={index}
                    result={results ? results[index] : null}
                  />
                ))}
                
                <h3>Custom Test Cases</h3>
                {customTestCases.map((testCase, index) => (
                  <TestCase 
                    key={index} 
                    testCase={testCase} 
                    index={index}
                    isCustom={true}
                    onDelete={deleteCustomTestCase}
                    onUpdate={updateCustomTestCase}
                  />
                ))}
                
                <button className="btn btn-secondary" onClick={addCustomTestCase}>
                  Add Custom Test Case
                </button>
              </div>
            )}
            
            {activeTab === 'submissions' && (
              <div className="submissions">
                <p>Your recent submissions will appear here.</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="editor-panel">
          <div className="editor-header">
            <div className="language-selector">
              <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="cpp">C++</option>
              </select>
            </div>
          </div>
          
          <Editor 
            value={code}
            onChange={setCode}
            language={language}
          />
          
          <div className="editor-actions">
            <button 
              className="btn btn-run"
              onClick={handleRunCode}
              disabled={loading}
            >
              {loading ? 'Running...' : 'Run Code'}
            </button>
            <button 
              className="btn btn-submit"
              onClick={handleSubmitCode}
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit Solution'}
            </button>
          </div>
          
          {results && (
            <div className="results">
              <h3>Results</h3>
              <div className="results-summary">
                {results.filter(r => r.passed).length} / {results.length} test cases passed
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProblemView;