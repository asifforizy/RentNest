export interface ICreateProperty {
  title: string;
  category: "APARTMENT" | "HOUSE" | "STUDIO";
  rentPrice: number;
  description?: string;
  propertyPhoto?: string;
  city?: string;
  country?: string;
  availability?: "AVAILABLE" | "UNAVAILABLE";
}
