"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function ContactPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <nav className="w-full fixed top-0 left-0 z-50 shadow-md bg-white bg-opacity-80 backdrop-blur-md">
        <div className="w-full px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/Muha.png"
              alt="Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="text-2xl font-bold text-blue-600 tracking-wide">
              MyWebsite
            </span>
          </Link>

          <div className="hidden md:flex space-x-8 text-lg font-medium">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              หน้าแรก
            </Link>
            <Link
              href="/#section2"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              เกี่ยวกับเรา
            </Link>
            <Link
              href="/contact"
              className="text-blue-600 font-semibold"
            >
              ติดต่อ
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700"
            >
              {isOpen ? (
                <X className="w-7 h-7" />
              ) : (
                <Menu className="w-7 h-7" />
              )}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden bg-white bg-opacity-95 px-6 py-4 space-y-3 text-base font-medium shadow-lg rounded-b-lg">
            <Link
              href="/page"
              className="block text-gray-700"
              onClick={() => setIsOpen(false)}
            >
              หน้าแรก
            </Link>
            <Link
              href="/#section2"
              className="block text-gray-700"
              onClick={() => setIsOpen(false)}
            >
              เกี่ยวกับเรา
            </Link>
            <Link
              href="/contact"
              className="block text-blue-600 font-semibold"
              onClick={() => setIsOpen(false)}
            >
              ติดต่อ
            </Link>
          </div>
        )}
      </nav>

      {/* Content */}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-blue-100 px-4 pt-32 pb-10">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-xl space-y-6">
          <h1 className="text-3xl font-bold text-center text-blue-600">
            ติดต่อเรา
          </h1>
          <p className="text-center text-gray-600">
            หากคุณมีข้อสงสัยหรือข้อเสนอแนะ เรายินดีรับฟัง!
          </p>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700">ชื่อ</label>
              <input
                type="text"
                placeholder="ชื่อของคุณ"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
              />
            </div>
            <div>
              <label className="block text-gray-700">อีเมล</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
              />
            </div>
            <div>
              <label className="block text-gray-700">ข้อความ</label>
              <textarea
                rows={4}
                placeholder="เขียนข้อความของคุณที่นี่..."
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
            >
              ส่งข้อความ
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
