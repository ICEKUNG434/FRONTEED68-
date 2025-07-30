'use client'
import Link from 'next/link'
import { useState } from 'react'
import Swal from 'sweetalert2'

export default function RegisterPage() {
  const [form, setForm] = useState({
    username: '',
    password: '',
    prefix: '',
    firstname: '',
    lastname: '',
    address: '',
    gender: '',
    birthdate: '',
    accept: false,
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
  e.preventDefault()

  if (!form.accept) {
    Swal.fire('กรุณายอมรับเงื่อนไข', '', 'warning')
    return
  }

  try {
    const res = await fetch('http://itdev.cmtc.ac.th:3000/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: `${form.prefix} ${form.firstname} ${form.lastname}`,
        email: form.username,
        password: form.password,
        address: form.address,
        gender: form.gender,
        birthdate: form.birthdate,
      }),
    })

    const data = await res.json()

    if (res.ok) {
      Swal.fire('สมัครสมาชิกสำเร็จ', 'คุณสามารถเข้าสู่ระบบได้แล้ว', 'success')
      setForm({
        username: '',
        password: '',
        prefix: '',
        firstname: '',
        lastname: '',
        address: '',
        gender: '',
        birthdate: '',
        accept: false,
      })
    } else {
      Swal.fire('เกิดข้อผิดพลาด', data.message || 'ไม่สามารถสมัครสมาชิกได้', 'error')
    }
  } catch (err) {
    Swal.fire('ข้อผิดพลาดเครือข่าย', 'ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้', 'error')
  }
}

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light p-3">
      <div className="card shadow-sm p-4" style={{ maxWidth: '500px', width: '100%' }}>
        <h2 className="text-center mb-4">สมัครสมาชิก</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">อีเมล</label>
            <input type="email" className="form-control" id="username" name="username" placeholder="กรอกอีเมล" value={form.username} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">รหัสผ่าน</label>
            <input type="password" className="form-control" id="password" name="password" placeholder="กรอกรหัสผ่าน" value={form.password} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label htmlFor="prefix" className="form-label">คำนำหน้าชื่อ</label>
            <select className="form-select" id="prefix" name="prefix" value={form.prefix} onChange={handleChange}>
              <option value="">-- เลือก --</option>
              <option value="นาย">นาย</option>
              <option value="นาง">นาง</option>
              <option value="นางสาว">นางสาว</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="firstname" className="form-label">ชื่อ</label>
            <input type="text" className="form-control" id="firstname" name="firstname" placeholder="กรอกชื่อ" value={form.firstname} onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label htmlFor="lastname" className="form-label">นามสกุล</label>
            <input type="text" className="form-control" id="lastname" name="lastname" placeholder="กรอกนามสกุล" value={form.lastname} onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label htmlFor="address" className="form-label">ที่อยู่</label>
            <textarea className="form-control" id="address" name="address" rows="3" placeholder="กรอกที่อยู่" value={form.address} onChange={handleChange}></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label d-block">เพศ</label>
            {['ชาย', 'หญิง', 'อื่นๆ'].map((g) => (
              <div className="form-check form-check-inline" key={g}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id={g}
                  value={g}
                  checked={form.gender === g}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor={g}>{g}</label>
              </div>
            ))}
          </div>

          <div className="mb-3">
            <label htmlFor="birthdate" className="form-label">วันเกิด</label>
            <input type="date" className="form-control" id="birthdate" name="birthdate" value={form.birthdate} onChange={handleChange} />
          </div>

          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="accept" name="accept" checked={form.accept} onChange={handleChange} />
            <label className="form-check-label" htmlFor="accept">ยอมรับเงื่อนไข</label>
          </div>

          <button type="submit" className="btn btn-success w-100">สมัครสมาชิก</button>
        </form>
        <div className="text-center mt-3">
          <Link href="/login" className="text-decoration-none">เข้าสู่ระบบ</Link>
        </div>
      </div>
    </div>
  )
}
