import React, { useState } from 'react';
import {withCookies, useCookies} from 'react-cookie'
import { Redirect } from 'react-router-dom';


const axios = require('axios').default;

function LoginScreen(){

    const [cookie, setCookie] = useCookies(['session'])

    const authenticated = !!cookie.session

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    function handleLogin(event){
        if(isBlank(email) || isBlank(password)){
            setMessage('Email o contraseña mala.')
        }else{
            axios({
                method: 'post',
                url: 'http://localhost:3500/auth/login',
                data:{email, password}
            }).then(response => {
                if(response.data === 'Invalid credentials.'){
                    setMessage('Email o contraseña mala.')
                }else{
                    setCookie('session', response.data)
                }
            }).catch(error => setMessage('Email o contraseña mala.'))
        }

    }

        return (
            <React.Fragment>
                {authenticated? 
                <Redirect to='/panel'/>
                :
                <div style={{
                    position: 'absolute', left: '50%', top: '50%',
                }}>
                    <h3>Ingresar</h3>

                    <div className="form-group">
                        <label>Email</label>
                        <input type='email' name='email' className='form-control' placeholder='email' onChange={(event) => setEmail(event.target.value)}/>
                    </div>

                    <div className='form-group'>
                        <label>Contraseña</label>
                        <input type='password' name='password' className='form-control' placeholder='Contraseña' onChange={(event) => setPassword(event.target.value)}/>
                    </div>
                    <div>
                        <label>{message}</label>
                    </div>
                
                    <button type='button' onClick={handleLogin}> Ingresar </button>
                    <p className='registrar-usuario'>
                        Aun no tiene un usuario? <a href='/register'> Registrarse</a> 
                    </p>
                </div>
                }
            </React.Fragment>
        );
}


function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}

export default withCookies(LoginScreen)


