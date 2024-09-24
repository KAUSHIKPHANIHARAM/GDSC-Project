import React from 'react';
import './CartSummary.css';

function CartSummary({ cart }) {

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

    return (
        <div className="cart-summary">
            <h2>Cart Summary</h2>
            <p><strong>Total Items:</strong> {totalItems}</p>
            <p><strong>Total Price:</strong> ${totalPrice}</p>
        </div>
    );
}

export default CartSummary;
