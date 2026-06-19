import React, { useState } from "react";
import { executeCode } from "./Api.js";

function Output({ value, language }) {
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  async function runCode() {
    if (!value) return;

    try {
      setLoading(true);

      const result = await executeCode(language, value);

      setOutput(result.output || result.error || "No output");
    } catch (err) {
      console.log("API ERROR:", err.response?.data || err.message);

      setOutput("Error running code");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="output-container">
      <div className="output-header">
        <h3>Output</h3>

        <button className="run-btn" onClick={runCode}>
          {loading ? "Running..." : "Run Code"}
        </button>
      </div>

      <div className="output-box">
        <pre>{output || "Your output will appear here..."}</pre>
      </div>
    </div>
  );
}

export default Output;
