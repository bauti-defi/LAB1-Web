import React, { Component  } from 'react';

export default class SignUp extends Component {
    render(){
        return (
            <form>
                <h3>Registrarse</h3>

                <div className="form-group">
                    <label> Ingrese el nombre de Barrio </label>
                    <input type='text' className='form-control' placeholder=''/>
                </div>

                <div className="form-group">
                    <label> Ingrese el correo electrónico del barrio </label>
                    <input type='text' className='form-control' placeholder=''/>
                </div>

                <div className='form-group'>
                    <label>Ingrese la contraseña</label>
                    <input type='text' className='form-control' placeholder=''/>
                    <label> Ingrese nuevamente la contraseña </label>
                    <input type='text' className='form-control' placeholder=''/>
                </div>

                <button type='submit'> Aceptar </button>
            </form>
        );
    }
}
