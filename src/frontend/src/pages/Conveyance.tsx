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
import { Calendar, MapPin, Plane, Plus, Train, Trash2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useLocalConveyances } from "../hooks/useLocalProfile";
import type { ConveyanceProfile } from "../types";

const DEFAULT_FORM: Omit<ConveyanceProfile, "id"> = {
  mode: "Air",
  flightOrTrainNumber: "",
  date: "",
  origin: "",
  destination: "",
  seatClass: "",
  seatNumber: "",
};

export default function Conveyance() {
  const { conveyances, addConveyance, removeConveyance } =
    useLocalConveyances();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Omit<ConveyanceProfile, "id">>(DEFAULT_FORM);

  const handleAdd = () => {
    if (
      !form.flightOrTrainNumber ||
      !form.date ||
      !form.origin ||
      !form.destination
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }
    addConveyance({ ...form, id: `c${Date.now()}` });
    setForm(DEFAULT_FORM);
    setOpen(false);
    toast.success("Conveyance profile added!");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">My Travels</h1>
            <p className="text-muted-foreground text-sm">
              Manage your upcoming flights and train journeys.
            </p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button data-ocid="conveyance.add.button">
                <Plus className="w-4 h-4 mr-2" /> Add Conveyance
              </Button>
            </DialogTrigger>
            <DialogContent
              className="sm:max-w-lg"
              data-ocid="conveyance.add.dialog"
            >
              <DialogHeader>
                <DialogTitle>Add Conveyance Profile</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2">
                <div className="space-y-1.5 sm:col-span-2">
                  <Label>Mode of Transport</Label>
                  <Select
                    value={form.mode}
                    onValueChange={(v) =>
                      setForm((p) => ({ ...p, mode: v as "Air" | "Rail" }))
                    }
                  >
                    <SelectTrigger data-ocid="conveyance.mode.select">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Air">✈️ Air</SelectItem>
                      <SelectItem value="Rail">🚆 Rail</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>
                    {form.mode === "Air" ? "Flight Number" : "Train Number"}
                  </Label>
                  <Input
                    value={form.flightOrTrainNumber}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        flightOrTrainNumber: e.target.value,
                      }))
                    }
                    placeholder={form.mode === "Air" ? "AI-202" : "12301"}
                    data-ocid="conveyance.number.input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Date of Travel</Label>
                  <Input
                    type="date"
                    value={form.date}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, date: e.target.value }))
                    }
                    data-ocid="conveyance.date.input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Origin</Label>
                  <Input
                    value={form.origin}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, origin: e.target.value }))
                    }
                    placeholder="Delhi (DEL)"
                    data-ocid="conveyance.origin.input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Destination</Label>
                  <Input
                    value={form.destination}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, destination: e.target.value }))
                    }
                    placeholder="Mumbai (BOM)"
                    data-ocid="conveyance.destination.input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Seat Class</Label>
                  <Input
                    value={form.seatClass}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, seatClass: e.target.value }))
                    }
                    placeholder="Economy / 3A"
                    data-ocid="conveyance.class.input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Seat / Berth Number</Label>
                  <Input
                    value={form.seatNumber}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, seatNumber: e.target.value }))
                    }
                    placeholder="14C"
                    data-ocid="conveyance.seat.input"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setOpen(false)}
                  data-ocid="conveyance.cancel.button"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAdd}
                  data-ocid="conveyance.confirm.button"
                >
                  Add Travel
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </motion.div>

      {conveyances.length === 0 ? (
        <div
          data-ocid="conveyance.empty_state"
          className="text-center py-16 text-muted-foreground"
        >
          <Plane className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p className="font-medium">No travels yet</p>
          <p className="text-sm mt-1">
            Add your first conveyance to find co-travellers.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {conveyances.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              data-ocid={`conveyance.item.${i + 1}`}
            >
              <Card className="shadow-card border-border">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {c.mode === "Air" ? (
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Plane className="w-4 h-4 text-primary" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-lg bg-teal/10 flex items-center justify-center">
                          <Train className="w-4 h-4 text-teal" />
                        </div>
                      )}
                      <div>
                        <CardTitle className="text-base">
                          {c.flightOrTrainNumber}
                        </CardTitle>
                        <Badge variant="outline" className="text-xs mt-0.5">
                          {c.mode}
                        </Badge>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-destructive"
                      onClick={() => removeConveyance(c.id)}
                      data-ocid={`conveyance.delete_button.${i + 1}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>
                        {c.origin} → {c.destination}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{c.date}</span>
                    </div>
                    <div className="flex gap-2 pt-1">
                      <Badge variant="secondary" className="text-xs">
                        {c.seatClass}
                      </Badge>
                      {c.seatNumber && (
                        <Badge variant="secondary" className="text-xs">
                          Seat {c.seatNumber}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
