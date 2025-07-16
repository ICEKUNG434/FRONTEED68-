'use client';
import Image from 'next/image';

export default function Card() {
  return (
    <div className="row row-cols-1 row-cols-md-3 g-4">
      <div className="col">
        <div className="card h-100 shadow-sm">
          <Image
            src="/images/sliders/Exusiai.webp"
            className="card-img-top"
            alt="Exusiai"
            width={500}
            height={400}
          />
          <div className="card-body d-flex flex-column">
            <h5 className="card-title">Exusiai</h5>
            <p className="card-text">Description about Exusiai.</p>
            <a href="#" className="btn btn-primary mt-auto">ดูเพิ่มเติม</a>
          </div>
        </div>
      </div>

      <div className="col">
        <div className="card h-100 shadow-sm">
          <Image
            src="/images/sliders/Exusiai_Skin_3.webp"
            className="card-img-top"
            alt="Exusiai Skin"
            width={500}
            height={400}
          />
          <div className="card-body d-flex flex-column">
            <h5 className="card-title">Exusiai Skin</h5>
            <p className="card-text">Description about Exusiai Skin.</p>
            <a href="#" className="btn btn-primary mt-auto">ดูเพิ่มเติม</a>
          </div>
        </div>
      </div>

      <div className="col">
        <div className="card h-100 shadow-sm">
          <Image
            src="/images/sliders/Exusiai_Elite_2.webp"
            className="card-img-top"
            alt="Exusiai Elite"
            width={500}
            height={400}
          />
          <div className="card-body d-flex flex-column">
            <h5 className="card-title">Exusiai Elite</h5>
            <p className="card-text">Description about Exusiai Elite.</p>
            <a href="#" className="btn btn-primary mt-auto">ดูเพิ่มเติม</a>
          </div>
        </div>
      </div>
    </div>
  );
}
