"use client";

import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronLeft, ChevronRight } from "lucide-react";

export default function HorizontalScrollPage() {
  const [isOpen, setIsOpen] = useState(false);
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -window.innerWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: window.innerWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollToSection = (sectionIndex) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: sectionIndex * window.innerWidth,
        behavior: "smooth",
      });
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (scrollContainerRef.current) {
      // Ensure it starts at the first section
      scrollContainerRef.current.scrollTo({
        left: 0,
        behavior: "smooth",
      });
    }
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav className="w-full fixed top-0 left-0 z-50 shadow-md bg-white/80 backdrop-blur-md">
        <div className="w-full px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => scrollToSection(0)}
          >
            {/* Replaced 'M' text with an image logo */}
            <img
              src="https://i.pinimg.com/1200x/e9/0e/2f/e90e2f95ba1e9c6489460b8f6ccd96e6.jpg" // Placeholder logo image
              alt="MyWebsite Logo"
              className="w-10 h-10 rounded-full object-cover"
              onError={(e) => {
                e.target.onerror = null; // Prevents infinite loop
                e.target.src =
                  "https://placehold.co/40x40/CCCCCC/000000?text=Logo"; // Fallback image
              }}
            />
            <span className="text-2xl font-bold text-blue-600 tracking-wide">
              MyWebsite
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 text-lg font-medium">
            <button
              onClick={() => scrollToSection(0)}
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              หน้าแรก
            </button>
            <button
              onClick={() => scrollToSection(1)}
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              บริการของเรา
            </button>
            <button
              onClick={() => scrollToSection(2)}
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              เกี่ยวกับเรา
            </button>
            <a
              href="/contact"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              ติดต่อ
            </a>
            <a
              href="https://github.com/peachpeach06/frontend"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              GitHub
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 focus:outline-none p-2"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md px-6 py-4 space-y-3 text-base font-medium shadow-lg">
            <button
              onClick={() => scrollToSection(0)}
              className="block w-full text-left text-gray-700 hover:text-blue-600 transition-colors duration-200 py-2"
            >
              หน้าแรก
            </button>
            <button
              onClick={() => scrollToSection(1)}
              className="block w-full text-left text-gray-700 hover:text-blue-600 transition-colors duration-200 py-2"
            >
              บริการของเรา
            </button>
            <button
              onClick={() => scrollToSection(2)}
              className="block w-full text-left text-gray-700 hover:text-blue-600 transition-colors duration-200 py-2"
            >
              เกี่ยวกับเรา
            </button>
            <a
              href="/contact"
              className="block text-gray-700 hover:text-blue-600 transition-colors duration-200 py-2"
              onClick={() => setIsOpen(false)}
            >
              ติดต่อ
            </a>
            <a
              href="https://github.com/peachpeach06/frontend"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-gray-700 hover:text-blue-600 transition-colors duration-200 py-2"
              onClick={() => setIsOpen(false)}
            >
              GitHub
            </a>
          </div>
        )}
      </nav>

      {/* Navigation Arrows */}
      <button
        onClick={scrollLeft}
        aria-label="Scroll Left"
        className="fixed top-1/2 left-4 -translate-y-1/2 z-40 bg-white/70 hover:bg-white/90 text-gray-700 rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={scrollRight}
        aria-label="Scroll Right"
        className="fixed top-1/2 right-4 -translate-y-1/2 z-40 bg-white/70 hover:bg-white/90 text-gray-700 rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Background Image */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://i.pinimg.com/736x/21/d6/70/21d670bc4c0590b63fcf74a02e8e122a.jpg')`, // Placeholder background image
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>{" "}
        {/* Darker overlay for better text readability */}
      </div>

      {/* Main Horizontal Scroll Container */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide"
        style={{ height: "100vh" }}
      >
        {/* Section 1: หน้าแรก */}
        <section
          id="section-home"
          className="snap-start flex-shrink-0 w-screen h-screen relative flex items-center justify-center"
        >
          <div className="relative z-10 text-center text-white px-4 max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-8 drop-shadow-lg">
              ยินดีต้อนรับสู่ MyWebsite!
            </h1>
            <p className="text-xl md:text-2xl mb-6 drop-shadow-md">
              เรามุ่งมั่นที่จะนำเสนอประสบการณ์การใช้งานที่ยอดเยี่ยม
              และข้อมูลที่เป็นประโยชน์แก่คุณ
            </p>
            <p className="text-lg md:text-xl drop-shadow-md">
              ไม่ว่าคุณจะกำลังมองหาแรงบันดาลใจ ความรู้ หรือการเชื่อมต่อ
              เราพร้อมให้บริการคุณอย่างเต็มที่
            </p>
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => scrollToSection(1)}
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 border border-white/20"
              >
                เรียนรู้เพิ่มเติม
              </button>
              <button
                onClick={() => scrollToSection(2)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200"
              >
                เกี่ยวกับเรา
              </button>
            </div>
          </div>
        </section>

        {/* Section 2: บริการของเรา */}
        <section
          id="section-services"
          className="snap-start flex-shrink-0 w-screen h-screen relative flex items-center justify-center"
        >
          <div className="relative z-10 text-center text-white px-4 max-w-4xl">
            <h2 className="text-5xl md:text-6xl font-bold mb-8 drop-shadow-lg">
              บริการของเรา
            </h2>
            <p className="text-xl md:text-2xl mb-6 drop-shadow-md">
              เราให้บริการที่หลากหลายเพื่อตอบสนองความต้องการของคุณ
              ด้วยคุณภาพและมาตรฐานระดับสากล
            </p>
            <p className="text-lg md:text-xl drop-shadow-md mb-8">
              ทีมงานผู้เชี่ยวชาญของเราพร้อมให้คำปรึกษาและสนับสนุนคุณ
              ในทุกขั้นตอนของการดำเนินงาน
            </p>
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => scrollToSection(0)}
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 border border-white/20"
              >
                กลับหน้าแรก
              </button>
              <button
                onClick={() => scrollToSection(2)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200"
              >
                เกี่ยวกับเรา
              </button>
            </div>
          </div>
        </section>

        {/* Section 3: เกี่ยวกับเรา */}
        <section
          id="section-about"
          className="snap-start flex-shrink-0 w-screen h-screen relative flex items-center justify-center"
        >
          <div className="relative z-10 text-center text-white px-4 max-w-4xl">
            <h2 className="text-5xl md:text-6xl font-bold mb-8 drop-shadow-lg">
              เกี่ยวกับเรา
            </h2>
            <p className="text-xl md:text-2xl mb-6 drop-shadow-md">
              MyWebsite
              ก่อตั้งขึ้นด้วยความตั้งใจที่จะเป็นแหล่งรวมข้อมูลและความรู้
              ที่เข้าถึงง่ายและเป็นประโยชน์
            </p>
            <p className="text-lg md:text-xl drop-shadow-md mb-8">
              เราเชื่อว่าการแบ่งปันข้อมูลที่มีคุณภาพจะช่วยให้ทุกคนเติบโตและพัฒนาไปพร้อมกัน
            </p>
            <p className="text-lg drop-shadow-md">
              ทีมงานของเราประกอบด้วยผู้เชี่ยวชาญที่มีความมุ่งมั่นในการสร้างสรรค์เนื้อหา
              และประสบการณ์ที่ดีที่สุด
              เรายินดีรับฟังความคิดเห็นและข้อเสนอแนะจากคุณเสมอ
            </p>
          </div>
        </section>
      </div>

      {/* Cards Section - Fixed at Bottom */}
      <div className="fixed bottom-0 left-0 w-full z-40 bg-black/30 backdrop-blur-sm">
        <div className="px-4 py-6">
          <h3 className="text-white text-xl font-bold mb-4 text-center">
            บริการและฟีเจอร์ของเรา
          </h3>
          <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-white/10">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-6 min-w-80 transform hover:scale-105 transition-all duration-300 flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-lg font-bold">🚀</span>
              </div>
              <h4 className="text-lg font-bold mb-2 text-blue-600">นวัตกรรม</h4>
              <p className="text-gray-700 text-sm">
                ค้นพบเทคโนโลยีใหม่ล่าสุดที่กำลังเปลี่ยนแปลงโลกของเรา
                ด้วยนวัตกรรมที่ก้าวล้ำเพื่ออนาคตที่ดีกว่า
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-6 min-w-80 transform hover:scale-105 transition-all duration-300 flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-lg font-bold">🌱</span>
              </div>
              <h4 className="text-lg font-bold mb-2 text-green-600">
                ความยั่งยืน
              </h4>
              <p className="text-gray-700 text-sm">
                เรียนรู้เกี่ยวกับแนวทางปฏิบัติที่ยั่งยืนและวิธีที่เราสามารถช่วยรักษาสิ่งแวดล้อม
                เพื่อคนรุ่นต่อไป
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-6 min-w-80 transform hover:scale-105 transition-all duration-300 flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-lg font-bold">👥</span>
              </div>
              <h4 className="text-lg font-bold mb-2 text-purple-600">ชุมชน</h4>
              <p className="text-gray-700 text-sm">
                เชื่อมต่อกับชุมชนของเราและร่วมสร้างสรรค์สิ่งดีๆ ไปด้วยกัน
                เพื่อสังคมที่เข้มแข็งและอบอุ่น
              </p>
            </div>
          </div>

          {/* Scroll hint */}
          <div className="flex justify-center mt-3">
            <p className="text-white/60 text-xs flex items-center gap-2">
              <ChevronLeft className="w-3 h-3" />
              เลื่อนซ้าย-ขวาเพื่อดูการ์ดเพิ่มเติม
              <ChevronRight className="w-3 h-3" />
            </p>
          </div>
        </div>
      </div>

      {/* Page Indicators */}
      <div className="fixed bottom-40 left-1/2 transform -translate-x-1/2 z-40 flex space-x-3">
        {[0, 1, 2].map((index) => (
          <button
            key={index}
            onClick={() => scrollToSection(index)}
            className="w-3 h-3 rounded-full bg-white/50 hover:bg-white/80 transition-all duration-200"
          />
        ))}
      </div>
    </>
  );
}
