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
