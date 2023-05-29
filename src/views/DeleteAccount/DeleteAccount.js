import style from './DeleteAccount.module.css';
import React, { useState, useEffect } from 'react';
import Box from '../../components/Box/Box';
import Page from '../../components/Page/Page';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import Padlock from '../../images/padlock.svg';
import { useNavigate } from 'react-router-dom';


function Delete() {


    const [password, setPassword] = useState('');
    const [jwtToken, setJwtToken] = useState('');
    const navigate = useNavigate();

    const handleChangePassword = (event) => {
        setPassword(event.target.value);
      };

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/api/auth/authenticate');
        return;
      }
      setJwtToken(token);
    }, [navigate]);

    const handleDeleteAccount = () => {

          fetch('http://localhost:8080/api/deleteUser', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${jwtToken}`,
            },
            body: JSON.stringify({ password: password }),
          })
            .then(response => {
              if (response.ok) {
                alert("Account deleted");
                localStorage.removeItem('token');
                navigate('/api/auth/authenticate');
              }
            })
            .catch(error => {
              alert("Error")
              console.log(error);
            });
        }

    return (
        <Page>
            <div className={style.content}>
                <Box width='30%' padding='2em'>
                    <div className={style.align}>
                        <Input placeholder="••••••••••••" type="password" title="Password" value={password} onChange={handleChangePassword} inputIcon={Padlock} />
                        <div onClick={handleDeleteAccount}><Button  text='Delete Account' width='60%'></Button></div>
                    </div>
                </Box>
            </div>
        </Page>
    );
}

export default Delete;