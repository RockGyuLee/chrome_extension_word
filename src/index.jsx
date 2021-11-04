import React from 'react';
import ReactDOM from 'react-dom';
import './style/common.styl'
import PortalReducer from "./PortalReducer";
import App from './App';



ReactDOM.render(
    <PortalReducer>
        <App/>
    </PortalReducer>
    , 
    document.getElementById('app')
)