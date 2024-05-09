import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = 'edge';

// Get your API key from https://makersuite.google.com/app/apikey
if (!process.env.API_KEY) {
  console.log("API_KEY environment variable is required", process.env.NODE_ENV);
  console.log("node env:- ", process.env.NODE_ENV);
}

const genAI = new GoogleGenerativeAI(process.env.API_KEY!);

export const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export const systemHistory = async () => {
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

  console.log("protocol", protocol);
  console.log("VERCEL_URL", process.env.VERCEL_URL)

  const systemdata = await fetch(
    `${protocol}://${process.env.VERCEL_URL}/system.txt`
  );
  const systemText = await systemdata.text();

  if (systemText) {
    console.log("is systemText", true);
  }

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
