import * as yup from 'yup';

export const carValidationSchema = yup.object({
    model: yup.string()
      .min(3, "Car model must be at least 3 characters")
      .required("Car model is required"),
    city: yup.string()
      .required("City is required"),
    price: yup.number()
      .typeError("Price must be a number")
      .required("Price is required")
      .positive("Price must be greater than zero"),
    phone: yup.string()
      .length(11, "Phone number must be exactly 11 digits")
      .matches(/^[0-9]+$/, "Phone number must only contain digits")
      .required("Phone number is required"),
    maxPictures: yup.number()
      .min(1, "Max pictures must be at least 1")
      .max(10, "Max pictures must be at most 10")
      .required("Max pictures is required"),
    pictures: yup.array().min(1, "At least one picture is required").required("Pictures are required")
  });