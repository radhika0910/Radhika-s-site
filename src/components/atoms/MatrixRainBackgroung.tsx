// MatrixRainBackground.tsx
// @ts-nocheck
// @ts-ignore
/* eslint-disable */
// @use-vite
// @use-client
'use client';

import React from 'react';
import MatrixCodeRainComponent from 'react-matrix-code-rain/lib';

const MatrixRainBackground: React.FC = () => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
      <MatrixCodeRainComponent
        timeout={10}
        textStrip={['C', 'O', 'D', 'E', '%', 'R', 'A', 'D', 'D', 'S', ';', '9']}
        theColors={['blue']}
        stripCount={29}
      />
    </div>
  );
};

export default MatrixRainBackground;
