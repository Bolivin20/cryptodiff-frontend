import style from './ChangePassword.module.css';
import React, { useState, useEffect } from 'react';
import Box from '../../components/Box/Box';
import Page from '../../components/Page/Page';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import Padlock from '../../images/padlock.svg';
import { useNavigate } from 'react-router-dom';


function Change() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [jwtToken, setJwtToken] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
          const token = localStorage.getItem('token');
          if (!token) {
            navigate('/api/auth/authenticate');
            return;
          }
          setJwtToken(token);
        }, [navigate]);

    const handleCurrentPasswordChange = (event) => {
        setCurrentPassword(event.target.value);
      };

      const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value);
      };

      const handleRepeatPasswordChange = (event) => {
        setRepeatPassword(event.target.value);
      };

      const handleChangePassword = () => {
          if (newPassword !== repeatPassword) {
            alert("New Password and Repeat Password do not match.");
            return;
          }

          fetch('http://localhost:8080/api/changeUserPassword', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${jwtToken}`,
            },
            body: JSON.stringify({
              currentPassword: currentPassword,
              newPassword: newPassword,
            }),
          })
            .then(response => {
              if (response.ok) {
                alert("Password changed successfully.");
                setCurrentPassword('');
                setNewPassword('');
                setRepeatPassword('');
              } else {
                alert("changing password went wrong.");
              }
            })
            .catch(error => {
              console.log("Error changing password.", error);
              alert("Error changing password.");
            });
        };

    return (
        <Page>
            <div className={style.content}>
                <Box width='30%' padding='2em'>
                    <div className={style.align}>
                        <Input placeholder="••••••••••••" type="password" title="Current Password" inputIcon={Padlock} value={currentPassword} onChange={handleCurrentPasswordChange}/>
                        <Input placeholder="••••••••••••" type="password" title="New Password" inputIcon={Padlock} value={newPassword} onChange={handleNewPasswordChange}/>
                        <Input placeholder="••••••••••••" type="password" title="Repeate Password" inputIcon={Padlock} value={repeatPassword} onChange={handleRepeatPasswordChange}/>
                        <div onClick={handleChangePassword}><Button text='Change Password' width='60%'></Button></div>
                    </div>
                </Box>
            </div>
        </Page>
    );
}

export default Change;