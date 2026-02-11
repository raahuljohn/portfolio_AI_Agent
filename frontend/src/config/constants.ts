export const BOT_CONFIG = {
  name: "John's Portfolio Agent",
  avatar: "",
  description: "Ask me anything about John John — experience, skills, education, and more.",
} as const;

// Get this from your Botpress workspace after running `adk deploy`
// Go to: Botpress Dashboard > Your Bot > Webchat > Client ID
// Set VITE_CLIENT_ID in your .env file
export const CLIENT_ID = import.meta.env.VITE_CLIENT_ID as string;
