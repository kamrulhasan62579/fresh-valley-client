import React from 'react';

const Cart = (props) => {
    const cart = props.cart;
    // console.log(cart.length);
    const total = cart.reduce((total, prod) => (total + Number(prod.price*prod.quantity)), 0)
    return (
        <div>
            <h1>Cart length : {cart.length}</h1>
            <h1>Total Price: {total}</h1>
            {
                props.children
            }
        </div>
    );
};

export default Cart;