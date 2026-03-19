import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    acceptLuggageRequest(_conveyanceId: string, _timestamp: bigint): Promise<void>;
    addConveyanceProfile(_profile: null): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createLuggageRequest(_conveyanceId: string, _weight: number, _description: string): Promise<void>;
    createNetworkingPost(_post: null): Promise<void>;
    createSOS(_message: string): Promise<void>;
    findCoTravellers(_flightOrTrainNumber: string, _date: string, _professionFilter: string | null, _needsFilter: Array<string> | null): Promise<void>;
    getActiveSOS(): Promise<void>;
    getCallerUserProfile(): Promise<null | null>;
    getCallerUserRole(): Promise<UserRole>;
    getConveyanceProfiles(_user: Principal): Promise<void>;
    getLuggageRequests(_conveyanceId: string): Promise<void>;
    getMessagesWithUser(_otherUser: Principal): Promise<void>;
    getNetworkingPosts(_category: string): Promise<void>;
    getTipsByCity(_city: string): Promise<void>;
    getUserProfile(_user: Principal): Promise<null | null>;
    isCallerAdmin(): Promise<boolean>;
    resolveSOS(_timestamp: bigint): Promise<void>;
    saveCallerUserProfile(_profile: null): Promise<void>;
    sendMessage(_to: Principal, _content: string): Promise<void>;
}
