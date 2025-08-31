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

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // sticky + shrink + hide/show
  useEffect(() => {
    const nav = document.querySelector('.ef-nav');
    if (!nav) return;
    const setNavH = () => document.documentElement.style.setProperty('--navH', `${nav.offsetHeight || 64}px`);
    setNavH();
    const ro = new ResizeObserver(setNavH); ro.observe(nav);
    window.addEventListener('resize', setNavH);
    window.addEventListener('orientationchange', setNavH);

    let lastY = window.scrollY, dir = 0, acc = 0, hidden = false, ticking = false;
    const HIDE_AFTER = 48, SHOW_AFTER = 28;
    const nearBottom = () => (document.documentElement.scrollHeight - (window.scrollY + window.innerHeight)) < 24;

    const onScroll = () => {
      const y = Math.max(0, window.scrollY);
      const d = y - lastY;
      lastY = y;
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        nav.classList.toggle('ef-shrink', y > 40);
        if (!menuOpen && !nearBottom()) {
          const newDir = d > 0 ? 1 : d < 0 ? -1 : dir;
          if (newDir !== dir) { dir = newDir; acc = 0; }
          acc += Math.abs(d) < 2 ? 0 : Math.abs(d);

          if (!hidden && dir === 1 && acc > HIDE_AFTER && y > 40) { nav.classList.add('ef-hide'); hidden = true; acc = 0; }
          else if (hidden && dir === -1 && acc > SHOW_AFTER) { nav.classList.remove('ef-hide'); hidden = false; acc = 0; }
          if (y <= 2) { nav.classList.remove('ef-hide'); hidden = false; acc = 0; }
        } else { nav.classList.remove('ef-hide'); hidden = false; acc = 0; }
        ticking = false;
      });
    };

    nav.classList.add('ef-ready');
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', setNavH);
      window.removeEventListener('orientationchange', setNavH);
      ro.disconnect();
    };
  }, [menuOpen]);

  const handleSignOut = async () => {
    const res = await Swal.fire({
      title: 'ออกจากระบบ?',
      text: 'คุณต้องการออกจากระบบหรือไม่',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'ออกจากระบบ',
      cancelButtonText: 'ยกเลิก',
      confirmButtonColor: '#d33',
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
    { name: 'เข้าสู่ระบบ', href: '/login' },
  ];

  const isActiveLink = (href) => pathname === href || (href !== '/' && pathname?.startsWith(href));

  return (
    <nav className="navbar navbar-expand-lg ef-nav">
      <div className="container ef-inner">
        <Link className="navbar-brand ef-brand" href="/">
          Sub <span>nautica</span>
        </Link>

        <button
          className="navbar-toggler ef-toggler ms-auto"
          type="button"
          aria-controls="navbarSupportedContent"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen(v => !v)}
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className={`ef-collapse navbar-collapse ms-lg-auto ${menuOpen ? 'show' : ''}`}
          onKeyDown={(e) => { if (e.key === 'Escape' && menuOpen) setMenuOpen(false); }}
        >
          <ul className="navbar-nav ef-menu ms-lg-auto mb-2 mb-lg-0">
            {items.map(item => {
              const active = isActiveLink(item.href);
              const isLogin = item.href === '/login';
              return (
                <li className="nav-item" key={item.name}>
                  <Link
                    className={`nav-link ef-link ${active ? 'active' : ''}`}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                  >
                    {isLogin ? (<><i className="bi bi-soundwave me-2" /><span>{item.name}</span></>) : <span>{item.name}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>

          {authed && (
            <button type="button" onClick={handleSignOut} className="btn btn-outline-ink ef-signout ms-lg-3">
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
          position: sticky; top:0; z-index:1030;
          background: linear-gradient(90deg, rgba(0,31,63,0.85) 0%, rgba(0,51,102,0.85) 50%, rgba(0,31,63,0.85) 100%);
          backdrop-filter: saturate(180%) blur(12px);
          border-bottom: 1px solid rgba(255,255,255,0.08);
          color: #76f0f7;
          transition: transform .28s ease, box-shadow .2s ease, background-color .3s ease;
        }
        .ef-nav.ef-shrink{ --h:56px; box-shadow:0 6px 14px rgba(0,240,255,.15); }
        .ef-nav.ef-hide{ transform: translateY(calc(-1*var(--navH))); }

        .ef-inner{ min-height: var(--h); }

        .ef-brand {
          font-weight: 900;
          letter-spacing: .06em;
          color: #fff;
          text-shadow: 0 0 4px #0af0ff, 0 0 8px #29dfff;
          -webkit-text-stroke: 0.8px #0af0ff;
          -webkit-font-smoothing: antialiased;
          text-rendering: optimizeLegibility;
          animation: neonGlow 2s ease-in-out infinite;
        }
        .ef-brand span { color:#29dfff; text-shadow:0 0 3px #0af0ff,0 0 6px #29dfff; }

        @keyframes neonGlow {
          0%, 100% { text-shadow:0 0 3px #0af0ff,0 0 6px #29dfff; }
          50% { text-shadow:0 0 5px #0af0ff,0 0 10px #29dfff; }
        }

        .ef-toggler .navbar-toggler-icon { background:none; width:1.6rem; height:1.6rem; position:relative; }
        .ef-toggler .navbar-toggler-icon::before,
        .ef-toggler .navbar-toggler-icon::after {
          content:""; position:absolute; left:0; right:0; height:2px; background:#76f0f7; border-radius:2px;
          box-shadow:0 0 4px #0af0ff,0 0 8px #29dfff;
        }
        .ef-toggler .navbar-toggler-icon::before{ top:4px; }
        .ef-toggler .navbar-toggler-icon::after{ bottom:4px; }

        .ef-menu .ef-link{ padding:.6rem 1rem; border-radius:14px; transition:.2s; color:#a0e7ff; text-shadow:0 0 4px #0af0ff; }
        .ef-menu .ef-link:hover{ background: rgba(0,240,255,0.15); color:#fff; text-shadow:0 0 10px #0af0ff,0 0 15px #29dfff; }
        .ef-menu .ef-link.active{ background: rgba(0,240,255,0.25); color:#29dfff; box-shadow:0 0 12px rgba(0,240,255,.7),0 0 18px rgba(0,191,255,.5); text-shadow:0 0 12px #0af0ff,0 0 20px #29dfff; }

        .ef-signout{ border:2px solid #0af0ff; color:#0af0ff; font-weight:600; transition:.3s; backdrop-filter:blur(6px); }
        .ef-signout:hover{ background:#0af0ff; color:#001f3f; box-shadow:0 0 20px #0af0ff,0 0 28px #29dfff; }

        @media (max-width:991.98px){
          .ef-collapse{ display:none; background: rgba(0,0,50,0.85); border-radius:12px; padding:.6rem; margin-top:.5rem; backdrop-filter:blur(8px);}
          .ef-collapse.show{ display:block; }
          .ef-menu .ef-link{ padding:.7rem 1rem; }
          .ef-backdrop{ position:fixed; inset:0; background: rgba(0,0,0,.15); opacity:0; pointer-events:none; z-index:1059; transition:opacity .18s ease; }
          .ef-backdrop.show{ opacity:1; pointer-events:auto; }
        }
        @media (min-width:992px){ .ef-collapse{ display:flex !important; } .ef-backdrop{ display:none; } }
      `}</style>
    </nav>
  );
}
