import React from 'react';

export default function CardModel() {
  return (
    <div className="model_viewer_wrapper">
      {/* Decorative Hanging Lanyard Strap */}
      <div className="lanyard_strap_live"></div>

      {/* Interactive 3D Model */}
      <model-viewer
        src="/assets/card.glb"
        poster="/assets/poster.webp"
        alt="Logie Mendiola 3D Digital ID"
        auto-rotate
        rotation-per-second="20deg"
        camera-controls
        touch-action="pan-y"
        disable-zoom
        shadow-intensity="1.5"
        shadow-softness="0.8"
        tone-mapping="neutral"
        exposure="1.1"
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'transparent',
          outline: 'none',
        }}
      ></model-viewer>
    </div>
  );
}