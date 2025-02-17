import { GetStaticPaths, GetStaticProps } from "next";
import axios from "axios";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Product } from "@/types/product";

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await axios.get<Product[]>("https://fakestoreapi.com/products");
  const paths = response.data.map((product) => ({
    params: { id: product.id.toString() },
  }));

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const response = await axios.get<Product>(`https://fakestoreapi.com/products/${params?.id}`);
    return { props: { product: response.data }, revalidate: 60 };
  } catch (error) {
    return { notFound: true };
  }
};

export default function ProductPage({ product }: { product: Product }) {
  if (!product) {
    notFound();
  }

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <Image
          src={product.image}
          width={300}
          height={300}
          alt={product.title}
          className="card-img-top"
          style={{ objectFit: "contain", height: "300px", width: "100%" }}
          loading="lazy"
        />
        <div className="card-body">
          <h2 className="card-title">{product.title}</h2>
          <p className="card-text">{product.description}</p>
          <p className="card-text text-muted">${product.price.toFixed(2)}</p>
          <p className="card-text">
            <small className="text-warning">⭐ {product.rating.rate} ({product.rating.count} reviews)</small>
          </p>
        </div>
      </div>
    </div>
  );
}
