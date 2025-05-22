export interface Review {
  id: number;
  filmId: number;
  rating: number;
  comment: string;
  reviewer: string;   // új mező: név
  date: string;
}
