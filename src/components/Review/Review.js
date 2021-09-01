import { MDBBtn } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { addToDatabaseCart, getDatabaseCart, removeFromDatabaseCart } from '../../Utilities/DatabaseManager';
import Cart from '../Cart/Cart';
import CheakOut from '../CheakOut/CheakOut';
import ReviewItem from '../ReviewItem/ReviewItem';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [getData, setGetData] = useState([]);
    // console.log(getData);

    useEffect(()=> {
        fetch('http://localhost:4007/product')
        .then(res => res.json())
        .then(data => setGetData(data))
    }, [])
    
    useEffect(()=> {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        // console.log(productKeys);

        if (getData.length) {
            const cartProducts = productKeys.map(key => {
                const produ = getData.find(pd => pd._id === key)
                produ.quantity = savedCart[key]
                return produ;
            })
            setCart(cartProducts)
        }
    }, [getData])

   const handleRemove = (id) => {
       let count = 1 ;
       let newCart;
       const sameProduct = cart.find(pd => pd._id === id);
       const others = cart.filter(pd => pd._id !== id)
         if(sameProduct.quantity > 0){
           count = sameProduct.quantity - 1;
           sameProduct.quantity = count;
           newCart = [...others, sameProduct]
           addToDatabaseCart(id, count);
         }
         if(sameProduct.quantity < 1){
            newCart = [...others]
            removeFromDatabaseCart(id)      
         }  
         setCart(newCart)
   }
   const history =  useHistory()
   const handleCheakOut = () => {
        history.push('/cheakOut')
   }
    return (
        <div>
            <div>
                 <ReviewItem cart={cart} handleRemove={handleRemove}></ReviewItem>
            </div>
            <div>
                 <Cart cart={cart}>

                 </Cart>
                 <MDBBtn onClick={handleCheakOut}>Proceed To CheakOut</MDBBtn>
                 {/* <Link to={'/cheakOut'}>Proceed To CheakOut</Link> */}

                 
            </div>
        </div>
    );
};

export default Review;