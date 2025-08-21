'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();

  // รวมแนวคิดจากทั้งสองเวอร์ชัน:
  // - อ่าน token ตอน mount และ sync เมื่อมีการเปลี่ยนจากแท็บอื่น/โฟกัสกลับมา
  const [mounted, setMounted] = useState(false);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const sync = () => setAuthed(!!localStorage.getItem('token'));
    sync();
    setMounted(true);

    const onStorage = () => sync();
    const onFocus = () => sync();
    window.addEventListener('storage', onStorage);
    window.addEventListener('focus', onFocus);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('focus', onFocus);
    };
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role'); // ถ้ามีเก็บ role
    setAuthed(false);
    if (pathname?.startsWith('/admin')) router.push('/admin/signin');
    else router.push('/signin');
  };

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{
        backgroundColor: '#1f1f1f',
        borderBottom: '2px solid #00bcd4',
        fontFamily: "'Orbitron', sans-serif",
        boxShadow: '0 4px 10px rgba(0, 188, 212, 0.3)',
      }}
    >
      <div className="container-fluid">
        <Link
          className="navbar-brand text-light"
          href="/"
          style={{ fontWeight: 'bold', fontSize: '1.5rem', color: '#00bcd4' }}
        >
          RHODES ISLAND
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {[
              { name: 'Home', href: '/' },
              { name: 'Contact', href: '/contact' },
              { name: 'About', href: '/about' },
              { name: 'เข้าสู่ระบบ', href: '/login' }, // คงเมนูซ้ายตามโค้ดเดิม
            ].map((item) => (
              <li className="nav-item" key={item.name}>
                <Link
                  className="nav-link text-light"
                  href={item.href}
                  style={{ transition: '0.3s' }}
                >
                  {item.name}
                </Link>
              </li>
            ))}

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle text-light"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                ตัวเลือกเพิ่มเติม
              </a>
              <ul
                className="dropdown-menu"
                style={{ backgroundColor: '#2c2c2c', color: 'white' }}
              >
                <li><a className="dropdown-item text-light" href="#">Action</a></li>
                <li><a className="dropdown-item text-light" href="#">Another action</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item text-light" href="#">Something else</a></li>
              </ul>
            </li>
          </ul>

          {/* แบบฟอร์มค้นหาเดิม + ปุ่ม Sign Out เมื่อมี token */}
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="ค้นหา"
              aria-label="Search"
              style={{
                backgroundColor: '#333',
                border: '1px solid #00bcd4',
                color: 'white',
              }}
            />
            <button
              className="btn"
              type="submit"
              style={{
                backgroundColor: '#00bcd4',
                color: '#000',
                fontWeight: 'bold',
              }}
            >
              Search
            </button>

            {mounted && authed && (
              <button
                type="button"
                onClick={handleSignOut}
                className="btn btn-outline-danger ms-2"
              >
                <i className="bi bi-box-arrow-right"></i> Sign Out
              </button>
            )}
          </form>
        </div>
      </div>
    </nav>
  );
}
