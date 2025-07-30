'use client'
import { useState } from 'react'
import Swal from 'sweetalert2'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function Register() {
  const [firstname, setFirstname] = useState('')
  const [fullname, setFullname] = useState('')
  const [lastname, setLastname] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch('http://itdev.cmtc.ac.th:3000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstname,
          fullname,
          lastname,
          username,
          password,
        }),
      })

      const data = await res.json()

      if (res.ok) {
        Swal.fire('สำเร็จ', 'สมัครสมาชิกเรียบร้อยแล้ว', 'success')
        setFirstname('')
        setFullname('')
        setLastname('')
        setUsername('')
        setPassword('')
      } else {
        Swal.fire('ผิดพลาด', data.message || 'สมัครไม่สำเร็จ', 'error')
      }
    } catch (err) {
      Swal.fire('ผิดพลาด', 'ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้', 'error')
    }
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">สมัครสมาชิก</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">คำนำหน้า</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="นาย / นาง / Mr"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">ชื่อ</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="ชื่อจริง"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">นามสกุล</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="นามสกุล"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">ชื่อผู้ใช้</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="ชื่อผู้ใช้"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">รหัสผ่าน</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="รหัสผ่าน"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  สมัครสมาชิก
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
