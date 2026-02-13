import { z, defineConfig } from "@botpress/runtime";

export default defineConfig({
  name: "portfolio-agent",
  description:
    "A portfolio agent that answers questions about John John using his LinkedIn profile as a knowledge base.",

  defaultModels: {
    autonomous: "google-ai:gemini-2.5-flash", // was gemini-2.5-pro — flash is ~3-5x faster for this use case
    zai: "openai:gpt-4.1-mini",
  },

  bot: {
    state: z
      .object({
        totalQueries: z.number(),
      })
      .default({
        totalQueries: 0,
      }),
  },

  user: {
    state: z
      .object({
        name: z.string().optional(),
      })
      .default({}),
  },

  dependencies: {
    integrations: {
      chat: { version: "chat@0.7.3", enabled: true },
      webchat: { version: "webchat@0.3.0", enabled: true },
    },
  },
});
