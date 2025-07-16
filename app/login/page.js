'use client';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light p-3">
      <div className="card shadow-sm p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4">เข้าสู่ระบบ</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="กรอกชื่อผู้ใช้"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="กรอกรหัสผ่าน"
            />
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="remember" />
            <label className="form-check-label" htmlFor="remember">จำฉันไว้</label>
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        <div className="text-center mt-3">
          <Link href="/register" className="text-decoration-none">สมัครสมาชิก</Link>
          <span className="mx-2">|</span>
          <Link href="/forgot-password" className="text-decoration-none">ลืมรหัสผ่าน</Link>
        </div>
      </div>
    </div>
  );
}

