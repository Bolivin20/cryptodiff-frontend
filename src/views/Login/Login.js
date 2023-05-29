import style from './Login.module.css';
import Logo from '../../components/Logo/Logo';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Letter from '../../images/letter.svg';
import Padlock from '../../images/padlock.svg';
//import Google from '../../images/google.svg';
import { Link } from 'react-router-dom';
import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";


function Login() {
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const [errorMsg, setErrorMsg]=useState("");
    const navigate = useNavigate();
    const sendLoginRequest=(event) => 
  {
      event.preventDefault();
      const data = { 
        email:email,
        password:password,
      };
    
      fetch("http://localhost:8080/api/auth/authenticate", {
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
       
      })
      .then((data) => {
        localStorage.setItem("token", data.access_token);
        navigate("/"); 
      })
      .catch((error) => {
        console.log("Error: " + error);
        setErrorMsg("Wrong email or password.");
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
            <section className={style.sidePanel}>
                <h1>Log In</h1>
                <form onSubmit={sendLoginRequest}>
                <Input placeholder="test@crypto.diff" type="text" title="Email Address" inputIcon={Letter} value={email} onChange={(event)=>setEmail(event.target.value)}/>
                <Input placeholder="••••••••••••" type="password" title="Password" inputIcon={Padlock} value={password} onChange={(event)=>setPassword(event.target.value)}/>
                <Button text='Sign In'></Button>
                <p className={style.errorMsg} onChange={(event)=>setErrorMsg(event.target.value)}>{errorMsg}</p>
                </form>
                <p className={style.buttonText}>Don&apos;t have an account ? <Link to='/api/auth/register' className={style.link}>Sign up</Link></p>
            </section>
        </div>
    );
}

export default Login;