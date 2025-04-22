import axios from "axios";
import fs from 'fs'

const API_URL = "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true";

const headers = {
  "content-type": "application/json",
  "X-RapidAPI-Key": "8558b85810msh94f67d119921518p141003jsnebc167f5ffa1", // Replace this
  "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com"
};

const problem = JSON.parse(fs.readFileSync("./problems/problem1.json", "utf-8"));
const code = fs.readFileSync("./submissions/solution.cpp", "utf-8");

// const submissionData = {
//   source_code: code,
//   language_id: 54,
//   stdin: ""
// };

const runTestCases = async () => {
  let allPassed = true;

  for (let i = 0; i < problem.test_cases.length; i++) {
    const testCase = problem.test_cases[i];
    const submissionData = {
      source_code: code,
      language_id: problem.language_id,
      stdin: testCase.input
    };

    try {
      const response = await axios.post(API_URL, submissionData, { headers });
      const actualOutput = response.data.stdout;

      if (actualOutput === testCase.expected) {
        console.log(`✅ Test Case ${i + 1}: Passed`);
      } else {
        console.log(`❌ Test Case ${i + 1}: Failed`);
        console.log(`Input: ${testCase.input}`);
        console.log(`Expected: ${testCase.expected}`);
        console.log(`Got: ${actualOutput}`);
        allPassed = false;
      }
    } catch (error) {
      console.error(`Error in Test Case ${i + 1}:`, error.response?.data || error.message);
      allPassed = false;
    }
  }

  if (allPassed) {
    console.log("\n🎉 Status: Accepted");
  } else {
    console.log("\n🚫 Status: Failed");
  }
};

runTestCases();
