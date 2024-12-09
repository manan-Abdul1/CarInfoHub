import { Car } from "@/models/car.model";
import { CREATE_NEW_CAR, DELETE_CAR, GET_CARS_BY_USER_ID } from "@/utils/serverUrl";

export const getCarByUserId = async (userId: string) => {
    try {
        const response = await fetch(`${GET_CARS_BY_USER_ID}/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || 'Failed to login');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || "An error occurred during login");
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
};
export const deleteCar = async (carId: string) => {
    try {
        const response = await fetch(`${DELETE_CAR}/${carId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || 'Failed to login');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || "An error occurred during login");
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
};
export const createCar = async (carData: Car) => {
    try {
        const response = await fetch(`${CREATE_NEW_CAR}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...carData })
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || 'Failed to login');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || "An error occurred during login");
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
};