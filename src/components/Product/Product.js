import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Product = (props) => {
    const { name, img, seller, stock, price, key } = props.product;
    return (
        <div className="product">
            <div className='product-img'>
                <img src={img} alt="" />
            </div>
            <div className='product-info'>
                <h5><Link to={'/product/' + key}>{name}</Link></h5>
                <p>By: {seller}</p>
                <p>Price: ${price}</p>
                <p>Only {stock} is available</p>
                {props.showAddToCart && <button onClick={() => props.handleProduct(props.product)} className='buy-button'><FontAwesomeIcon icon={faShoppingCart} /> add to cart</button>}
            </div>
        </div>
    );
};

export default Product;