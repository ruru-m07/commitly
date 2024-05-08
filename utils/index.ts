import { GoogleGenerativeAI } from "@google/generative-ai";

// Get your API key from https://makersuite.google.com/app/apikey
if (!process.env.API_KEY) {
  console.log("API_KEY environment variable is required", process.env.NODE_ENV);
  console.log("node env:- ", process.env.NODE_ENV);
}

const genAI = new GoogleGenerativeAI(process.env.API_KEY!);

export const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export const systemHistory = async () => {

  const systemdata = await fetch("http://localhost:3000/system.txt");
  const systemText = await systemdata.text();

  return [
    {
      role: "user",
      parts: [
        {
          text: systemText,
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
