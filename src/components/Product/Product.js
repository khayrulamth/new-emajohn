import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

const Product = (props) => {
    // console.log(props.product);
    // console.log(props.handleProduct);
    const {name,img,seller,stock,price}= props.product;
    return (
        <div className="product">
            <div className='product-img'>
                <img src={img} alt=""/>
            </div>
            <div className='product-info'>
                <h5>{name}</h5>
                <p>By: {seller}</p>
                <p>Price: ${price}</p>
                <p>Only {stock} is available</p>
                <button onClick={()=>props.handleProduct(props.product)} className='buy-button'><FontAwesomeIcon icon={faShoppingCart} /> add to cart</button>
            </div>
        </div>
    );
};

export default Product;