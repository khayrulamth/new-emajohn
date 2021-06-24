import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetail = () => {
    const {productKey} = useParams();
    const product = fakeData.find(pd => pd.key === productKey)
    return (
        <div>
            <h3>
                {productKey} Details Comming sooooooon!
            </h3><br></br>
            <Product showAddToCart={false} product={product}></Product>
        </div>
    );
};

export default ProductDetail;