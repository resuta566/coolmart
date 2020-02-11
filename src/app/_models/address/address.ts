export interface Address {
  id?: number;
  fullname?: string;
  mobilenumber?: number;
  contact?: string| number;
  other_notes?: string;
  building?: string;
  province?: string;
  city?: string;
  brgy?: string;
  type?: number;
  post_code?: string;
  is_shipping?: number;
  is_billing?: number;
  message?: string;
}
