"use server";

import { model } from "@/utils";

export const commitChange = async ({
  message,
  isEmojiSupport,
}: {
  message: string | null;
  isEmojiSupport: boolean;
}): Promise<{
  data: {
    text: string;
  } | null;
  error: string | null;
}> => {
  if (!message || message.trim() === "") {
    return { data: null, error: "Please enter a message" };
  }

  try {
    const modelResponse = model.generateContent({
      contents: [{ role: "user", parts: [{ text: message }] }],
      systemInstruction: `\
      You are an assistant that helps to provide Git commit messages based on https://www.conventionalcommits.org/en/v1.0.0/.

      - Provide a Git commit message in a code block as txt.
      - Do not include the full command (e.g., \`git commit -m "here git message"\`).
      - Only provide the commit message itself.
      - Suggest 3 different commit messages to give the user some options.
      - For example, if the user input is "I change lib folder to utils folder", then the output should be:

      ${
        isEmojiSupport &&
        `\
      - Use emojis in the commit message.
      - For emojis, you can use https://gitmoji.dev/
      - Don't provide a description, just the commit message.
      - For example, if the user input is "I change lib folder to utils folder", then the output should be:
      `
      }

      ${
        isEmojiSupport
          ? `
      \`\`\`txt \n ♻️ refactor(lib): change lib folder to utils folder \n\`\`\`\n
      \`\`\`txt \n ➕ refactor(deps): rename lib folder to utils \n\`\`\`\n
      \`\`\`txt \n ✏️ fix(deps): rename lib folder to utils \n\`\`\`\n
          `
          : `
      \`\`\`txt \n refactor(lib): change lib folder to utils folder \n\`\`\`\n
      \`\`\`txt \n refactor(deps): rename lib folder to utils \n\`\`\`\n
      \`\`\`txt \n fix(deps): rename lib folder to utils \n\`\`\`\n
      `
      }

      `,
    });

    const response = (await modelResponse).response.text();

    console.log({
      message: message,
      response: response,
      data: {
        time: new Date().toISOString(),
      },
    });

    return {
      data: {
        text: response,
      },
      error: null,
    };
  } catch (error) {
    console.log("error on action", error);
    return { data: null, error: "something went wrong!" };
  }
};
