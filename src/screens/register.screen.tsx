import React, { useState  } from 'react';
import { Redirect } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const axios = require('axios').default;


interface State{
    email:string;
    name:string;
    password:string;
    confirm_password:string;
    message:string;
    to_login:boolean;
}

function RegisterScreen(){

    const [cookie] = useCookies(['session'])

    const authenticated = !!cookie.session

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const [isRegistered, setIsRegistered] = useState(authenticated)


    function handleSubmit(event){

        if(isBlank(name)){
            setMessage('Name is blank!')
        }else if(isBlank(email)){
            setMessage('Email is blank!')
        }else if(isBlank(password)){
            setMessage('Password is blank!')
        }else if(password !== confirmPassword){
            setMessage("Passwords don't match!")
        }else{
            axios({
                method: 'post',
                url: 'http://localhost:3500/barrio/register',
                data:{email, name, password}
            }).then(response => {
                setIsRegistered(true)
            }).catch(error => setMessage(`Error: ${error.message}`))
        }
    }

        return (
           <React.Fragment>
            {isRegistered || authenticated ? 
            <Redirect to='/login' />
            :
            <div style={{
                position: 'absolute', left: '50%', top: '50%',
            }}>
                <h3>Registrarse</h3>
                <label>{message}</label>
                <div className="form-group">
                    <label> Ingrese el nombre de Barrio 
                    <input type='text' name='name' value={name} onChange={(event) => setName(event.target.value)} className='form-control' placeholder='' />
                    </label>
                </div>

                <div className="form-group">
                    <label> Ingrese el correo electrónico del barrio 
                    <input type='email' name='email' value={email} onChange={(event) => setEmail(event.target.value)} className='form-control' placeholder=''/>
                    </label>
                </div>

                <div className='form-group'>
                    <label>Ingrese la contraseña
                    <input type='password' name='password' value={password} onChange={(event) => setPassword(event.target.value)} className='form-control' placeholder=''/>
                    </label>
                </div>

                <div>
                    <label> Ingrese nuevamente la contraseña 
                        <input type='password' name='confirm_password' value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className='form-control' placeholder=''/>
                    </label>
                </div>

                <button type='button' onClick={handleSubmit}> Registrar </button>
            </div>
            }
            </React.Fragment>
        );
    
}

function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}



export default RegisterScreen