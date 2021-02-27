import {CartItem} from './cart-item';

export interface Order {
  name?: string;
  surname?: string;
  street0?: string;
  street1?: string;
  phone?: string;
  city?: string;
  payment?: string;
  additionalInformation?: string;
  postcode?: string;
  price?: any;
  orders?: CartItem[];
  date?: any;
  id?: string;
}
