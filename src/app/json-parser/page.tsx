// src/app/json-parser/page.tsx

"use client";

import { useState } from "react";

export default function JSONParser() {
  const [inputJSON, setInputJSON] = useState("");
  const [parsedResult, setParsedResult] = useState<object | null>(null);
  const [error, setError] = useState<string | null>(null);

  const parseJSON = async () => {
    try {
      const response = await fetch("/api/parseJson", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ json: inputJSON }),
      });

      if (!response.ok) {
        throw new Error("Failed to parse JSON");
      }

      const result = await response.json();
      setParsedResult(result);
      setError(null);
    } catch (error) {
      setError(error.message);
      setParsedResult(null);
    }
  };

  return (
    <div className="p-4 mx-auto max-w-xl">
      <h1 className="mb-4 text-2xl font-bold">JSON Parser</h1>
      <textarea
        className="p-2 mb-2 w-full rounded border"
        value={inputJSON}
        onChange={(e) => setInputJSON(e.target.value)}
        placeholder="Enter JSON here..."
        rows={6}
      />
      <button
        onClick={parseJSON}
        className="py-2 px-4 text-white bg-blue-600 rounded hover:bg-blue-700"
      >
        Parse JSON
      </button>

      {parsedResult && (
        <div className="p-2 mt-4 bg-gray-100 rounded border">
          <h2 className="font-bold">Parsed JSON:</h2>
          <pre className="whitespace-pre-wrap">
            {JSON.stringify(parsedResult, null, 2)}
          </pre>
        </div>
      )}

      {error && <p className="mt-2 text-red-600">Error: {error}</p>}
    </div>
  );
}
