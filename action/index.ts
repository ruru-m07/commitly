"use server";

import { model, systemHistory } from "@/utils";
import {
  Content,
} from "@google/generative-ai";

export const commitMessage = async ({
  message,
  history,
}: {
  message: string;
  history: Content[];
}) => {

  const chat = model.startChat({
    history: [
      ...await systemHistory(),
      ...history,
    ],
  });

  try {
    const result = await chat.sendMessage(message);
    const response = result.response;

    const text = response.text();
    console.log("text", text);

    return { success: true, text: text };
  } catch (error) {
    return { success: false, error: error as string };
  }
};
