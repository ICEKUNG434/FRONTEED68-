'use client';
import Carousel from "./components/carousel";
import Card from "./components/card";
import Navigation from "./components/nav";
import Footer from "./components/footer";
import './globals.css'
export default function Home() {
  return (
    <div className="ef-home ak-yellow">
      {/* ===== HERO (วิดีโอพื้นหลังวน) ===== */}
      <section className="ef-hero" aria-label="Arknights: Endfield">
        <video
          className="ef-hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/endfield/hero-poster.jpg"
        >
          {/* ถ้าชื่อไฟล์วิดีโอมีช่องว่าง ให้เปลี่ยนเป็นชื่อสั้นๆ เช่น /videos/endfield-hero.mp4 */}
          <source src="/video/Arknights Endfield Beta Test Trailer - Arknights Endfield (1080p, h264).mp4" type="video/mp4" />
        </video>

        {/* โครงพื้น + สปอตไลต์ + ท็อปเฟดกันกลืนกับ navbar */}
        <div className="ef-hero-overlay" />
        <div className="ef-hero-topfade" />

        <div className="ef-hero-center">
          <div className="brand-topo"></div>
          <h1 className="ef-hero-title"></h1>
          <a href="#trailer" className="btn btn-yl ef-cta"></a>
        </div>
      </section>

      {/* ===== CAROUSEL (สไตล์ภาพ 2.png) ===== */}
      <section id="trailer" className="container ef-section">
        <Carousel />
      </section>

      {/* ===== CARD / PROFILE (สไตล์ภาพ 3.png) ===== */}
      <section className="container ef-section">
        <Card />
      </section>

<style jsx>{`
  .ef-home { position: relative; min-height: 100vh; }
  .ef-section { padding: 40px 0; }

  /* HERO ให้กินเต็ม viewport และซ่อนอยู่ใต้ navbar พอดี */
  .ef-hero{
    position: relative;
    /* เคล็ดลับ: สูง = 100vh + ความสูง navbar
       และดึงขึ้นไปใต้ navbar ด้วย margin-top ติดลบ
       แบบนี้พื้นหลังจะ “พอดีจอ” จริง ๆ */
    height: calc(100vh + var(--navH, 100px));
    display:flex; align-items:center; justify-content:center;
    margin-top: calc(var(--navH, 100px) * -1);
    padding-top: var(--navH, 100px);
    overflow: hidden;
    isolation: isolate;
  }

  .ef-hero-video{
    position:absolute; inset:0;
    width:100%; height:100%;
    object-fit:cover;
    z-index:-3;
    pointer-events:none;
    /* เผื่อจอ ultra-wide ให้ขยับขยายเล็กน้อยกันขอบดำ */
    transform: scale(1.02);
  }

  /* ลายกริด + ไฮไลต์เหลือง */
  .ef-hero-overlay{
    position:absolute; inset:0; z-index:-2; pointer-events:none;
    background:
      radial-gradient(1000px 400px at 20% 0%, rgba(255,229,0,.12), transparent 60%),
      linear-gradient(180deg, rgba(255,255,255,.00), rgba(255,255,255,.18)),
      repeating-linear-gradient(0deg, rgba(0,0,0,.06) 0 1px, transparent 1px 40px),
      repeating-linear-gradient(90deg, rgba(0,0,0,.06) 0 1px, transparent 1px 40px);
  }

  /* เฟดขาวด้านบนกันกลืนกับ navbar */
  .ef-hero-topfade{
    position:absolute; left:0; right:0; top:0; height:120px;
    background: linear-gradient(180deg, rgba(255,255,255,.85), rgba(255,255,255,0));
    z-index:-1;
  }

  .ef-hero-center{
    text-align:center; color:#111; padding: 0 16px;
  }
  .brand-topo{
    font-size:12px; letter-spacing:.28em; opacity:.85; margin-bottom:10px;
  }
  .ef-hero-title{
    font-weight:900; letter-spacing:.04em;
    font-size: clamp(28px, 5.2vw, 56px);
    text-shadow: 0 0 8px rgba(255,214,0,.18);
    margin: 0 0 16px;
  }
  .ef-cta{
    padding: 12px 28px; border-radius: 999px; font-weight: 800; letter-spacing: .06em;
  }

  /* ให้เลื่อนมาหยุดไม่โดน navbar ทับเมื่อคลิก #trailer */
  #trailer{ scroll-margin-top: calc(var(--navH, 100px) + 12px); }

  @media (max-width: 991.98px){
    .ef-hero{
      height: calc(100vh + var(--navH, 72px));
      margin-top: calc(var(--navH, 72px) * -1);
      padding-top: var(--navH, 72px);
    }
  }

  /* ผู้ใช้ลดแอนิเมชัน */
  @media (prefers-reduced-motion: reduce){
    .ef-hero-video{ transform:none; }
  }
`}</style>

    </div>
  );
}
