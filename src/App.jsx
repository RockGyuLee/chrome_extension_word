import React from 'react';
import { ThemeProvider } from "styled-components";
import theme from "./theme.js";

export default function App(){

    return(
        <ThemeProvider theme={theme}>
            <div>Test</div>
        </ThemeProvider>
    )
}