import React from 'react';
import './Cart.css'

function Cart({ cart, removeCart }) {
    return (
        <div className="cart-container">
            <h1>Cart</h1>
            {cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <div className="grid-container">
                    {cart.map(item => (
                        <div className='card text-center p-3' key={item.id}>
                            <img src={item.image} alt="" className='d-block mx-auto' />
                            <div className='card-body'>
                                <p>{item.id}</p>
                                <p>{item.category}</p>
                                <p>${item.price}</p>
                                <p>Quantity: {item.quantity}</p>
                            </div>
                            <button className='btn btn-warning' onClick={() => removeCart(item.id)}>
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Cart;
