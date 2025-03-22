"use client";
import React, { useEffect, useState } from "react";

const Scorecard = () => {
  const [tests, setTests] = useState([]);

  useEffect(() => {
    const storedTests = JSON.parse(localStorage.getItem("testResults")) || [];
    setTests(storedTests);
  }, []);

  return (
    <div className="min-h-screen w-full flex justify-center align-middle items-center bg-radial-[at_25%_25%] from-white to-zinc-900 to-75%">
      <div className="bg-white p-10 rounded-lg shadow-2xl w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Test Results
        </h1>

        {tests.length === 0 ? (
          <p className="text-lg text-center text-gray-600">
            You haven't taken a test yet.
          </p>
        ) : (
          <ul className="space-y-6">
            {tests.map((test, index) => (
              <li
                key={index}
                className="p-6 border rounded-lg shadow-md bg-gray-50 hover:bg-gray-100 transition duration-300"
              >
                <h2 className="text-xl font-semibold text-gray-700">
                  Test {index + 1}
                </h2>
                <p className="text-gray-600">Score: {test.score}</p>
                <p className="text-gray-600">Time Taken: {test.timeTaken}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Scorecard;
