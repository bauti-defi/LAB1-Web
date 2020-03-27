import React, { Component } from "react";
import { withCookies, Cookies } from "react-cookie";


interface Props{
    cookies:Cookies;
}

class PanelScreen extends Component<Props, any>{

    render(){
    return (
        <React.Fragment>
            <label>Cookie: {JSON.stringify(this.props.cookies)}</label>
        </React.Fragment>
    )
    }

}

export default withCookies(PanelScreen)