'use client';
import { useEffect } from 'react';
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CardList() {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

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
            />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up the bulk of the card’s content.
              </p>
              <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <Image
              src="/images/sliders/Exusiai_Skin_3.webp"
              className="card-img-top"
              alt="Image 4"
              width={288}
              height={400}
            />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up the bulk of the card’s content.
              </p>
              <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <Image
              src="/images/sliders/Exusiai_Elite_2.webp"
              className="card-img-top"
              alt="Download"
              width={288}
              height={400}
            />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up the bulk of the card’s content.
              </p>
              <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


