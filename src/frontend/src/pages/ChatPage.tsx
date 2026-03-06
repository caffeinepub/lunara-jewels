import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "@tanstack/react-router";
import { Bot, Send, Sparkles, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  type ChatMessage,
  type QuickReply,
  getBotResponse,
  getInitialQuickReplies,
} from "../utils/chatbot";

export default function ChatPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      text: "Hi there! 👋 I'm Luna, your Lunara Jewels guide. Whether you're looking for the perfect piece for yourself, hunting for a gift, or just curious about our handcrafted oxidized silver jewelry — I'm here to help! What's on your mind?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [quickReplies, setQuickReplies] = useState<QuickReply[]>(
    getInitialQuickReplies(),
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: scrollToBottom is stable
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    setTimeout(() => {
      const { response, quickReplies: newQuickReplies } = getBotResponse(text);

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setQuickReplies(newQuickReplies || []);
    }, 600);
  };

  const handleQuickReply = (reply: QuickReply) => {
    if (reply.intent === "navigate-shop") {
      navigate({ to: "/shop" });
      return;
    }
    if (reply.intent === "navigate-contact") {
      navigate({ to: "/contact" });
      return;
    }
    if (reply.intent === "navigate-order") {
      navigate({ to: "/order-request" });
      return;
    }
    if (reply.intent === "navigate-about") {
      navigate({ to: "/about" });
      return;
    }
    if (reply.intent === "navigate-shipping") {
      navigate({ to: "/shipping" });
      return;
    }
    if (reply.intent === "navigate-returns") {
      navigate({ to: "/returns" });
      return;
    }
    if (reply.intent === "navigate-faq") {
      navigate({ to: "/faq" });
      return;
    }
    if (reply.intent === "navigate-payment") {
      navigate({ to: "/payment-methods" });
      return;
    }
    if (reply.intent === "navigate-order-tracking") {
      navigate({ to: "/order-tracking" });
      return;
    }
    if (reply.intent === "navigate-privacy") {
      navigate({ to: "/privacy" });
      return;
    }
    if (reply.intent === "navigate-terms") {
      navigate({ to: "/terms" });
      return;
    }
    if (reply.intent === "navigate-collections") {
      navigate({ to: "/collections" });
      return;
    }
    if (reply.intent === "navigate-customization") {
      navigate({ to: "/customization" });
      return;
    }
    if (reply.intent === "navigate-quality") {
      navigate({ to: "/certifications-quality" });
      return;
    }
    if (reply.intent === "navigate-blog") {
      navigate({ to: "/blog" });
      return;
    }
    if (reply.intent === "navigate-reviews") {
      navigate({ to: "/reviews" });
      return;
    }

    handleSendMessage(reply.text);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  return (
    <div className="container max-w-4xl py-8 md:py-12">
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h1 className="font-serif text-3xl md:text-4xl font-bold">
            Chat with Luna
          </h1>
        </div>
        <p className="text-muted-foreground">
          Ask me anything about our jewelry, sizing, materials, shipping, or how
          to place an order — I'm happy to help! For something more personal or
          complex, our team is just a click away on the{" "}
          <button
            type="button"
            onClick={() => navigate({ to: "/contact" })}
            className="underline hover:text-foreground transition-colors"
          >
            Contact page
          </button>
          .
        </p>
      </div>

      {/* Chat Window — fixed height, flex column, no overflow */}
      <Card
        className="flex flex-col overflow-hidden"
        style={{ height: "min(600px, calc(100vh - 16rem))" }}
      >
        {/* Messages — scrollable, takes all available space */}
        <div className="flex-1 min-h-0 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="space-y-4 p-4 md:p-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.sender === "bot" && (
                    <div className="shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] md:max-w-[70%] rounded-2xl px-4 py-3 ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {message.text}
                    </p>
                  </div>
                  {message.sender === "user" && (
                    <div className="shrink-0 w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                      <User className="h-4 w-4 text-accent-foreground" />
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </div>

        {/* Quick Replies — anchored above input, never pushes input off screen */}
        {quickReplies.length > 0 && (
          <div className="shrink-0 px-4 md:px-6 py-3 border-t border-border/40">
            <div className="flex flex-wrap gap-2">
              {quickReplies.map((reply) => (
                <Button
                  key={reply.id}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickReply(reply)}
                  className="text-xs"
                >
                  {reply.text}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area — always anchored at the bottom */}
        <div className="shrink-0 p-4 md:p-6 border-t border-border/40">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask me anything about our jewelry..."
              className="flex-1"
            />
            <Button type="submit" size="icon" disabled={!inputValue.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
