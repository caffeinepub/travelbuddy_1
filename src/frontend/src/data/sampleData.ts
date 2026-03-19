import type {
  CoTraveller,
  Conversation,
  LuggageRequest,
  Message,
  NetworkingPost,
  SosAlert,
} from "../types";

export const SAMPLE_CO_TRAVELLERS: CoTraveller[] = [
  {
    id: "1",
    name: "Dr. Priya Sharma",
    profession: "Cardiologist",
    age: 42,
    needs: ["Medical Help", "Networking"],
    matchPercent: 92,
    avatarInitials: "PS",
  },
  {
    id: "2",
    name: "Ravi Mehta",
    profession: "Software Engineer",
    age: 31,
    needs: ["Luggage Sharing", "Local Tips"],
    matchPercent: 78,
    avatarInitials: "RM",
  },
  {
    id: "3",
    name: "Anjali Singh",
    profession: "Teacher",
    age: 36,
    needs: ["Safety Companion", "Local Tips"],
    matchPercent: 85,
    avatarInitials: "AS",
  },
  {
    id: "4",
    name: "Vikram Nair",
    profession: "Business Analyst",
    age: 28,
    needs: ["Networking", "Luggage Sharing"],
    matchPercent: 70,
    avatarInitials: "VN",
  },
];

export const SAMPLE_SOS_ALERTS: SosAlert[] = [
  {
    id: "1",
    senderName: "Meena Patel",
    message: "Feeling unwell near Gate B12, need medical assistance urgently.",
    timestamp: "2026-03-19T08:30:00Z",
    resolved: false,
    location: "Terminal 2, Gate B12",
  },
  {
    id: "2",
    senderName: "Kavitha Reddy",
    message: "Lost my boarding pass and luggage missing. Need help.",
    timestamp: "2026-03-19T09:15:00Z",
    resolved: false,
    location: "Baggage Claim Area 3",
  },
];

export const SAMPLE_LUGGAGE_REQUESTS: LuggageRequest[] = [
  {
    id: "1",
    ownerName: "Ravi Mehta",
    conveyanceId: "AI-202",
    availableWeight: 8,
    description:
      "Can carry up to 8 kg of additional items. Travelling from Delhi to Mumbai.",
    accepted: false,
    timestamp: "2026-03-18T14:00:00Z",
  },
  {
    id: "2",
    ownerName: "Sunita Rao",
    conveyanceId: "AI-202",
    availableWeight: 5,
    description: "Have 5 kg spare in checked baggage. No fragile items please.",
    accepted: false,
    timestamp: "2026-03-18T15:30:00Z",
  },
  {
    id: "3",
    ownerName: "Arjun Kapoor",
    conveyanceId: "12301",
    availableWeight: 12,
    description:
      "Train journey, can carry heavy items. Available for Rajdhani Express.",
    accepted: true,
    timestamp: "2026-03-17T10:00:00Z",
  },
];

export const SAMPLE_NETWORKING_POSTS: NetworkingPost[] = [
  {
    id: "1",
    authorName: "Vikram Nair",
    category: "Jobs",
    title: "Senior Product Manager opening at Bangalore startup",
    content:
      "We are hiring a Sr. PM with 5+ years experience in fintech. Remote-friendly, great equity package. DM me if interested!",
    timestamp: "2026-03-18T11:00:00Z",
    tags: ["PM", "Fintech", "Bangalore"],
  },
  {
    id: "2",
    authorName: "Dr. Priya Sharma",
    category: "Education",
    title: "Medical fellowship opportunities in Singapore",
    content:
      "NUS Medicine is accepting applications for cardiology fellowships. Fully funded, 2-year program. Application deadline April 30.",
    timestamp: "2026-03-17T09:30:00Z",
    tags: ["Medicine", "Singapore", "Fellowship"],
  },
  {
    id: "3",
    authorName: "Anjali Singh",
    category: "Tourism",
    title: "Hidden gems in Jaipur — a local's guide",
    content:
      "Skip the tourist traps! The Anokhi Museum, Nahargarh Fort at sunset, and the Bapu Bazaar silk lane are must-visits. Happy to guide fellow travellers.",
    timestamp: "2026-03-16T16:45:00Z",
    tags: ["Jaipur", "Travel", "LocalTips"],
  },
  {
    id: "4",
    authorName: "Ravi Mehta",
    category: "Dating",
    title: "Connecting over shared love of travel ✈️",
    content:
      "Software engineer, avid traveller, love jazz and good coffee. Looking to meet interesting people on long journeys. Let's connect!",
    timestamp: "2026-03-15T20:00:00Z",
    tags: ["Travel", "Music", "Coffee"],
  },
];

