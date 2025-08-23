'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Swal from 'sweetalert2';

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const sync = () => setAuthed(!!localStorage.getItem('token'));
    sync(); setMounted(true);
    const onStorage = () => sync();
    const onFocus = () => sync();
    window.addEventListener('storage', onStorage);
    window.addEventListener('focus', onFocus);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('focus', onFocus);
    };
  }, []);

  const handleSignOut = async () => {
    const res = await Swal.fire({
      title: 'ออกจากระบบ?',
      text: 'คุณต้องการออกจากระบบหรือไม่',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'ออกจากระบบ',
      cancelButtonText: 'ยกเลิก',
      confirmButtonColor: '#d33',
      background: '#111',
      color: '#fff',
    });
    if (!res.isConfirmed) return;

    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setAuthed(false);

    await Swal.fire({
      title: 'ออกจากระบบแล้ว',
      icon: 'success',
      timer: 1200,
      showConfirmButton: false,
      background: '#111',
      color: '#fff',
    });

    router.push(pathname?.startsWith('/admin') ? '/admin/login' : '/login');
  };

  return (
    <nav className="navbar navbar-expand-lg ak-topglow" style={{ backgroundColor: '#1f1f1f' }}>
      <div className="container-fluid">
        <Link className="navbar-brand text-light" href="/" style={{ fontWeight: 'bold' }}>
          RHODES ISLAND
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {[
              { name: 'Home', href: '/' },
              { name: 'Service', href: '/service' },
              { name: 'Contact', href: '/contact' },
              { name: 'About', href: '/about' },
              { name: 'เข้าสู่ระบบ', href: '/login' },
            ].map((item) => (
              <li className="nav-item" key={item.name}>
                <Link className="nav-link text-light" href={item.href}>{item.name}</Link>
              </li>
            ))}
          </ul>

          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="ค้นหา" aria-label="Search" />
            <button className="btn btn-outline-info" type="submit">Search</button>

            {mounted && authed && (
              <button type="button" onClick={handleSignOut} className="btn btn-outline-danger ms-2">
                <i className="bi bi-box-arrow-right" /> Sign Out
              </button>
            )}
          </form>
        </div>
      </div>
    </nav>
  );
}
