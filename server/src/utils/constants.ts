export const statusCodes = {
  code200: 200,
  code201: 201,
  code400: 400,
  code401: 401,
  code403: 403,
  code404: 404,
  code409: 409,
  code500: 500,
};

export const errorMessages = {
  internalServerError: "Internal Server Error!",
  unauthorized: "Unauthorized user!",
  userExists: "User already exists!",
  userCreate: "Error creating user!",
  userUpdate: "Error updating user!",
  userNotFound: "User not found!",
  gettingUser: "Error getting user!",
  userRestaurantExists: "Restaurant for this user already exists!",
  restaurantNotFound: "Restaurant for this user not found!",
  searchRestaurants: "Unable to search restaurants!",
  restaurantNotFoundById: "Restaurant not found for a given ID!",
  stripeSession: "Failed to create session!",
  orderNotFound: "Order not found!",
  ordersForUserNotFound: "Orders for user not found!",
  orderStatus: "Unable to update order status!",
};

export const successMessages = {
  userCreate: "User created successfully!",
  userUpdate: "User updated successfully!",
  userGet: "User retrieved successfully!",
  restaurantCreate: "Restaurant created successfully!",
  restaurantGet: "Restaurant retrieved successfully!",
  restaurantUpdate: "Restaurant updated successfully!",
  sessionCreate: "Session created successfully!",
  ordersFetch: "Orders fetched successfully!",
  statusUpdate: "Status updated successfully!",
};

export const formValidationErrorMessages = {
  nameString: "Name must be a string!",
  addressString: "Address must be a string!",
  cityString: "City must be a string!",
  countryString: "Country must be a string!",
  emailString: "Email must be a valid email!",
  restaurantRequired: "Restaurant name is required!",
  cityRequired: "City is required!",
  countryRequired: "Country is required!",
  deliveryPricePositive: "Delivery price must be a positive number!",
  estimatedDeliveryTimePositive:
    "Estimated delivery time must be a positive integer!",
  cuisinesArray: "Cuisines must be an array!",
  menuItemsArray: "Menu items must be an array!",
  menuItemRequired: "Menu item name is required!",
  cuisinesArrayNotEmpty: "Cuisines array can not be empty!",
  menuItemRequiredAndString:
    "Menu item price is required and must be a positive integer!",
  parameterString: "Parameter must be a valid string!",
};

export const booleanValues = {
  trueValue: true,
  falseValue: false,
};
