'use client';
import Link from 'next/link';

export default function Navigation() {
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
              { name: 'เข้าสู่ระบบ', href: '/login' },
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
          </form>
        </div>
      </div>
    </nav>
  );
}
