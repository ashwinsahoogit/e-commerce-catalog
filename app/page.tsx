"use client";

import React from 'react';
import { ProductProvider } from '../context/ProductContext';
import ProductList from '../components/ProductList';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  return (
    <ProductProvider>
      <div className="container">
        <h1 className="display-4 fw-bold text-center my-4">E-Commerce Catalog</h1>
        <ProductList />
      </div>
    </ProductProvider>
  );
}
