
export interface EventType {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  category: string;
  image: string;
  hasLivestream: boolean;
  spotsRemaining: number;
  capacity: number;
}
