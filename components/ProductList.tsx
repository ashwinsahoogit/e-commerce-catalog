"use client";

import React from "react";
import { useProducts } from "../context/ProductContext";
import ProductCard from "./ProductCard";
import "bootstrap/dist/css/bootstrap.min.css";

const ProductList: React.FC = () => {
  const { products, loading, error, fetchMoreProducts, hasMore } = useProducts();

  return (
    <div className="container mt-4">
      {loading && (
        <div className="alert alert-info text-center" aria-live="polite">
          Loading...
        </div>
      )}
      {error && (
        <div className="alert alert-danger text-center" aria-live="assertive">
          {error}
          <button className="btn btn-danger mt-2" onClick={fetchMoreProducts}>
            Retry
          </button>
        </div>
      )}

      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-12 col-sm-6 col-md-4 mb-4">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="text-center my-4">
          <button
            className="btn btn-primary"
            onClick={fetchMoreProducts}
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More Products"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;
