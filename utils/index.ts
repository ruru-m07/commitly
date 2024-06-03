import { model } from "./GenAi";

const generationConfig = {
  temperature: 0.8,
  topP: 0.95,
  topK: 25,
  maxOutputTokens: 2048,
};

export const handleModelResponse = async (
  systemInstruction: string,
  message: string
) => {
  const modelResponse = model.generateContent({
    contents: [{ role: "user", parts: [{ text: message }] }],
    systemInstruction,
    generationConfig,
  });

  const response = (await modelResponse).response.text();
  return response;
};
