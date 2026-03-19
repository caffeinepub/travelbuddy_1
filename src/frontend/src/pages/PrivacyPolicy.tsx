import { Separator } from "@/components/ui/separator";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Shield } from "lucide-react";
import { motion } from "motion/react";

type ContentBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; parts: Array<{ bold: boolean; text: string }> };

function parseContent(raw: string): ContentBlock[] {
  const paragraphs = raw.split("\n\n");
  const blocks: ContentBlock[] = [];

  for (const para of paragraphs) {
    const trimmed = para.trim();
    if (!trimmed) continue;

    // Standalone bold heading like **Profile Information**
    if (
      trimmed.startsWith("**") &&
      trimmed.endsWith("**") &&
      !trimmed.slice(2).includes("\n")
    ) {
      blocks.push({ type: "heading", text: trimmed.slice(2, -2) });
      continue;
    }

    // Lines that may contain inline **bold** spans
    const raw_parts = trimmed.split(/(\*\*[^*]+\*\*)/);
    const parts = raw_parts.map((p) => {
      if (p.startsWith("**") && p.endsWith("**")) {
        return { bold: true, text: p.slice(2, -2) };
      }
      return { bold: false, text: p };
    });
    blocks.push({ type: "paragraph", parts });
  }

  return blocks;
}

const sections = [
  {
    id: "introduction",
    title: "Introduction",
    content:
      'Welcome to TravelMate \u2014 your trusted companion for air and rail travel connections. TravelMate is a "Virtual to Real World" platform designed to help travelers discover, plan, and coordinate with fellow co-travelers safely and meaningfully.\n\nThis Privacy Policy explains how TravelMate collects, uses, shares, and protects your personal information when you use our platform. By using TravelMate, you agree to the terms described in this policy. If you do not agree, please discontinue use of the service.',
  },
  {
    id: "data-collected",
    title: "Information We Collect",
    content:
      "We collect the following categories of information to provide and improve TravelMate:\n\n**Profile Information**\n- Full name, gender, age, and profile photo\n- Profession, education level, and city of residence\n- Planning preferences and travel interests (tags/checklist)\n\n**Travel Details**\n- Mode of transport (air or rail), flight/train number\n- Travel date, origin, destination, seat class or cabin\n\n**Location Data**\n- Approximate or precise location (only when you grant permission), used to match nearby travelers\n\n**Device & Usage Information**\n- Device type, operating system, browser type\n- IP address and general geographic region\n- Pages visited, features used, and time spent on the platform\n\n**Communications**\n- Messages sent through TravelMate (stored end-to-end encrypted via Aroga messenger)\n\n**Authentication Data**\n- Login credentials via Internet Identity or Facebook (OAuth token only; we never store your Facebook password)",
  },
  {
    id: "how-we-use",
    title: "How We Use Your Information",
    content:
      "TravelMate uses your data solely to operate and improve the platform:\n\n- **Traveler Matching** \u2014 Connect you with co-travelers on the same flight or train route based on travel details and interests\n- **Safety & SOS** \u2014 Enable emergency alerts and woman-safety features; share location with trusted contacts during travel\n- **Luggage Coordination** \u2014 Facilitate luggage-sharing arrangements between verified travelers\n- **Networking & Lifestyle** \u2014 Power job, education, and social networking features based on your profile\n- **Platform Improvement** \u2014 Analyze usage trends to fix bugs, improve features, and optimize performance\n- **Notifications** \u2014 Send travel alerts, co-traveler match notifications, and in-app messages\n- **Legal Compliance** \u2014 Meet obligations under applicable laws and regulations",
  },
  {
    id: "data-sharing",
    title: "Data Sharing & Third Parties",
    content:
      "TravelMate does not sell your personal data. We share information only in the following limited circumstances:\n\n- **Co-Travelers** \u2014 When you match with another traveler, limited profile details (name, travel route, and interests you chose to display) are visible to that person\n- **Service Partners** \u2014 We use select service providers (cloud infrastructure, analytics, authentication) who process data on our behalf under strict confidentiality agreements\n- **Legal Requirements** \u2014 We may disclose information when required by law, court order, or to protect the safety of users or the public\n- **Business Transfers** \u2014 In the event of a merger or acquisition, user data may transfer to the new entity under the same privacy protections\n\nAll third-party partners are contractually bound to use your data only as directed by TravelMate and never for their own marketing purposes.",
  },
  {
    id: "cookies",
    title: "Cookies & Analytics",
    content:
      "TravelMate uses cookies and similar technologies to:\n\n- Keep you signed in across sessions (authentication cookies)\n- Remember your preferences (language, display settings)\n- Analyze aggregate usage patterns to improve the platform (analytics)\n\nWe use privacy-respecting analytics that do not track you across external websites. You can control cookie behavior through your browser settings. Disabling cookies may limit certain features such as staying signed in.",
  },
  {
    id: "security",
    title: "Security Measures",
    content:
      "We take data security seriously:\n\n- **End-to-End Encryption** \u2014 All messages on TravelMate use Aroga messenger with 128-bit or higher end-to-end encryption; only you and your recipient can read them\n- **Data at Rest** \u2014 Stored data is encrypted using industry-standard AES-256 encryption\n- **Secure Transport** \u2014 All data in transit is protected by TLS 1.3\n- **Internet Computer Protocol** \u2014 Our backend runs on the Internet Computer blockchain, providing decentralized infrastructure with built-in tamper resistance\n- **Access Controls** \u2014 Strict role-based access ensures only authorized personnel can access production systems\n- **Regular Audits** \u2014 We conduct periodic security reviews and vulnerability assessments\n\nNo system is completely secure. If you believe your account has been compromised, contact us immediately at security@travelmate.app.",
  },
  {
    id: "user-rights",
    title: "Your Rights",
    content:
      "You have the following rights regarding your personal data:\n\n- **Access** \u2014 Request a copy of the personal data we hold about you\n- **Correction** \u2014 Update or correct inaccurate profile information directly in the app under Settings \u2192 Profile\n- **Deletion** \u2014 Request deletion of your account and all associated data; we will process this within 30 days\n- **Portability** \u2014 Request your data in a machine-readable format (JSON)\n- **Opt-Out** \u2014 Opt out of non-essential communications via notification settings in the app\n- **Withdraw Consent** \u2014 You may withdraw consent for optional data uses at any time without affecting the lawfulness of prior processing\n\nTo exercise any of these rights, contact us at privacy@travelmate.app. We will respond within 30 days.",
  },
  {
    id: "childrens-privacy",
    title: "Children's Privacy",
    content:
      "TravelMate is not intended for children under the age of 13. We do not knowingly collect personal information from anyone under 13.\n\nIf you are a parent or guardian and believe your child has provided us with personal information without your consent, please contact us immediately at privacy@travelmate.app. We will promptly delete such information from our records.\n\nUsers between the ages of 13 and 18 should use TravelMate only with the consent and supervision of a parent or legal guardian.",
  },
  {
    id: "contact",
    title: "Contact Us",
    content:
      "If you have questions, concerns, or requests regarding this Privacy Policy or your personal data, please reach out:\n\n**TravelMate Privacy Team**\nEmail: privacy@travelmate.app\nGeneral Inquiries: contact@travelmate.app\nSecurity Issues: security@travelmate.app\n\nWe aim to respond to all privacy-related inquiries within 30 days of receipt.",
  },
].map((s) => ({ ...s, blocks: parseContent(s.content) }));

