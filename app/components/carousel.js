'use client';
import { useEffect } from 'react';
import Image from 'next/image';

export default function Carousel() {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return (
<div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <Image src="/images/sliders/Newbie_Pool_banner.webp" className="d-block w-100" alt="..." width={1920} height={540} />
    </div>
    <div className="carousel-item">
      <img src="/images/sliders/new-banner-an-eternity-aflame-v0-m8hby810zqde1.webp" className="d-block w-100" alt="..." width={1920} height={540}  />
    </div>
    <div className="carousel-item">
      <img src="/images/sliders/CN_Freedom_of_Preach_banner.webp" className="d-block w-100" alt="..." width={1920} height={540}  />
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true" />
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true" />
    <span className="visually-hidden">Next</span>
  </button>
</div>

  );
}

