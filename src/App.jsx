import React, { useState, useEffect} from 'react';
import { ThemeProvider } from "styled-components";
import { Provider } from 'react-redux';
import { createStore } from 'redux';

//modules
import "./style/App.css";
import "./style/common.styl";
import theme from "./theme.js";
import EngWordsPage from "./pages/WordPage";
import Header from "./pages/Logo";

export default function App(){

    return(
        <ThemeProvider theme={theme}>
            <Header/>
            <EngWordsPage/>
        </ThemeProvider>
    )
}