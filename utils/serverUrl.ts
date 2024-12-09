
const API_SERVER_BASE_URL = process.env.NEXT_PUBLIC_API_SERVER_BASE_URL;

//AUTH ROUTES
export const AUTH_LOGIN= `${API_SERVER_BASE_URL}/api/auth/login`;
export const AUTH_REGISTER= `${API_SERVER_BASE_URL}/api/auth/register`;

// CLOUDINARY IMAGE ROUTE
export const CLOUDNIARY_IMG_URL = "https://api.cloudinary.com/v1_1/dipdjdhic/image/upload";

// CAR ROUTES
export const CREATE_NEW_CAR = `${API_SERVER_BASE_URL}/api/car`;
export const GET_CARS_BY_USER_ID = `${API_SERVER_BASE_URL}/api/car/user`;
export const DELETE_CAR = `${API_SERVER_BASE_URL}/api/car`;
