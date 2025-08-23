'use client'
import { useState } from 'react'
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'
export default function Register() {
  const router = useRouter()
  const [firstname, setFirstname] = useState('')
  const [fullname, setFullname] = useState('')
  const [lastname, setLastname] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    const res = await fetch('https://backend-nextjs-virid.vercel.app/api/users', {
      method: 'POST',
      headers: {
        Accept : 'application/json',
      },
      body: JSON.stringify({ firstname, fullname, lastname, username, password }),
    })
    const result = await res.json();
    console.log(result);
    if (res.ok) {
      Swal.fire({
        icon: 'success',
        title: '<h3>บันทึกข้อมูลเรียบร้อยแล้ว</h3>',
        showConfirmButton: false,
        timer: 2000
        }).then(function () {
        router.push('/register')
      });
      setFirstname('')
      setFullname('')
      setLastname('')
      setUsername('')
      setPassword('')
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'เกิดข้อผิดพลาด!',
        icon: 'error',
        confirmButtonText: 'ตกลง'
      })
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'ข้อผิดพลาดเครือข่าย',
      text: 'ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้',
    })
  }
  }
  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded">
      <h1 className="text-xl font-bold mb-4">สมัครสมาชิก</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <select name="firstname" onChange={(e) => setFirstname(e.target.value)} className="w-full border p-2 rounded" required>
          <option value="">คำนำหน้าชื่อ</option>
          <option value="นาย">นาย</option>
          <option value="นาง">นาง</option>
          <option value="นางสาว">นางสาว</option>
        </select>
        <input
          type="text"
          placeholder="ชื่อ"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="นามสกุล"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
                <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
                <input
          type="text"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          สมัครสมาชิก
        </button>
      </form>
    </div>
  )
}