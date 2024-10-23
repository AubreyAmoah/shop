import localFont from "next/font/local";
import "./globals.css";
import { AppProvider } from "./context/AppContext";
import AuthForm from "./pages/auth/auth";
import SideBar from "./components/SideBar";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import ClientWrapper from "./ClientWrapper";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AppProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Toaster />
          <ClientWrapper>{children}</ClientWrapper>
        </body>
      </AppProvider>
    </html>
  );
}
