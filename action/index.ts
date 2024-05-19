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
      - fot emoji you can use this link https://gitmoji.dev/
      - For example, if the user input is "I change lib folder to utils folder", then the output should be:
      \`\`\` json
      "gitmojis": [
        {
          "emoji": "🎨",
          "code": ":art:",
          "description": "Improve structure / format of the code."
        },
        {
          "emoji": "⚡️",
          "code": ":zap:",
          "description": "Improve performance."
        },
        {
          "emoji": "🔥",
          "code": ":fire:",
          "description": "Remove code or files."
        },
        {
          "emoji": "🐛",
          "code": ":bug:",
          "description": "Fix a bug."
        },
        {
          "emoji": "🚑️",
          "code": ":ambulance:",
          "description": "Critical hotfix."
        },
        {
          "emoji": "✨",
          "code": ":sparkles:",
          "description": "Introduce new features."
        },
        {
          "emoji": "📝",
          "code": ":memo:",
          "description": "Add or update documentation."
        },
        {
          "emoji": "🚀",
          "code": ":rocket:",
          "description": "Deploy stuff."
        },
        {
          "emoji": "💄",
          "code": ":lipstick:",
          "description": "Add or update the UI and style files."
        },
        {
          "emoji": "🎉",
          "code": ":tada:",
          "description": "Begin a project."
        },
        {
          "emoji": "✅",
          "code": ":white_check_mark:",
          "description": "Add, update, or pass tests."
        },
        {
          "emoji": "🔒️",
          "code": ":lock:",
          "description": "Fix security or privacy issues."
        },
        {
          "emoji": "🔐",
          "code": ":closed_lock_with_key:",
          "description": "Add or update secrets."
        },
        {
          "emoji": "🔖",
          "code": ":bookmark:",
          "description": "Release / Version tags."
        },
        {
          "emoji": "🚨",
          "code": ":rotating_light:",
          "description": "Fix compiler / linter warnings."
        },
        {
          "emoji": "🚧",
          "code": ":construction:",
          "description": "Work in progress."
        },
        {
          "emoji": "💚",
          "code": ":green_heart:",
          "description": "Fix CI Build."
        },
        {
          "emoji": "⬇️",
          "code": ":arrow_down:",
          "description": "Downgrade dependencies."
        },
        {
          "emoji": "⬆️",
          "code": ":arrow_up:",
          "description": "Upgrade dependencies."
        },
        {
          "emoji": "📌",
          "code": ":pushpin:",
          "description": "Pin dependencies to specific versions."
        },
        {
          "emoji": "👷",
          "code": ":construction_worker:",
          "description": "Add or update CI build system."
        },
        {
          "emoji": "📈",
          "code": ":chart_with_upwards_trend:",
          "description": "Add or update analytics or track code."
        },
        {
          "emoji": "♻️",
          "code": ":recycle:",
          "description": "Refactor code."
        },
        {
          "emoji": "➕",
          "code": ":heavy_plus_sign:",
          "description": "Add a dependency."
        },
        {
          "emoji": "➖",
          "code": ":heavy_minus_sign:",
          "description": "Remove a dependency."
        },
        {
          "emoji": "🔧",
          "code": ":wrench:",
          "description": "Add or update configuration files."
        },
        {
          "emoji": "🔨",
          "code": ":hammer:",
          "description": "Add or update development scripts."
        },
        {
          "emoji": "🌐",
          "code": ":globe_with_meridians:",
          "description": "Internationalization and localization."
        },
        {
          "emoji": "✏️",
          "code": ":pencil2:",
          "description": "Fix typos."
        },
        {
          "emoji": "💩",
          "code": ":poop:",
          "description": "Write bad code that needs to be improved."
        },
        {
          "emoji": "⏪️",
          "code": ":rewind:",
          "description": "Revert changes."
        },
        {
          "emoji": "🔀",
          "code": ":twisted_rightwards_arrows:",
          "description": "Merge branches."
        },
        {
          "emoji": "📦️",
          "code": ":package:",
          "description": "Add or update compiled files or packages."
        },
        {
          "emoji": "👽️",
          "code": ":alien:",
          "description": "Update code due to external API changes."
        },
        {
          "emoji": "🚚",
          "code": ":truck:",
          "description": "Move or rename resources (e.g.: files, paths, routes)."
        },
        {
          "emoji": "📄",
          "code": ":page_facing_up:",
          "description": "Add or update license."
        },
        {
          "emoji": "💥",
          "code": ":boom:",
          "description": "Introduce breaking changes."
        },
        {
          "emoji": "🍱",
          "code": ":bento:",
          "description": "Add or update assets."
        },
        {
          "emoji": "♿️",
          "code": ":wheelchair:",
          "description": "Improve accessibility."
        },
        {
          "emoji": "💡",
          "code": ":bulb:",
          "description": "Add or update comments in source code."
        },
        {
          "emoji": "🍻",
          "code": ":beers:",
          "description": "Write code drunkenly."
        },
        {
          "emoji": "💬",
          "code": ":speech_balloon:",
          "description": "Add or update text and literals."
        },
        {
          "emoji": "🗃️",
          "code": ":card_file_box:",
          "description": "Perform database related changes."
        },
        {
          "emoji": "🔊",
          "code": ":loud_sound:",
          "description": "Add or update logs."
        },
        {
          "emoji": "🔇",
          "code": ":mute:",
          "description": "Remove logs."
        },
        {
          "emoji": "👥",
          "code": ":busts_in_silhouette:",
          "description": "Add or update contributor(s)."
        },
        {
          "emoji": "🚸",
          "code": ":children_crossing:",
          "description": "Improve user experience / usability."
        },
        {
          "emoji": "🏗️",
          "code": ":building_construction:",
          "description": "Make architectural changes."
        },
        {
          "emoji": "📱",
          "code": ":iphone:",
          "description": "Work on responsive design."
        },
        {
          "emoji": "🤡",
          "code": ":clown_face:",
          "description": "Mock things."
        },
        {
          "emoji": "🥚",
          "code": ":egg:",
          "description": "Add or update an easter egg."
        },
        {
          "emoji": "🙈",
          "code": ":see_no_evil:",
          "description": "Add or update a .gitignore file."
        },
        {
          "emoji": "📸",
          "code": ":camera_flash:",
          "description": "Add or update snapshots."
        },
        {
          "emoji": "⚗️",
          "code": ":alembic:",
          "description": "Perform experiments."
        },
        {
          "emoji": "🔍️",
          "code": ":mag:",
          "description": "Improve SEO."
        },
        {
          "emoji": "🏷️",
          "code": ":label:",
          "description": "Add or update types."
        },
        {
          "emoji": "🌱",
          "code": ":seedling:",
          "description": "Add or update seed files."
        },
        {
          "emoji": "🚩",
          "code": ":triangular_flag_on_post:",
          "description": "Add, update, or remove feature flags."
        },
        {
          "emoji": "🥅",
          "code": ":goal_net:",
          "description": "Catch errors."
        },
        {
          "emoji": "💫",
          "code": ":dizzy:",
          "description": "Add or update animations and transitions."
        },
        {
          "emoji": "🗑️",
          "code": ":wastebasket:",
          "description": "Deprecate code that needs to be cleaned up."
        },
        {
          "emoji": "🛂",
          "code": ":passport_control:",
          "description": "Work on code related to authorization, roles and permissions."
        },
        {
          "emoji": "🩹",
          "code": ":adhesive_bandage:",
          "description": "Simple fix for a non-critical issue."
        },
        {
          "emoji": "🧐",
          "code": ":monocle_face:",
          "description": "Data exploration/inspection."
        },
        {
          "emoji": "⚰️",
          "code": ":coffin:",
          "description": "Remove dead code."
        },
        {
          "emoji": "🧪",
          "code": ":test_tube:",
          "description": "Add a failing test."
        },
        {
          "emoji": "👔",
          "code": ":necktie:",
          "description": "Add or update business logic."
        },
        {
          "emoji": "🩺",
          "code": ":stethoscope:",
          "description": "Add or update healthcheck."
        },
        {
          "emoji": "🧱",
          "code": ":bricks:",
          "description": "Infrastructure related changes."
        },
        {
          "emoji": "🧑‍💻",
          "code": ":technologist:",
          "description": "Improve developer experience."
        },
        {
          "emoji": "💸",
          "code": ":money_with_wings:",
          "description": "Add sponsorships or money related infrastructure."
        },
        {
          "emoji": "🧵",
          "code": ":thread:",
          "description": "Add or update code related to multithreading or concurrency."
        },
        {
          "emoji": "🦺",
          "code": ":safety_vest:",
          "description": "Add or update code related to validation."
        }
      ]      
      \`\`\`
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