function ContentBlockRenderer({ block }: { block: ContentBlock }) {
  if (block.type === "heading") {
    return <p className="font-semibold text-foreground">{block.text}</p>;
  }
  return (
    <p>
      {block.parts.map((part) =>
        part.bold ? (
          <strong key={part.text} className="text-foreground font-semibold">
            {part.text}
          </strong>
        ) : (
          part.text
        ),
      )}
    </p>
  );
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
            data-ocid="privacy.link"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to TravelMate
          </Link>
        </motion.div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">
              Privacy Policy
            </h1>
          </div>
          <p className="text-muted-foreground text-sm">
            <strong>Effective Date:</strong> March 19, 2026
          </p>
          <p className="text-muted-foreground text-sm mt-1">
            Last updated: March 19, 2026
          </p>
        </motion.header>

        {/* Table of Contents */}
        <motion.nav
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-card border border-border rounded-xl p-5 mb-10"
          data-ocid="privacy.panel"
        >
          <h2 className="text-sm font-semibold text-foreground mb-3">
            Table of Contents
          </h2>
          <ol className="space-y-1.5">
            {sections.map((section, i) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {i + 1}. {section.title}
                </a>
              </li>
            ))}
          </ol>
        </motion.nav>

        {/* Sections */}
        <div className="space-y-10">
          {sections.map((section, i) => (
            <motion.section
              key={section.id}
              id={section.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.05 }}
            >
              <h2 className="text-xl font-semibold text-foreground mb-3">
                {i + 1}. {section.title}
              </h2>
              <Separator className="mb-4" />
              <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
                {section.blocks.map((block) => (
                  <ContentBlockRenderer
                    key={
                      block.type === "heading"
                        ? `h-${block.text}`
                        : `p-${block.parts
                            .map((p) => p.text)
                            .join("")
                            .slice(0, 40)}`
                    }
                    block={block}
                  />
                ))}
              </div>
            </motion.section>
          ))}
        </div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          className="mt-14 pt-8 border-t border-border text-center"
        >
          <p className="text-xs text-muted-foreground">
            \u00a9 {new Date().getFullYear()} TravelMate. All rights reserved.{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground"
            >
              Built with caffeine.ai
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
