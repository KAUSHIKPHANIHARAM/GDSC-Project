import React, { useEffect, useState } from 'react';
import './Work.css'; // Import the CSS file
import Cart from './Cart';
import CartSummary from './CartSummary'; // Import the CartSummary component

function Work() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then(res => res.json())
            .then(data => setProducts(data));
    }, []);

    // Function to add item to the cart or update the quantity if it already exists
    function addCart(item) {
        setCart(prevCart => {
            const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
            if (existingItem) {
                return prevCart.map(cartItem =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            } else {
                return [...prevCart, { ...item, quantity: 1 }];
            }
        });
    }

    // Function to remove an item from the cart
    function removeCart(id) {
        setCart(cart => {
            const existingItem = cart.find(item => item.id === id);
            if (existingItem && existingItem.quantity > 1) {
                return cart.map(item =>
                    item.id === id
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                );
            } else {
                return cart.filter(item => item.id !== id);
            }
        });
    }
    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) || // Search by title
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) // Search by category
    );

    return (
        <div className="work-container">
            <div className="product-list">
                <div className="bg-dark text-white py-1">
                    <h1 className='text-white'>E-Commerce Platform</h1>
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="search-input"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} // Update search query
                    />
                </div>
                <div className="grid-container">
                    {products.map(items => (
                        <div className='card text-center p-4' key={items.id}>
                            <img src={items.image} alt="" className='d-block mx-auto' />
                            <div className='card-body'>
                                <p>{items.id}</p>
                                <p>{items.category}</p>
                                <p>${items.price}</p>
                                <button className='btn btn-success' onClick={() => addCart(items)}>
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Cart Component */}
            <div className="cart-section">
                <Cart cart={cart} removeCart={removeCart} />
                <CartSummary cart={cart} /> {/* Add CartSummary component */}
            </div>
        </div>
    );
}

export default Work;
