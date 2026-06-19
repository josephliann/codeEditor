import axios from "axios";

const API = axios.create({
  baseURL: "https://codeeditor-anwu.onrender.com",
});

const compilerMap = {
  javascript: "typescript-deno",

  python: "python-3.14",

  java: "openjdk-25",

  cpp: "g++-15",

  c: "gcc-15",
};

export const executeCode = async (language, sourceCode) => {
  const response = await API.post("/run", {
    compiler: compilerMap[language],

    code: sourceCode,

    input: "",
  });

  return response.data;
};
