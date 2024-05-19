"use server";

import { handleModelResponse } from "@/utils";
import { generateSystemInstruction } from "@/utils/instructions";

type ActionProps = {
  message: string | null;
  isEmojiSupport: boolean;
};

type ActionPromise = {
  data: {
    text: string;
  } | null;
  error: string | null;
};

export const commitChange = async ({
  message,
  isEmojiSupport,
}: ActionProps): Promise<ActionPromise> => {
  if (!message || message.trim() === "") {
    return { data: null, error: "Please enter a message" };
  }

  try {
    const systemInstruction = generateSystemInstruction(isEmojiSupport);
    const responseText = await handleModelResponse(systemInstruction, message);

    console.log({
      message: message,
      response: responseText,
      isEmojiSupport: isEmojiSupport,
      data: {
        time: new Date().toISOString(),
      },
    });

    return {
      data: {
        text: responseText,
      },
      error: null,
    };
  } catch (error: any) {
    console.log("error on action", error);
    return {
      data: null,
      error: error?.statusText ? error.statusText : "something went wrong!",
    };
  }
};
