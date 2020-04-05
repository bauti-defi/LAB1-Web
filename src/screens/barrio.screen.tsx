
import React, { useState } from 'react';
import {withCookies, useCookies} from 'react-cookie'
import { Redirect } from 'react-router-dom';
const axios = require('axios').default;

function BarrioScreen(){
    return(
        <React.Fragment>
        <h3>
        Información de Barrio</h3>
        </React.Fragment>
    );

}

export default withCookies(BarrioScreen)
