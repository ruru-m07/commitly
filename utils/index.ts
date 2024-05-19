import { GoogleGenerativeAI } from "@google/generative-ai";

// Get your API key from https://makersuite.google.com/app/apikey
if (!process.env.API_KEY) {
  console.log("API_KEY environment variable is required", process.env.NODE_ENV);
  console.log("node env:- ", process.env.NODE_ENV);
}

const genAI = new GoogleGenerativeAI(process.env.API_KEY!);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro-latest",
});

export const handleModelResponse = async (systemInstruction: string, message: string) => {
  const modelResponse = model.generateContent({
    contents: [{ role: "user", parts: [{ text: message }] }],
    systemInstruction,
  });

  const response = (await modelResponse).response.text();
  return response;
};
