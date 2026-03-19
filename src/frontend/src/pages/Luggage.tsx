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
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle2,
  Luggage as LuggageIcon,
  Plus,
  Scale,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { SAMPLE_LUGGAGE_REQUESTS } from "../data/sampleData";
import type { LuggageRequest } from "../types";

export default function Luggage() {
  const [requests, setRequests] = useState<LuggageRequest[]>(
    SAMPLE_LUGGAGE_REQUESTS,
  );
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    conveyanceId: "",
    weight: "",
    description: "",
  });
  const [accepted, setAccepted] = useState<Set<string>>(
    new Set(requests.filter((r) => r.accepted).map((r) => r.id)),
  );

  const handleCreate = () => {
    if (!form.conveyanceId || !form.weight) {
      toast.error("Please fill in required fields.");
      return;
    }
    const newReq: LuggageRequest = {
      id: `lr${Date.now()}`,
      ownerName: "You",
      conveyanceId: form.conveyanceId,
      availableWeight: Number.parseFloat(form.weight),
      description: form.description,
      accepted: false,
      timestamp: new Date().toISOString(),
    };
    setRequests((prev) => [newReq, ...prev]);
    setForm({ conveyanceId: "", weight: "", description: "" });
    setOpen(false);
    toast.success("Luggage sharing request posted!");
  };

  const handleAccept = (id: string, ownerName: string) => {
    setAccepted((prev) => new Set([...prev, id]));
    toast.success(`You accepted ${ownerName}'s luggage request!`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <LuggageIcon className="w-7 h-7 text-primary" />
            <div>
              <h1 className="text-2xl font-bold">Luggage Sharing</h1>
              <p className="text-muted-foreground text-sm">
                Coordinate unused baggage allowance with co-travellers.
              </p>
            </div>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button data-ocid="luggage.add.button">
                <Plus className="w-4 h-4 mr-2" /> Post Request
              </Button>
            </DialogTrigger>
            <DialogContent data-ocid="luggage.add.dialog">
              <DialogHeader>
                <DialogTitle>Create Luggage Sharing Request</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div className="space-y-1.5">
                  <Label>Flight / Train Number</Label>
                  <Input
                    value={form.conveyanceId}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, conveyanceId: e.target.value }))
                    }
                    placeholder="AI-202"
                    data-ocid="luggage.conveyance.input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Available Weight (kg)</Label>
                  <Input
                    type="number"
                    value={form.weight}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, weight: e.target.value }))
                    }
                    placeholder="8"
                    data-ocid="luggage.weight.input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Description</Label>
                  <Textarea
                    value={form.description}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, description: e.target.value }))
                    }
                    placeholder="Any restrictions or notes about what you can carry..."
                    rows={3}
                    data-ocid="luggage.desc.textarea"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setOpen(false)}
                  data-ocid="luggage.cancel.button"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCreate}
                  data-ocid="luggage.confirm.button"
                >
                  Post
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </motion.div>

      {requests.length === 0 ? (
        <div
          data-ocid="luggage.empty_state"
          className="text-center py-16 text-muted-foreground"
        >
          <LuggageIcon className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p>No luggage sharing requests yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {requests.map((req, i) => (
            <motion.div
              key={req.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              data-ocid={`luggage.item.${i + 1}`}
            >
              <Card className="shadow-card hover:shadow-card-hover transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-semibold">
                      {req.ownerName}
                    </CardTitle>
                    <div className="flex items-center gap-1.5">
                      {accepted.has(req.id) || req.accepted ? (
                        <Badge className="bg-success/15 text-success border-success/20 text-xs">
                          <CheckCircle2 className="w-3 h-3 mr-1" /> Accepted
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-xs">
                          {req.conveyanceId}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-2">
                    <Scale className="w-4 h-4 text-primary" />
                    <span className="text-lg font-bold text-primary">
                      {req.availableWeight} kg
                    </span>
                    <span className="text-xs text-muted-foreground">
                      available
                    </span>
                  </div>
                  {req.description && (
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                      {req.description}
                    </p>
                  )}
                  <Button
                    size="sm"
                    className="w-full"
                    variant={
                      accepted.has(req.id) || req.accepted
                        ? "secondary"
                        : "default"
                    }
                    disabled={accepted.has(req.id) || req.accepted}
                    onClick={() => handleAccept(req.id, req.ownerName)}
                    data-ocid={`luggage.accept.button.${i + 1}`}
                  >
                    {accepted.has(req.id) || req.accepted
                      ? "Accepted"
                      : "Accept Request"}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
