import * as React from 'react';
import { createRoot } from 'react-dom/client';
import Dashboard from '@templates/dashboard/Dashboard';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Dashboard />
  </React.StrictMode>,
);
