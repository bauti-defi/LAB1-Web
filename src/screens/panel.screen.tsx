import React from "react";
import {useCookies } from "react-cookie";
import { Button } from "react-bootstrap";



export default function PanelScreen(){

    const [cookie] = useCookies(['session'])

    return(
        <React.Fragment>
            <Button type='button' onClick={() => console.log(JSON.stringify(cookie.session))} >Show!</Button>
        </React.Fragment>
    );
}


