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
    Return: { text:'กลับฐานและอัปเกรดอุปกรณ์', img:'/images/Scanner_Room.jpg' },
  };

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    let w,h,id;
    const resize=()=>{ w=c.width=innerWidth; h=c.height=innerHeight; }
    resize();
    window.addEventListener('resize', resize);
    const P = Array.from({length:50},() => ({
      x: Math.random()*w, y:h+Math.random()*50,
      vx: (Math.random()-0.5)*0.1,
      vy: -(0.2+Math.random()*0.3),
      r:1+Math.random()*2, a:0.2+Math.random()*0.3
    }));
    const tick=()=>{
      ctx.clearRect(0,0,w,h);
      ctx.globalCompositeOperation='lighter';
      for(const p of P){
        p.x+=p.vx; p.y+=p.vy;
        if(p.y<-10)p.y=h+10;
        const g=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*10);
        g.addColorStop(0,`rgba(118,240,247,${p.a})`);
        g.addColorStop(1,'rgba(118,240,247,0)');
        ctx.fillStyle=g;
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.r*4,0,Math.PI*2);
        ctx.fill();
      }
      id=requestAnimationFrame(tick);
    };
    tick();
    return ()=>{ window.removeEventListener('resize', resize); cancelAnimationFrame(id); }
  },[]);

  const current = TOOLS[tab];

  return (
    <div className={`sub-screen ${kanit.variable}`} style={{position:'relative', minHeight:'100vh', fontFamily:'var(--font-kanit)'}}>
      {/* Canvas effect */}
      <canvas ref={canvasRef} style={{position:'fixed', inset:0, zIndex:-1, pointerEvents:'none'}} />

      {/* Header */}
      <header style={{textAlign:'center', padding:'40px 0'}}>
        <h1 style={{color:'#76f0f7', fontSize:'2.5rem'}}>Ocean Explorer</h1>
        <p style={{color:'#060707ff'}}>Subnautica Inspired UI</p>
      </header>

      {/* Main content */}
      <main style={{display:'flex', justifyContent:'center', alignItems:'start', gap:'40px', padding:'20px'}}>
        {/* Tabs */}
        <div style={{flex:'0 0 200px', display:'flex', flexDirection:'column', gap:'12px'}}>
          {Object.keys(TOOLS).map(t=>(
            <button key={t} onClick={()=>setTab(t)} style={{
              padding:'12px', borderRadius:'12px', border:'none',
              background: tab===t?'#0a2e4a':'#1ca3ec',
              color:'#fff', cursor:'pointer', transition:'0.3s'
            }}>{t}</button>
          ))}
        </div>

        {/* Text */}
        <div style={{maxWidth:'400px', color:'#000000ff', transition:'all 0.4s ease'}}>
          <h2 style={{marginBottom:'8px'}}>{tab}</h2>
          <p>{current.text}</p>
        </div>

        {/* Image */}
        <div style={{
          flex:'0 0 300px', borderRadius:'12px', overflow:'hidden',
          background:'rgba(0,0,0,0.4)', boxShadow:'0 0 20px rgba(0,0,0,0.7)',
          transition:'all 0.4s ease'
        }}>
          <Image
            key={tab} // เพื่อ trigger fade-in เมื่อเปลี่ยน tab
            src={current.img}
            alt={tab}
            width={300}
            height={200}
            style={{
              objectFit:'cover',
              borderRadius:'12px',
              filter:'brightness(1.2) contrast(1.2)',
              transition:'all 0.4s ease'
            }}
          />
        </div>
      </main>
    </div>
  );
}
