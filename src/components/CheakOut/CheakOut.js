import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../App";
import { getDatabaseCart } from "../../Utilities/DatabaseManager";

export default function CheakOut() {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext)
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [getData, setGetData] = useState([]);
  const [cart, setCart] = useState([]);
  // console.log(cart)

  useEffect(()=> {
      fetch('http://localhost:4007/product')
      .then(res => res.json())
      .then(data => setGetData(data))
  }, [])

  useEffect(()=> {
      const savedCart = getDatabaseCart();
      const productKeys = Object.keys(savedCart)
      if(getData.length){
          const cartProducts = productKeys.map(key => {
              const produ = getData.find(pd => pd._id === key)
              produ.quantity = savedCart[key]
              return produ;
          })
          setCart(cartProducts);
      }
  }, [getData])

  const onSubmit = data => {
    console.log(data)
    const newData = {shippingData:data, ...loggedInUser, cart}
    console.log(newData);
       if(newData){
          fetch('http://localhost:4007/cheakOutData',{
            method: 'POST',
            body: JSON.stringify(newData),
            headers: {
              'Content-type': 'application/json'
            }
          })
          .then(res => res.json())
          .then(data => console.log(data))
       }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input defaultValue={loggedInUser.displayName} {...register("name")} />

      <br/><br/>
      
      <input placeholder="Village Name" {...register("village", { required: true })} />
      {errors.village && <span>Village Name is required</span>}

      <br/><br/>

      <input placeholder="Post Code" {...register("postCode", { required: true })} />
      {errors.postCode && <span>Post Code is required</span>}


      <br/><br/>
      
      <input type="submit"/>
    </form>
  );
}