import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "../types/product";

const ProductCard: React.FC<{ product: Product }> = React.memo(({ product }) => (
  <Link href={`/product/${product.id}`} className="text-decoration-none">
    <div className="card h-100 shadow">
      <Image
        src={product.image}
        width={200}
        height={200}
        alt={product.title}
        className="card-img-top p-3"
        style={{ objectFit: "contain", height: "200px", width: "100%" }}
        loading="lazy"
      />
      <div className="card-body">
        <h5 className="card-title">{product.title}</h5>
        <p className="card-text text-muted">${product.price.toFixed(2)}</p>
        <p className="card-text">
          <small className="text-warning">⭐ {product.rating.rate} ({product.rating.count} reviews)</small>
        </p>
      </div>
    </div>
  </Link>
));

export default ProductCard;
