import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, Search, UserPlus, Users } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { SAMPLE_CO_TRAVELLERS } from "../data/sampleData";
import type { CoTraveller } from "../types";

export default function Discover() {
  const [flightNum, setFlightNum] = useState("AI-202");
  const [date, setDate] = useState("2026-03-25");
  const [profFilter, setProfFilter] = useState("all");
  const [needFilter, setNeedFilter] = useState("all");
  const [searched, setSearched] = useState(true);
  const [results, setResults] = useState<CoTraveller[]>(SAMPLE_CO_TRAVELLERS);
  const [connected, setConnected] = useState<Set<string>>(new Set());

  const handleSearch = () => {
    if (!flightNum || !date) {
      toast.error("Please enter a flight/train number and date.");
      return;
    }
    let filtered = SAMPLE_CO_TRAVELLERS;
    if (profFilter && profFilter !== "all") {
      filtered = filtered.filter((c) =>
        c.profession.toLowerCase().includes(profFilter.toLowerCase()),
      );
    }
    if (needFilter && needFilter !== "all") {
      filtered = filtered.filter((c) => c.needs.some((n) => n === needFilter));
    }
    setResults(filtered);
    setSearched(true);
    toast.success(`Found ${filtered.length} co-traveller(s)!`);
  };

  const handleConnect = (id: string, name: string) => {
    setConnected((prev) => new Set([...prev, id]));
    toast.success(`Connection request sent to ${name}!`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <Users className="w-7 h-7 text-primary" />
          <div>
            <h1 className="text-2xl font-bold">Discover Co-Travellers</h1>
            <p className="text-muted-foreground text-sm">
              Find people on your flight or train and coordinate before
              departure.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Search Form */}
      <Card className="shadow-card mb-6" data-ocid="discover.search.card">
        <CardContent className="pt-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-1.5">
              <Label>Flight / Train Number</Label>
              <Input
                value={flightNum}
                onChange={(e) => setFlightNum(e.target.value)}
                placeholder="AI-202 or 12301"
                data-ocid="discover.flight.input"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Date of Travel</Label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                data-ocid="discover.date.input"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Filter by Profession</Label>
              <Select value={profFilter} onValueChange={setProfFilter}>
                <SelectTrigger data-ocid="discover.profession.select">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any</SelectItem>
                  <SelectItem value="Doctor">Doctor</SelectItem>
                  <SelectItem value="Engineer">Engineer</SelectItem>
                  <SelectItem value="Teacher">Teacher</SelectItem>
                  <SelectItem value="Business">Business</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Filter by Need</Label>
              <Select value={needFilter} onValueChange={setNeedFilter}>
                <SelectTrigger data-ocid="discover.need.select">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any</SelectItem>
                  <SelectItem value="Medical Help">Medical Help</SelectItem>
                  <SelectItem value="Luggage Sharing">
                    Luggage Sharing
                  </SelectItem>
                  <SelectItem value="Safety Companion">
                    Safety Companion
                  </SelectItem>
                  <SelectItem value="Local Tips">Local Tips</SelectItem>
                  <SelectItem value="Networking">Networking</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <Button
              onClick={handleSearch}
              className="gap-2"
              data-ocid="discover.search.button"
            >
              <Search className="w-4 h-4" /> Search
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setProfFilter("all");
                setNeedFilter("all");
              }}
              data-ocid="discover.filter.button"
            >
              <Filter className="w-4 h-4 mr-1" /> Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {searched && (
        <>
          <p className="text-sm text-muted-foreground mb-4">
            Showing <strong>{results.length}</strong> co-traveller(s) for{" "}
            <strong>{flightNum}</strong> on <strong>{date}</strong>
          </p>
          {results.length === 0 ? (
            <div
              data-ocid="discover.empty_state"
              className="text-center py-16 text-muted-foreground"
            >
              <Users className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p>No co-travellers found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {results.map((ct, i) => (
                <motion.div
                  key={ct.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  data-ocid={`discover.cotraveller.item.${i + 1}`}
                >
                  <Card className="shadow-card hover:shadow-card-hover transition-shadow">
                    <CardContent className="pt-4">
                      <div className="flex items-start gap-3">
                        <Avatar className="w-11 h-11">
                          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                            {ct.avatarInitials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-semibold text-sm">{ct.name}</p>
                            <span className="text-xs font-bold text-success">
                              {ct.matchPercent}% match
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {ct.profession} · Age {ct.age}
                          </p>
                          <Progress
                            value={ct.matchPercent}
                            className="h-1.5 mt-1.5 mb-2"
                          />
                          <div className="flex flex-wrap gap-1">
                            {ct.needs.map((need) => (
                              <Badge
                                key={need}
                                variant="secondary"
                                className="text-xs"
                              >
                                {need}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        className="w-full mt-3"
                        variant={connected.has(ct.id) ? "secondary" : "default"}
                        disabled={connected.has(ct.id)}
                        onClick={() => handleConnect(ct.id, ct.name)}
                        data-ocid={`discover.connect.button.${i + 1}`}
                      >
                        <UserPlus className="w-3.5 h-3.5 mr-1" />
                        {connected.has(ct.id) ? "Request Sent" : "Connect"}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
