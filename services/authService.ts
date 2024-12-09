import { AUTH_LOGIN } from "@/utils/serverUrl";

export const loginUser = async (email: string, password: string) => {
    try {
        const response = await fetch(AUTH_LOGIN, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
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
