import React from "react";
import { IconButton, Typography, Box } from "@mui/material";
import { Delete } from "@mui/icons-material";
import tw from "tailwind-styled-components";
import { Car } from "@/models/car.model";

const CarListContainer = tw(Box)`
  w-full
  flex
  flex-wrap
  justify-center
  md:gap-24
`;

const CarCard = tw.div`
  p-4
  mb-4
  w-full
  sm:w-80
  rounded-lg
  shadow-md
  relative
  bg-white
`;

const CarImage = tw.img`
  w-full
  h-60
  object-cover
  rounded-md
  mb-4
`;

const CarDetails = tw.div`
  text-gray-800
`;

interface Props {
    cars: Car[];
    handleDeleteCar: (id: string | undefined) => void;
}

const CarList: React.FC<Props> = ({ cars, handleDeleteCar }) => {
    return (
        <CarListContainer>
            {cars &&
                cars.map((car: Car) => (
                    <CarCard key={car.id}>
                        <Box className="absolute top-2 right-2">
                            <IconButton onClick={() => handleDeleteCar(car.id)} color="error">
                                <Delete />
                            </IconButton>
                        </Box>

                        {car.images && car.images.length > 0 && (
                            <CarImage
                                src={car.images[0]}
                                alt={`${car.carModel || "Car"} image`}
                            />
                        )}

                        <CarDetails>
                            <Typography variant="h6" className="text-blue-700 font-bold">
                                {car.carModel || "Unknown Model"}
                            </Typography>
                            <Typography className="text-gray-600">
                                Price: ${car.price || "N/A"} - City: {car.city || "Unknown"}
                            </Typography>
                            <Typography className="text-gray-600">
                                Contact: {car.phone || "N/A"}
                            </Typography>
                        </CarDetails>
                    </CarCard>
                ))}
        </CarListContainer>
    );
};

export default CarList;
