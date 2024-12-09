import React, { useState } from "react";
import { Modal, Box, TextField, Button, InputAdornment } from "@mui/material";
import tw from "tailwind-styled-components";
import { carValidationSchema } from "@/validators/carValidation";
import { useFormik } from "formik";
import { CLOUDNIARY_IMG_URL } from "@/utils/serverUrl";
import Image from "next/image";

const ModalContainer = tw(Box)`
  p-4
  w-full
  sm:w-96
  bg-white
  rounded-lg
  shadow-md
  absolute
  top-1/2
  left-1/2
  transform
  -translate-x-1/2
  -translate-y-1/2
`;

const CloseButton = tw.div`
  absolute
  top-2
  right-5
  text-red-500
  hover:text-red-800
  cursor-pointer
  text-xl
  font-bold
  z-10
  text-2xl
`;

type AddCarModalProps = {
    open: boolean;
    onClose: () => void;
    onSubmit: (carDetails: {
        carModel: string;
        price: number;
        city: string;
        phone: string;
        maxPictures: number;
        images: string[];
    }) => void;
};

const AddCarModal: React.FC<AddCarModalProps> = ({
    open,
    onClose,
    onSubmit,
}) => {
    const [imageUrls, setImageUrls] = useState<string[]>([]);

    const formik = useFormik({
        initialValues: {
            carModel: "",
            price: "",
            phone: "",
            maxPictures: 10,
            pictures: [],
            city: "",
        },
        validationSchema: carValidationSchema,
        onSubmit: (values) => {
            onSubmit({
                carModel: values.carModel,
                price: parseFloat(values.price),
                phone: values.phone,
                maxPictures: values.maxPictures,
                images: imageUrls,
                city: values.city,
            });
            onClose();
        },
    });

    const handlePictureUpload = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            const uploadedImageUrls: string[] = [];

            if (files.length + imageUrls.length > formik.values.maxPictures) {
                alert(
                    `You can only upload a maximum of ${formik.values.maxPictures} pictures.`
                );
                return;
            }

            for (let i = 0; i < files.length; i++) {
                const formData = new FormData();
                formData.append("file", files[i]);
                formData.append(
                    "upload_preset",
                    process.env.NEXT_PUBLIC_CLOUNDINARY_SECRET || ""
                );

                try {
                    // Upload image to Cloudinary
                    const response = await fetch(CLOUDNIARY_IMG_URL, {
                        method: "POST",
                        body: formData,
                    });
                    const data = await response.json();
                    if (response.ok) {
                        const imageUrl = data.secure_url;
                        uploadedImageUrls.push(imageUrl);
                    } else {
                        throw new Error(data.error.message || "Image upload failed.");
                    }
                } catch (error) {
                    console.error("Image upload failed:", error);
                    alert("Image upload failed. Please try again.");
                }
            }

            const updatedImageUrls = [...imageUrls, ...uploadedImageUrls];
            formik.setFieldValue("pictures", updatedImageUrls);
            setImageUrls(updatedImageUrls);
        }
    };

    const handleDeleteImage = (index: number) => {
        const updatedImageUrls = imageUrls.filter((_, i) => i !== index);
        setImageUrls(updatedImageUrls);
        formik.setFieldValue("pictures", updatedImageUrls);
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="add-car-modal"
            aria-describedby="add-car-modal-description"
        >
            <ModalContainer>
                <CloseButton onClick={onClose}>&times;</CloseButton>
                <form className="mt-5" onSubmit={formik.handleSubmit}>
                    <TextField
                        label="Car Model"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="carModel"
                        value={formik.values.carModel}
                        onChange={formik.handleChange}
                        error={formik.touched.carModel && Boolean(formik.errors.carModel)}
                        helperText={formik.touched.carModel && formik.errors.carModel}
                    />
                    <TextField
                        label="Price"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="price"
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        error={formik.touched.price && Boolean(formik.errors.price)}
                        helperText={formik.touched.price && formik.errors.price}
                        type="number"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">$</InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        label="Phone Number"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="phone"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        error={formik.touched.phone && Boolean(formik.errors.phone)}
                        helperText={formik.touched.phone && formik.errors.phone}
                    />
                    <TextField
                        label="City"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="city"
                        value={formik.values.city}
                        onChange={formik.handleChange}
                        error={formik.touched.city && Boolean(formik.errors.city)}
                        helperText={formik.touched.city && formik.errors.city}
                    />
                    <TextField
                        label="Max Number of Pictures"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="maxPictures"
                        value={formik.values.maxPictures}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.maxPictures && Boolean(formik.errors.maxPictures)
                        }
                        helperText={formik.touched.maxPictures && formik.errors.maxPictures}
                        type="number"
                        inputProps={{ min: 1, max: 10 }}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handlePictureUpload}
                        className="mt-2"
                    />
                    <div className="mt-2">
                        {imageUrls.length > 0 && (
                            <div>
                                <h3>Uploaded Pictures:</h3>
                                {imageUrls.map((url, index) => (
                                    <div key={index} className="relative inline-block my-2">
                                        <Image
                                            src={url}
                                            alt={`Car Image ${index + 1}`}
                                            height={100}
                                            width={100}
                                            className="object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleDeleteImage(index)}
                                            className="absolute top-0 right-0 text-red-500"
                                        >
                                            &times;
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <Box
                        sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}
                    >
                        <Button onClick={onClose} color="secondary" sx={{ marginRight: 2 }}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" color="primary">
                            Save Car
                        </Button>
                    </Box>
                </form>
            </ModalContainer>
        </Modal>
    );
};

export default AddCarModal;
