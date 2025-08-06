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

  useEffect(() => {
    if (!resolvedParams) return;
    const { id } = resolvedParams;
    let mounted = true;
    const getUser = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://itdev.cmtc.ac.th:3000/api/users/${id}`);
        if (!res.ok) {
          const status = res.status;
          const statusText = res.statusText;
          const body = await res.text().catch(() => '<no body>');
          console.error('GET user failed', { status, statusText, body });
          return;
        }
        const data = await res.json();
        const user = Array.isArray(data) ? data[0] ?? {} : data ?? {};
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

  // helper to print headers object
  const headersToObject = (headers) => {
    const obj = {};
    try {
      for (const pair of headers.entries()) {
        obj[pair[0]] = pair[1];
      }
    } catch (e) { /* ignore */ }
    return obj;
  };

  const debugPrintResponse = async (label, res) => {
    const status = res.status;
    const statusText = res.statusText;
    const headersObj = headersToObject(res.headers);
    let textBody = null;
    try {
      textBody = await res.text();
    } catch (e) {
      textBody = `<failed to read text: ${e.message}>`;
    }

    let jsonBody = null;
    try {
      jsonBody = textBody ? JSON.parse(textBody) : null;
    } catch (e) {
      jsonBody = null; // not JSON
    }

    console.log(`[DEBUG] ${label} =>`, { status, statusText, headers: headersObj, textBody, jsonBody });
    return { status, statusText, headersObj, textBody, jsonBody };
  };

const handleUpdateSubmit = async (e) => {
  e.preventDefault();
  if (!resolvedParams) { alert('ไม่พบ id'); return; }
  const { id } = resolvedParams;
  setSubmitting(true);

  const payload = { ...form };
  console.log('[DEBUG] prepared payload', payload);

  const tries = [
    {
      label: `PUT /api/users/${id} (JSON)`,
      fetchOpts: {
        url: `http://itdev.cmtc.ac.th:3000/api/users/${id}`,
        init: {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        }
      }
    },
    {
      label: `PUT /api/users (JSON with id)`,
      fetchOpts: {
        url: `http://itdev.cmtc.ac.th:3000/api/users`,
        init: {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ id, ...payload }),
        }
      }
    },
    {
      label: `POST /api/users (with _method=PUT form-urlencoded)`,
      fetchOpts: {
        url: `http://itdev.cmtc.ac.th:3000/api/users`,
        init: {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({ _method: 'PUT', id, ...payload }).toString()
        }
      }
    },
    {
      label: `POST /api/users/${id} (with _method=PUT form-urlencoded)`,
      fetchOpts: {
        url: `http://itdev.cmtc.ac.th:3000/api/users/${id}`,
        init: {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({ _method: 'PUT', ...payload }).toString()
        }
      }
    }
  ];

  const headersToObject = (headers) => {
    const obj = {};
    try { for (const [k, v] of headers.entries()) obj[k] = v } catch (e) {}
    return obj;
  };

  const debugPrintResponse = async (label, res) => {
    let text = '<no body>';
    try { text = await res.text(); } catch (e) { text = `<err reading body: ${e.message}>`; }
    let json = null;
    try { json = text ? JSON.parse(text) : null; } catch (e) { json = null; }
    console.log(`[DEBUG] ${label} => status: ${res.status} ${res.statusText}`, {
      headers: headersToObject(res.headers), text, json
    });
    return { ok: res.ok, status: res.status, text, json };
  };

  let success = false;
  for (const t of tries) {
    try {
      console.log('[DEBUG] Trying', t.label, t.fetchOpts);
      const res = await fetch(t.fetchOpts.url, t.fetchOpts.init);
      const info = await debugPrintResponse(t.label, res);
      if (info.ok) {
        success = true;
        alert('✅ อัปเดตสำเร็จ: ' + t.label);
        break;
      } else {
        console.error('Update failed (' + t.label + ')', { status: info.status, text: info.text });
      }
    } catch (err) {
      console.error('Network error on try ' + t.label, err);
    }
  }

  if (!success) alert('❌ อัปเดตไม่สำเร็จ — ดู console/Network tab เพื่อรายละเอียด');
  setSubmitting(false);
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
                    <span className="input-group-text" id="basic-addon-fullname"><i className="bi bi-person"></i></span>
                    <input id="fullname" name="fullname" type="text" className="form-control" value={form.fullname} onChange={handleChange} required disabled={submitting} />
                  </div>
                </div>

                <div className="col-md-4">
                  <label htmlFor="lastname" className="form-label">นามสกุล</label>
                  <div className="input-group">
                    <span className="input-group-text" id="basic-addon-lastname"><i className="bi bi-person-badge"></i></span>
                    <input id="lastname" name="lastname" type="text" className="form-control" value={form.lastname} onChange={handleChange} required disabled={submitting} />
                  </div>
                </div>

                <div className="col-md-6">
                  <label htmlFor="username" className="form-label">Username</label>
                  <div className="input-group">
                    <span className="input-group-text" id="basic-addon-username"><i className="bi bi-person-circle"></i></span>
                    <input id="username" name="username" type="text" className="form-control" value={form.username} onChange={handleChange} required disabled={submitting} />
                  </div>
                </div>

                <div className="col-md-6">
                  <label htmlFor="password" className="form-label">Password</label>
                  <div className="input-group">
                    <span className="input-group-text" id="basic-addon-password"><i className="bi bi-lock"></i></span>
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
                    <span className="input-group-text" id="addon-birthday"><i className="bi bi-calendar-event"></i></span>
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
