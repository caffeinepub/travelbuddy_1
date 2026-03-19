import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { BookOpen, Briefcase, Heart, MapPin, Plus, Tag } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { SAMPLE_NETWORKING_POSTS } from "../data/sampleData";
import type { NetworkingPost } from "../types";

const CATEGORIES = [
  { value: "Jobs", label: "Jobs", icon: Briefcase },
  { value: "Education", label: "Education", icon: BookOpen },
  { value: "Dating", label: "Dating", icon: Heart },
  { value: "Tourism", label: "Tourism", icon: MapPin },
];

export default function Networking() {
  const [posts, setPosts] = useState<NetworkingPost[]>(SAMPLE_NETWORKING_POSTS);
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Jobs");
  const [form, setForm] = useState({
    category: "Jobs",
    title: "",
    content: "",
    tags: "",
  });

  const handleCreate = () => {
    if (!form.title || !form.content) {
      toast.error("Please fill in title and content.");
      return;
    }
    const newPost: NetworkingPost = {
      id: `np${Date.now()}`,
      authorName: "You",
      category: form.category,
      title: form.title,
      content: form.content,
      timestamp: new Date().toISOString(),
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };
    setPosts((prev) => [newPost, ...prev]);
    setForm({ category: "Jobs", title: "", content: "", tags: "" });
    setOpen(false);
    toast.success("Post published!");
  };

  const filteredPosts = posts.filter((p) => p.category === activeTab);

  const formatDate = (ts: string) =>
    new Date(ts).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Briefcase className="w-7 h-7 text-teal" />
            <div>
              <h1 className="text-2xl font-bold">Networking Hub</h1>
              <p className="text-muted-foreground text-sm">
                Forge professional, educational, and personal connections in
                transit.
              </p>
            </div>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button data-ocid="networking.add.button">
                <Plus className="w-4 h-4 mr-2" /> New Post
              </Button>
            </DialogTrigger>
            <DialogContent data-ocid="networking.add.dialog">
              <DialogHeader>
                <DialogTitle>Create Networking Post</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div className="space-y-1.5">
                  <Label>Category</Label>
                  <Select
                    value={form.category}
                    onValueChange={(v) =>
                      setForm((p) => ({ ...p, category: v }))
                    }
                  >
                    <SelectTrigger data-ocid="networking.category.select">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((c) => (
                        <SelectItem key={c.value} value={c.value}>
                          {c.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Title</Label>
                  <Input
                    value={form.title}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, title: e.target.value }))
                    }
                    placeholder="What's on your mind?"
                    data-ocid="networking.title.input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Content</Label>
                  <Textarea
                    value={form.content}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, content: e.target.value }))
                    }
                    placeholder="Share details, opportunities, or your story..."
                    rows={4}
                    data-ocid="networking.content.textarea"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" /> Tags (comma-separated)
                  </Label>
                  <Input
                    value={form.tags}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, tags: e.target.value }))
                    }
                    placeholder="e.g. Fintech, Mumbai, Startup"
                    data-ocid="networking.tags.input"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setOpen(false)}
                  data-ocid="networking.cancel.button"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCreate}
                  data-ocid="networking.confirm.button"
                >
                  Publish
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </motion.div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        data-ocid="networking.tabs"
      >
        <TabsList className="mb-6">
          {CATEGORIES.map((cat) => (
            <TabsTrigger
              key={cat.value}
              value={cat.value}
              className="gap-1.5"
              data-ocid="networking.tab"
            >
              <cat.icon className="w-3.5 h-3.5" />
              {cat.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {CATEGORIES.map((cat) => (
          <TabsContent key={cat.value} value={cat.value}>
            <AnimatePresence mode="wait">
              {filteredPosts.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  data-ocid="networking.empty_state"
                  className="text-center py-16 text-muted-foreground"
                >
                  <cat.icon className="w-12 h-12 mx-auto mb-4 opacity-30" />
                  <p>No {cat.label} posts yet. Be the first to share!</p>
                </motion.div>
              ) : (
                <motion.div
                  key="list"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  {filteredPosts.map((post, i) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.07 }}
                      data-ocid={`networking.post.item.${i + 1}`}
                    >
                      <Card className="shadow-card hover:shadow-card-hover transition-shadow">
                        <CardHeader className="pb-2">
                          <div className="flex items-start gap-3">
                            <Avatar className="w-9 h-9 shrink-0">
                              <AvatarFallback className="bg-teal/10 text-teal text-xs font-bold">
                                {post.authorName
                                  .split(" ")
                                  .map((w) => w[0])
                                  .join("")
                                  .slice(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-sm font-semibold">
                                  {post.title}
                                </CardTitle>
                              </div>
                              <p className="text-xs text-muted-foreground">
                                {post.authorName} · {formatDate(post.timestamp)}
                              </p>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm leading-relaxed mb-3">
                            {post.content}
                          </p>
                          {post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {post.tags.map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  # {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
