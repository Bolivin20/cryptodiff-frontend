import style from '../Login/Login.module.css';
import Logo from '../../components/Logo/Logo';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Letter from '../../images/letter.svg';
import Padlock from '../../images/padlock.svg';
//import Google from '../../images/google.svg';
import { Link } from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";


function Signup() {
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const [confirmPassword, setConfirmPassword]=useState("");
    const navigate = useNavigate();
    const [validPassword, setValidPassword]=useState(false);
    const [validEmail, setValidEmail]=useState(false);
    const [errorMsg, setErrorMsg]=useState("");


    useEffect(()=>
    {   if(email.trim().length !== 0)
          {
            setValidEmail(email.includes("@") && email.includes("."));
          }
          else
          {
            setValidEmail(false);
          }
         
    }, [email]);

    useEffect(()=>
    {
      if(password.trim().length !== 0 && confirmPassword.trim().length !== 0)
        {
          if( password===confirmPassword) {
            setValidPassword(true);
          }
          else
            setValidPassword(false);
  
        }
    },[password, confirmPassword]);

    useEffect(() => {
        console.log(validPassword);
        console.log(validEmail);
        if(!validEmail)
        setErrorMsg("Wrong email format.");
        else if(!validPassword)
        setErrorMsg("Passwords don't match.");
        else
        setErrorMsg("");
      }, [validPassword, validEmail]);

    const sendRegisterRequest=(event) => 
  {
      event.preventDefault();
      const data = { 
        email:email,
        password:password,
      };
    
      fetch("http://localhost:8080/api/auth/register", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((response) => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
        }).then((data) => {
            localStorage.setItem("token", data.access_token);
            navigate("/"); 
        }).catch((error) => {
            console.log("Error: " + error);
        });
    };
/*<div className={style.orBlock}>
                    <hr></hr>
                    Or
                    <hr></hr>
                </div>
<div className={style.googleButton}>
                    <img src={Google} alt="letter icon"></img>
                    Log in with Google
                </div>*/
    return (
        <div className={style.app}>
            <section className={style.bgImage}>
                <Link className={style.logoLink} to='/'><Logo /></Link>
                <div className={style.description}>
                    Check for the best offers from three biggest
                    crypto stock markets.
                </div>
            </section>
            <section className={style.sidePanel} >
                <h1>Sign Up</h1>
                <form onSubmit={sendRegisterRequest}>
                <Input placeholder="test@crypto.diff" type="text" title="Email Address" inputIcon={Letter} value = {email} onChange={(event)=>setEmail(event.target.value)}/>
                <Input placeholder="••••••••••••" type="password" title="Password" inputIcon={Padlock} value={password} onChange={(event)=>setPassword(event.target.value)}/>
                <Input placeholder="••••••••••••" type="password" title="Repeate Password" inputIcon={Padlock} value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)}/>
                <Button text='Sign Up' disabled={!validEmail || !validPassword ? true : false} id="submit" type="submit" ></Button>
                <p className={style.errorMsg} onChange={(event)=>setErrorMsg(event.target.value)}>{errorMsg}</p>
                </form>
                <p className={style.buttonText}>Already have an account ? <Link to='/api/auth/authenticate' className={style.link}>Sign in</Link></p>
            </section>
        </div>
    );
}

export default Signup;