import React from "react";

import { languages } from "./Constant";

function LanguageSelector({ language, onSelect }) {
  return (
    <select className="language-select" value={language} onChange={(e) => onSelect(e.target.value)}>
      {Object.entries(languages).map(([lang, version]) => (
        <option key={lang} value={lang}>
          {lang} ({version})
        </option>
      ))}
    </select>
  );
}

export default LanguageSelector;
