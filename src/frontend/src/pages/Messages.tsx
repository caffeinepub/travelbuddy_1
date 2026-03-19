import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Send } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { SAMPLE_CONVERSATIONS, SAMPLE_MESSAGES } from "../data/sampleData";
import type { Conversation, Message } from "../types";

export default function Messages() {
  const [conversations] = useState<Conversation[]>(SAMPLE_CONVERSATIONS);
  const [selected, setSelected] = useState<Conversation | null>(
    conversations[0],
  );
  const [messages, setMessages] =
    useState<Record<string, Message[]>>(SAMPLE_MESSAGES);
  const [newMessage, setNewMessage] = useState("");

  const currentMessages = selected ? messages[selected.principalId] || [] : [];

  const handleSend = () => {
    if (!newMessage.trim() || !selected) return;
    const msg: Message = {
      id: `m${Date.now()}`,
      fromPrincipal: "me",
      fromName: "You",
      content: newMessage,
      timestamp: new Date().toISOString(),
      isOwn: true,
    };
    setMessages((prev) => ({
      ...prev,
      [selected.principalId]: [...(prev[selected.principalId] || []), msg],
    }));
    setNewMessage("");
  };

  const formatTime = (ts: string) =>
    new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <MessageSquare className="w-7 h-7 text-primary" />
          <div>
            <h1 className="text-2xl font-bold">Messages</h1>
            <p className="text-muted-foreground text-sm">
              Secure end-to-end encrypted conversations with your co-travellers.
            </p>
          </div>
        </div>
      </motion.div>

      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        style={{ height: 520 }}
      >
        <Card
          className="shadow-card md:col-span-1 flex flex-col"
          data-ocid="messages.inbox.card"
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">
              Conversations
            </CardTitle>
          </CardHeader>
          <ScrollArea className="flex-1">
            <div className="space-y-1 px-3 pb-3">
              {conversations.map((conv, i) => (
                <button
                  type="button"
                  key={conv.principalId}
                  onClick={() => setSelected(conv)}
                  className={`w-full flex items-center gap-3 p-2.5 rounded-lg text-left transition-colors ${
                    selected?.principalId === conv.principalId
                      ? "bg-primary/10"
                      : "hover:bg-secondary"
                  }`}
                  data-ocid={`messages.conversation.item.${i + 1}`}
                >
                  <Avatar className="w-9 h-9 shrink-0">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                      {conv.name
                        .split(" ")
                        .map((w) => w[0])
                        .join("")
                        .slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium truncate">
                        {conv.name}
                      </span>
                      {conv.unread > 0 && (
                        <Badge className="bg-primary text-primary-foreground text-xs px-1.5 py-0.5 shrink-0 ml-1">
                          {conv.unread}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {conv.lastMessage}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </Card>

        <Card
          className="shadow-card md:col-span-2 flex flex-col"
          data-ocid="messages.chat.card"
        >
          {selected ? (
            <>
              <CardHeader className="pb-3 border-b border-border">
                <div className="flex items-center gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                      {selected.name
                        .split(" ")
                        .map((w) => w[0])
                        .join("")
                        .slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-sm font-semibold">
                      {selected.name}
                    </CardTitle>
                    <p className="text-xs text-success">Online</p>
                  </div>
                </div>
              </CardHeader>
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-3">
                  {currentMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[75%] px-3 py-2 rounded-xl text-sm ${
                          msg.isOwn
                            ? "bg-primary text-primary-foreground rounded-br-sm"
                            : "bg-secondary text-foreground rounded-bl-sm"
                        }`}
                      >
                        <p>{msg.content}</p>
                        <p
                          className={`text-xs mt-1 ${
                            msg.isOwn
                              ? "text-primary-foreground/70"
                              : "text-muted-foreground"
                          }`}
                        >
                          {formatTime(msg.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="p-3 border-t border-border">
                <div className="flex gap-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Type a message..."
                    className="flex-1"
                    data-ocid="messages.compose.input"
                  />
                  <Button
                    onClick={handleSend}
                    size="icon"
                    disabled={!newMessage.trim()}
                    data-ocid="messages.send.button"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div
              data-ocid="messages.chat.empty_state"
              className="flex-1 flex items-center justify-center text-muted-foreground"
            >
              <div className="text-center">
                <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>Select a conversation to start messaging</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
