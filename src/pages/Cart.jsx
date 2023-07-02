import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../CartContext";
import { Footer, Navbar } from "../components";

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);

  const handleRemove = (product) => {
    removeFromCart(product);
  };

  const CartList = () => {
    return (
      <div className="container my-5 py-2">
        <div className="row">
          {cart.map((item) => (
            <div className="col-md-4 mb-4" key={item.id}>
              <div className="card">
                <img src={item.image} alt={item.title} height={300} />
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">Quantity: {item.qty}</p>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => handleRemove(item)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const EmptyCart = () => {
    return (
      <div className="container my-5 py-2 text-center">
        <h1>Your cart is empty</h1>
        <Link to="/products" className="btn btn-outline-dark mt-3">
          Browse Products
        </Link>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      {cart.length ? <CartList /> : <EmptyCart />}
      <Footer />
    </>
  );
};

export default Cart;
