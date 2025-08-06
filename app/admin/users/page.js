'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export default function Page() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function getUsers() {
      try {
        const res = await fetch('/api/users');
        if (!res.ok) {
          console.error('Failed to fetch data', res.status, res.statusText);
          return;
        }
        const data = await res.json();
        if (mounted) setItems(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    getUsers();
    const interval = setInterval(getUsers, 3000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  const handleDelete = async (id) => {
    const confirmResult = await Swal.fire({
      title: 'คุณแน่ใจหรือไม่?',
      text: 'การลบนี้ไม่สามารถย้อนกลับได้!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ใช่, ลบเลย!',
      cancelButtonText: 'ยกเลิก',
      reverseButtons: true
    });

    if (!confirmResult.isConfirmed) return;

    setDeletingId(id);

    try {
      const res = await fetch(`http://itdev.cmtc.ac.th:3000/api/users/${id}`, {
        method: 'DELETE',
        headers: { Accept: 'application/json' },
      });

      let body;
      try {
        body = await res.json();
      } catch {
        body = null;
      }

      if (!res.ok) {
        console.error('Delete failed', body);
        Swal.fire('ลบไม่สำเร็จ', `Status ${res.status}`, 'error');
        setDeletingId(null);
        return;
      }

      setItems((prev) => prev.filter((it) => it.id !== id));
      Swal.fire('ลบสำเร็จ!', 'สมาชิกถูกลบเรียบร้อยแล้ว', 'success');

    } catch (error) {
      console.error('Error deleting user:', error);
      Swal.fire('เกิดข้อผิดพลาด', 'ไม่สามารถลบสมาชิกได้', 'error');
    } finally {
      setDeletingId(null);
    }
  };

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
            <table className="table table-bordered table-hover align-middle mb-0">
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
                {loading ? (
                  <tr>
                    <td colSpan="10" className="text-center">Loading...</td>
                  </tr>
                ) : items.length > 0 ? (
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
                        <button
                          className="btn btn-danger btn-sm"
                          type="button"
                          onClick={() => handleDelete(item.id)}
                          disabled={deletingId === item.id}
                        >
                          {deletingId === item.id ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-1"></span>
                              กำลังลบ...
                            </>
                          ) : (
                            <>
                              <i className="bi bi-trash"></i> ลบ
                            </>
                          )}
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
  );
}
