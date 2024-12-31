import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";

interface ILayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen w-[100vw]">
      <Header />
      <Hero />
      <div className="container mx-auto flex-1 py-10">{children}</div>
    </div>
  );
};

export default Layout;