export const SAMPLE_CONVERSATIONS: Conversation[] = [
  {
    principalId: "aaaaa-bbbbb-1",
    name: "Dr. Priya Sharma",
    lastMessage: "See you at the gate! I'll be wearing a red scarf.",
    lastTimestamp: "2026-03-19T07:45:00Z",
    unread: 2,
  },
  {
    principalId: "aaaaa-bbbbb-2",
    name: "Ravi Mehta",
    lastMessage: "Sure, I can take the extra 5 kg for you.",
    lastTimestamp: "2026-03-18T22:10:00Z",
    unread: 0,
  },
  {
    principalId: "aaaaa-bbbbb-3",
    name: "Anjali Singh",
    lastMessage: "Thanks for the Jaipur tips! Very helpful.",
    lastTimestamp: "2026-03-18T14:30:00Z",
    unread: 1,
  },
];

export const SAMPLE_MESSAGES: Record<string, Message[]> = {
  "aaaaa-bbbbb-1": [
    {
      id: "m1",
      fromPrincipal: "aaaaa-bbbbb-1",
      fromName: "Dr. Priya Sharma",
      content:
        "Hi! I noticed we're on the same flight AI-202. Are you also travelling to Mumbai?",
      timestamp: "2026-03-19T07:30:00Z",
      isOwn: false,
    },
    {
      id: "m2",
      fromPrincipal: "me",
      fromName: "You",
      content:
        "Yes! What a coincidence. I might need some medical advice during the flight if that's okay.",
      timestamp: "2026-03-19T07:35:00Z",
      isOwn: true,
    },
    {
      id: "m3",
      fromPrincipal: "aaaaa-bbbbb-1",
      fromName: "Dr. Priya Sharma",
      content:
        "Of course! Happy to help. See you at the gate! I'll be wearing a red scarf.",
      timestamp: "2026-03-19T07:45:00Z",
      isOwn: false,
    },
  ],
  "aaaaa-bbbbb-2": [
    {
      id: "m4",
      fromPrincipal: "me",
      fromName: "You",
      content:
        "Hey Ravi, I saw your luggage sharing post. I have about 4 kg of extras.",
      timestamp: "2026-03-18T22:00:00Z",
      isOwn: true,
    },
    {
      id: "m5",
      fromPrincipal: "aaaaa-bbbbb-2",
      fromName: "Ravi Mehta",
      content: "Sure, I can take the extra 5 kg for you.",
      timestamp: "2026-03-18T22:10:00Z",
      isOwn: false,
    },
  ],
};

export const WOMAN_SAFETY_TIPS = [
  "Share your travel itinerary with a trusted person before departure.",
  "Keep emergency contacts saved and accessible offline.",
  "Use the TravelBuddy SOS button if you feel unsafe — it alerts nearby co-travellers instantly.",
  "Request a same-gender safety companion on your conveyance profile.",
  "Trust your instincts — move to a populated area if something feels wrong.",
  "Keep your phone charged; carry a portable battery bank.",
  "Note the location of airline/railway staff and security personnel.",
  "Connect with verified co-travellers before the journey for added assurance.",
];
