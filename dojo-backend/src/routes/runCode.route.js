import express from "express";
import axios from "axios";
import asyncHandler from "express-async-handler";
import fs from "fs";

const router = express.Router();

const JUDGE0_API = "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true";

const headers = {
  "content-type": "application/json",
  "X-RapidAPI-Key": "8558b85810msh94f67d119921518p141003jsnebc167f5ffa1", // Replace this
  "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
};

router.post(
  "/run-code",
  asyncHandler(async (req, res) => {
    const { source_code, language_id } = req.body;

    if (!source_code || !language_id) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Load test cases from problem1.json
    const problem = JSON.parse(fs.readFileSync("./problems/problem1.json", "utf-8"));
    const test_cases = problem.test_cases;

    const results = [];

    for (let i = 0; i < test_cases.length; i++) {
      const { input, expected } = test_cases[i];

      try {
        const response = await axios.post(
          JUDGE0_API,
          { source_code, language_id, stdin: input },
          { headers }
        );

        const actual = response.data.stdout?.trim() || "";
        const passed = actual === expected.trim();

        results.push({
          testCase: i + 1,
          input,
          expected: expected.trim(),
          actual,
          status: passed ? "Passed" : "Failed",
        });

      } catch (error) {
        results.push({
          testCase: i + 1,
          input,
          error: error.response?.data || error.message,
          status: "Error",
        });
      }
    }

    res.status(200).json({ results });
  })
);

export default router;
