import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import LanguageSelector from "./Language.jsx";
import { boilerplates } from "./Constant";
import Output from "./Output.jsx";
import AIdebugger from "./AIdebugger.jsx";

function CodeEditor() {
  const [value, setValue] = useState(boilerplates.javascript);
  const [language, setLanguage] = useState("javascript");
  const [showDebugger, setShowDebugger] = useState(false);
  const [debugResult, setDebugResult] = useState("");
  const [loading, setLoading] = useState(false);

  function onSelect(lang) {
    setLanguage(lang);
    setValue(boilerplates[lang]);
  }

  const debugCode = async () => {
    setLoading(true);

    setShowDebugger(true);

    try {
      const response = await fetch("https://codeeditor-anwu.onrender.com/debug", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          language,

          code: value,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setDebugResult("❌ " + (data.error || "Server error"));

        return;
      }

      setDebugResult(data.response);
    } catch (err) {
      setDebugResult("❌ Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="editor-container">
      <div className="top-bar">
        <LanguageSelector language={language} onSelect={onSelect} />

        <button className="run-btn" onClick={debugCode}>
          🐞 Debug
        </button>
      </div>

      <div className="editor-section">
        <Editor height="100%" language={language} value={value} onChange={(v) => setValue(v || "")} theme="vs-dark" />
      </div>

      <Output value={value} language={language} />

      {showDebugger && <AIdebugger result={debugResult} loading={loading} onClose={() => setShowDebugger(false)} />}
    </div>
  );
}

export default CodeEditor;
