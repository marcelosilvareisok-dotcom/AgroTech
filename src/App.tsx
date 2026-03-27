/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { Store } from './pages/Store';
import { Farm } from './pages/Farm';
import { Community } from './pages/Community';
import { Cart } from './pages/Cart';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="loja" element={<Store />} />
          <Route path="fazenda" element={<Farm />} />
          <Route path="comunidade" element={<Community />} />
          <Route path="carrinho" element={<Cart />} />
        </Route>
      </Routes>
    </Router>
  );
}
