'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'https://backend-nextjs-virid.vercel.app/api';

export default function SigninPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  // ถ้ามี token อยู่แล้ว ให้เด้งไปหน้า /admin/users ทันที
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) router.replace('/admin/users');
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      // กัน JSON แตกเวลา backend ตอบเปล่า ๆ
      let data = null;
      try {
        data = await res.json();
      } catch {
        data = null;
      }

      if (!res.ok) {
        // พยายามดึงข้อความ error จาก backend ถ้ามี
        const msg = (data && (data.message || data.error)) || `Login failed (HTTP ${res.status})`;
        throw new Error(msg);
      }

      if (!data || !data.token) {
        throw new Error('ไม่พบ token ในผลลัพธ์การเข้าสู่ระบบ');
      }

      // เก็บ token และไปหน้า users
      localStorage.setItem('token', data.token);
      router.replace('/admin/users');
    } catch (err) {
      setError(err.message || 'เข้าสู่ระบบไม่สำเร็จ');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <br /><br /><br />
      <div className="container">
        <div className="card shadow">
          <div className="card-header bg-success text-white">SignIn Form</div>
          <div className="card-body">
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            <form className="row g-3" onSubmit={handleLogin}>
              <div className="col-md-12">
                <label className="form-label">Username</label>
                <div className="input-group">
                  <span className="input-group-text" id="basic-addon3">
                    <i className="bi bi-person-vcard"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    autoFocus
                  />
                </div>
              </div>

              <div className="col-md-12">
                <label className="form-label">Password</label>
                <div className="input-group">
                  <span className="input-group-text" id="basic-addon4">
                    <i className="bi bi-lock"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="col-12 d-grid">
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  {submitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" />
                      กำลังเข้าสู่ระบบ...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </button>
              </div>

              <div className="col-12">
                <Link href="/register">Create Account</Link> | <Link href="/">Forget Password</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}