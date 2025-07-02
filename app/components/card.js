import react from 'react';
import Image from 'next/image';

export default function Card() {
  return (
    <div className="container my-4">
      <div className="row g-3">
        <div className="col-md-4">
          <div className="card">
            <Image
              src="/images/sliders/Exusiai.webp"
              className="card-img-top"
              alt="Exusiai"
              width={288}
              height={400}
              style={{ objectFit: 'cover' }}
            />
            <div className="card-body">
              <h5 className="card-title">Exusiai</h5>
              <p className="card-text">Description about Exusiai.</p>
              <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <Image
              src="/images/sliders/Exusiai_Skin_3.webp"
              className="card-img-top"
              alt="Exusiai Skin"
              width={288}
              height={400}
              style={{ objectFit: 'cover' }}
            />
            <div className="card-body">
              <h5 className="card-title">Exusiai Skin</h5>
              <p className="card-text">Description about Exusiai Skin.</p>
              <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <Image
              src="/images/sliders/Exusiai_Elite_2.webp"
              className="card-img-top"
              alt="Exusiai Elite"
              width={288}
              height={400}
              style={{ objectFit: 'cover' }}
            />
            <div className="card-body">
              <h5 className="card-title">Exusiai Elite</h5>
              <p className="card-text">Description about Exusiai Elite.</p>
              <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

