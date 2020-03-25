import React, { Component } from 'react';

class LoginScreen extends Component {
    render (){
        return (
            <form>
                <h3>Ingresar</h3>

                <div className="form-group">
                    <label> Ingrese el nombre de Barrio </label>
                    <input type='text' className='form-control' placeholder='barrio'/>
                </div>

                <div className='form-group'>
                    <label>Ingrese la contraseña</label>
                    <input type='text' className='form-control' placeholder='Contraseña'/>
                </div>

                <button type='submit'> Aceptar </button>
                <p className='registrar-usuario'>
                    Aun no tiene un usuario? <a href='/register'> Registrarse</a> 
                </p>
            </form>
        );
    }
}

export default LoginScreen
