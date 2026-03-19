import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Briefcase,
  ChevronRight,
  Luggage,
  MapPin,
  Plane,
  ShieldCheck,
  Star,
  Train,
  UserCircle,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { SAMPLE_CO_TRAVELLERS } from "../data/sampleData";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useLocalProfile } from "../hooks/useLocalProfile";
import { useLocalConveyances } from "../hooks/useLocalProfile";

const FEATURE_MODULES = [
  {
    icon: Luggage,
    title: "Logistics & Luggage",
    desc: "Share unused baggage allowance with co-travellers and save on excess weight fees.",
    to: "/luggage",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: ShieldCheck,
    title: "Safety & Medical",
    desc: "Connect with doctors, volunteers, and safe companions. SOS alerts for emergencies.",
    to: "/safety",
    color: "text-red-500",
    bg: "bg-red-50",
  },
  {
    icon: Briefcase,
    title: "Networking Hub",
    desc: "Foster professional connections, explore job leads, and meet people with shared interests.",
    to: "/networking",
    color: "text-teal",
    bg: "bg-teal/10",
  },
];

export default function Dashboard() {
  const { profile } = useLocalProfile();
  const { conveyances } = useLocalConveyances();
  const { identity } = useInternetIdentity();

  const displayName = profile.fullName || (identity ? "Traveller" : "Alex");
  const profileCompletion =
    ([
      profile.fullName,
      profile.gender,
      profile.age,
      profile.profession,
      profile.education,
      profile.residency,
    ].filter(Boolean).length *
      100) /
    6;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Greeting */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-foreground">
          Welcome back, {displayName}! 👋
        </h1>
        <p className="text-muted-foreground mt-1">
          Your next adventure awaits. Here's what's happening with your travels.
        </p>
      </motion.div>

      {/* Primary 3-col Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Col 1: Upcoming Travels */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          data-ocid="dashboard.upcoming.card"
        >
          <Card className="h-full shadow-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Plane className="w-4 h-4 text-primary" />
                Upcoming Travels
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {conveyances.length === 0 ? (
                <div
                  data-ocid="dashboard.upcoming.empty_state"
                  className="text-center py-8 text-muted-foreground text-sm"
                >
                  No upcoming travels. Add a conveyance to get started.
                </div>
              ) : (
                conveyances.slice(0, 3).map((c, i) => (
                  <div
                    key={c.id}
                    className="p-3 rounded-lg bg-secondary border border-border"
                    data-ocid={`dashboard.trip.item.${i + 1}`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {c.mode === "Air" ? (
                        <Plane className="w-4 h-4 text-primary" />
                      ) : (
                        <Train className="w-4 h-4 text-teal" />
                      )}
                      <span className="font-semibold text-sm">
                        {c.flightOrTrainNumber}
                      </span>
                      <Badge variant="outline" className="text-xs ml-auto">
                        {c.mode}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      <span>
                        {c.origin} → {c.destination}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {c.date} · {c.seatClass} · {c.seatNumber}
                    </p>
                  </div>
                ))
              )}
              <Link to="/conveyance">
                <Button
                  className="w-full mt-2"
                  variant="outline"
                  size="sm"
                  data-ocid="dashboard.add_travel.button"
                >
                  + Add Conveyance
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>

        {/* Col 2: Nearby Co-Travellers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          data-ocid="dashboard.cotravellers.card"
        >
          <Card className="h-full shadow-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Users className="w-4 h-4 text-teal" />
                Nearby Co-Travellers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {SAMPLE_CO_TRAVELLERS.slice(0, 3).map((ct, i) => (
                <div
                  key={ct.id}
                  className="flex items-center gap-3"
                  data-ocid={`dashboard.cotraveller.item.${i + 1}`}
                >
                  <Avatar className="w-9 h-9 shrink-0">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                      {ct.avatarInitials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{ct.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {ct.profession}
                    </p>
                    <Progress value={ct.matchPercent} className="h-1.5 mt-1" />
                  </div>
                  <span className="text-xs font-semibold text-success shrink-0">
                    {ct.matchPercent}%
                  </span>
                </div>
              ))}
              <Link to="/discover">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-2"
                  data-ocid="dashboard.discover.button"
                >
                  Discover More <ChevronRight className="w-3 h-3 ml-1" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>

        {/* Col 3: Profile Summary + Tourism Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex flex-col gap-4"
        >
          <Card
            className="shadow-card border-border"
            data-ocid="dashboard.profile.card"
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <UserCircle className="w-4 h-4 text-primary" />
                Profile Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-primary text-primary-foreground font-bold">
                    {displayName
                      .split(" ")
                      .map((w: string) => w[0])
                      .join("")
                      .toUpperCase()
                      .slice(0, 2) || "TB"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{displayName}</p>
                  <p className="text-sm text-muted-foreground">
                    {profile.profession || "Add your profession"}
                  </p>
                </div>
              </div>
              <div className="mb-3">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Profile Completion</span>
                  <span>{Math.round(profileCompletion)}%</span>
                </div>
                <Progress value={profileCompletion} className="h-2" />
              </div>
              {profile.planningNeeds.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {profile.planningNeeds.slice(0, 3).map((need) => (
                    <Badge key={need} variant="secondary" className="text-xs">
                      {need}
                    </Badge>
                  ))}
                </div>
              )}
              <Link to="/profile">
                <Button
                  size="sm"
                  className="w-full"
                  data-ocid="dashboard.edit_profile.button"
                >
                  Edit Profile
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card
            className="shadow-card border-border"
            data-ocid="dashboard.tips.card"
          >
            <CardContent className="pt-4">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-semibold">Tourism Tips</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Travelling to Jaipur? Connect with resident Anjali Singh for
                hidden gems — skip the tourist traps and explore the Anokhi
                Museum and Nahargarh Fort at sunset.
              </p>
              <Link to="/networking">
                <Button
                  variant="link"
                  size="sm"
                  className="p-0 h-auto mt-2 text-primary text-xs"
                  data-ocid="dashboard.tips.button"
                >
                  More tips <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Feature Module Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <h2 className="text-lg font-semibold mb-4">Explore Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {FEATURE_MODULES.map((mod, i) => (
            <Card
              key={mod.title}
              className="shadow-card border-border hover:shadow-card-hover transition-shadow cursor-pointer"
              data-ocid={`dashboard.feature.item.${i + 1}`}
            >
              <CardContent className="pt-5">
                <div
                  className={`w-10 h-10 rounded-xl ${mod.bg} flex items-center justify-center mb-3`}
                >
                  <mod.icon className={`w-5 h-5 ${mod.color}`} />
                </div>
                <h3 className="font-semibold mb-1">{mod.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {mod.desc}
                </p>
                <Link to={mod.to}>
                  <Button
                    variant="outline"
                    size="sm"
                    data-ocid={`dashboard.feature.button.${i + 1}`}
                  >
                    Explore <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
