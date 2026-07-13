'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const QUICK_REPLIES = [
  'Tell me about SEO',
  'Pricing plans',
  'Book a consultation',
];

const INITIAL_MESSAGE: Message = {
  id: 'initial',
  role: 'assistant',
  content:
    "\uD83D\uDC4B Hi! I'm the Social Viens AI assistant. How can I help you grow your business today?",
};

function generateId() {
  return Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
}

function getSessionId() {
  try {
    const saved = sessionStorage.getItem('sv-chat-session');
    if (saved && /^[A-Za-z0-9_-]{12,80}$/.test(saved)) return saved;
    const created = generateId();
    sessionStorage.setItem('sv-chat-session', created);
    return created;
  } catch {
    return generateId();
  }
}

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex items-start gap-2 mb-4"
    >
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-gold to-bronze flex items-center justify-center">
        <Bot className="w-4 h-4 text-sv-bg" />
      </div>
      <div className="glass rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%]">
        <div className="flex items-center gap-1.5">
          <span
            className="w-2 h-2 rounded-full bg-gold/60"
            style={{
              animation: 'typingDot 1.4s ease-in-out infinite',
              animationDelay: '0s',
            }}
          />
          <span
            className="w-2 h-2 rounded-full bg-gold/60"
            style={{
              animation: 'typingDot 1.4s ease-in-out infinite',
              animationDelay: '0.2s',
            }}
          />
          <span
            className="w-2 h-2 rounded-full bg-gold/60"
            style={{
              animation: 'typingDot 1.4s ease-in-out infinite',
              animationDelay: '0.4s',
            }}
          />
        </div>
      </div>
      <style>{`
        @keyframes typingDot {
          0%, 60%, 100% { opacity: 0.4; transform: translateY(0); }
          30% { opacity: 1; transform: translateY(-4px); }
        }
      `}</style>
    </motion.div>
  );
}

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(getSessionId);
  const [showTooltip, setShowTooltip] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Show tooltip after 3 seconds
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => setShowTooltip(true), 3000);
      return () => clearTimeout(timer);
    } else {
      setShowTooltip(false);
    }
  }, [isOpen]);

  // Hide tooltip after 5 seconds of showing
  useEffect(() => {
    if (showTooltip && !isOpen) {
      const timer = setTimeout(() => setShowTooltip(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showTooltip, isOpen]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content: text.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, message: text.trim() }),
      });

      const data = await response.json().catch(() => ({}));

      if (data.success && data.response) {
        const aiMessage: Message = {
          id: generateId(),
          role: 'assistant',
          content: data.response,
        };
        setMessages((prev) => [...prev, aiMessage]);
      } else {
        const errorMessage: Message = {
          id: generateId(),
          role: 'assistant',
          content:
            "I'm having trouble connecting right now. Please try again or reach us at socialviens@gmail.com",
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch {
      const errorMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content:
          "I'm having trouble connecting right now. Please try again or reach us at socialviens@gmail.com",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleQuickReply = (reply: string) => {
    sendMessage(reply);
  };

  return (
    <>
      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-24 left-4 z-50 w-[calc(100vw-2rem)] sm:w-96 flex flex-col overflow-hidden rounded-2xl glass-strong gold-glow"
            style={{ maxHeight: 'min(600px, calc(100vh - 120px))' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gold/10 bg-gradient-to-r from-sv-surface to-sv-elevated">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold to-bronze flex items-center justify-center">
                  <Sparkles className="w-4.5 h-4.5 text-sv-bg" />
                </div>
                <div>
                  <h3 className="text-gold-gradient font-semibold text-sm">
                    SV Assistant
                  </h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs text-sv-muted">Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-sv-muted hover:text-cream hover:bg-white/5 transition-colors"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto px-4 py-4 space-y-1"
              aria-live="polite"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(212,175,55,0.3) transparent',
              }}
            >
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex items-start gap-2 mb-4 ${
                    msg.role === 'user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-br from-gold to-bronze'
                        : 'bg-gradient-to-br from-gold/20 to-bronze/20 border border-gold/20'
                    }`}
                  >
                    {msg.role === 'user' ? (
                      <User className="w-4 h-4 text-sv-bg" />
                    ) : (
                      <Bot className="w-4 h-4 text-gold" />
                    )}
                  </div>

                  {/* Message bubble */}
                  <div
                    className={`max-w-[80%] px-4 py-3 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-br from-gold to-bronze text-sv-bg rounded-2xl rounded-tr-sm font-medium'
                        : 'glass rounded-2xl rounded-tl-sm text-cream'
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {isLoading && <TypingIndicator />}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length <= 2 && !isLoading && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                {QUICK_REPLIES.map((reply) => (
                  <button
                    key={reply}
                    onClick={() => handleQuickReply(reply)}
                    className="text-xs px-3 py-1.5 rounded-full border border-gold/20 text-gold hover:bg-gold/10 hover:border-gold/40 transition-all duration-200"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}

            {/* Input Area */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 px-4 py-3 border-t border-gold/10 bg-sv-surface/50"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                maxLength={1200}
                disabled={isLoading}
                className="flex-1 bg-sv-elevated/50 border border-gold/10 rounded-xl px-4 py-2.5 text-sm text-cream placeholder:text-sv-muted/50 focus:outline-none focus:border-gold/30 focus:ring-1 focus:ring-gold/20 transition-all disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-gold to-bronze flex items-center justify-center text-sv-bg hover:shadow-lg hover:shadow-gold/20 transition-all duration-200 disabled:opacity-40 disabled:hover:shadow-none"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Chat Button */}
      <div className="fixed bottom-6 left-4 z-50">
        {/* Tooltip */}
        <AnimatePresence>
          {showTooltip && !isOpen && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="absolute bottom-full left-0 mb-3 whitespace-nowrap"
            >
              <div className="glass-strong rounded-lg px-3 py-2 text-xs text-cream shadow-lg">
                Chat with us
                <div className="absolute -bottom-1 left-4 w-2 h-2 glass-strong rotate-45" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse ring */}
        <div className="absolute inset-0 rounded-full">
          <span className="absolute inset-0 rounded-full bg-gradient-to-br from-gold to-bronze animate-ping opacity-20" />
        </div>

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-14 h-14 rounded-full bg-gradient-to-br from-gold to-bronze flex items-center justify-center shadow-lg hover:shadow-xl hover:shadow-gold/30 transition-shadow duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={isOpen ? 'Close chat' : 'Open chat'}
          onMouseEnter={() => setShowTooltip(false)}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6 text-sv-bg" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MessageCircle className="w-6 h-6 text-sv-bg" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </>
  );
}
