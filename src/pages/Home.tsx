import { useEffect, useState } from "react";
import { Card, Input, Typography } from "antd";
import { getProducts, type ProductData } from "../services/Products";
import "./Home.css";
import useCartStore from "../store/useCartStore";

const mockProducts: ProductData[] = [
  {
    id: 0,
    title: "Loading...",
    price: 0,
    description: "Please wait while we fetch the products.",
    image: "",
    category: "",
  },
  {
    id: 1,
    title: "Loading...",
    price: 0,
    description: "Please wait while we fetch the products.",
    image: "",
    category: "",
  },
  {
    id: 2,
    title: "Loading...",
    price: 0,
    description: "Please wait while we fetch the products.",
    image: "",
    category: "",
  },
  {
    id: 3,
    title: "Loading...",
    price: 0,
    description: "Please wait while we fetch the products.",
    image: "",
    category: "",
  },
  {
    id: 4,
    title: "Loading...",
    price: 0,
    description: "Please wait while we fetch the products.",
    image: "",
    category: "",
  },
];
const Home = () => {
  const [products, setProducts] = useState<ProductData[]>([]);

  const [filteredProducts, setFilteredProducts] = useState<ProductData[]>(mockProducts);

  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>("");

  const { addToCart } = useCartStore();

  useEffect(() => {
    setLoading(true);
    getProducts()
      .then((response) => {
        setProducts(response);
        setFilteredProducts(handleFilter(response, filter));
        setFilter("");
        console.log("Products fetched successfully:", response);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleFilter = (products: ProductData[], filter: string) => {
    setFilter(filter);
    if (!filter) {
      setFilteredProducts(products);
      return products;
    }
    const filtered = products.filter((product) =>
      product.category.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredProducts(filtered);
    return filtered;
  };

  return (
    <div className="home-page">
      <Input.Search
        placeholder="Enter category name for search"
        enterButton="Search"
        size="large"
        value={filter}
        onChange={(e) => handleFilter(products, e.target.value)}
      />
      <div className="product-list">
        {filteredProducts.map((product) => (
          <Card
            hoverable
            title={<span className="product-title">{product.title}</span>}
            key={product.id}
            className="product-item"
            loading={loading}
            actions={[
              <span key="add-to-cart" onClick={() => {
                const cartItem = {
                  id: product.id.toString(),
                  name: product.title,
                  price: product.price,
                  quantity: 1,
                  image: product.image || "",
                  description: product.description || "",
                };
                addToCart(cartItem);
              }}>
                Add to Cart
              </span>,
              <span key="view-details">View Details</span>,
            ]}
            style={{ width: 300, display: "flex", flexDirection: "column" }}
            styles={{
              body: { flex: 1, display: "flex", flexDirection: "column" },
            }}
            cover={
              product.image && (
                <img
                  alt={product.title}
                  src={product.image}
                  style={{
                    width: "100%",
                    height: "100%",
                    maxHeight: "200px",
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              )
            }
          >
            <Card.Meta
              description={
                <>
                  <h4>Category: {product.category}</h4>
                  <Typography.Paragraph ellipsis={{ rows: 5 }}>
                    {product.description}
                  </Typography.Paragraph>
                  <Typography.Paragraph>
                    Price: ${product.price}
                  </Typography.Paragraph>
                </>
              }
            />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;

