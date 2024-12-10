import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader/Loader";

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkUser = async () => {
            const userString = localStorage.getItem("user");
            const user = userString ? JSON.parse(userString) : null;

            if (!user || !user.id) {
                router.push("/");
            } else {
                setLoading(false);
            }
        };

        checkUser();
    }, [router]);

    if (loading) {
        return <Loader />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
