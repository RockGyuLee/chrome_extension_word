import react from "react";
import styled from "styled-components";

export const HText = styled.h1`
    font-size : ${props => props.size || "2rem"};
    font-family : Sunflower;
`

export const Text = styled.div`
    font-size : ${props => props.size || "1rem"};
    color : ${props => props.color || "black"};
    font-family : Sunflower;
`