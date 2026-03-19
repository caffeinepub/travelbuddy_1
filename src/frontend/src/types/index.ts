export interface UserProfile {
  fullName: string;
  gender: string;
  age: string;
  profession: string;
  education: string;
  residency: string;
  planningNeeds: string[];
  bio: string;
}

export interface ConveyanceProfile {
  id: string;
  mode: "Air" | "Rail";
  flightOrTrainNumber: string;
  date: string;
  origin: string;
  destination: string;
  seatClass: string;
  seatNumber: string;
}

export interface CoTraveller {
  id: string;
  name: string;
  profession: string;
  age: number;
  needs: string[];
  matchPercent: number;
  avatarInitials: string;
}

export interface SosAlert {
  id: string;
  senderName: string;
  message: string;
  timestamp: string;
  resolved: boolean;
  location: string;
}

export interface LuggageRequest {
  id: string;
  ownerName: string;
  conveyanceId: string;
  availableWeight: number;
  description: string;
  accepted: boolean;
  timestamp: string;
}

export interface NetworkingPost {
  id: string;
  authorName: string;
  category: string;
  title: string;
  content: string;
  timestamp: string;
  tags: string[];
}

export interface Message {
  id: string;
  fromPrincipal: string;
  fromName: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
}

export interface Conversation {
  principalId: string;
  name: string;
  lastMessage: string;
  lastTimestamp: string;
  unread: number;
}
