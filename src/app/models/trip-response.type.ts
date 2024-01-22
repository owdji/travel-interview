export type TripResponseArray = TripResponse[];

export interface TripResponse {
    id?: string;
    href?: string;
    title: string;
    description: string;
    userId?: string;
    createdAt?: string;
    updatedAt?: string;
    places?: PlaceResponse[];
    placesCount?: number;
  }
  
  interface PlaceResponse {
    id: number;
    name: string;
    description: string;
    pictureUrl: string;
    tripId: number;
    tripHref: string;
  }