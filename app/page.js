'use client';
import { useEffect } from 'react';
import Image from "next/image";
import Carousel from "./components/carousel";
import Card from "./components/Card"
export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      <Carousel />
      <h1>010 โชติกร สุวรรณสาร</h1>
      <Card />  
      </main>   
    </div>
  );
}
