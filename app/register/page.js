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
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
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
      if (!res.ok) {
        const text = await res.text()
        console.error('Register failed:', text)
        alert('❌ สมัครไม่สำเร็จ')
        return
      }
      const data = await res.json()
      alert('✅ สมัครสมาชิกสำเร็จ')
      console.log('Response:', data)
      // ถ้าต้องการ reset form ให้เปิดคอมเมนต์ด้านล่าง
      // setForm({ firstname: '', fullname: '', lastname: '', username: '', password: '', address: '', sex: '', birthday: '' })
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
              <label htmlFor="firstname" className="form-label">คำนำหน้า</label>
              <select
                id="firstname"
                name="firstname"
                className="form-select"
                value={form.firstname}
                onChange={handleChange}
                required
              >
                <option value="">-- เลือกคำนำหน้า --</option>
                <option value="นาย">นาย</option>
                <option value="นาง">นาง</option>
                <option value="นางสาว">นางสาว</option>
              </select>
            </div>

            <div className="col-md-4">
              <label htmlFor="fullname" className="form-label">ชื่อ</label>
              <div className="input-group">
                <span className="input-group-text" id="addon-fullname"><i className="bi bi-person"></i></span>
                <input
                  id="fullname"
                  name="fullname"
                  type="text"
                  className="form-control"
                  value={form.fullname}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="col-md-4">
              <label htmlFor="lastname" className="form-label">นามสกุล</label>
              <div className="input-group">
                <span className="input-group-text" id="addon-lastname"><i className="bi bi-person-badge"></i></span>
                <input
                  id="lastname"
                  name="lastname"
                  type="text"
                  className="form-control"
                  value={form.lastname}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="col-md-6">
              <label htmlFor="username" className="form-label">Username</label>
              <div className="input-group">
                <span className="input-group-text" id="addon-username"><i className="bi bi-person-circle"></i></span>
                <input
                  id="username"
                  name="username"
                  type="text"
                  className="form-control"
                  value={form.username}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="col-md-6">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="input-group">
                <span className="input-group-text" id="addon-password"><i className="bi bi-lock"></i></span>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="form-control"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="col-md-8">
              <label htmlFor="address" className="form-label">ที่อยู่</label>
              <input
                id="address"
                name="address"
                type="text"
                className="form-control"
                value={form.address}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4">
              <label htmlFor="sex" className="form-label">เพศ</label>
              <select
                id="sex"
                name="sex"
                className="form-select"
                value={form.sex}
                onChange={handleChange}
                required
              >
                <option value="">-- เลือกเพศ --</option>
                <option value="ชาย">ชาย</option>
                <option value="หญิง">หญิง</option>
              </select>
            </div>

            <div className="col-md-4">
              <label htmlFor="birthday" className="form-label">วันเกิด</label>
              <div className="input-group">
                <span className="input-group-text" id="addon-birthday"><i className="bi bi-calendar-event"></i></span>
                <input
                  id="birthday"
                  name="birthday"
                  type="text"
                  placeholder="เช่น 14/02/2545"
                  className="form-control"
                  value={form.birthday}
                  onChange={handleChange}
                />
              </div>
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
