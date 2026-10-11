import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from '@/App';
import { cssVariables } from '@/motion/motion';
import { SmoothScroll } from '@/motion/SmoothScroll';
import '@/styles/index.css';

for (const [name, value] of Object.entries(cssVariables)) {
  document.documentElement.style.setProperty(name, value);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SmoothScroll>
      <App />
    </SmoothScroll>
  </StrictMode>,
);

// Drop the pre-paint cover, two frames after React has had a chance to paint.
// One frame is not enough: the first commit lays the hero out, and the mark
// that replaces this cover is only screen-filling once that has happened.
requestAnimationFrame(() => {
  requestAnimationFrame(() => document.getElementById('boot-cover')?.remove());
});
