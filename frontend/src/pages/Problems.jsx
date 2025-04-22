// src/pages/Problems.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProblemCard from "../components/ProblemCard";

const Problems = () => {
  const [problems, setProblems] = useState([]);
  const [filter, setFilter] = useState({
    difficulty: "",
    topic: "",
    search: ""
  });
  const navigate = useNavigate();

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockProblems = [
      {
        id: 1,
        title: "Two Sum",
        difficulty: "Easy",
        topics: ["Array", "Hash Table"],
        acceptance: "45%",
        solved: false
      },
      {
        id: 2,
        title: "Reverse Integer",
        difficulty: "Medium",
        topics: ["Math"],
        acceptance: "32%",
        solved: false
      },
      {
        id: 3,
        title: "Palindrome Number",
        difficulty: "Easy",
        topics: ["Math"],
        acceptance: "52%",
        solved: true
      },
      {
        id: 4,
        title: "Valid Parentheses",
        difficulty: "Easy",
        topics: ["Stack", "String"],
        acceptance: "40%",
        solved: false
      },
      {
        id: 5,
        title: "Merge Two Sorted Lists",
        difficulty: "Easy",
        topics: ["Linked List", "Recursion"],
        acceptance: "58%",
        solved: false
      }
    ];
    setProblems(mockProblems);
  }, []);

  const handleProblemClick = (problemId) => {
    navigate(`/problems/${problemId}`);
  };

  // Filter problems based on search input and filters
  const filteredProblems = problems.filter(problem => {
    const matchesDifficulty = filter.difficulty ? problem.difficulty === filter.difficulty : true;
    const matchesTopic = filter.topic ? problem.topics.includes(filter.topic) : true;
    const matchesSearch = filter.search ? 
      problem.title.toLowerCase().includes(filter.search.toLowerCase()) : true;
    
    return matchesDifficulty && matchesTopic && matchesSearch;
  });

  return (
    <div className="problems-page">
      <div className="problems-header">
        <h1>Problems</h1>
        <div className="problems-filter">
          <select 
            value={filter.difficulty}
            onChange={(e) => setFilter({...filter, difficulty: e.target.value})}
          >
            <option value="">All Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          
          <select 
            value={filter.topic}
            onChange={(e) => setFilter({...filter, topic: e.target.value})}
          >
            <option value="">All Topics</option>
            <option value="Array">Array</option>
            <option value="String">String</option>
            <option value="Hash Table">Hash Table</option>
            <option value="Math">Math</option>
            <option value="Dynamic Programming">Dynamic Programming</option>
            <option value="Linked List">Linked List</option>
            <option value="Stack">Stack</option>
            <option value="Recursion">Recursion</option>
          </select>
          
          <input 
            type="text" 
            placeholder="Search problems..."
            value={filter.search}
            onChange={(e) => setFilter({...filter, search: e.target.value})}
          />
        </div>
      </div>
      
      <div className="problems-list">
        <div className="problems-list-header">
          <span>Status</span>
          <span>Title</span>
          <span>Difficulty</span>
          <span>Topics</span>
          <span>Acceptance</span>
        </div>
        
        {filteredProblems.map(problem => (
          <ProblemCard 
            key={problem.id} 
            problem={problem} 
            onClick={() => handleProblemClick(problem.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Problems;