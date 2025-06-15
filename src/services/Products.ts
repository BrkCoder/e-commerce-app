import { fetcher } from "./Fetcher";

export interface ProductData {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

//[GET] 'https://fakestoreapi.com/products'
export function getProducts() {
  return fetcher<ProductData[]>("https://fakestoreapi.com/products")
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
      throw error;
    });
}

// [GET] https://api.escuelajs.co/api/v1/products/4
export function getProductById(id: number) {
  return fetcher(`https://api.escuelajs.co/api/v1/products/${id}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error fetching product:", error);
      throw error;
    });
}

// [GET] https://api.escuelajs.co/api/v1/products/slug/handmade-fresh-table
export function getProductBySlug(slug: string) {
  return fetcher(`https://api.escuelajs.co/api/v1/products/slug/${slug}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error fetching product:", error);
      throw error;
    });
}

//[POST] https://api.escuelajs.co/api/v1/products/
export function createProduct(productData: ProductData) {
  return fetcher("https://api.escuelajs.co/api/v1/products", {
    method: "POST",
    body: JSON.stringify(productData),
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error creating product:", error);
      throw error;
    });
}

//[PUT] https://api.escuelajs.co/api/v1/products/1
export function updateProduct(id: number, productData: ProductData) {
  return fetcher(`https://api.escuelajs.co/api/v1/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(productData),
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error updating product:", error);
      throw error;
    });
}

//[DELETE] https://api.escuelajs.co/api/v1/products/1
export function deleteProduct(id: number) {
  return fetcher(`https://api.escuelajs.co/api/v1/products/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error deleting product:", error);
      throw error;
    });
}

//[GET] https://api.escuelajs.co/api/v1/products?offset=0&limit=10
export function getProductsPaginated(offset: number, limit: number) {
  return fetcher<ProductData[]>(`https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
      throw error;
    });
}

//[GET] https://api.escuelajs.co/api/v1/products/1/related
export function getRelatedProducts(id: number) {
  return fetcher(`https://api.escuelajs.co/api/v1/products/${id}/related`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error fetching related products:", error);
      throw error;
    });
}


//[GET] https://api.escuelajs.co/api/v1/products/slug/handmade-fresh-table/related
export function getRelatedProductsBySlug(slug: string) {
  return fetcher(`https://api.escuelajs.co/api/v1/products/slug/${slug}/related`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error fetching related products:", error);
      throw error;
    });
}