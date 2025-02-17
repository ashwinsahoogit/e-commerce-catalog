import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProductList from "./ProductList";
import { useProducts } from "../context/ProductContext";
import "@testing-library/jest-dom";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  rating: { rate: number; count: number };
}

interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchMoreProducts: () => void;
  hasMore: boolean;
}

jest.mock("../context/ProductContext", () => ({
  useProducts: jest.fn(),
}));

const mockProducts: Product[] = [
  {
    id: 1,
    title: "Product 1",
    price: 29.99,
    image: "https://via.placeholder.com/150",
    rating: { rate: 4.5, count: 10 },
  },
  {
    id: 2,
    title: "Product 2",
    price: 19.99,
    image: "https://via.placeholder.com/150",
    rating: { rate: 4.0, count: 5 },
  },
];

describe("ProductList", () => {
  it("renders loading state", () => {
    (useProducts as jest.Mock).mockReturnValue({
      products: [],
      loading: true,
      error: null,
      fetchMoreProducts: jest.fn(),
      hasMore: true,
    } as UseProductsReturn);

    render(<ProductList />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders error state", () => {
    (useProducts as jest.Mock).mockReturnValue({
      products: [],
      loading: false,
      error: "Something went wrong!",
      fetchMoreProducts: jest.fn(),
      hasMore: true,
    } as UseProductsReturn);

    render(<ProductList />);

    expect(screen.getByText("Something went wrong!")).toBeInTheDocument();
  });

  it("renders product cards correctly", () => {
    (useProducts as jest.Mock).mockReturnValue({
      products: mockProducts,
      loading: false,
      error: null,
      fetchMoreProducts: jest.fn(),
      hasMore: true,
    } as UseProductsReturn);

    render(<ProductList />);

    // Check if product titles are rendered
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();

    // Check if product prices are rendered
    expect(screen.getByText("$29.99")).toBeInTheDocument();
    expect(screen.getByText("$19.99")).toBeInTheDocument();
  });

  it("renders 'Load More Products' button and handles click", async () => {
    const fetchMoreProducts = jest.fn();

    // Mock useProducts to return products and fetchMoreProducts
    (useProducts as jest.Mock).mockReturnValue({
      products: mockProducts,
      loading: false,
      error: null,
      fetchMoreProducts,
      hasMore: true,
    } as UseProductsReturn);

    render(<ProductList />);

    // Check if the "Load More Products" button is visible
    const loadMoreButton = screen.getByRole("button", { name: /Load More Products/i });
    expect(loadMoreButton).toBeInTheDocument();

    // Simulate button click
    fireEvent.click(loadMoreButton);

    // Ensure fetchMoreProducts is called
    await waitFor(() => expect(fetchMoreProducts).toHaveBeenCalled());
  });

  it("disables 'Load More Products' button when loading", () => {
    const fetchMoreProducts = jest.fn();

    // Mock useProducts to return loading state
    (useProducts as jest.Mock).mockReturnValue({
      products: mockProducts,
      loading: true,
      error: null,
      fetchMoreProducts,
      hasMore: true,
    } as UseProductsReturn);

    render(<ProductList />);

    const loadMoreButton = screen.getByRole("button", { name: /Load More Products/i });

    // Ensure the button is disabled while loading
    expect(loadMoreButton).toBeDisabled();
  });
});
