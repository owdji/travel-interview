export interface PlaceResponse {
    id?: number;
    name: string;
    description: string;
    pictureUrl?: string;
    tripId: string;
    tripHref?: string;
    location: {
      type: string;
      coordinates: number[];
    };
  }