import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

interface ILayoutProps {
  children: React.ReactNode;
  showHero?: boolean;
}

const Layout = ({ children, showHero = false }: ILayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen w-[100vw]">
      <Header />
      {showHero && <Hero />}
      <div className="container mx-auto flex-1 py-10">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
