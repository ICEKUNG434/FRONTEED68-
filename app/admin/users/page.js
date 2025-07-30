'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Page() {
  const [items, setItems] = useState([])

  useEffect(() => {
    async function getUsers() {
      try {
        const res = await fetch('http://itdev.cmtc.ac.th:3000/api/users')
        if (!res.ok) {
          console.error('Failed to fetch data')
          return
        }
        const data = await res.json()
        setItems(data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    getUsers()
    const interval = setInterval(getUsers, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0"><i className="bi bi-people-fill me-2"></i> รายชื่อสมาชิก</h5>
          <Link href="/admin/users/create" className="btn btn-light btn-sm">
            <i className="bi bi-person-plus"></i> เพิ่มสมาชิก
          </Link>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle">
              <thead className="table-light text-center">
                <tr>
                  <th style={{ width: '5%' }}>#</th>
                  <th style={{ width: '10%' }}>คำนำหน้า</th>
                  <th style={{ width: '15%' }}>ชื่อ</th>
                  <th style={{ width: '15%' }}>นามสกุล</th>
                  <th style={{ width: '20%' }}>Username</th>
                  <th style={{ width: '15%' }}>ที่อยู่</th>
                  <th style={{ width: '10%' }}>เพศ</th>
                  <th style={{ width: '10%' }}>วันเกิด</th>
                  <th style={{ width: '10%' }}>แก้ไข</th>
                  <th style={{ width: '10%' }}>ลบ</th>
                </tr>
              </thead>
              <tbody>
                {items.length > 0 ? (
                  items.map((item) => (
                    <tr key={item.id}>
                      <td className="text-center">{item.id}</td>
                      <td>{item.firstname}</td>
                      <td>{item.fullname}</td>
                      <td>{item.lastname}</td>
                      <td>{item.username}</td>
                      <td>{item.address}</td>
                      <td>{item.sex}</td>
                      <td>{item.birthday}</td>
                      <td className="text-center">
                        <Link href={`/admin/users/edit/${item.id}`} className="btn btn-warning btn-sm">
                          <i className="bi bi-pencil-square"></i> แก้ไข
                        </Link>
                      </td>
                      <td className="text-center">
                        <button className="btn btn-danger btn-sm" type="button">
                          <i className="bi bi-trash"></i> ลบ
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" className="text-center text-muted">
                      ไม่มีข้อมูลสมาชิก
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
