import React, { useContext, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { CartContext } from "../CartContext";
import { Footer, Navbar } from "../components";

const Products = () => {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    };
    getProducts();
  }, []);

  const Loading = () => {
    return (
      <div className="container my-5 py-2">
        <div className="row">
          <div className="col-md-3 mb-4">
            <Skeleton height={300} />
            <Skeleton height={30} />
            <Skeleton height={40} width={120} />
          </div>
          <div className="col-md-3 mb-4">
            <Skeleton height={300} />
            <Skeleton height={30} />
            <Skeleton height={40} width={120} />
          </div>
          <div className="col-md-3 mb-4">
            <Skeleton height={300} />
            <Skeleton height={30} />
            <Skeleton height={40} width={120} />
          </div>
          <div className="col-md-3 mb-4">
            <Skeleton height={300} />
            <Skeleton height={30} />
            <Skeleton height={40} width={120} />
          </div>
        </div>
      </div>
    );
  };

  const ProductList = () => {
    return (
      <div className="container my-5 py-2">
        <div className="row">
          {products.map((product) => (
            <div className="col-md-3 mb-4" key={product.id}>
              <div className="card">
                <img
                  src={product.image}
                  alt={product.title}
                  height={300}
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">${product.price}</p>
                  <button
                    className="btn btn-dark"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      {loading ? <Loading /> : <ProductList />}
      <Footer />
    </>
  );
};

export default Products;
