import { GoogleGenerativeAI } from "@google/generative-ai";

// Get your API key from https://makersuite.google.com/app/apikey
if (!process.env.API_KEY) {
  console.log("API_KEY environment variable is required", process.env.NODE_ENV);
  console.log("node env:- ", process.env.NODE_ENV);
}

export const genAI = new GoogleGenerativeAI(process.env.API_KEY!);

export const model = genAI.getGenerativeModel({
  // model: "gemini-1.5-pro-latest",
  model: "gemini-1.5-pro",
});
