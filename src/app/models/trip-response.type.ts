import { User } from '../security/user.model';

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
  user?: User;
}

export interface PlaceResponse {
  id: number;
  name: string;
  description: string;
  pictureUrl: string;
  tripId: number;
  tripHref: string;
}

export type TripResponseArray = TripResponse[];
