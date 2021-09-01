import React, { useEffect, useState } from 'react';
import SignUpRegisterList from '../SignUpRegisterList/SignUpRegisterList';

const SignUpRegister = () => {
    const [register, setRegister] = useState([]);
    useEffect(() => {
        fetch('http://localhost:4007/signUpRegister')
        .then(res => res.json())
        .then(data => setRegister(data))
    }, [])
    return (
        <div>
            {
                register.map(data => <SignUpRegisterList key={data._id} registerList={data}></SignUpRegisterList> )
            }
        </div>
    );
};

export default SignUpRegister;