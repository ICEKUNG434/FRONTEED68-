'use client';
import Carousel from "./components/carousel";
import Card from "./components/card";

export default function Home() {
  return (
    <div className="container my-5">
      {/* Hero Section */}
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold">ยินดีต้อนรับสู่เว็บไซต์ของเรา</h1>
        <p className="lead">010 โชติกร สุวรรณสาร</p>
      </div>

      {/* Carousel */}
      <div className="mb-5">
        <Carousel />
      </div>

<div className="container my-5">
  {/* Hero, Carousel อื่น ๆ */}
  <Card />
  </div>
  </div>
  );
}

