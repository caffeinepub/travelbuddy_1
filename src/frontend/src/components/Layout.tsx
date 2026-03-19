import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "@tanstack/react-router";
import { Bell, Menu, MessageSquare, Plane, X } from "lucide-react";
import { useState } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useLocalProfile } from "../hooks/useLocalProfile";

const NAV_LINKS = [
  { to: "/", label: "Dashboard" },
  { to: "/discover", label: "Discover" },
  { to: "/conveyance", label: "My Travels" },
  { to: "/safety", label: "Safety" },
  { to: "/luggage", label: "Luggage" },
  { to: "/networking", label: "Network" },
  { to: "/messages", label: "Messages" },
  { to: "/profile", label: "Profile" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { identity, login, clear, loginStatus } = useInternetIdentity();
  const { profile } = useLocalProfile();
  const [mobileOpen, setMobileOpen] = useState(false);
  const displayName = profile.fullName || (identity ? "Traveller" : "Guest");
  const initials = displayName
    .split(" ")
    .map((w: string) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-xs">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 shrink-0"
            data-ocid="nav.link"
          >
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Plane className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg text-foreground">
              TravelMate
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                  data-ocid="nav.link"
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/messages" data-ocid="nav.link">
              <Button
                variant="ghost"
                size="icon"
                className="hidden sm:flex relative"
              >
                <MessageSquare className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Bell className="w-5 h-5" />
            </Button>
            {identity ? (
              <div className="flex items-center gap-2">
                <Link to="/profile" data-ocid="nav.link">
                  <div className="flex items-center gap-2 cursor-pointer">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                        {initials || "TM"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden md:block text-sm font-medium">
                      {displayName}
                    </span>
                  </div>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clear}
                  className="hidden md:flex text-muted-foreground"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                size="sm"
                onClick={login}
                disabled={loginStatus === "logging-in"}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                data-ocid="nav.button"
              >
                {loginStatus === "logging-in" ? "Signing in..." : "Sign In"}
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileOpen((v) => !v)}
              data-ocid="nav.toggle"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {mobileOpen && (
          <nav className="lg:hidden border-t border-border bg-card px-4 py-3 flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                  data-ocid="nav.link"
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="bg-card border-t border-border mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
                <Plane className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm font-semibold">TravelMate</span>
              <span className="text-sm text-muted-foreground">
                © {new Date().getFullYear()}. Built with ❤️ using{" "}
                <a
                  href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-foreground"
                >
                  caffeine.ai
                </a>
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="cursor-default">About</span>
              <span className="cursor-default">Privacy</span>
              <span className="cursor-default">Help</span>
            </div>
            <p className="text-sm text-muted-foreground italic">
              Your Journey, Connected.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
