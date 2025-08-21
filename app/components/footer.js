'use client';
import { useEffect } from 'react';

export default function Footer() {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <div className="container text-center">
        <p className="mb-1">© {new Date().getFullYear()} เว็บไซต์ของคุณ</p>
        <p className="mb-0">
          ติดต่อเรา: <a href="mailto:your@email.com" className="text-light">your@email.com</a>
        </p>
        <div className="mt-2">
          <a href="#" className="text-light me-3">
            <i className="bi bi-facebook"></i>
          </a>
          <a href="#" className="text-light me-3">
            <i className="bi bi-twitter"></i>
          </a>
          <a href="#" className="text-light">
            <i className="bi bi-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}