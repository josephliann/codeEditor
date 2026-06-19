import React from "react";

function cleanText(text = "") {
  return text

    .replace(/\*\*/g, "")
    .replace(/###/g, "")
    .replace(/\$/g, " ")
    .replace(/\\mathcal\{([^}]*)\}/g, "$1")
    .replace(/\{|\}/g, "")
    .replace(/\n\s*\n/g, "\n");
}

function AIdebugger({ result, loading, onClose }) {
  const cleaned = cleanText(result);

  return (
    <div className="debug-panel">
      <div className="debug-header">
        <h3>🤖 AI Debugger</h3>
        <button onClick={onClose}>✕</button>
      </div>

      {loading ? (
        <div className="debug-loading">Analyzing code...</div>
      ) : cleaned ? (
        <div className="debug-content">
          {cleaned.split("\n").map((line, i) => (
            <div key={i} className="debug-line">
              {line}
            </div>
          ))}
        </div>
      ) : (
        <div className="debug-empty">Click Debug to analyze your code.</div>
      )}
    </div>
  );
}

export default AIdebugger;
