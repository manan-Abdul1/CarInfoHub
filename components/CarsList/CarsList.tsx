import React from "react";
import { IconButton, Typography, Box } from "@mui/material";
import { Delete } from "@mui/icons-material";
import tw from "tailwind-styled-components";
import { Car } from "@/models/car.model";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
  cover-size
  rounded-md
  mb-4
`;

const CarDetails = tw.div`
  text-gray-800
`;

const SliderContainer = tw.div`
  mb-4
`;

interface Props {
    cars: Car[];
    handleDeleteCar: (id: string | undefined) => void;
}

const CarList: React.FC<Props> = ({ cars, handleDeleteCar }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <CarListContainer>
            {cars &&
                cars.map((car: Car) => (
                    <CarCard key={car.id}>
                        <Box className="absolute z-20 top-3 right-3">
                            <IconButton onClick={() => handleDeleteCar(car.id)} color="error">
                                <Delete />
                            </IconButton>
                        </Box>

                        {car.images && car.images.length > 1 ? (
                            <SliderContainer>
                                <Slider {...settings}>
                                    {car.images.map((imageUrl, index) => (
                                        <div key={index}>
                                            <CarImage
                                                src={imageUrl}
                                                alt={`${car.carModel || "Car"} image ${index + 1}`}
                                            />
                                        </div>
                                    ))}
                                </Slider>
                            </SliderContainer>
                        ) : (
                            car.images &&
                            car.images.length === 1 && (
                                <CarImage
                                    src={car.images[0]}
                                    alt={`${car.carModel || "Car"} image`}
                                />
                            )
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
