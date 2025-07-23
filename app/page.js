'use client';
import Carousel from "./components/carousel";
import Card from "./components/card";

export default function Home() {
  return (
    <div
      className="py-5"
      style={{
        background: 'linear-gradient(145deg, #0f0f0f, #1c1c1c)',
        color: '#ffffff',
        fontFamily: "'Orbitron', sans-serif",
        minHeight: '100vh',
      }}
    >
      {/* Hero Section */}
      <div className="text-center mb-5">
        <h1
          className="display-4 fw-bold"
          style={{
            color: '#00bcd4',
            textShadow: '2px 2px 8px rgba(0, 188, 212, 0.5)',
          }}
        >
          ยินดีต้อนรับสู่ Rhodes Island
        </h1>
        <p className="lead" style={{ color: '#cccccc' }}>
          010 โชติกร สุวรรณสาร
        </p>
      </div>

      {/* Carousel */}
      <div className="container mb-5">
        <Carousel />
      </div>

      {/* Card Section */}
      <div className="container">
        <Card />
      </div>
    </div>
  );
}
