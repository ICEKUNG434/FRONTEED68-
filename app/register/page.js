'use client'
import { useState } from 'react'

export default function Register() {
  const [form, setForm] = useState({
    firstname: '',
    fullname: '',
    lastname: '',
    username: '',
    password: '',
    address: '',
    sex: '',
    birthday: ''
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('http://itdev.cmtc.ac.th:3000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      alert('✅ สมัครสมาชิกสำเร็จ')
      console.log('Response:', data)
    } catch (error) {
      console.error('Error:', error)
      alert('❌ เกิดข้อผิดพลาด')
    }
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-header bg-success text-white">
          <h5 className="mb-0">ฟอร์มสมัครสมาชิก</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-4">
              <label className="form-label">คำนำหน้า</label>
              <input type="text" className="form-control" name="firstname" value={form.firstname} onChange={handleChange} required />
            </div>
            <div className="col-md-4">
              <label className="form-label">ชื่อ</label>
              <input type="text" className="form-control" name="fullname" value={form.fullname} onChange={handleChange} required />
            </div>
            <div className="col-md-4">
              <label className="form-label">นามสกุล</label>
              <input type="text" className="form-control" name="lastname" value={form.lastname} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Username</label>
              <input type="text" className="form-control" name="username" value={form.username} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" name="password" value={form.password} onChange={handleChange} required />
            </div>
            <div className="col-md-8">
              <label className="form-label">ที่อยู่</label>
              <input type="text" className="form-control" name="address" value={form.address} onChange={handleChange} required />
            </div>
            <div className="col-md-4">
              <label className="form-label">เพศ</label>
              <select className="form-select" name="sex" value={form.sex} onChange={handleChange} required>
                <option value="">-- เลือกเพศ --</option>
                <option value="ชาย">ชาย</option>
                <option value="หญิง">หญิง</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">วันเกิด (เช่น 14/02/2545)</label>
              <input type="text" className="form-control" name="birthday" value={form.birthday} onChange={handleChange} required />
            </div>
            <div className="col-12 text-end">
              <button type="submit" className="btn btn-success">
                <i className="bi bi-person-plus"></i> สมัครสมาชิก
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
