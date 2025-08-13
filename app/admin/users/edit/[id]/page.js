'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Page({ params }) {
  const router = useRouter();
  const [resolvedParams, setResolvedParams] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    firstname: '',
    fullname: '',
    lastname: '',
    username: '',
    password: '',
    address: '',
    sex: '',
    birthday: ''
  });

  // Resolve params
  useEffect(() => {
    let mounted = true;
    const resolveParams = async () => {
      try {
        const p = typeof params?.then === 'function' ? await params : params;
        if (!mounted) return;
        setResolvedParams(p);
      } catch (err) {
        console.error('Failed to resolve params', err);
      }
    };
    resolveParams();
    return () => { mounted = false; };
  }, [params]);

  // Fetch user data
  useEffect(() => {
    if (!resolvedParams) return;
    const { id } = resolvedParams;
    let mounted = true;

    const getUser = async () => {
      try {
        setLoading(true);
        const res = await fetch('http://itdev.cmtc.ac.th:3000/api/users'); // ดึงทั้งหมด
        if (!res.ok) {
          console.error('GET user failed', res.status, res.statusText);
          return;
        }
        const data = await res.json();
        // แปลง id ให้ตรงกันทั้งสองฝั่ง
        const user = data.find(u => Number(u.id) === Number(id));
        if (!user) {
          console.error('User not found with id:', id);
          return;
        }
        if (!mounted) return;
        setForm({
          firstname: user.firstname ?? '',
          fullname: user.fullname ?? '',
          lastname: user.lastname ?? '',
          username: user.username ?? '',
          password: user.password ?? '',
          address: user.address ?? '',
          sex: user.sex ?? '',
          birthday: user.birthday ?? ''
        });
      } catch (err) {
        console.error('Error fetching user', err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    getUser();
    return () => { mounted = false; };
  }, [resolvedParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

const handleUpdateSubmit = async (e) => {
  e.preventDefault();
  if (!resolvedParams) { alert('ไม่พบ id'); return; }
  const { id } = resolvedParams;
  setSubmitting(true);

  const payload = { id, ...form }; // ใส่ id ด้วย

  try {
    const res = await fetch('http://itdev.cmtc.ac.th:3000/api/users', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      alert('✅ อัปเดตสำเร็จ');
      router.push('/admin/users');
    } else {
      const text = await res.text();
      console.error('Update failed', res.status, text);
      alert('❌ อัปเดตไม่สำเร็จ ดู console เพื่อรายละเอียด');
    }
  } catch (err) {
    console.error('Network error', err);
    alert('❌ เกิดข้อผิดพลาดในการเชื่อมต่อ');
  } finally {
    setSubmitting(false);
  }
};

  return (
    <>
      <br /><br /><br />
      <div className="container">
        <div className="card">
          <div className="card-header bg-warning text-dark">Edit Form</div>
          <div className="card-body">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <form className="row g-3" onSubmit={handleUpdateSubmit}>
                <div className="col-md-4">
                  <label htmlFor="firstname" className="form-label">คำนำหน้า</label>
                  <select id="firstname" name="firstname" className="form-select" value={form.firstname} onChange={handleChange} required disabled={submitting}>
                    <option value="">-- เลือกคำนำหน้า --</option>
                    <option value="นาย">นาย</option>
                    <option value="นาง">นาง</option>
                    <option value="นางสาว">นางสาว</option>
                  </select>
                </div>

                <div className="col-md-4">
                  <label htmlFor="fullname" className="form-label">ชื่อ</label>
                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-person"></i></span>
                    <input id="fullname" name="fullname" type="text" className="form-control" value={form.fullname} onChange={handleChange} required disabled={submitting} />
                  </div>
                </div>

                <div className="col-md-4">
                  <label htmlFor="lastname" className="form-label">นามสกุล</label>
                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-person-badge"></i></span>
                    <input id="lastname" name="lastname" type="text" className="form-control" value={form.lastname} onChange={handleChange} required disabled={submitting} />
                  </div>
                </div>

                <div className="col-md-6">
                  <label htmlFor="username" className="form-label">Username</label>
                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-person-circle"></i></span>
                    <input id="username" name="username" type="text" className="form-control" value={form.username} onChange={handleChange} required disabled={submitting} />
                  </div>
                </div>

                <div className="col-md-6">
                  <label htmlFor="password" className="form-label">Password</label>
                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-lock"></i></span>
                    <input id="password" name="password" type="password" className="form-control" value={form.password} onChange={handleChange} required disabled={submitting} />
                  </div>
                </div>

                <div className="col-md-8">
                  <label htmlFor="address" className="form-label">ที่อยู่</label>
                  <input id="address" name="address" type="text" className="form-control" value={form.address} onChange={handleChange} disabled={submitting} />
                </div>

                <div className="col-md-4">
                  <label htmlFor="sex" className="form-label">เพศ</label>
                  <select id="sex" name="sex" className="form-select" value={form.sex} onChange={handleChange} required disabled={submitting}>
                    <option value="">-- เลือกเพศ --</option>
                    <option value="ชาย">ชาย</option>
                    <option value="หญิง">หญิง</option>
                  </select>
                </div>

                <div className="col-md-4">
                  <label htmlFor="birthday" className="form-label">วันเกิด</label>
                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-calendar-event"></i></span>
                    <input id="birthday" name="birthday" type="text" placeholder="เช่น 14/02/2545" className="form-control" value={form.birthday} onChange={handleChange} disabled={submitting} />
                  </div>
                </div>

                <div className="col-12">
                  <button type="submit" className="btn btn-warning" disabled={submitting}>
                    <i className="bi bi-box-arrow-right"></i> {submitting ? 'Updating...' : 'UPDATE'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
