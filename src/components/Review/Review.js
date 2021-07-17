import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import orderCompleteImage from '../../images/giphy.gif';
import { useHistory } from 'react-router-dom';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced,setOrderPlaced] = useState(false);

    const history = useHistory();

    const handleProceedCheckout = () => {
        history.push('/shipment');
        // setCart([]);
        // setOrderPlaced(true);
        // processOrder();
        // console.log("place Order Clicked");
    }
    const handleRemoveProduct = (productKey => {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    })

    let thankYouPage ;
    if(orderPlaced){
        thankYouPage = <img src={orderCompleteImage} alt="" />
    }
    useEffect(() => {
        //cart
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const cartProduct = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        });
        setCart(cartProduct);

    }, [])
    return (
        <div className="shop-container">
            <div className="review-item product-container">
                <h3>Cart Items: {cart.length}</h3>
                {
                    cart.map(product => <ReviewItem handleRemoveProduct={handleRemoveProduct} key={product.key} product={product}></ReviewItem>)
                }
                {
                    thankYouPage
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handleProceedCheckout} className="buy-button">Proceed Checkout</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;