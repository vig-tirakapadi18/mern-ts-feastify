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
