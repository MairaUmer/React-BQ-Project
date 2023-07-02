import React, { useContext, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { CartContext } from "../CartContext";
import { Footer, Navbar } from "../components";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      setLoading2(true);
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await response.json();
      setProduct(data);
      setLoading(false);
      const response2 = await fetch(
        `https://fakestoreapi.com/products/category/${data.category}`
      );
      const data2 = await response2.json();
      setSimilarProducts(data2);
      setLoading2(false);
    };
    getProduct();
  }, [id]);

  const Loading = () => {
    return (
      <>
        <div className="container my-5 py-2">
          <div className="row">
            <div className="col-md-6 py-3">
              <Skeleton height={400} width={400} />
            </div>
            <div className="col-md-6 py-5">
              <Skeleton height={30} width={250} />
              <Skeleton height={90} />
              <Skeleton height={40} width={70} />
              <Skeleton height={50} width={110} />
              <Skeleton height={120} />
              <Skeleton height={40} width={110} inline={true} />
              <Skeleton className="mx-3" height={40} width={110} />
            </div>
          </div>
        </div>
        <div className="container py-2">
          <div className="row">
            <div className="col">
              <Skeleton height={30} width={200} />
            </div>
          </div>
          <div className="row mt-2">
            <div className="col">
              <Marquee speed={50}>
                <Skeleton height={100} width={100} className="me-3" />
                <Skeleton height={100} width={100} className="me-3" />
                <Skeleton height={100} width={100} className="me-3" />
                <Skeleton height={100} width={100} className="me-3" />
                <Skeleton height={100} width={100} className="me-3" />
              </Marquee>
            </div>
          </div>
        </div>
      </>
    );
  };

  const ProductDetails = () => {
    return (
      <>
        <div className="container my-5 py-2">
          <div className="row">
            <div className="col-md-6 py-3">
              <img src={product.image} alt={product.title} height={400} />
            </div>
            <div className="col-md-6 py-5">
              <h2 className="mb-4">{product.title}</h2>
              <p>{product.description}</p>
              <p className="h3">${product.price}</p>
              <p>Category: {product.category}</p>
              <button
                className="btn btn-dark me-2"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
              <Link to="/products" className="btn btn-outline-dark">
                Back to Products
              </Link>
            </div>
          </div>
        </div>
        <div className="container py-2">
          <div className="row">
            <div className="col">
              <h3>Similar Products</h3>
            </div>
          </div>
          <div className="row mt-2">
            {similarProducts.map((item) => (
              <div className="col-md-3" key={item.id}>
                <div className="card mb-4">
                  <img src={item.image} alt={item.title} height={200} />
                  <div className="card-body">
                    <h6>{item.title}</h6>
                    <p className="h6">${item.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <Navbar />
      {loading || loading2 ? <Loading /> : <ProductDetails />}
      <Footer />
    </>
  );
};

export default Product;
