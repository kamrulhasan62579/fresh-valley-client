import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import React, { useEffect, useState } from 'react';
import { MDBCard, MDBCardBody, MDBCardImage, MDBBtn} from 'mdb-react-ui-kit';

export default function CardData(props) {
  const {productName, weight, price, image} = props.product;
  

  //  const { productName, weight, image} = product;
  
  return (
    <MDBCard style={{ width: '20rem', width: '20rem' }}>
       <div style={{display: 'flex'}}>
          <h5>
              {productName}
          </h5>
          <h5>
            -{weight}
          </h5>
       </div>
      <MDBCardImage src={image} alt='...' position='top'/>
      <MDBCardBody>
        
        <div style={{textAlign: 'center'}}>
          <h4 style={{color: 'red', paddingRight: '25px'}}>${price}</h4>
          {
            props.children
          }
        </div>
        <div style={{padding: '10px 0 0 75px'}}>

          </div>   
      </MDBCardBody>
    </MDBCard>
  );
}