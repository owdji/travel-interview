export interface PlaceResponse {
    id: number;
    name: string;
    description: string;
    pictureUrl: string;
    tripId: number;
    tripHref: string;
    location: {
      type: string;
      coordinates: number[];
    };
  }