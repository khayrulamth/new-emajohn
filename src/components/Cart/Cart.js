import React from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = (props) => {
    const cart = props.cart;
    console.log(cart);
    const total = cart.reduce( (total,prd) => total+prd.price , 0 );
    let shippingCost = 0;
    if (total>350){shippingCost = 0}
    else if(total>200){shippingCost = 20}
    else if (total> 100){shippingCost = 30}
    else if(total !== 0){shippingCost = 40}
    let vat = total/10;

    const formatNumber = num =>{
        const newNum = num.toFixed(2);
        return Number(newNum);
    }
    return (
        <div className='cart'>
            <h2>Order Summary</h2>
            <h4>Item ordered: {cart.length}</h4> 
            <p>Product Price: ${formatNumber(total)}</p>
            <p>Vat + Tax: ${formatNumber(vat)}</p>
            <p>Shipping Cost: ${formatNumber(shippingCost)}</p>
            <p>Total Cost: ${formatNumber(total+shippingCost+vat)}</p>
            <br></br>
            <Link to="/review"><button className='buy-button'>Review Order</button></Link>
        </div>
    );
};

export default Cart;