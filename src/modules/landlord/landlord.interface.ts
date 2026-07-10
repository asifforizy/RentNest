
export interface CreatePropertyPayload {
  title: string;
  description: string;
  rentPrice: number;
  categoryId?: string;
  propertyPhoto?: string;
  city?: string;
  country?: string;
  availability?: "AVAILABLE" | "UNAVAILABLE"
}


export type UpdateRentalRequestStatusPayload = {
  status: "APPROVED" | "REJECTED" | "CANCELLED" | "PENDING";
};





  