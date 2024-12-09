import React, { useState, useEffect } from "react";
import tw from "tailwind-styled-components";
import {
    Typography,
    Box,
    Button,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { createCar, deleteCar, getCarByUserId } from "@/services/carService";
import CarList from "../CarsList/CarsList";
import Loader from "../Loader/Loader";
import AddCarModal from "../AddCarModal/AddCarModal";
import { Car } from "@/models/car.model";

const StyledContainer = tw(Box)`
  p-4
  flex
  flex-col
  items-center
  h-full
  justify-between
`;

const AddCarButton = tw(Button)`
  mb-4
`;

const Dashboard = () => {
    const [cars, setCars] = useState<Car[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [openForm, setOpenForm] = useState(false);
    const router = useRouter();

    const handleOpenModal = () => setOpenForm(true);
    const handleCloseModal = () => setOpenForm(false);
    const fetchCars = async () => {
        setLoading(true);
        setError(null);

        const userString = localStorage.getItem("user");
        const user = userString ? JSON.parse(userString) : null;

        if (!user || !user.id) {
            setError("User ID not found in localStorage.");
            setLoading(false);
            return;
        }

        try {
            const data = await getCarByUserId(user.id);

            if (data.ok) {
                setCars(data.cars || []);
            } else {
                setError(data.message || "Failed to fetch cars. Please try again.");
            }
        } catch (err: any) {
            console.error("Fetch error", err);
            setError(err.message || "An error occurred while fetching cars.");
        } finally {
            setLoading(false);
        }
    };

    const handleAddCar = async (carDetails: {
        carModel: string;
        price: number;
        phone: string;
        maxPictures: number;
        images: string[];
        city: string;
    }) => {
        const userString = localStorage.getItem("user");
        const user = userString ? JSON.parse(userString) : null;
    
        if (!user || !user.id) {
            setError("User ID not found in localStorage.");
            setLoading(false);
            return;
        }
    
        const carData = {
            ...carDetails,
            userId: user.id,
        };
    
        try {
            const data = await createCar(carData);

            if (data.ok) {
                fetchCars();
            } else {
                setError(data.message || "Failed to create car. Please try again.");
            }
        } catch (err: any) {
            console.error("Fetch error", err);
            setError(err.message || "An error occurred while creating car.");
        } finally {
            setLoading(false);
        }

    };
    

    useEffect(() => {
        fetchCars();
    }, []);

    const handleDeleteCar = async (id: string | undefined) => {
        if (!id) return;

        try {
            const response = await deleteCar(id);

            if (response.ok) {
                setCars((prevCars) => prevCars.filter((car) => car.id !== id));
            } else {
                console.error(response.message || "Failed to delete car.");
            }
        } catch (error) {
            console.error("Error deleting car:", error);
        }
    };

    return (
        <StyledContainer>
            <AddCarButton
                onClick={handleOpenModal}
                variant="contained"
                color="primary"
                sx={{
                    marginRight: "20px",
                    marginBottom: "20px",
                    marginTop: "20px",
                    marginLeft: "auto",
                }}
            >
                Add Car
            </AddCarButton>

            {loading ? (
                <Loader />
            ) : error ? (
                <Typography color="error">{error}</Typography>
            ) : (
                <CarList cars={cars} handleDeleteCar={handleDeleteCar} />
            )}
            <AddCarModal
                open={openForm}
                onClose={handleCloseModal}
                onSubmit={handleAddCar}
            />
        </StyledContainer>
    );
};

export default Dashboard;
