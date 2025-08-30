'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Swal from 'sweetalert2';

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();

  const [authed, setAuthed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // sync auth
  useEffect(() => {
    const sync = () => setAuthed(!!localStorage.getItem('token'));
    sync();
    const onStorage = () => sync();
    const onFocus = () => sync();
    window.addEventListener('storage', onStorage);
    window.addEventListener('focus', onFocus);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('focus', onFocus);
    };
  }, []);

  // ปิดเมนูเมื่อเปลี่ยนหน้า
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // ตรวจจับ scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSignOut = async () => {
    const res = await Swal.fire({
      title: 'ออกจากระบบ?',
      text: 'คุณต้องการออกจากระบบหรือไม่',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'ออกจากระบบ',
      cancelButtonText: 'ยกเลิก',
      confirmButtonColor: '#ff6f3c',
    });
    if (!res.isConfirmed) return;
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setAuthed(false);
    await Swal.fire({ title: 'ออกจากระบบแล้ว', icon: 'success', timer: 900, showConfirmButton: false });
    router.push(pathname?.startsWith('/admin') ? '/admin/login' : '/login');
  };

  const items = [
    { name: 'Home', href: '/' },
    { name: 'Service', href: '/service' },
    { name: 'Contact', href: '/contact' },
    { name: 'About', href: '/about' },
  ];

  const isActiveLink = (href) => pathname === href || (href !== '/' && pathname?.startsWith(href));

  return (
    <nav
      className={`navbar navbar-expand-lg ef-nav ${scrolled ? 'ef-scrolled' : ''}`}
      role="navigation"
      aria-label="Main"
    >
      <div className="container ef-inner">
        <Link className="navbar-brand ef-brand" href="/" aria-label="Home">
           Sub <span> nautica</span>
        </Link>

        {/* Hamburger */}
        <button
          className="navbar-toggler ef-toggler ms-auto"
          type="button"
          aria-controls="navbarSupportedContent"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div
          id="navbarSupportedContent"
          className={`ef-collapse navbar-collapse ms-lg-auto ${menuOpen ? 'show' : ''}`}
        >
          <ul className="navbar-nav ef-menu ms-lg-auto mb-2 mb-lg-0">
            {items.map((item) => {
              const active = isActiveLink(item.href);
              return (
                <li className="nav-item" key={item.name}>
                  <Link
                    className={`nav-link ef-link ${active ? 'active' : ''}`}
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    onClick={() => setMenuOpen(false)}
                  >
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}

            {/* แสดงปุ่ม login ถ้ายังไม่ login */}
            {!authed && (
              <li className="nav-item">
                <Link
                  className={`nav-link ef-link ${isActiveLink('/login') ? 'active' : ''}`}
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                >
                  <i className="bi bi-soundwave me-2" /><span>เข้าสู่ระบบ</span>
                </Link>
              </li>
            )}
          </ul>

          {/* แสดงปุ่ม logout ถ้า login แล้ว */}
          {authed && (
            <button type="button" onClick={handleSignOut} className="btn ef-signout ms-lg-3">
              <i className="bi bi-box-arrow-right" />
              <span className="ms-2 d-none d-xl-inline">Sign Out</span>
            </button>
          )}
        </div>
      </div>

      <button
        type="button"
        className={`ef-backdrop ${menuOpen ? 'show' : ''}`}
        aria-hidden={!menuOpen}
        tabIndex={-1}
        onClick={() => setMenuOpen(false)}
      />

      <style jsx>{`
        .ef-nav {
          --h:64px;
          position: sticky; top: 0; z-index: 1030;
          background: linear-gradient(90deg, #0f4c75 0%, #3282b8 50%, #0f4c75 100%);
          backdrop-filter: blur(14px) saturate(180%);
          border-bottom: 1px solid rgba(255,255,255,.08);
          transition: transform .28s ease, box-shadow .2s ease, background-color .2s ease;
          isolation: isolate;
        }
        .ef-nav.ef-scrolled { background: transparent; box-shadow: none; }
        .ef-inner{ min-height: var(--h); }
        .ef-brand{ font-weight: 900; letter-spacing:.06em; color:#bbe1fa; text-shadow:0 0 6px rgba(255,255,255,.3); }
        .ef-brand span{ color:#ffb347; }
        .ef-menu .ef-link{ padding: .5rem .9rem; border-radius: 10px; transition: all .2s ease; color:#e0f7fa; }
        .ef-menu .ef-link:hover{ background: rgba(255,255,255,.1); color:#fff; }
        .ef-menu .ef-link.active{ background: rgba(255,179,71,.25); color:#ffb347; box-shadow: 0 0 6px rgba(255,179,71,.5); }
        .ef-signout{ border:2px solid #ff6f3c; color:#ff6f3c; font-weight:600; }
        .ef-signout:hover{ background:#ff6f3c; color:#fff; }
        @media (max-width: 991.98px){
          .ef-collapse{ display: none; background: rgba(15,76,117,.96); border-radius: 12px; padding: .6rem; margin-top:.5rem; }
          .ef-collapse.show{ display: block; }
          .ef-backdrop{ position: fixed; inset:0; background: rgba(0,0,0,.4); opacity: 0; pointer-events: none; z-index: 1059; transition: opacity .18s ease; }
          .ef-backdrop.show{ opacity:1; pointer-events: auto; }
        }
        @media (min-width: 992px){
          .ef-collapse{ display: flex !important; }
          .ef-backdrop{ display:none; }
        }
      `}</style>
    </nav>
  );
}
