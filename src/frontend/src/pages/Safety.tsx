import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertTriangle,
  CheckCircle2,
  Heart,
  ShieldCheck,
  Siren,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { SAMPLE_SOS_ALERTS, WOMAN_SAFETY_TIPS } from "../data/sampleData";
import type { SosAlert } from "../types";

export default function Safety() {
  const [sosMessage, setSosMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [alerts, setAlerts] = useState<SosAlert[]>(SAMPLE_SOS_ALERTS);

  const handleSendSOS = async () => {
    if (!sosMessage.trim()) {
      toast.error("Please enter a message before sending SOS.");
      return;
    }
    setSending(true);
    await new Promise((r) => setTimeout(r, 800));
    const newAlert: SosAlert = {
      id: `sos-${Date.now()}`,
      senderName: "You",
      message: sosMessage,
      timestamp: new Date().toISOString(),
      resolved: false,
      location: "Current Location",
    };
    setAlerts((prev) => [newAlert, ...prev]);
    setSosMessage("");
    setSending(false);
    toast.error("🚨 SOS Alert sent to nearby co-travellers!", {
      duration: 5000,
    });
  };

  const handleResolve = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, resolved: true } : a)),
    );
    toast.success("SOS alert marked as resolved.");
  };

  const formatTime = (ts: string) =>
    new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <ShieldCheck className="w-7 h-7 text-red-500" />
          <div>
            <h1 className="text-2xl font-bold">Safety & Medical</h1>
            <p className="text-muted-foreground text-sm">
              SOS alerts, woman safety, and medical assistance coordination.
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Card
            className="shadow-card border-red-100"
            data-ocid="safety.sos.card"
          >
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2 text-red-600">
                <Siren className="w-4 h-4" /> Send SOS Alert
              </CardTitle>
              <CardDescription>
                Alert nearby co-travellers instantly in an emergency.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Textarea
                value={sosMessage}
                onChange={(e) => setSosMessage(e.target.value)}
                placeholder="Describe your emergency: location, type of help needed..."
                rows={3}
                data-ocid="safety.sos.textarea"
              />
              <Button
                variant="destructive"
                className="w-full gap-2"
                onClick={handleSendSOS}
                disabled={sending}
                data-ocid="safety.sos.button"
              >
                <AlertTriangle className="w-4 h-4" />
                {sending ? "Sending SOS..." : "🚨 Send SOS Alert"}
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-card" data-ocid="safety.alerts.card">
            <CardHeader>
              <CardTitle className="text-base">Active SOS Alerts</CardTitle>
              <CardDescription>
                Recent alerts from co-travellers needing help.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {alerts.filter((a) => !a.resolved).length === 0 ? (
                <div
                  data-ocid="safety.alerts.empty_state"
                  className="text-center py-6 text-muted-foreground text-sm"
                >
                  <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-success opacity-60" />
                  No active SOS alerts. All clear!
                </div>
              ) : (
                alerts
                  .filter((a) => !a.resolved)
                  .map((alert, i) => (
                    <div
                      key={alert.id}
                      className="p-3 rounded-lg bg-red-50 border border-red-100"
                      data-ocid={`safety.alert.item.${i + 1}`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="destructive" className="text-xs">
                              SOS
                            </Badge>
                            <span className="text-xs font-semibold">
                              {alert.senderName}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {formatTime(alert.timestamp)}
                            </span>
                          </div>
                          <p className="text-sm">{alert.message}</p>
                          {alert.location && (
                            <p className="text-xs text-muted-foreground mt-1">
                              📍 {alert.location}
                            </p>
                          )}
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="shrink-0 border-red-200"
                          onClick={() => handleResolve(alert.id)}
                          data-ocid={`safety.resolve.button.${i + 1}`}
                        >
                          Resolve
                        </Button>
                      </div>
                    </div>
                  ))
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-card" data-ocid="safety.tips.card">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Heart className="w-4 h-4 text-pink-500" /> Woman Safety Tips
            </CardTitle>
            <CardDescription>
              Stay safe during your journey with these guidelines.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {WOMAN_SAFETY_TIPS.map((tip) => (
                <li key={tip} className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span className="text-sm leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
            <Separator className="my-4" />
            <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong className="text-foreground">
                  Safety Companion Feature:
                </strong>{" "}
                You can request a same-gender co-traveller as a safety companion
                when adding a conveyance profile. TravelMate verifies profiles
                before connecting.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
