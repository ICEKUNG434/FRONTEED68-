'use client';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div
      className="d-flex align-items-center justify-content-center min-vh-100 p-4"
      style={{
        background: 'linear-gradient(to bottom, #001f3f, #005f73)',
        color: '#c0f8ff',
        fontFamily: 'Kanit, sans-serif',
      }}
    >
      <div
        className="card p-4"
        style={{
          maxWidth: '700px',
          background: 'rgba(0, 31, 63, 0.75)',
          borderRadius: '20px',
          boxShadow: '0 0 30px rgba(118,240,247,0.6)',
          border: '1px solid rgba(118,240,247,0.3)',
        }}
      >
        <h2 className="text-center mb-4" style={{ textShadow: '0 0 10px #ffffffff' }}>
          เกี่ยวกับเรา
        </h2>

        <div className="mb-4 text-center">
          <Image
            src="/images/sliders/Ghost_Leviathan_Fauna.jpg"
            alt="Logo"
            width={140}
            height={140}
            className="rounded-circle"
            style={{
              boxShadow: '0 0 20px #76f0f7',
              border: '3px solid rgba(118,240,247,0.5)',
            }}
          />
        </div>

     <p
  className="text-center mb-3"
  style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#ffffffff' }}
>
  เว็บไซต์ของเราได้รับแรงบันดาลใจจากโลกใต้ทะเลของ Subnautica เพื่อสร้างศูนย์รวมข้อมูล
  ข่าวสาร และบริการที่เป็นประโยชน์ต่อผู้ใช้งาน เรามุ่งมั่นให้ทุกคนได้รับประสบการณ์ที่ลึกซึ้งและสนุกสนาน
</p>

<p style={{ lineHeight: '1.6', color: '#ffffffff' }}>
  ทีมงานของเราทุ่มเทเพื่อพัฒนาเว็บไซต์ให้ทันสมัย มีฟีเจอร์ครบครัน เช่น ระบบสมัครสมาชิก,
  ติดต่อสอบถาม และบริการอื่น ๆ ที่ช่วยให้คุณใช้งานได้สะดวกและเพลิดเพลินมากขึ้น
</p>

<p style={{ lineHeight: '1.6', textAlign: 'right', fontStyle: 'italic', color: '#ffffffff' }}>
  ขอบคุณที่ไว้วางใจและร่วมสำรวจโลกใต้ทะเลกับเรา!
</p>

      </div>
    </div>
  );
}
