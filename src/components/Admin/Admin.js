import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function Admin() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [img, setImg] = useState();
  // console.log(img);

  const handleChange = (event) => {
      const formData = new FormData();
      formData.set('key', '5d82ff270da3df3d9680ac64b28e5540')
      formData.append('image', event.target.files[0])
      axios.post('https://api.imgbb.com/1/upload', formData)
      .then(res => {
         setImg(res.data.data.display_url)
      })
      
  }

  const onSubmit = data => {
      const newData = {...data, image: img};
     if(img){
        fetch('http://localhost:4007/product', {
            method: 'POST',
            body: JSON.stringify(newData),
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(dat => {
            console.log(dat)
            alert('Data Submitted Successfully')
        })
     }
  };



  return (
   <div>
        <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          
          <input placeholder="Product Name" {...register("productName", { required: true })} />
          {errors.productName && <span>Product Name is required</span>}

          <br/><br/>

          <input placeholder="Weight" {...register("weight", { required: true })} />
          {errors.weight && <span>Weight is required</span>}

          <br/><br/>

          <input placeholder="Price" {...register("price", { required: true })} />
          {errors.price && <span>Price is required</span>}

          <br/><br/>

          <input type="file" onChange={handleChange}/>

          <br/><br/>
          
          <input type="submit" />
        </form>
     </div>
     <div>
       <ul>
         <li>
           <Link to='/signUpRegister'>Sign Up Register List</Link>
         </li>
         <li>
           <Link to='/cheakOutRegister'>Individual Orders</Link>
         </li>
       </ul>
     </div>
   </div>
  );
}