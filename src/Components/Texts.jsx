import react from "react";
import styled from "styled-components";

export const HText = styled.h1`
    font-size : ${props => props.size || "2rem"};
`

export const Text = styled.div`
    font-size : ${props => props.size || "1rem"}
`