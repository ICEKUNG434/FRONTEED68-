'use client';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light p-3">
      <div className="card shadow-sm p-4" style={{ maxWidth: '500px', width: '100%' }}>
        <h2 className="text-center mb-4">สมัครสมาชิก</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">ชื่อผู้ใช้</label>
            <input type="text" className="form-control" id="username" placeholder="กรอกชื่อผู้ใช้" />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">รหัสผ่าน</label>
            <input type="password" className="form-control" id="password" placeholder="กรอกรหัสผ่าน" />
          </div>

          <div className="mb-3">
            <label htmlFor="prefix" className="form-label">คำนำหน้าชื่อ</label>
            <select className="form-select" id="prefix">
              <option value="">-- เลือก --</option>
              <option value="mr">นาย</option>
              <option value="mrs">นาง</option>
              <option value="miss">นางสาว</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="firstname" className="form-label">ชื่อ</label>
            <input type="text" className="form-control" id="firstname" placeholder="กรอกชื่อ" />
          </div>

          <div className="mb-3">
            <label htmlFor="lastname" className="form-label">นามสกุล</label>
            <input type="text" className="form-control" id="lastname" placeholder="กรอกนามสกุล" />
          </div>

          <div className="mb-3">
            <label htmlFor="address" className="form-label">ที่อยู่</label>
            <textarea className="form-control" id="address" rows="3" placeholder="กรอกที่อยู่"></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label d-block">เพศ</label>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="gender" id="male" value="male" />
              <label className="form-check-label" htmlFor="male">ชาย</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="gender" id="female" value="female" />
              <label className="form-check-label" htmlFor="female">หญิง</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="gender" id="other" value="other" />
              <label className="form-check-label" htmlFor="other">อื่นๆ</label>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="birthdate" className="form-label">วันเกิด</label>
            <input type="date" className="form-control" id="birthdate" />
          </div>

          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="accept" />
            <label className="form-check-label" htmlFor="accept">ยอมรับเงื่อนไข</label>
          </div>

          <button type="submit" className="btn btn-success w-100">Register</button>
        </form>
        <div className="text-center mt-3">
          <Link href="/login" className="text-decoration-none">เข้าสู่ระบบ</Link>
        </div>
      </div>
    </div>
  );
}
