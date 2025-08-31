'use client';
import { useState, useMemo, useRef, useEffect } from 'react';
import Image from 'next/image';

export default function EndfieldCarousel() {
  const slides = useMemo(() => ([
    { 
       id: 1,
      title: 'Safe Shallows',
      image: '/images/sliders/SafeShallowsTrue.jpg',
      thumb: '/images/sliders/SafeShallowsTrue.jpg',
    },
    {
      id: 2,
      title: 'Bulb Zone',
      image: '/images/sliders/BulbZoneTrue.jpg',
      thumb: '/images/sliders/BulbZoneTrue.jpg',
    },
    {
       id: 3,
      title: 'KelpForestTrue',
      image: '/images/sliders/KelpForestTrue.jpg',
      thumb: '/images/sliders/KelpForestTrue.jpg',
    },
  ]), []);

  const [idx, setIdx] = useState(0);
  const wrapRef = useRef(null);

  const prev = () => setIdx((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setIdx((i) => (i + 1) % slides.length);

  // scroll thumbnails ให้ active อยู่กลาง
  useEffect(() => {
    const w = wrapRef.current;
    if (!w) return;
    const active = w.querySelector(`[data-k="${idx}"]`);
    if (active) {
      const r = active.getBoundingClientRect();
      const rw = w.getBoundingClientRect();
      const delta = r.left - rw.left - (rw.width/2 - r.width/2);
      w.scrollBy({ left: delta, behavior: 'smooth' });
    }
  }, [idx]);

  const s = slides[idx];

  return (
    <div className="ef-carousel">
      <div className="stage">
        {/* ปุ่มนำทาง */}
        <button className="nav prev" aria-label="Previous" onClick={prev}><i className="bi bi-chevron-left"/></button>
        <button className="nav next" aria-label="Next" onClick={next}><i className="bi bi-chevron-right"/></button>

        {/* เนื้อหาหลัก */}
        <div className="frame">
          <Image
            key={s.id} // ทำให้ fade effect ตอนเปลี่ยน
            src={s.image}
            alt={s.title}
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            style={{objectFit:'cover'}}
            className="slide-img"
            priority
          />
        </div>

        {/* Caption */}
        <div className="caption">
          <i className="bi bi-image me-2" />
          <span className="title">{s.title}</span>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="thumbs" ref={wrapRef}>
        {slides.map((t, i) => (
          <button
            key={t.id}
            data-k={i}
            className={`thumb ${i===idx ? 'active':''}`}
            onClick={() => setIdx(i)}
            aria-label={`Go to ${t.title}`}
            title={t.title}
          >
            <Image src={t.thumb} alt="" width={200} height={100} />
          </button>
        ))}
      </div>

      <style jsx>{`
        .ef-carousel{ --radius:14px; color:#111; }
        .stage{
          position:relative; border:1px solid var(--stroke,#e3e6ea);
          border-radius: var(--radius); overflow:hidden;
          box-shadow: 0 12px 26px rgba(0,0,0,.12);
          background:#000;
        }
        .frame{ position:relative; width:100%; aspect-ratio:16/9; overflow:hidden; }
        .slide-img{
          animation: fadeIn .5s ease;
          transition: transform .6s ease;
        }
        .slide-img:hover{
          transform: scale(1.04);
        }

        @keyframes fadeIn{
          from{ opacity:0; }
          to{ opacity:1; }
        }

        .caption{
          position:absolute; left:18px; bottom:14px;
          display:flex; align-items:center; gap:8px;
          color:#fff; font-weight:700;
          padding:6px 12px; border-radius:999px;
          background: rgba(0,0,0,.55);
          backdrop-filter: blur(6px);
        }

        .nav{
          position:absolute; top:50%; transform:translateY(-50%);
          width:44px; height:44px; border-radius:50%;
          display:grid; place-items:center;
          border:1px solid var(--stroke,#e3e6ea);
          background:rgba(255,255,255,.85); color:#111; z-index:2;
          box-shadow:0 4px 12px rgba(0,0,0,.2);
          transition: background .2s ease;
        }
        .nav:hover{ background:#fff; }
        .nav.prev{ left:12px; } .nav.next{ right:12px; }

        .thumbs{
          display:flex; gap:12px; overflow-x:auto; padding:14px 6px 4px;
          margin-top:10px; scroll-snap-type:x mandatory;
        }
        .thumb{
          border:1px solid var(--stroke,#e3e6ea);
          border-radius:10px; overflow:hidden; flex:0 0 auto;
          background:#000; position:relative; scroll-snap-align:center;
          transition: transform .2s ease;
        }
        .thumb:hover{ transform: scale(1.05); }
        .thumb.active{ outline:2px solid var(--yl,#29dfff); box-shadow:0 0 14px rgba(0,200,255,.5); }
        .thumb :global(img){ display:block; }
      `}</style>
    </div>
  );
}
