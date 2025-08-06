'use client';
import Image from 'next/image';
import { useState, useMemo } from 'react';

/**
 * Card (Operators grid) component
 * - Accepts optional `operators` prop (array). If not provided, uses sample data.
 * - Renders responsive grid, each card shows image, name, role/subclass, rarity stars and View button.
 * - Clicking View opens a modal with larger image and details.
 */

function RarityStars({ rarity }) {
  const stars = Array.from({ length: Math.max(0, Math.min(6, rarity || 0)) });
  return (
    <div className="d-flex align-items-center" aria-hidden>
      {stars.map((_, i) => (
        <i
          key={i}
          className="bi bi-star-fill"
          style={{
            color: '#ffd54f',
            textShadow: '0 0 6px rgba(255,213,79,0.35)',
            marginRight: 2,
            fontSize: 14,
          }}
        />
      ))}
    </div>
  );
}

export default function Card({ operators: propsOperators }) {
  const sampleOperators = useMemo(() => ([
    {
      id: 1,
      name: 'Exusiai',
      role: 'Ranged',
      subclass: 'Sniper',
      rarity: 6,
      level: 90,
      image: '/images/sliders/Exusiai.webp',
      desc: 'High DPS ranged operator. Excellent at cutting through armored units.'
    },
    {
      id: 2,
      name: 'Exusiai (Skin)',
      role: 'Ranged',
      subclass: 'Sniper',
      rarity: 6,
      level: 90,
      image: '/images/sliders/Exusiai_Skin_3.webp',
      desc: 'Alternative costume with the same deadly firepower.'
    },
    {
      id: 3,
      name: 'Exusiai Elite',
      role: 'Ranged',
      subclass: 'Sniper',
      rarity: 5,
      level: 80,
      image: '/images/sliders/Exusiai_Elite_2.webp',
      desc: 'Elite form with improved skills and higher stats.'
    }
  ]), []);

  const operators = propsOperators && propsOperators.length ? propsOperators : sampleOperators;

  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const openModal = (op) => {
    setSelected(op);
    setShowModal(true);
    // prevent background scroll
    if (typeof window !== 'undefined') document.body.style.overflow = 'hidden';
  };
  const closeModal = () => {
    setShowModal(false);
    setSelected(null);
    if (typeof window !== 'undefined') document.body.style.overflow = '';
  };

  return (
    <>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {operators.map((op) => (
          <div className="col" key={op.id}>
            <div
              className="card h-100 shadow-sm"
              style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(0,0,0,0.12))',
                border: '1px solid rgba(0,188,212,0.06)',
                color: '#fff',
                overflow: 'hidden'
              }}
            >
              <div style={{ position: 'relative', height: 260, background: '#0b0b0b' }}>
                {op.image ? (
                  <Image
                    src={op.image}
                    alt={op.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, rgba(0,188,212,0.04), rgba(0,0,0,0.12))'
                  }}>
                    <i className="bi bi-person-circle" style={{ fontSize: 48, color: '#00bcd4' }} />
                  </div>
                )}

                {/* rarity overlay */}
                <div style={{ position: 'absolute', right: 10, top: 10 }}>
                  <RarityStars rarity={op.rarity} />
                </div>
              </div>

              <div className="card-body d-flex flex-column" style={{ padding: '0.9rem' }}>
                <h5 className="card-title mb-1" style={{ color: '#00e5ff', fontWeight: 700 }}>{op.name}</h5>
                <p className="mb-2" style={{ color: '#cfefff', fontSize: 13 }}>{op.role} • {op.subclass}</p>

                <div className="d-flex justify-content-between align-items-center mt-auto">
                  <small className="text-muted" style={{ fontSize: 12 }}>{op.level ? `LV ${op.level}` : 'LV —'}</small>
                  <div>
                    <button
                      type="button"
                      className="btn btn-sm"
                      onClick={() => openModal(op)}
                      style={{
                        background: 'linear-gradient(90deg, rgba(0,188,212,0.14), rgba(0,188,212,0.06))',
                        color: '#00bcd4',
                        border: '1px solid rgba(0,188,212,0.12)'
                      }}
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && selected && (
        <div
          role="dialog"
          aria-modal="true"
          className="custom-modal"
          style={{
            position: 'fixed',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1050
          }}
          onClick={closeModal}
        >
          <div
            className="modal-backdrop"
            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)' }}
          />
          <div
            className="modal-content"
            style={{
              position: 'relative',
              maxWidth: 900,
              width: '95%',
              maxHeight: '90vh',
              overflow: 'auto',
              borderRadius: 12,
              boxShadow: '0 10px 40px rgba(0,0,0,0.6)',
              zIndex: 1060,
              background: 'linear-gradient(180deg, #0f1720, #0b0f14)',
              border: '1px solid rgba(0,188,212,0.08)',
              color: '#fff'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', gap: 12, padding: 16, alignItems: 'flex-start' }}>
              <div style={{ flex: '0 0 320px', height: 320, position: 'relative', borderRadius: 8, overflow: 'hidden' }}>
                {selected.image ? (
                  <Image src={selected.image} alt={selected.name} fill style={{ objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', background: '#0b0b0b' }} />
                )}
              </div>

              <div style={{ flex: 1 }}>
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h3 style={{ margin: 0, color: '#00e5ff' }}>{selected.name}</h3>
                    <p style={{ margin: 0, color: '#cfefff' }}>{selected.role} • {selected.subclass}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ marginBottom: 6 }}><RarityStars rarity={selected.rarity} /></div>
                    <div style={{ color: '#9fbec9', fontSize: 13 }}>{selected.level ? `LV ${selected.level}` : ''}</div>
                  </div>
                </div>

                <hr style={{ borderColor: 'rgba(255,255,255,0.06)', margin: '12px 0' }} />

                <p style={{ color: '#d6eef7' }}>{selected.desc || 'No description available.'}</p>

                <div className="d-flex gap-2 mt-3">
                  <button
                    className="btn"
                    onClick={() => { /* example: open profile */ }}
                    style={{
                      background: 'linear-gradient(90deg, rgba(0,188,212,0.14), rgba(0,188,212,0.06))',
                      color: '#00bcd4',
                      border: '1px solid rgba(0,188,212,0.12)'
                    }}
                  >
                    Profile
                  </button>
                  <button
                    className="btn"
                    onClick={closeModal}
                    style={{
                      background: 'transparent',
                      color: '#fff',
                      border: '1px solid rgba(255,255,255,0.06)'
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Minimal styles to ensure modal buttons/icons look correct */}
      <style jsx>{`
        .card .card-body { min-height: 120px; }
        .custom-modal .modal-content::-webkit-scrollbar { height: 8px; width: 8px; }
      `}</style>
    </>
  );
}
