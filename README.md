# Portfolio Agent

A personal portfolio assistant built with the [Botpress ADK](https://botpress.com/docs/for-developers/adk/overview). It answers questions about John's professional background — work experience, education, skills, and projects — using his LinkedIn profile as a knowledge base.

## Tech Stack

**Agent (backend)**
- Botpress ADK + `@botpress/runtime`
- TypeScript, Bun
- Models: `google-ai:gemini-2.5-pro` (autonomous) / `openai:gpt-4.1-mini` (zai)

**Frontend**
- React 19, Vite, Tailwind CSS
- `@botpress/webchat` SDK
- Framer Motion, Lucide icons

## Project Structure

```
├── agent.config.ts          # Agent config (models, state, integrations)
├── src/
│   ├── conversations/       # Conversation handler (main chat logic)
│   ├── knowledge/           # Knowledge base sources (LinkedIn PDF)
│   ├── workflows/           # Scheduled workflows (periodic KB indexing)
│   ├── actions/             # Callable functions (placeholder)
│   ├── tables/              # Data storage schemas (placeholder)
│   └── triggers/            # Event subscriptions (placeholder)
├── frontend/
│   ├── src/
│   │   ├── App.tsx          # Chat UI with suggestions, animations
│   │   ├── components/      # Custom message renderers
│   │   └── config/          # Bot config & webchat client ID
│   └── vite.config.ts
└── agent.json               # Botpress deployment metadata
```

## How It Works

1. The agent listens on the **webchat** and **chat** channels.
2. Incoming messages are routed through the conversation handler in `src/conversations/`.
3. The handler invokes the autonomous LLM with instructions and the **Portfolio knowledge base** (sourced from a local PDF in `src/knowledge/`).
4. A scheduled workflow re-indexes the knowledge base every 6 hours.
5. The custom React frontend connects via the `@botpress/webchat` SDK using a client ID.

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) installed
- [Botpress ADK CLI](https://botpress.com/docs/for-developers/adk/overview) (`adk`) installed
- A Botpress Cloud workspace

### Agent

```bash
# Install dependencies
bun install

# Start the dev server
adk dev

# Deploy to Botpress Cloud
adk deploy
```

### Frontend

```bash
cd frontend

# Install dependencies
npm install

# Create a .env file with your webchat client ID
echo "VITE_CLIENT_ID=<your-client-id>" > .env

# Start the dev server
npm run dev
```

> After deploying the agent, grab the **Client ID** from your Botpress Dashboard under **Your Bot → Webchat** and set it as `VITE_CLIENT_ID`.

## Available Scripts

| Command | Description |
| --- | --- |
| `bun run dev` | Start the ADK dev server |
| `bun run build` | Build the agent |
| `bun run deploy` | Deploy to Botpress Cloud |
| `cd frontend && npm run dev` | Start the frontend dev server |
| `cd frontend && npm run build` | Build the frontend for production |

## Integrations

- **webchat** — Webchat channel for the custom frontend
- **chat** — Generic chat channel
- **browser** — Browser automation (configured in `agent.config.ts`)

## Learn More

- [ADK Documentation](https://botpress.com/docs/for-developers/adk/overview)
- [Webchat SDK](https://botpress.com/docs/for-developers/webchat/overview)
- [Botpress Cloud](https://botpress.com)
