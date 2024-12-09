import React, { useState } from "react";
import { useFormik } from "formik";
import tw from "tailwind-styled-components";
import {
    TextField,
    Button,
    Container,
    Typography,
    Box,
    Paper,
    Link,
} from "@mui/material";
import { useRouter } from "next/router";
import { userLoginValidationSchema } from "@/validators/userLoginValidation";
import { loginUser } from "@/services/authService";
import { MoonLoader } from "react-spinners";

const StyledContainer = tw(Container)`
  flex 
  flex-col
  items-center
  justify-center
  p-4
  h-screen
`;

const StyledPaper = tw(Paper)`
  p-8
  rounded-lg
  shadow-2xl
  w-full
  max-w-md
  bg-white
`;

const StyledLink = tw(Link)`
  text-blue-500
  hover:underline
  hover:text-blue-700
  cursor-pointer
`;

const LoginForm = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (values: any) => {
        setLoading(true);
        setError(null);

        try {
            const data = await loginUser(values.email, values.password);
            if (data.ok) {
                localStorage.setItem('user', data.user)
                router.push("/dashboard");
            } else {
                setError(data.message || "Login failed. Please try again.");
            }
        } catch (error: any) {
            console.error("Login error", error);
            setError(error?.message || "An error occurred. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: userLoginValidationSchema,
        onSubmit: handleSubmit,
    });

    return (
        <StyledContainer>
            <StyledPaper elevation={3}>
                <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                    className="text-center text-blue-600 font-bold"
                >
                    Log In
                </Typography>
                <form onSubmit={formik.handleSubmit} autoComplete="off">
                    <TextField
                        fullWidth
                        id="email"
                        name="email"
                        label="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        margin="normal"
                        variant="outlined"
                        autoComplete="off"
                    />

                    <TextField
                        fullWidth
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        margin="normal"
                        variant="outlined"
                        autoComplete="current-password"
                    />

                    <Box mt={2}>
                        <Button
                            color="primary"
                            variant="contained"
                            fullWidth
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? <MoonLoader color="white" size={20} /> : "Sign In"}
                        </Button>
                    </Box>
                </form>

                {error && (
                    <Typography sx={{ mt: 2 }} color="error">
                        {error}
                    </Typography>
                )}
            </StyledPaper>
        </StyledContainer>
    );
};

export default LoginForm;
