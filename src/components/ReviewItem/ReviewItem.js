import React from 'react';

const ReviewItem = (props) => {
    const{name,quantity,key,price} = props.product;
    const handleRemoveProduct = props.handleRemoveProduct;
    const styles = {
        borderBottom: '1px solid lightgray',
        marginBottom: '5px',
        paddingBottom: '5px',
        marginLeft: '100px'
    }
    return (
        <div style={styles} className='Ttem-review'>
            <h4 className='product-name'>{name}</h4>
            <p>Quantity: {quantity}</p>
            <p>Price: ${price}</p>
            <br />
            <button onClick={()=>handleRemoveProduct(key)} className="buy-button"> Remove </button>
            <br></br>
        </div>
    );
};

export default ReviewItem;