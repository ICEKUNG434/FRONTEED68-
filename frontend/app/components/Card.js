// components/Card.js
export default function Card({ image, title, text }) {
  return (
    <div className="card">
      <img src={image} alt={title} />
      <div className="card-content">
        <h3>{title}</h3>
        <p>{text}</p>
      </div>

      <style jsx>{`
        .card {
          display: flex;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          width: 300px;
          transition: transform 0.3s;
        }

        .card:hover {
          transform: translateY(-4px);
        }

        img {
          width: 100px;
          height: 100px;
          object-fit: cover;
        }

        .card-content {
          padding: 12px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        h3 {
          margin: 0 0 6px 0;
          font-size: 1rem;
        }

        p {
          margin: 0;
          font-size: 0.9rem;
          color: #555;
        }
      `}</style>
    </div>
  );
}
