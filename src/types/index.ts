export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
   itineraries: Itinerary[];
}

export interface Activity {
    id: number;
    destinationId: number;
    destination: Destination;
    title: string;
    description: string;
    date: Date;
    time: string; // Add this line
}
export interface Itinerary {
    id: number;
    userId: number;
    user: User;
    title: string;
    startDate: Date;
    endDate: Date;
    createdAt: Date;
    destinations: Destination[];
    sharedWith: SharedItinerary[];
}


export interface Destination {
    id: number;
    itineraryId: number;
    itinerary: Itinerary;
    name: string;
    location: string;
    latitude?: number;
    longitude?: number;
    activities: Activity[];
}

// export interface Activity {
//     id: number;
//     destinationId: number;
//     destination: Destination;
//     title: string;
//     description: string;
//     date: Date;
// }

export interface SharedItinerary {
    id: number;
    itineraryId: number;
    itinerary: Itinerary;
    sharedWithEmail: string;
    sharedLink: string;
    createdAt: Date;
}

export interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
}

export interface RootState {
    itineraries: ItineraryState;
    auth: AuthState;
}

export interface ItineraryState {
    items: Itinerary[];
    loading: boolean;
    error: string | null;
}