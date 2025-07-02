'use client';
import { useEffect } from 'react';
import Image from 'next/image';

export default function Carousel() {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return (
<div>
  <div className="card" style={{width: '18rem'}}>
    <img src="/images/sliders/Exusiai.webp" className="card-img-top" alt="..." />
    <div className="card-body">
      <h5 className="card-title">Card title</h5>
      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
      <a href="#" className="btn btn-primary">Go somewhere</a>
    </div>
  </div>
  <div className="card" style={{width: '18rem'}}>
    <img src="/images/sliders/images (4).jpg" className="card-img-top" alt="..." />
    <div className="card-body">
      <h5 className="card-title">Card title</h5>
      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
      <a href="#" className="btn btn-primary">Go somewhere</a>
    </div>
  </div>
  <div className="card" style={{width: '18rem'}}>
    <img src="/images/sliders/download.jpg" className="card-img-top" alt="..." />
    <div className="card-body">
      <h5 className="card-title">Card title</h5>
      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
      <a href="#" className="btn btn-primary">Go somewhere</a>
    </div>
  </div>
</div>

  );
}

