import React, { Component  } from 'react';
import { Redirect } from 'react-router-dom';
import { withCookies } from 'react-cookie';

const axios = require('axios').default;


interface State{
    email:string;
    name:string;
    password:string;
    confirm_password:string;
    message:string;
    to_login:boolean;
}

class RegisterScreen extends Component<any, State> {

    constructor(props){
        super(props)
        this.state = {
            email: '',
            name: '',
            password:'',
            confirm_password:'',
            message:'',
            to_login: false
        }
        
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.updateMessage = this.updateMessage.bind(this)
    }

    handleChange(event){
        const target = event.target
        const name = target.name

        this.setState((prevState:State, props) => ({
            ...prevState,
            [name]:target.value
        })
        )
    }

    updateMessage(message){
        this.setState({message})
    }

     handleSubmit(event){
        const {
            email,
            name,
            password, 
            confirm_password
        } = this.state

        if(isBlank(name)){
            this.updateMessage('Name is blank!')
            event.preventDefault()
        }else if(isBlank(email)){
            this.updateMessage('Email is blank!')
            event.preventDefault()
        }else if(isBlank(password)){
            this.updateMessage('Password is blank!')
            event.preventDefault()
        }else if(password !== confirm_password){
            this.updateMessage("Passwords don't match!")
            event.preventDefault()
        }else{
            axios({
                method: 'post',
                url: 'http://localhost:3500/admin/register',
                data:{email, name, password}
            }).then(response => {
                this.setState({to_login:true})
            }).catch(error => this.updateMessage(`Error: ${error.message}`))
        }
    }

    render(){
        return (
           <React.Fragment>
            {this.state.to_login || !!this.props.cookies.get('session') ? 
            <Redirect to='/login' />
            :
            <React.Fragment>
                <h3>Registrarse</h3>
                <label>{this.state.message}</label>
                <div className="form-group">
                    <label> Ingrese el nombre de Barrio 
                    <input type='text' name='name' value={this.state.name} onChange={this.handleChange} className='form-control' placeholder='' />
                    </label>
                </div>

                <div className="form-group">
                    <label> Ingrese el correo electrónico del barrio 
                    <input type='email' name='email' value={this.state.email} onChange={this.handleChange} className='form-control' placeholder=''/>
                    </label>
                </div>

                <div className='form-group'>
                    <label>Ingrese la contraseña
                    <input type='password' name='password' value={this.state.password} onChange={this.handleChange} className='form-control' placeholder=''/>
                    </label>
                    <label> Ingrese nuevamente la contraseña 
                    <input type='password' name='confirm_password' value={this.state.confirm_password} onChange={this.handleChange} className='form-control' placeholder=''/>
                    </label>
                </div>

                <button type='button' onClick={this.handleSubmit}> Registrar </button>
            </React.Fragment>
            }
            </React.Fragment>
        );
    }
}

function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}



export default withCookies(RegisterScreen)