import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/edit/:id" element={<ProductForm />} />
        <Route path="/add" element={<ProductForm />} />
      </Routes>
    </Router>
  );
}

export default App;
