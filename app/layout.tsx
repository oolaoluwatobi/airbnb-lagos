import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import RegisterModal from "./components/modals/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./components/modals/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";
import RentModal from "./components/modals/RentModal";
import { Suspense } from "react";
import SearchModal from "./components/modals/SearchModal";
import { getServerSession } from "next-auth";
import getUser from "./actions/getUser";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Airbnb Lagos",
  description: "Created by ọlá, designed by adewale",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const currentUser = await getCurrentUser();
  const session = await getServerSession();
  const currentUser = await getUser({ userEmail: session?.user?.email });

  return (
    <html lang="en">
      <body className={`${nunito.className} `}>
        <>
          <ToasterProvider />
          <SearchModal />
          <RentModal />
          <LoginModal />
          <RegisterModal />
          <Suspense
            fallback={
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-slate-600" />
            }
          >
            <Navbar currentUser={currentUser} />
          </Suspense>
        </>
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
