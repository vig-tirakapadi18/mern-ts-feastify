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
  name: string;
  price: number;
}

export interface IRestaurant {
  success: boolean;
  message: string;
  restaurant: {
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
  };
}
