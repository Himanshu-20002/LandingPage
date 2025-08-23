import Image from "next/image";
import Hero from "@/component/Hero";
import React from "react";
import HeroBottom from "@/component/HeroBottom";
import Library from "@/component/Library";

export default function Home() {
  return (
    <div className="overflow-hidden h-100vh   w-screen ">

      <Hero />
      <Library/>
      
    


    </div>
  );
}
