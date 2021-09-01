import React, { useContext, useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

import { UserContext } from '../../App';
// import { GoogleAuthProvider } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useHistory, useLocation } from 'react-router-dom';




  
const app = initializeApp(
    {
        apiKey: "AIzaSyCtuFftd9VcEBygPuRB8tQZ-lrMmlm90gs",
        authDomain: "fresh-valley-a7de2.firebaseapp.com",
        projectId: "fresh-valley-a7de2",
        storageBucket: "fresh-valley-a7de2.appspot.com",
        messagingSenderId: "646836751327",
        appId: "1:646836751327:web:51a4da055a0885e8d7926a"
      }
);
const Login = () => {


    const [loginRegister, setLoginRegister] = useState({}); 
    console.log(loginRegister);


    let history = useHistory();
    let location = useLocation();
  
    let { from } = location.state || { from: { pathname: "/" } };

    const [newUser, setNewUser] = useState(false);  
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    // console.log(loggedInUser);
    const auth = getAuth();
   
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        // console.log(data)
       if(newUser){
        createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((res) => {
            console.log(res);
            console.log('Created User Successfully');
            const newUser = {...loggedInUser};
            newUser.signUpDate = new Date().toDateString();
            newUser.displayName = data.displayName;
            newUser.email = data.email;
            setLoggedInUser(newUser);
            if(data.email){
                setLoginRegister(newUser)
            }
            // history.replace(from);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
       }
       if(!newUser){
        signInWithEmailAndPassword(auth, data.email, data.password)
        .then((res) => {
            setLoggedInUser(data)
            // console.log(res);
            history.replace(from);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
       }
    };
    // implement google sign in ---------------------------------------
    const provider = new GoogleAuthProvider();
    const handleGoogleSignUp = () => {
        signInWithPopup(auth, provider)
        .then((res) => {
            const user = {...loggedInUser};
            user.signUpDate = new Date().toDateString()
            user.displayName = res.user.displayName
            user.email = res.user.email
            setLoggedInUser(user)
            console.log(res);
           if (res._tokenResponse.isNewUser === true) {
            setLoginRegister(user)
           }
           else{
            history.replace(from);
           }
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.log(errorCode, errorMessage, email, credential);
        });

    }

    useEffect(()=> {
       if(loginRegister.email){
        fetch('http://localhost:4007/signUpRegister', {
            method: 'POST',
            body: JSON.stringify(loginRegister),
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data =>{
                console.log(data)
                history.replace(from);        
        })
       }
    }, [loginRegister.email])
    return (
        <div>
            {
                newUser ? <form onSubmit={handleSubmit(onSubmit)}>
                <div className="newUserForm">
                    <input className="input" type="text" placeholder="Full Name" {...register("displayName", {required: true, maxLength: 8})} /> 
                    <br/>{errors.displayName && errors.displayName.type === "required" && <span className="error">First name is required</span>}
                    {errors.displayName && errors.displayName.type === "maxLength" && <span className="error">Max length exceeded</span> }
                    
                    <br/> <br/>

                    <input className="input" type="text" placeholder="Email" {...register("email", {required: true, pattern: /\S+@\S+\.\S+/})} />    
                    <br/>{errors.email && errors.email.type === "required" && <span className="error">Email is required</span>}
                    {errors.email && errors.email.type === "pattern" && <span className="error">You should insert email like this format /\S+@\S+\.\S+/ pattern</span> }
                    
                    <br/> <br/>

                    <input className="input" type="tel" placeholder="Mobile number" {...register("number", {required: true, minLength: 6, maxLength: 12})} />   
                    <br/> {errors.number && errors.number.type === "required" && <span className="error">Mobile number is required</span>}
                    {errors.number && errors.number.type === "maxLength" && <span className="error">Max length exceeded</span> }
                   
                    <br/><br/>

                    <input className="input" type="password" placeholder="Password" {...register("password", {required: true, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/, minLength: 8, maxLength: 30})} />
                    <br/> {errors.password && errors.password.type === "required" && <span className="error">Password is required</span>}
                    {errors.password && errors.password.type === "pattern" && <span className="error">Password must have min 1 uppercase letter,  <br/> min 1 lowercase letter, min 1 <br/> special character, min 1 number, min <br/> 8 characters, max 30 characters.</span> }
                    
                    <br/> <br/>

                        <div className="radioInput">
                        <span>Are you a developer?</span>  <br/>
                            <label htmlFor="Developer">1. Yes</label> <input  {...register("Developer", { required: true })} type="radio" value="Yes" /> <br/>
                            <label htmlFor="Developer">2. No</label> <input {...register("Developer", { required: true })} type="radio" value="No" /> 
                        </div>
                    
                    <br/> <br/>

                    <input className="input" value="Submit" type="submit" />
                </div>
            </form>
            : 
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="newUserForm">
                    <input className="input" type="text" placeholder="Email" {...register("email", {required: true})} />    
                    <br/>{errors.email && errors.email.type === "required" && <span className="error">Email is required</span>}
                   
                    <br/> <br/>

                    <input className="input" type="password" placeholder="Password" {...register("password", {required: true})} />
                    <br/> {errors.password && errors.password.type === "required" && <span className="error">Password is required</span>}
                    
                    <br/> <br/>

                    <input className="input" value="Submit" type="submit" />
                </div>
            </form>
            } <br/>
            {
            newUser ? <p >Already have an account? <span style={{color: 'blue'}} onClick={() => setNewUser(!newUser)}>Log In</span></p> : 
            <p>Are you a new user? <span style={{color: 'blue'}} onClick={() => setNewUser(!newUser)}>Sign Up</span></p>
            }
            <p style={{color: 'blue'}} onClick={handleGoogleSignUp}>Continue With Google</p>
        </div>
    );
};

export default Login;