
export type Category = 'All' | 'Technical' | 'Non-Technical' | 'Workshops';

export interface Coordinator {
  name: string;
  role: string;
  phone: string;
  email: string;
}

export interface EventData {
  id: string;
  title: string;
  category: Category;
  description: string;
  rules: string[];
  date: string;
  time: string;
  venue: string;
  posterUrl: string;
  registrationLink: string;
  coordinators: Coordinator[];
  accentColor: string;
}
