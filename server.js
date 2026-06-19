import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);


const client = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});


app.post("/run", async (req, res) => {
  try {
    const response = await fetch("https://api.onlinecompiler.io/api/run-code-sync/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.COMPILER_API_KEY,
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.post("/debug", async (req, res) => {
  try {
    const { language, code } = req.body;

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `You are an expert software engineer.

Analyze this ${language} code:

${code}

Return:
1. What it does
2. Bugs/issues
3. Improvements
4. Time complexity
5. Space complexity`,
    });

    res.json({
      response: response.text,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {

  console.log("server running on", PORT);

});
