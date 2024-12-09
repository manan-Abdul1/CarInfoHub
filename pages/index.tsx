import { Inter } from "next/font/google";
import LogIn from "@/components/Login/Login";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return <><LogIn/></>;
}
