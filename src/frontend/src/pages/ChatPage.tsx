import { useState, useRef, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Send, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getBotResponse, getInitialQuickReplies, ChatMessage, QuickReply } from '../utils/chatbot';

export default function ChatPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: "Hello! I'm here to help you with any questions about our handcrafted oxidized silver jewelry. What would you like to know?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [quickReplies, setQuickReplies] = useState<QuickReply[]>(getInitialQuickReplies());
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    // Get bot response
    setTimeout(() => {
      const { response, quickReplies: newQuickReplies } = getBotResponse(text);

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setQuickReplies(newQuickReplies || []);
    }, 500);
  };

  const handleQuickReply = (reply: QuickReply) => {
    // Handle navigation intents
    if (reply.intent === 'navigate-shop') {
      navigate({ to: '/shop' });
      return;
    }
    if (reply.intent === 'navigate-contact') {
      navigate({ to: '/contact' });
      return;
    }
    if (reply.intent === 'navigate-order') {
      navigate({ to: '/order-request' });
      return;
    }
    if (reply.intent === 'navigate-about') {
      navigate({ to: '/about' });
      return;
    }
    if (reply.intent === 'navigate-shipping') {
      navigate({ to: '/shipping' });
      return;
    }
    if (reply.intent === 'navigate-returns') {
      navigate({ to: '/returns' });
      return;
    }
    if (reply.intent === 'navigate-faq') {
      navigate({ to: '/faq' });
      return;
    }
    if (reply.intent === 'navigate-payment') {
      navigate({ to: '/payment-methods' });
      return;
    }
    if (reply.intent === 'navigate-order-tracking') {
      navigate({ to: '/order-tracking' });
      return;
    }
    if (reply.intent === 'navigate-privacy') {
      navigate({ to: '/privacy' });
      return;
    }
    if (reply.intent === 'navigate-terms') {
      navigate({ to: '/terms' });
      return;
    }
    if (reply.intent === 'navigate-collections') {
      navigate({ to: '/collections' });
      return;
    }
    if (reply.intent === 'navigate-customization') {
      navigate({ to: '/customization' });
      return;
    }
    if (reply.intent === 'navigate-quality') {
      navigate({ to: '/certifications-quality' });
      return;
    }
    if (reply.intent === 'navigate-blog') {
      navigate({ to: '/blog' });
      return;
    }
    if (reply.intent === 'navigate-reviews') {
      navigate({ to: '/reviews' });
      return;
    }

    // Otherwise, treat as a regular message
    handleSendMessage(reply.text);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  return (
    <div className="container max-w-4xl py-8 md:py-12">
      <div className="mb-6">
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">Chat with Us</h1>
        <p className="text-muted-foreground">
          Ask me a specific question about our jewelry, materials, sizing, shipping, returns, or ordering. 
          If I need more details, I'll ask a quick follow-up question. For complex or personalized requests, 
          visit our <button onClick={() => navigate({ to: '/contact' })} className="underline hover:text-foreground transition-colors">Contact page</button> to reach our team directly.
        </p>
      </div>

      <Card className="h-[600px] flex flex-col">
        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages Area */}
          <ScrollArea className="flex-1 p-4 md:p-6" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.sender === 'bot' && (
                    <div className="shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] md:max-w-[70%] rounded-2xl px-4 py-3 ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                  </div>
                  {message.sender === 'user' && (
                    <div className="shrink-0 w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                      <User className="h-4 w-4 text-accent-foreground" />
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Quick Replies */}
          {quickReplies.length > 0 && (
            <div className="px-4 md:px-6 py-3 border-t border-border/40">
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

          {/* Input Area */}
          <div className="p-4 md:p-6 border-t border-border/40">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button type="submit" size="icon" disabled={!inputValue.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
