import type { IntegrationMessage } from "@botpress/webchat";
import {
  Composer,
  Container,
  MessageList,
  StylesheetProvider,
  useWebchat,
} from "@botpress/webchat";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, RefreshCw, Briefcase, GraduationCap, Code2, User } from "lucide-react";
import * as React from "react";
import { useStickToBottom } from "use-stick-to-bottom";
import "./App.css";
import TextRenderer from "./components/TextRenderer";
import { BOT_CONFIG, CLIENT_ID } from "./config/constants";

const SUGGESTIONS = [
  { text: "Tell me about John's work experience", icon: Briefcase },
  { text: "What skills does John have?", icon: Code2 },
  { text: "Where did John study?", icon: GraduationCap },
  { text: "Give me a summary of John's profile", icon: User },
];

const FloatingOrbs = () => {
  return (
    <div className="floating-orbs">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className={`orb orb-${i + 1}`}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -40, 20, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 15 + i * 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

function App() {
  const {
    client,
    messages,
    isTyping,
    clientState,
    newConversation,
    user,
  } = useWebchat({
    clientId: CLIENT_ID,
  });

  const isLoading = clientState === "connecting" || clientState === "disconnected";
  const hasMessages = messages.length > 0;

  // Stick to bottom hook - allows scrolling up but sticks to bottom on new content
  const { scrollRef, contentRef, scrollToBottom, isAtBottom } = useStickToBottom({
    initial: "instant",
    resize: "smooth",
  });

  const messagesWithDirection = React.useMemo(() => {
    return messages.map((msg) => ({
      ...msg,
      direction: msg.authorId === user?.userId ? "outgoing" : "incoming",
    }));
  }, [messages, user?.userId]);

  // Auto-scroll when messages change or bot is typing
  React.useEffect(() => {
    if (messages.length > 0 || isTyping) {
      scrollToBottom();
    }
  }, [messages, isTyping, scrollToBottom]);


  // Auto-focus input on first render
  React.useEffect(() => {
    const timer = setTimeout(() => {
      const composerInput = document.querySelector(
        'textarea[placeholder*="John"]'
      ) as HTMLTextAreaElement;
      if (composerInput) {
        composerInput.focus();
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Focus input on "/" key
  React.useEffect(() => {
    const handleSlashKey = (e: KeyboardEvent) => {
      if (
        e.key === "/" &&
        !(e.target instanceof HTMLInputElement) &&
        !(e.target instanceof HTMLTextAreaElement)
      ) {
        e.preventDefault();
        const composerInput = document.querySelector(
          'textarea[placeholder*="John"]'
        ) as HTMLTextAreaElement;
        if (composerInput) {
          composerInput.focus();
        }
      }
    };

    document.addEventListener("keydown", handleSlashKey);
    return () => document.removeEventListener("keydown", handleSlashKey);
  }, []);

  const sendMessage = async (payload: IntegrationMessage["payload"]) => {
    if (!client) return;

    try {
      await client.sendMessage(payload);
      // Scroll after sending
      setTimeout(() => scrollToBottom(), 100);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="app-container">
      <FloatingOrbs />

      {/* Header */}
      <motion.header
        className="app-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="header-left"></div>
        <motion.button
          onClick={() => {
            newConversation();
            setTimeout(() => {
              const composerInput = document.querySelector(
                'textarea[placeholder*="John"]'
              ) as HTMLTextAreaElement;
              if (composerInput) {
                composerInput.focus();
              }
            }, 100);
          }}
          className="new-chat-btn"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <RefreshCw size={16} />
          <span>New Chat</span>
        </motion.button>
      </motion.header>

      {/* Main Content Area */}
      <div className={`main-content ${isLoading ? "is-loading" : hasMessages ? "has-messages" : "empty-state"}`}>
        <Container
          connected={clientState !== "disconnected"}
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Loading State */}
          <AnimatePresence>
            {isLoading && (
              <motion.div
                className="loading-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="loading-spinner">
                  <motion.div
                    className="spinner-ring"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                </div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Connecting...
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hero Section - Empty State */}
          <AnimatePresence>
            {!isLoading && !hasMessages && (
              <motion.div
                className="hero-section"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="hero-avatar"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                >
                  <div className="avatar-glow" />
                  <div className="avatar-inner">
                    <Sparkles size={32} />
                  </div>
                </motion.div>

                <motion.h1
                  className="hero-title"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Hi, I'm John's AI Assistant
                </motion.h1>

                <motion.p
                  className="hero-description"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Ask me anything about his experience, skills, education, or projects.
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Message List with stick-to-bottom */}
          <div className="messages-area" ref={scrollRef}>
            <div ref={contentRef} className="messages-content">
              <MessageList
                botName={BOT_CONFIG.name}
                botDescription={BOT_CONFIG.description}
                isTyping={isTyping}
                showMessageStatus={true}
                showMarquee={false}
                messages={messagesWithDirection}
                sendMessage={sendMessage}
                userId={user?.userId}
                renderers={{
                  bubble: TextRenderer,
                }}
              />
            </div>
          </div>

          <StylesheetProvider
            radius={1.5}
            fontFamily="Inter"
            variant="solid"
            color="#8B5CF6"
          />
        </Container>
      </div>

      {/* Bottom Section - Fixed */}
      <div className="bottom-section">
        {/* Always Visible Suggestion Chips */}
        <motion.div
          className="suggestions-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="suggestions-label">
            <Sparkles size={14} />
            <span>Suggested questions</span>
          </div>
          <div className="suggestions-grid">
            {SUGGESTIONS.map((suggestion, index) => {
              const Icon = suggestion.icon;
              return (
                <motion.button
                  key={suggestion.text}
                  className="suggestion-chip"
                  onClick={() => sendMessage({ type: "text", text: suggestion.text })}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon size={16} className="chip-icon" />
                  <span>{suggestion.text}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Composer */}
        <div className="composer-container">
          <Composer
            disableComposer={false}
            isReadOnly={false}
            allowFileUpload={true}
            uploadFile={client?.uploadFile}
            connected={clientState !== "disconnected"}
            sendMessage={sendMessage}
            composerPlaceholder="Ask about John..."
          />
        </div>

        {/* Footer */}
        <motion.footer
          className="app-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <span>
            Powered by{" "}
            <a
              href="https://botpress.com/docs/for-developers/adk/overview"
              target="_blank"
              rel="noopener noreferrer"
            >
              Botpress ADK
            </a>
          </span>
        </motion.footer>
      </div>
    </div>
  );
}

export default App;
