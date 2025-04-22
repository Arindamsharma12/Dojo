// src/data/problems.js
const problems = [
    {
      id: 1,
      title: "Two Sum",
      difficulty: "Easy",
      genre: "Array, Hash Table",
      statement: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
      testCases: [
        { input: "nums = [2,7,11,15], target = 9", output: "[0,1]" },
        { input: "nums = [3,2,4], target = 6", output: "[1,2]" },
        { input: "nums = [3,3], target = 6", output: "[0,1]" }
      ],
      defaultCode: "/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nvar twoSum = function(nums, target) {\n    // Your code here\n};"
    },
    {
      id: 2,
      title: "Reverse Integer",
      difficulty: "Medium",
      genre: "Math",
      statement: "Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-231, 231 - 1], then return 0.",
      testCases: [
        { input: "x = 123", output: "321" },
        { input: "x = -123", output: "-321" },
        { input: "x = 120", output: "21" }
      ],
      defaultCode: "/**\n * @param {number} x\n * @return {number}\n */\nvar reverse = function(x) {\n    // Your code here\n};"
    },
    {
      id: 3,
      title: "Palindrome Number",
      difficulty: "Easy",
      genre: "Math",
      statement: "Given an integer x, return true if x is a palindrome, and false otherwise. An integer is a palindrome when it reads the same backward as forward.",
      testCases: [
        { input: "x = 121", output: "true" },
        { input: "x = -121", output: "false" },
        { input: "x = 10", output: "false" }
      ],
      defaultCode: "/**\n * @param {number} x\n * @return {boolean}\n */\nvar isPalindrome = function(x) {\n    // Your code here\n};"
    },
    {
      id: 4,
      title: "Valid Parentheses",
      difficulty: "Easy",
      genre: "Stack, String",
      statement: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if: Open brackets must be closed by the same type of brackets. Open brackets must be closed in the correct order. Every close bracket has a corresponding open bracket of the same type.",
      testCases: [
        { input: "s = '()'", output: "true" },
        { input: "s = '()[]{}'", output: "true" },
        { input: "s = '(]'", output: "false" }
      ],
      defaultCode: "/**\n * @param {string} s\n * @return {boolean}\n */\nvar isValid = function(s) {\n    // Your code here\n};"
    },
    {
      id: 5,
      title: "Merge Two Sorted Lists",
      difficulty: "Easy",
      genre: "Linked List, Recursion",
      statement: "You are given the heads of two sorted linked lists list1 and list2. Merge the two lists in a one sorted list. The list should be made by splicing together the nodes of the first two lists. Return the head of the merged linked list.",
      testCases: [
        { input: "list1 = [1,2,4], list2 = [1,3,4]", output: "[1,1,2,3,4,4]" },
        { input: "list1 = [], list2 = []", output: "[]" },
        { input: "list1 = [], list2 = [0]", output: "[0]" }
      ],
      defaultCode: "/**\n * Definition for singly-linked list.\n * function ListNode(val, next) {\n *     this.val = (val===undefined ? 0 : val)\n *     this.next = (next===undefined ? null : next)\n * }\n */\n/**\n * @param {ListNode} list1\n * @param {ListNode} list2\n * @return {ListNode}\n */\nvar mergeTwoLists = function(list1, list2) {\n    // Your code here\n};"
    }
  ];
  
  export default problems;