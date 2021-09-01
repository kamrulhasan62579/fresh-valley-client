import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import CheakOutRegisterList from '../CheakOutRegisterList/CheakOutRegisterList';

const CheakOutRegister = () => {  

    const [cheakOutData, setCheakOutData] = useState([]);
    
    useEffect(() => {
        fetch('http://localhost:4007/cheakOutData')
        .then(res => res.json())
        .then(data => setCheakOutData(data))
    }, [])

  

    return (
        <div>
            {
               cheakOutData.map(order => <CheakOutRegisterList key={order._id} cheakOut={order}></CheakOutRegisterList> ) 
            }
        </div>
    );
};

export default CheakOutRegister;