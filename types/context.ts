import { Product } from './product';
  
export interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  fetchMoreProducts: () => void;
}