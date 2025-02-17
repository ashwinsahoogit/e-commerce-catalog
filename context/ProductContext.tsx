"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { ProductContextType } from "../types/context";
import { Product } from "../types/product";

const ProductContext = createContext<ProductContextType | null>(null);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const limit = 10;

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      setAllProducts(response.data);
      setProducts(response.data.slice(0, limit));
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const fetchMoreProducts = useCallback(() => {
    if (loading || !hasMore) return;

    const nextBatch = products.length + limit;
    if (nextBatch >= allProducts.length) {
      setHasMore(false);
    }

    setProducts((prev) => allProducts.slice(0, nextBatch));
  }, [loading, hasMore, products, allProducts, limit]);

  return (
    <ProductContext.Provider value={{ products, loading, error, hasMore, fetchMoreProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};
