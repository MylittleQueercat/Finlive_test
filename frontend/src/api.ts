import axios from 'axios';

const client = axios.create({ baseURL: 'http://localhost:3001/api' });

export type Product = {
  _id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  stock: number;
};

export type ProductsResponse = {
  data: Product[];
  metadata: {
    totalCount: number;
    page: number;
    totalPages: number;
  };
};

export type GetProductsParams = {
  page: number;
  limit: number;
  category?: string;
  sortBy?: string;
  order?: 'asc' | 'desc';
};

export async function getProducts(params: GetProductsParams): Promise<ProductsResponse> {
  try {
    const response = await client.get<ProductsResponse>('/products', { params });
    return response.data;
  } catch (err) {
    throw err;
  }
}
