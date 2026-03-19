import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Save, UserCircle } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useLocalProfile } from "../hooks/useLocalProfile";
import type { UserProfile } from "../types";

const PLANNING_NEEDS = [
  "Medical Help",
  "Luggage Sharing",
  "Safety Companion",
  "Local Tips",
  "Networking",
  "Dating",
];

export default function Profile() {
  const { profile, saveProfile } = useLocalProfile();
  const [form, setForm] = useState<UserProfile>({ ...profile });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 600));
    saveProfile(form);
    setSaving(false);
    toast.success("Profile saved successfully!");
  };

  const toggleNeed = (need: string) => {
    setForm((prev) => ({
      ...prev,
      planningNeeds: prev.planningNeeds.includes(need)
        ? prev.planningNeeds.filter((n) => n !== need)
        : [...prev.planningNeeds, need],
    }));
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <UserCircle className="w-7 h-7 text-primary" />
          <div>
            <h1 className="text-2xl font-bold">Your Profile</h1>
            <p className="text-muted-foreground text-sm">
              Update your personal information and travel preferences.
            </p>
          </div>
        </div>
      </motion.div>

      <div className="space-y-6">
        {/* Personal Info */}
        <Card className="shadow-card" data-ocid="profile.card">
          <CardHeader>
            <CardTitle className="text-base">Personal Information</CardTitle>
            <CardDescription>
              Your identity visible to co-travellers.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={form.fullName}
                onChange={(e) =>
                  setForm((p) => ({ ...p, fullName: e.target.value }))
                }
                placeholder="Dr. Priya Sharma"
                data-ocid="profile.fullname.input"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="gender">Gender</Label>
              <Select
                value={form.gender}
                onValueChange={(v) => setForm((p) => ({ ...p, gender: v }))}
              >
                <SelectTrigger data-ocid="profile.gender.select">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Non-binary">Non-binary</SelectItem>
                  <SelectItem value="Prefer not to say">
                    Prefer not to say
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                value={form.age}
                onChange={(e) =>
                  setForm((p) => ({ ...p, age: e.target.value }))
                }
                placeholder="32"
                data-ocid="profile.age.input"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="profession">Profession</Label>
              <Input
                id="profession"
                value={form.profession}
                onChange={(e) =>
                  setForm((p) => ({ ...p, profession: e.target.value }))
                }
                placeholder="e.g. Doctor, Engineer..."
                data-ocid="profile.profession.input"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="education">Education</Label>
              <Input
                id="education"
                value={form.education}
                onChange={(e) =>
                  setForm((p) => ({ ...p, education: e.target.value }))
                }
                placeholder="e.g. MBBS, B.Tech..."
                data-ocid="profile.education.input"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="residency">Residency City</Label>
              <Input
                id="residency"
                value={form.residency}
                onChange={(e) =>
                  setForm((p) => ({ ...p, residency: e.target.value }))
                }
                placeholder="e.g. Mumbai, Bangalore..."
                data-ocid="profile.residency.input"
              />
            </div>
            <div className="sm:col-span-2 space-y-1.5">
              <Label htmlFor="bio">Short Bio</Label>
              <Textarea
                id="bio"
                value={form.bio}
                onChange={(e) =>
                  setForm((p) => ({ ...p, bio: e.target.value }))
                }
                placeholder="Tell co-travellers a little about yourself..."
                rows={3}
                data-ocid="profile.bio.textarea"
              />
            </div>
          </CardContent>
        </Card>

        {/* Planning Needs */}
        <Card className="shadow-card" data-ocid="profile.needs.card">
          <CardHeader>
            <CardTitle className="text-base">Planning Needs</CardTitle>
            <CardDescription>
              Select what you're looking for from co-travellers.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {PLANNING_NEEDS.map((need) => (
                <div key={need} className="flex items-center gap-2">
                  <Checkbox
                    id={`need-${need}`}
                    checked={form.planningNeeds.includes(need)}
                    onCheckedChange={() => toggleNeed(need)}
                    data-ocid="profile.needs.checkbox"
                  />
                  <Label
                    htmlFor={`need-${need}`}
                    className="cursor-pointer text-sm"
                  >
                    {need}
                  </Label>
                </div>
              ))}
            </div>
            {form.planningNeeds.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
                {form.planningNeeds.map((need) => (
                  <Badge key={need} variant="secondary">
                    {need}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Button
          onClick={handleSave}
          disabled={saving}
          className="w-full sm:w-auto"
          data-ocid="profile.save.button"
        >
          {saving ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Save className="w-4 h-4 mr-2" />
          )}
          {saving ? "Saving..." : "Save Profile"}
        </Button>
      </div>
    </div>
  );
}
