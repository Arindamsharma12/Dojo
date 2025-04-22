import axios from "axios";
import asyncHandler from "express-async-handler";

const API_URL = "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true";
const headers = {
  "content-type": "application/json",
  "X-RapidAPI-Key": "YOUR_RAPID_API_KEY", // Replace with your key
  "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
};

// POST /api/run-code
export const runCode = asyncHandler(async (req, res) => {
  const { source_code, language_id, test_cases } = req.body;

  if (!source_code || !language_id || !Array.isArray(test_cases)) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const results = [];

  for (let i = 0; i < test_cases.length; i++) {
    const { input, expected } = test_cases[i];

    try {
      const response = await axios.post(
        API_URL,
        {
          source_code,
          language_id,
          stdin: input
        },
        { headers }
      );

      const actualOutput = response.data.stdout?.trim();
      const passed = actualOutput === expected.trim();

      results.push({
        testCase: i + 1,
        input,
        expected,
        actual: actualOutput,
        status: passed ? "Passed" : "Failed"
      });

    } catch (error) {
      results.push({
        testCase: i + 1,
        input,
        error: error.response?.data || error.message,
        status: "Error"
      });
    }
  }

  res.status(200).json({ results });
});
