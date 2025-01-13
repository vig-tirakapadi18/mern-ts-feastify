export interface IUser {
  existingUser: {
    _id: string;
    email: string;
    name: string;
    addressLine1: string;
    city: string;
    country: string;
  };
}

export interface IMenuItem {
  _id: string;
  name: string;
  price: number;
}

export interface IRestaurant {
  _id: string;
  user: string;
  restaurantName: string;
  city: string;
  country: string;
  deliveryPrice: number;
  estimatedDeliveryTime: number;
  cuisines: string[];
  menuItems: IMenuItem[];
  imgUrl: string;
  lastUpdated: string;
}

export interface IRestaurantResponse {
  success: boolean;
  message: string;
  restaurant: IRestaurant;
}

export interface ISearchRestaurants {
  success: boolean;
  message: string;
  response: {
    data: IRestaurant[];
    pagination: {
      totalRestaurants: number;
      page: number;
      pages: number;
    };
  };
}

export interface ICartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
}

export type OrderStatus =
  | "pending"
  | "paid"
  | "placed"
  | "inProgress"
  | "outForDelivery"
  | "delivered";

export interface IOrder {
  _id: string;
  restaurant: IRestaurant;
  user: IUser;
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: string;
  }[];
  deliveryDetails: {
    name: string;
    addressLine1: string;
    city: string;
    email: string;
  };
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  restaurantId: string;
}

export interface IOrderResponse {
  success: boolean;
  message: string;
  orders: IOrder[];
}
