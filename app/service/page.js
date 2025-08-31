'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Kanit } from 'next/font/google';

const kanit = Kanit({ subsets:['thai','latin'], weight:['400','700'], variable:'--font-kanit' });

export default function SubnauticaUI() {
  const canvasRef = useRef(null);
  const [tab, setTab] = useState('Dive');

  const TOOLS = {
    Dive: { text:'สำรวจโลกใต้น้ำ ค้นหาสิ่งแปลกใหม่', img:'/images/Seaglide.jpg' },
    Scan: { text:'วิเคราะห์สิ่งแวดล้อมและสิ่งมีชีวิต', img:'/images/Scanner.jpg' },
    Harvest: { text:'เก็บทรัพยากรและวัตถุดิบสำคัญ', img:'/images/Ic_LimestoneChunk_22743.jpg' },
    Return: { text:'กลับฐานและอัปเกรดอุปกรณ์', img:'./images/Scanner_Room.jpg' },
  };

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    let w,h,id;
    const resize = ()=>{ w=c.width=innerWidth; h=c.height=innerHeight; }
    resize();
    window.addEventListener('resize', resize);

    // Bubble particles
    const P = Array.from({length:100},() => ({
      x: Math.random()*w,
      y: h + Math.random()*100,
      vx: (Math.random()-0.5)*0.2,
      vy: -(0.2+Math.random()*0.5),
      r: 2+Math.random()*4,
      a: 0.2+Math.random()*0.4,
      grow: Math.random()*0.02
    }));

    const tick = () => {
      ctx.clearRect(0,0,w,h);
      ctx.globalCompositeOperation = 'lighter';
      for(const p of P){
        p.x += p.vx;
        p.y += p.vy;
        p.r += p.grow; // ขยายตัวเล็กน้อย
        if(p.y < -10) { p.y = h+10; p.r = 2+Math.random()*4; } // reset เมื่อฟองลอยออก
        const g = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*6);
        g.addColorStop(0, `rgba(118,240,247,${p.a})`);
        g.addColorStop(1,'rgba(118,240,247,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fill();
      }
      id = requestAnimationFrame(tick);
    }
    tick();
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(id); }
  },[]);

  const current = TOOLS[tab];

  return (
    <div className={`sub-screen ${kanit.variable}`} style={{
      position:'relative', minHeight:'100vh', fontFamily:'var(--font-kanit)',
      background:'linear-gradient(180deg, #001f3f 0%, #003366 100%)'
    }}>
      {/* Canvas bubbles */}
      <canvas ref={canvasRef} style={{position:'fixed', inset:0, zIndex:-1, pointerEvents:'none'}} />

      {/* Header */}
      <header style={{textAlign:'center', padding:'60px 20px', color:'#76f0f7'}}>
        <h1 style={{fontSize:'3rem', textShadow:'0 0 20px #76f0f7'}}>Ocean Explorer</h1>
        <p style={{fontSize:'1.2rem', color:'#a0e7ff'}}>Subnautica Inspired UI</p>

        {/* Load Game Button */}
        <a 
          href="https://store.steampowered.com/app/264710/Subnautica/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display:'inline-block',
            marginTop:'24px',
            padding:'14px 28px',
            borderRadius:'20px',
            background:'#0a2e4a',
            color:'#fff',
            fontWeight:'700',
            textDecoration:'none',
            cursor:'pointer',
            boxShadow:'0 0 20px #0af0ff, 0 4px 12px rgba(0,0,0,0.5)',
            transition:'all 0.3s ease',
            transform:'translateY(0)'
          }}
          onMouseEnter={e=>{ e.currentTarget.style.background='#1ca3ec'; e.currentTarget.style.transform='translateY(-2px)'; }}
          onMouseLeave={e=>{ e.currentTarget.style.background='#0a2e4a'; e.currentTarget.style.transform='translateY(0)'; }}
        >
          โหลดเกมจาก…
        </a>
      </header>

      {/* Main Content */}
      <main style={{display:'flex', justifyContent:'center', alignItems:'start', gap:'50px', padding:'20px', flexWrap:'wrap'}}>
        {/* Tabs */}
        <div style={{flex:'0 0 200px', display:'flex', flexDirection:'column', gap:'15px'}}>
          {Object.keys(TOOLS).map(t=>(
            <button key={t} onClick={()=>setTab(t)} style={{
              padding:'12px', borderRadius:'15px', border:'none',
              background: tab===t?'#0a2e4a':'#1ca3ec',
              color:'#fff', fontWeight:'700', cursor:'pointer',
              boxShadow: tab===t?'0 0 15px #0af0ff':'0 0 10px rgba(0,0,0,0.3)',
              transition:'all 0.3s ease'
            }}>{t}</button>
          ))}
        </div>

        {/* Text */}
        <div style={{maxWidth:'400px', color:'#ffffff', transition:'all 0.4s ease'}}>
          <h2 style={{marginBottom:'10px', fontSize:'1.8rem', textShadow:'0 0 10px #0af0ff'}}>{tab}</h2>
          <p style={{lineHeight:'1.6', fontSize:'1.1rem'}}>{current.text}</p>
        </div>

        {/* Image Card */}
        <div style={{
          flex:'0 0 320px', borderRadius:'15px', overflow:'hidden',
          background:'rgba(0,0,0,0.3)', boxShadow:'0 0 25px rgba(0,240,255,0.5)',
          transition:'all 0.4s ease'
        }}>
          <Image
            key={tab}
            src={current.img}
            alt={tab}
            width={320}
            height={220}
            style={{
              objectFit:'cover',
              borderRadius:'15px',
              filter:'brightness(1.3) contrast(1.2)',
              transition:'all 0.4s ease'
            }}
          />
        </div>
      </main>
    </div>
  );
}
