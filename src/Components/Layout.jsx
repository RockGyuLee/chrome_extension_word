import react from "react";
import styled from "styled-components";

export const Layout = styled.div`
    width : ${ props => props.width || "100%"};
    height : ${ props => props.height || "100%"};
`