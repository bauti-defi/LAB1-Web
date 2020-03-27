import React, { Component } from "react";
import { withCookies, Cookies } from "react-cookie";


interface Props{
    cookies:Cookies;
}

class PanelScreen extends Component<Props, any>{

    render(){
    return (<label>Cookie: {JSON.stringify(this.props.cookies)}</label>)
    }

}

export default withCookies(PanelScreen)