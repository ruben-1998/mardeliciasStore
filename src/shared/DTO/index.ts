export interface BannerDTO {
  image: string;
  name: string;
  state: string;
  description: string;
}
export interface CategoryDTO {
  id: string;
  name: string;
  state: string;
  active?: boolean | undefined;
}

export interface UserDTO {
  email: string;
  password: string;
  submit: string;
}

export interface DeliveryOption {
  description: string;
  name: string;
  state: string;
}

export interface ProductDTO {
  id: string;
  category: string;
  description?: string;
  discount?: string;
  image: string;
  name: string;
  price: number;
  state?: string;
  // variantId: VariantDTO[]
  cant?: number;
  size?: string;
}

export interface VariantDTO {
  name: string;
  values: ValuesVariantDTO[];
}

export interface ValuesVariantDTO {
  value: string;
  price: string;
  active: boolean;
}

export interface VariantResponseDTO {
  name: string;
  valuesId: string[];
}

export interface ProductResponseDTO {
  category: string;
  description: string;
  discount: string;
  image: string;
  name: string;
  price: string;
  state: string;
  variantId: string[];
}

export interface AddressDTO {
  email: string;
  nickname: string;
  address: string;
}

export interface OrderDTO {
  id: string;
  address: AddressDTO;
  typeDelivery: string;
  deliveryOptions: string;
  state: number;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  products: ProductDTO[];
  paymentMethods: string;
  order: number;
}

export interface NotificationDTO {
  title: string;
  description: string;
  state: string;
}

export interface Order {
  id: number;
  created_at: Date;
  products: Product[];
  user_id: string;
  payment_method: string;
  total: number;
  voucher_url: string;
  status: string;
  driver_user: string;
  users?: Client;
  orders_driver_user_fkey?: Client;
}

export interface Product {
  id: number;
  qty: number;
  name: string;
  price: number;
  stock: number;
  imageUrl: string;
  created_at: Date;
  description: string;
}

export interface Client {
  first_name: string;
  last_name: string;
  direction: string;
  direction_detail: string;
  phone?: string;
}

export interface NewUser {
  city: string;
  direction: string;
  direction_detail: string;
  dni: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  phone: string;
  role: string;
  latitude?: number;
  longitude?: number;
  submit: string;
}

export interface EditUser {
  id: string;
  city: string;
  direction: string;
  direction_detail: string;
  dni: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  phone: string;
  role: string;
  latitude?: number;
  longitude?: number;
  submit: string;
}

export interface ProductsStore {
  created_at: Date;
  description: string;
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  stock: number;
}
