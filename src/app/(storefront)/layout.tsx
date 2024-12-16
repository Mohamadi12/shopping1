import { Footer } from "@/components/global/storefront/Footer";
import { Navbar } from "@/components/global/storefront/Navbar";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const StoreFrontLayout = ({ children }: Props) => {
  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</main>
      <Footer />
    </>
  );
};

export default StoreFrontLayout;
