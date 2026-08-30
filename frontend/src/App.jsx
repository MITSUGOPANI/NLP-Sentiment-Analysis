import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { LandingPage } from './pages/LandingPage';
import { PredictionPage } from './pages/PredictionPage';
import { ModelInfoPage } from './pages/ModelInfoPage';
import { AboutPage } from './pages/AboutPage';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="predict" element={<PredictionPage />} />
        <Route path="model-info" element={<ModelInfoPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
