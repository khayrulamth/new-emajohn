import React from 'react';
import './Cart.css';

const Cart = (props) => {
    const cart = props.cart;
    return (
        <div className='cart'>
            <h2>Order Summary</h2>
            <h4>Item ordered: {cart}</h4> 
            <p>Total Price: {}</p>
            <br></br>
        </div>
    );
};

export default Cart;