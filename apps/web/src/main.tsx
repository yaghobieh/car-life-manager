import { createRoot } from 'react-dom/client';
import { LingoProvider } from '@forgedevstack/lingo/react';
import '@forgedevstack/bear/styles.css';
import '@forgedevstack/grid-table/grid-table.css';
import { lingo } from '@locales';
import { installClmWindow } from '@logger';
import { DirectedBear } from './theme/DirectedBear';

installClmWindow();

createRoot(document.getElementById('root')!).render(
  <LingoProvider instance={lingo}>
    <DirectedBear />
  </LingoProvider>,
);
