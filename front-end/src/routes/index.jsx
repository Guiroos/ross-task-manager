import React from 'react';
import {
  Routes, // instead of Switch
  Route,
  BrowserRouter,
} from 'react-router-dom';
import Tasks from '../pages/Tasks';

export default function RoutesApp() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Tasks />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
