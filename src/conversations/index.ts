import { Conversation, bot, adk } from "@botpress/runtime";
import { PortfolioKB } from "../knowledge/index";

// Main conversation handler — portfolio agent
export default new Conversation({
  channel: ["webchat.channel", "chat.channel"],

  handler: async ({ execute, message, conversation }) => {

    // Debug: respond with current LLM model when user says "/model"
    if (message?.payload?.text?.trim() === "/model") {
      const models = adk.project.config.defaultModels;
      await conversation.send({
        type: "text",
        payload: {
          text: `🤖 Current models:\n• Autonomous: ${models.autonomous}\n• Zai: ${models.zai}`,
        },
      });
      return;
    }

    // await PortfolioKB.refresh();
    // Track total queries
    bot.state.totalQueries += 1;

    // Execute the autonomous agent with knowledge base
    await execute({
      instructions: `You are John's personal portfolio assistant. Your role is to answer questions about John based on the information in the knowledge base (his LinkedIn profile).

FORMATTING RULES (STRICT):
- Never use markdown formatting of any kind
- No bold (**text**), no italics (*text*), no code blocks (\`text\`)
- No HTML tags
- Use plain text only
- For lists, use simple dashes (-) without any special formatting

Key guidelines:
- Always search the knowledge base before answering questions about John.
- Cover topics like: work experience, education, skills, certifications, projects, and professional background.
- Be friendly, professional, and concise.
- If someone asks something not related to John's professional profile, politely redirect them.
- If the knowledge base doesn't contain the answer, say so honestly — don't make things up.
- When listing experience or skills, present them in a clean, readable format.
- You can greet visitors and introduce yourself as John's portfolio assistant.
- Encourage visitors to connect with John on LinkedIn if they want to get in touch.`,
      knowledge: [PortfolioKB],
    });

  },
});
