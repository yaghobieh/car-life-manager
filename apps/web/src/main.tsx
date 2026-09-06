import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { BearProvider } from '@forgedevstack/bear';
import { LingoProvider } from '@forgedevstack/lingo/react';
import '@forgedevstack/bear/styles.css';
import { DIRECTION_RTL } from '@const';
import { lingo } from '@locales';
import { App } from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LingoProvider instance={lingo}>
      <BearProvider direction={DIRECTION_RTL} defaultMode="light">
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </BearProvider>
    </LingoProvider>
  </StrictMode>,
);
