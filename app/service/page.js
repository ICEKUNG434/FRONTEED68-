'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import Image from 'next/image';
import { Kanit } from 'next/font/google';

const kanit = Kanit({
  subsets: ['thai', 'latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-kanit',
});

export default function ServicePage() {
  const rootRef = useRef(null);
  const revealRoot = useRef(null);
  const canvasRef = useRef(null);
  const mediaRef = useRef(null);
  const [lightbox, setLightbox] = useState(false);

  const [tab, setTab] = useState('Execute');
  const [imgErr, setImgErr] = useState(false);

  // ภาพสลับตามแท็บ
  const GP_IMAGES = useMemo(
    () => ({
      Scan: '/images/sliders/01.png',
      Deploy: '/images/sliders/02.png',
      Stability: '/images/sliders/03.png',
      Execute: '/images/sliders/1737537552775_arknights-endfield-r.jpg',
    }),
    []
  );
  const mediaSrc = GP_IMAGES[tab] ?? GP_IMAGES.Execute;

  /* ----------------- Reveal on scroll ----------------- */
  useEffect(() => {
    const root = revealRoot.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (ents) => ents.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('reveal-in');
          io.unobserve(e.target);
        }
      }),
      { threshold: 0.15 }
    );
    root.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* ----------------- Mouse spotlight & parallax bg ----------------- */
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    let rafId = 0, px = .5, py = .3, tx = px, ty = py;
    const loop = () => {
      tx += (px - tx) * 0.12;
      ty += (py - ty) * 0.12;
      el.style.setProperty('--mx', String(tx));
      el.style.setProperty('--my', String(ty));
      rafId = requestAnimationFrame(loop);
    };
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      px = (e.clientX - r.left) / r.width;
      py = (e.clientY - r.top) / r.height;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    rafId = requestAnimationFrame(loop);
    return () => { window.removeEventListener('pointermove', onMove); cancelAnimationFrame(rafId); };
  }, []);

  /* ----------------- Canvas particles (ไฟเรืองสีเหลือง) ----------------- */
  useEffect(() => {
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext('2d'); let w, h, id;
    const resize = () => { w = c.width = innerWidth; h = c.height = innerHeight; };
    resize(); addEventListener('resize', resize);
    const P = Array.from({ length: 80 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - .5) * .25, vy: -(.25 + Math.random() * .5),
      r: .6 + Math.random() * 1.8, a: .25 + Math.random() * .35
    }));
    const tick = () => {
      ctx.clearRect(0,0,w,h); ctx.globalCompositeOperation='lighter';
      for (const p of P){
        p.x += p.vx; p.y += p.vy;
        if (p.y < -10) { p.y = h + 10; p.x = Math.random()*w; }
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        const g = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,18);
        g.addColorStop(0, `rgba(255,232,64,${p.a})`); g.addColorStop(1,'rgba(255,232,64,0)');
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x,p.y,p.r*8,0,Math.PI*2); ctx.fill();
      }
      id = requestAnimationFrame(tick);
    }; tick();
    return () => { removeEventListener('resize', resize); cancelAnimationFrame(id); };
  }, []);

  /* ----------------- เส้นปะเลื่อนตามสกอร์ล + รูปซูม/เลื่อนตอนเลื่อน ----------------- */
  useEffect(() => {
    const frame = mediaRef.current;
    if (!frame) return;
    const line = frame.querySelector('.media-line');

    const onScroll = () => {
      const r = frame.getBoundingClientRect();
      const vh = window.innerHeight;
      // progress 0..1 เมื่อเฟรมเข้ากลางจอ
      const prog = Math.max(0, Math.min(1, 1 - (r.top + r.height * 0.2) / (vh + r.height * 0.2)));
      frame.style.setProperty('--imv', String(prog));
      if (line) line.style.backgroundPosition = `${-window.scrollY}px 0`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, [tab]);

  /* ----------------- Lightbox ----------------- */
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setLightbox(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div ref={rootRef} className={`service-screen ef-light ${kanit.variable}`}>
      {/* BG layers */}
      <video className="bg-video" autoPlay muted loop playsInline>
        <source src="/videos/endfield-hero.mp4" type="video/mp4" />
      </video>
      <canvas ref={canvasRef} className="fx-canvas" aria-hidden />

      {/* HERO */}
      <header className="hero container">
        <div className="brand-row">
          <div className="logo">END<span>FIELD</span></div>
          <div className="topo">ARKNIGHTS: ENDFIELD</div>
        </div>

        <h1 className="hero-title">Gameplay Service</h1>
        <p className="hero-sub">แนะแนวการเล่น • ทีมแนะนำ • เส้นทางอัปเกรด • ระบบฐาน • เคล็ดลับบอส</p>

        <div className="cta-row">
          <a className="btn-ef btn-yl" href="#gameplay">สำรวจเกมเพลย์</a>
          <a className="btn-ef btn-outline" href="#video">ดูวิดีโอ</a>
        </div>

        <div className="hero-scanline" />
        <div className="hero-slope" />
      </header>

      <main ref={revealRoot}>
        {/* GAMEPLAY */}
        <section id="gameplay" className="container gameplay" data-reveal>
          <div className="gp-text">
            <div className="section-eyebrow">ARKNIGHTS: ENDFIELD</div>
            <h2 className="section-title">Eliminate Ankhors</h2>
            <p className="section-desc">
              Ankhor เป็นโครงสร้างอนินทรีย์ที่มีพฤติกรรมคล้ายสิ่งมีชีวิต เป็นหนึ่งในภัยคุกคามหลักบน Talos-II
              การทำลายแกนกลางของ Ankhor คือวิธีที่มีประสิทธิภาพในการยุติภัยคุกคาม
            </p>

            <div className="mini-cards">
              {['Scan', 'Deploy', 'Stability', 'Execute'].map((t) => (
                <button
                  key={t}
                  type="button"
                  className={`mini ${tab === t ? 'active' : ''}`}
                  onClick={() => { setTab(t); setImgErr(false); }}
                >
                  <div className="mini-hud" />
                  <div className="mini-title">{t}</div>
                </button>
              ))}
            </div>
          </div>

          {/* MEDIA: ปรับขนาดให้เต็มคอลัมน์ + อนิเมชันเลื่อน + คลิกขยาย */}
          <div className="gp-media" ref={mediaRef}>
            <div
              className={`media-frame ${imgErr ? 'is-placeholder' : ''}`}
              onClick={() => !imgErr && setLightbox(true)}
              title={!imgErr ? 'คลิกเพื่อขยาย' : ''}
            >
              {!imgErr ? (
                <Image
                  src={mediaSrc}
                  alt="Endfield gameplay"
                  fill
                  className="media-img"
                  sizes="(max-width: 992px) 100vw, 58vw"
                  priority
                  onError={() => setImgErr(true)}
                />
              ) : (
                <div className="media-fallback" />
              )}
              <span className="media-hint">คลิกเพื่อขยาย</span>
            </div>
            <div className="media-line" aria-hidden />
            <div className="media-foot" />
          </div>
        </section>

        {/* VIDEO */}
        <section id="video" className="container video" data-reveal>
          <div className="video-wrap">
            <iframe
              src="https://www.youtube.com/embed/6CGS_C6XqG8?rel=0"
              title="Arknights: Endfield Gameplay"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              referrerPolicy="origin"
              allowFullScreen
            />
          </div>
        </section>

        {/* MODULES */}
        <section className="container modules" data-reveal>
          {MODULES.map((m) => (
            <article className="mod" key={m.title}>
              <div className="mod-head">
                <span className="dot" />
                <h3>{m.title}</h3>
              </div>
              <p className="mod-desc">{m.desc}</p>
              <ul className="mod-list">
                {m.points.map((p) => <li key={p}>{p}</li>)}
              </ul>
              <a href="#" className="mod-link">รายละเอียด</a>
            </article>
          ))}
        </section>

        {/* CTA */}
        <section className="container cta" data-reveal>
          <div className="cta-card">
            <div>
              <h3>พร้อมออกปฏิบัติการครั้งถัดไป?</h3>
              <p className="muted">โหลดคู่มือเริ่มต้น 7 วัน และแผนทีมแนะนำ</p>
            </div>
            <a className="btn-ef btn-yl" href="#">ดาวน์โหลด</a>
          </div>
        </section>
      </main>

      {/* Lightbox */}
      {lightbox && (
        <div className="lb" onClick={() => setLightbox(false)}>
          {/* ใช้ img ปกติให้โหลดเร็วขึ้น */}
          <img src={mediaSrc} alt="" />
        </div>
      )}

      {/* ---------- CSS ---------- */}
      <style jsx>{`
        :root{
          --yl:#ffe500; --yl2:#ffd100;
          --ink:#101214; --ink2:#2b2f33;
          --stroke:#e3e6ea; --bg:#f6f7f8; --bg2:#f1f3f5;
        }
        .ef-light{ --grid: rgba(0,0,0,.06); color:var(--ink); position:relative; }
        .ef-light::before{
          content:""; position:fixed; inset:0; z-index:-2;
          background:
            radial-gradient(1000px 500px at 20% 0%, rgba(255,229,0,.10), transparent 60%),
            linear-gradient(180deg, rgba(255,255,255,.0), rgba(255,255,255,.25)),
            repeating-linear-gradient(0deg, var(--grid) 0 1px, transparent 1px 40px),
            repeating-linear-gradient(90deg, var(--grid) 0 1px, transparent 1px 40px),
            linear-gradient(145deg, var(--bg), var(--bg2));
        }
        .ef-light::after{
          content:""; position:fixed; inset:0; z-index:-1; pointer-events:none;
          background: radial-gradient(220px 160px at calc(var(--mx,.5)*100%) calc(var(--my,.3)*100%), rgba(255,255,255,.20), rgba(255,255,255,0));
          mix-blend-mode: overlay;
        }
        .bg-video{ position:fixed; inset:0; width:100%; height:100%; object-fit:cover; opacity:.10; z-index:-3; }
        .fx-canvas{ position:fixed; inset:0; z-index:-1; pointer-events:none; }
        .service-screen{ min-height:100vh; overflow-x:hidden; font-family: var(--font-kanit), system-ui, -apple-system; }
        .container{ width:min(1200px,92%); margin:0 auto; position:relative; z-index:1; }

        .hero{ padding-top:110px; padding-bottom:60px; text-align:center; position:relative; }
        .brand-row{ display:flex; align-items:center; justify-content:space-between; }
        .logo{ font-weight:800; font-size:26px; letter-spacing:.06em; }
        .logo span{ background:linear-gradient(180deg,var(--yl),var(--yl2)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; }
        .topo{ font-size:12px; letter-spacing:.2em; color:var(--ink2); opacity:.8; text-transform:uppercase; }
        .hero-title{ margin:18px auto 6px; font-size:clamp(28px,6vw,64px); font-weight:800; letter-spacing:.04em; color:var(--ink); text-shadow:0 0 8px rgba(255,214,0,.18); }
        .hero-sub{ color:var(--ink2); opacity:.92; }
        .cta-row{ display:flex; gap:12px; justify-content:center; margin-top:18px; }

        .btn-ef{ padding:12px 28px; border-radius:999px; font-weight:800; letter-spacing:.06em; border:1px solid transparent; text-decoration:none; display:inline-flex; align-items:center; gap:8px; text-transform:uppercase; }
        .btn-yl{ background:linear-gradient(180deg,var(--yl),var(--yl2)); color:#111; box-shadow:0 6px 18px rgba(0,0,0,.12); }
        .btn-yl:hover{ filter:brightness(1.04); }
        .btn-outline{ border-color:var(--stroke); color:var(--ink); background:#fff; }
        .btn-outline:hover{ background:#fff; filter:brightness(1.02); }

        .hero-scanline{ position:absolute; left:5%; right:5%; top:54%; height:2px; opacity:.45; pointer-events:none; background:repeating-linear-gradient(90deg,#cfd3d8 0 10px, transparent 10px 20px); animation:slide 6s linear infinite; }
        @keyframes slide{ from{background-position:0 0} to{background-position:-400px 0} }
        .hero-slope{ position:absolute; left:0; right:0; bottom:0; height:84px; background:linear-gradient(180deg, transparent, rgba(0,0,0,.05) 60%, var(--bg2)), repeating-linear-gradient(-12deg, transparent, transparent 6px, rgba(0,0,0,.08) 6px, rgba(0,0,0,.08) 8px); clip-path:polygon(0 0, 100% 28%, 100% 100%, 0 100%); z-index:0; }

        .gameplay{ display:grid; grid-template-columns:1fr 1.35fr; gap:28px; align-items:center; padding:70px 0; }
        .section-eyebrow{ font-size:12px; letter-spacing:.24em; color:var(--ink2); opacity:.75; margin-bottom:8px; text-transform:uppercase; }
        .section-title{ font-size:clamp(24px,4vw,46px); font-weight:800; color:var(--ink); margin:0 0 8px; }
        .section-desc{ color:var(--ink2); line-height:1.65; }

        .mini-cards{ display:flex; gap:12px; margin-top:18px; flex-wrap:wrap; }
        .mini{ width:110px; height:96px; background:#fff7bf; border:1px solid #e8d66b; position:relative; display:flex; align-items:flex-end; justify-content:center; border-radius:10px; box-shadow:inset 0 0 0 1px rgba(185,158,0,.15); transition:transform .15s ease; cursor:pointer; }
        .mini:hover{ transform:translateY(-2px); }
        .mini-hud{ position:absolute; inset:0; background:repeating-linear-gradient(0deg, rgba(0,0,0,.06) 0 1px, transparent 1px 3px); }
        .mini-title{ position:relative; z-index:1; font-size:12px; color:#111; margin-bottom:10px; letter-spacing:.06em; }
        .mini.active{ outline:2px solid var(--yl2); box-shadow:0 0 18px rgba(255,212,0,.35) inset; }

        .gp-media{ position:relative; width:100%; justify-self:end; }
        .media-frame{
          position:relative; width:100%; aspect-ratio:16/9; border-radius:16px; overflow:hidden;
          border:1px solid var(--stroke); box-shadow:0 10px 24px rgba(0,0,0,.12);
          transform: translateY(calc((1 - var(--imv,0))*20px)) scale(calc(1.05 - var(--imv,0)*0.05));
          transition: transform .25s ease; cursor: zoom-in; background:#f5f6f7;
        }
        .media-img{ position:absolute; inset:0; width:100%; height:100%; object-fit:cover; }
        .media-fallback{ position:absolute; inset:0; background:linear-gradient(135deg,#f5f6f7,#eceff2); }
        .media-hint{ position:absolute; right:10px; bottom:10px; padding:4px 8px; font-size:11px; border-radius:999px; background:rgba(255,255,255,.75); border:1px solid var(--stroke); color:#333; }
        .media-line{ position:absolute; top:50%; left:-24px; right:-24px; height:2px; z-index:-1; background:repeating-linear-gradient(90deg,#cfd3d8 0 10px, transparent 10px 20px); opacity:.55; transform:translateY(-50%); pointer-events:none; }
        .media-foot{ position:absolute; right:0; bottom:-10px; width:22px; height:22px; background:#fff; border:1px solid var(--stroke); z-index:1; }

        .video{ padding:40px 0 20px; }
        .video-wrap{ position:relative; width:100%; aspect-ratio:16/9; border:1px solid var(--stroke); border-radius:14px; overflow:hidden; background:#fff; box-shadow:0 10px 24px rgba(0,0,0,.12); }
        .video-wrap iframe{ position:absolute; inset:0; width:100%; height:100%; }

        .modules{ display:grid; grid-template-columns:repeat(3,1fr); gap:18px; padding:40px 0; }
        .mod{ background:#fff7bf; border:1px solid #e8d66b; border-radius:16px; padding:16px; box-shadow:inset 0 0 0 1px rgba(185,158,0,.18); transition: transform .25s ease, border-color .25s ease, box-shadow .25s ease; }
        .mod:hover{ transform:translateY(-4px); border-color:#d6c259; box-shadow:0 16px 30px rgba(0,0,0,.12), inset 0 0 0 1px rgba(185,158,0,.28); }
        .mod-head{ display:flex; align-items:center; gap:8px; }
        .dot{ width:10px; height:10px; border-radius:50%; background:var(--yl2); box-shadow:0 0 10px rgba(255,212,0,.55); }
        .mod h3{ margin:0; font-size:20px; color:#111; }
        .mod-desc{ color:#222; margin:.45rem 0 .6rem; }
        .mod-list{ margin:0 0 .8rem 1.2rem; color:#222; }
        .mod-link{ color:#111; background:linear-gradient(180deg,var(--yl),var(--yl2)); padding:.45rem .8rem; border-radius:999px; text-decoration:none; font-weight:800; box-shadow:0 0 12px rgba(0,0,0,.12); text-transform:uppercase; letter-spacing:.06em; }

        .cta{ padding:30px 0 70px; }
        .cta-card{ display:flex; align-items:center; justify-content:space-between; gap:16px; background:linear-gradient(180deg,#ffffff,#f9fafb); border:1px solid var(--stroke); border-radius:16px; padding:18px 20px; box-shadow:inset 0 0 0 1px rgba(0,0,0,.03); }
        .muted{ color:#555; }

        [data-reveal]{ opacity:0; transform:translateY(18px); transition:opacity .6s ease, transform .6s ease; }
        .reveal-in{ opacity:1; transform:translateY(0); }

        /* Lightbox */
        .lb{ position:fixed; inset:0; background:rgba(0,0,0,.78); display:flex; align-items:center; justify-content:center; z-index:9999; animation:lbIn .18s ease; }
        .lb img{ max-width:min(96vw,1400px); max-height:86vh; border-radius:14px; box-shadow:0 18px 50px rgba(0,0,0,.5); transform:scale(.98); animation:pop .22s cubic-bezier(.2,.8,.2,1) forwards; }
        @keyframes pop{ to{ transform:scale(1) } }
        @keyframes lbIn{ from{ background:rgba(0,0,0,0) } }

        /* Responsive */
        @media (max-width: 992px){
          .gameplay{ grid-template-columns:1fr; }
          .modules{ grid-template-columns:1fr 1fr; }
        }
        @media (max-width: 640px){
          .modules{ grid-template-columns:1fr; }
          .brand-row{ flex-direction:column; gap:6px; }
          .mini{ width:calc(50% - 6px); height:88px; }
        }
      `}</style>
    </div>
  );
}

const MODULES = [
  {
    title: 'ทีมเริ่มต้น & ก้าวกระโดด',
    desc: 'จัดทีมเปิดเกม/รีเทิร์น เน้นซินเนอร์จี้ที่ใช้งานจริง',
    points: ['Core DPS + Sub-DPS', 'Frontline / Control', 'Healer / Buffer', 'โมดูลเริ่มต้น'],
  },
  {
    title: 'เส้นทางอัปเกรด 7 วัน',
    desc: 'ลำดับปลด-อัปเกรดที่คุ้มทรัพยากรที่สุด',
    points: ['Priority Path', 'แผนฟาร์ม', 'พลังงานรายวัน', 'Checkpoints'],
  },
  {
    title: 'ฐาน & Automation',
    desc: 'โครงฐาน สายการผลิต และสูตร Automation ที่เสถียร',
    points: ['Productivity', 'Auto Routes', 'เวลาคุ้มค่า', 'Maintenance'],
  },
];
