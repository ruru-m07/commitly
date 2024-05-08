import { GoogleGenerativeAI } from "@google/generative-ai";
import { promises as fs } from "fs";

// Get your API key from https://makersuite.google.com/app/apikey
if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is required");
}

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

export const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export const systemHistory = async () => {
  const system = await fs.readFile(
    process.cwd() + "/app/api/system.txt",
    "utf8"
  );

  return [
    {
      role: "user",
      parts: [
        {
          text: system,
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "```txt \n feat(api): allow users to reset their password\n```",
        },
      ],
    },
  ];
};
