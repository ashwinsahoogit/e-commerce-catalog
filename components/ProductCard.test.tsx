import { render, screen } from '@testing-library/react';
import ProductCard from './ProductCard';
import '@testing-library/jest-dom';

const product = {
  id: 1,
  image: 'https://example.com/image.jpg',
  title: 'Sample Product',
  price: 99.99,
  description: 'This is a sample product description.',
  category: 'Sample Category',
  rating: {
    rate: 4.5,
    count: 10
  }
};

test('renders ProductCard component without crashing', () => {
  render(<ProductCard product={product} />);
  const title = screen.getByText(product.title);
  expect(title).toBeInTheDocument();
});

test('renders product image with correct src and alt attributes', () => {
  render(<ProductCard product={product} />);
  const image = screen.getByAltText(product.title);
  expect(image).toHaveAttribute('src', product.image);
});

test('renders product title correctly', () => {
  render(<ProductCard product={product} />);
  const title = screen.getByText(product.title);
  expect(title).toBeInTheDocument();
});

test('renders product price correctly', () => {
  render(<ProductCard product={product} />);
  const price = screen.getByText(`$${product.price.toFixed(2)}`);
  expect(price).toBeInTheDocument();
});

test('renders product rating and review count correctly', () => {
  render(<ProductCard product={product} />);
  const ratingText = `⭐ ${product.rating.rate} (${product.rating.count} reviews)`;
  const rating = screen.getByText(ratingText);
  expect(rating).toBeInTheDocument();
});

test('has correct link to product details page', () => {
  render(<ProductCard product={product} />);
  const link = screen.getByRole('link');
  expect(link).toHaveAttribute('href', `/product/${product.id}`);
});
