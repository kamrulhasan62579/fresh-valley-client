import { MDBBtn } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { addToDatabaseCart, getDatabaseCart } from '../../Utilities/DatabaseManager';
import CardData from '../CardData/CardData';
import Cart from '../Cart/Cart';

const Home = () => {
    const [cart, setCart] = useState([]);

    console.log(cart);
    const [getData, setGetData] = useState([]);
    // console.log(getData);

 
    // useEffect(() => {
    //     fetch('http://localhost:4007/product')
    //     .then(res => res.json())
    //     .then(data => console.log(data)
    // }, [])
    useEffect(() => {
        fetch('http://localhost:4007/product')
        .then(res => res.json())
        .then(data => setGetData(data))
    }, [])

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart)
        if(getData.length){
            const cartProducts = productKeys.map(id => {
                const produ = getData.find(pd => pd._id === id)
                produ.quantity = savedCart[id]
                return produ;
            }) 
            setCart(cartProducts)
        }
    }, [getData])
    const handleAddCart = (product) => {
        const sameProduct = cart.find(pd => pd._id === product._id)
        let newCart;
        let count = 1 ;
        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd._id !== product._id);
            newCart = [...others, sameProduct];
        }
        else{
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        addToDatabaseCart(product._id, count)
    }
    const history = useHistory();
    const handleReview = () => {
         history.push('/review')
    }
    return (
        <div style={{display: 'flex'}}>
           <div>
                {
                    getData.map(product => <CardData key={product._id} product={product} handleAddCart={handleAddCart}>
                        <MDBBtn onClick={() => handleAddCart(product)}>Buy Now</MDBBtn>   
                    </CardData> )
                }
           </div>
           <div>
                <Cart cart={cart}>
                <MDBBtn onClick={handleReview}>Review</MDBBtn>   
                </Cart>
           </div>
        </div>
    );
};

export default Home;