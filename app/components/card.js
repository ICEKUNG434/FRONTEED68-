'use client';
import { useState } from 'react';
import Image from 'next/image';

export default function SubnauticaProfileCard() {
  const [sel, setSel] = useState(0);
  const [dir, setDir] = useState(1);
  const [bump, setBump] = useState(0);
  const op = OPS[sel];

  const selectIndex = (i) => {
    if (i === sel) { setBump((n) => n + 1); return; }
    setDir(i > sel ? 1 : -1);
    setSel(i);
    setBump((n) => n + 1);
  };

  return (
    <div className="sn-card">
      {/* Left */}
      <div className="left">
        <div className="eyebrow">// SUBNAUTICA : PROFILE</div>
        <h2 className="title">{op.name}</h2>

        <div className="meta">
          <span className="pill">Faction: {op.faction}</span>
          <span className="pill">Race: {op.race}</span>
        </div>

        <div className="copy">{op.desc.map((p,i)=><p key={i}>{p}</p>)}</div>

        {/* selector */}
        <div className="mini">
          {OPS.map((m,i)=>(
            <button 
              key={m.id} 
              className={`mini-item ${i===sel?'active':''}`} 
              onClick={()=>selectIndex(i)}
            >
              <Image src={m.thumb} alt={m.name} fill sizes="160px" />
              <div className="mini-cap">{m.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Right */}
      <div className="right">
        <div 
          key={`${sel}-${bump}`} 
          className={`hero fade-${dir>0?'right':'left'}`} 
          style={{'--hero':`url(${op.hero})`}}
        >
          <Image src={op.hero} alt={op.name} fill sizes="420px" className="hero-img"/>
        </div>
      </div>

<style jsx>{`
  .sn-card{
    display:grid; 
    grid-template-columns:1fr 1fr; 
    gap:18px;
    padding:16px; 
    border-radius:14px;
    max-width:960px; 
    margin:auto;
    background: radial-gradient(circle at 50% 20%, #001d3d, #000814);
    border:1px solid #004b72;
    box-shadow:0 0 24px rgba(0,200,255,.25), inset 0 0 40px rgba(0,150,255,.08);
    color:#dff;
    animation: glowPulse 6s ease-in-out infinite;
  }
  @keyframes glowPulse {
    0%,100% { box-shadow:0 0 24px rgba(0,200,255,.25), inset 0 0 40px rgba(0,150,255,.08); }
    50% { box-shadow:0 0 40px rgba(0,200,255,.45), inset 0 0 60px rgba(0,150,255,.15); }
  }

  .eyebrow{ font-size:11px; letter-spacing:.16em; color:#80eaff; margin-bottom:4px; }
  .title{ font-size:clamp(20px,2.8vw,32px); font-weight:800; text-shadow:0 0 6px #00e5ff; }
  .meta{ display:flex; gap:8px; margin:8px 0; flex-wrap:wrap; }
  .pill{ background:rgba(0,180,255,.12); border:1px solid #00c3ff; padding:3px 8px; border-radius:999px; font-size:13px; }
  .copy p{ margin:0 0 8px; color:#bfeeff; line-height:1.5; font-size:14px; }

  .mini{ display:flex; gap:8px; margin-top:12px; flex-wrap:wrap; }
  .mini-item{ position:relative; width:120px; aspect-ratio:4/3; border-radius:8px; overflow:hidden;
    border:1px solid #004b72; background:#022; cursor:pointer;
    transition: transform .25s ease, border-color .25s ease, box-shadow .25s ease;
  }
  .mini-item:hover{ transform:scale(1.06) rotate(-1deg); }
  .mini-item.active{ border-color:#00eaff; box-shadow:0 0 12px rgba(0,200,255,.6); }
  .mini-cap{ position:absolute; bottom:3px; left:3px; right:3px; background:rgba(0,30,50,.65);
    color:#dff; font-size:12px; padding:2px 5px; border-radius:5px; text-align:center; }

  .right{ position:relative; display:flex; justify-content:center; align-items:center; }
  .hero{ position:relative; width:100%; aspect-ratio:4/5; border-radius:12px; overflow:hidden;
    background: radial-gradient(80% 80% at 50% 40%, #003, #001);
    box-shadow:0 0 20px rgba(0,180,255,.3);
    animation: float 6s ease-in-out infinite alternate;
  }
  .hero::before{ content:""; position:absolute; inset:-10%; background: center/cover no-repeat var(--hero);
    filter: blur(14px) saturate(1.1); opacity:.25; }
  .hero-img{ object-fit:contain; object-position:center bottom; position:relative; z-index:1; }

  @keyframes float{ from{transform:translateY(0)} to{transform:translateY(-8px)} }

  /* เอฟเฟกต์สไลด์เข้า */
  .fade-right{ animation: fadeInRight .6s ease; }
  .fade-left{ animation: fadeInLeft .6s ease; }

  @keyframes fadeInRight {
    from { opacity:0; transform:translateX(40px); }
    to { opacity:1; transform:translateX(0); }
  }
  @keyframes fadeInLeft {
    from { opacity:0; transform:translateX(-40px); }
    to { opacity:1; transform:translateX(0); }
  }

  @media(max-width:1000px){ .sn-card{ grid-template-columns:1fr; } }
`}</style>

    </div>
  )
}

const OPS = [
  { 
    id:'sn-01',
    name:'Diver-01',
    faction:'Alterra Corp',
    race:'Human',
    thumb:'./images/sliders/Dg851yp-a5e7660f-bc32-4500-ab31-71210bb64d84.jpg',
    hero:'./images/sliders/Subnautica_Character.JPG.jpg', 
    desc:[
      'A brave explorer diving deep into the unknown seas.',
      'Equipped with standard survival suit and Seaglide for fast travel.'
    ]
  },
  {
    id:'sn-02',
    name:'Leviathan',
    faction:'Deep Ocean',
    race:'Unknown',
    thumb:'./images/sliders/Reaper_Leviathan_Fauna.jpg',
    hero:'./images/sliders/Reaper_Leviathan.jpg',
    desc:[
      'Terrifying predator dwelling in the abyss.',
      'Its roar shakes the oceans, warning all who trespass.'
    ]
  }
];
