import React, {useState, Fragment, useRef} from 'react';
import styled from 'styled-components';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown, faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";

// module import
import {Logo, Icon, calcWidthComponent} from "../components/Main";
import HeaderTab from '../components/HeaderTab';


function Header(){

    const [isTabVisible, setIsTabVisible] = useState(false);



    return(
        <Fragment>
            <HeaderTab isShow={isTabVisible} />
            <Logo
                css={{
                    "display" : "flex", "justify-content" : "center", "align-items" : "center",
                    "margin-left" : `${isTabVisible && calcWidthComponent(1.03)}%` 
                }}
                elg={0.5} lg={0.5} md={0.5} sm={0.5} esm={0.5} height={0.6} width={0.4}
                onClick={()=>{setIsTabVisible(!isTabVisible)}}
            >
                <Icon>
                <FontAwesomeIcon className="awesomeSvg"  icon={ isTabVisible ? faChevronRight : faChevronLeft} />
                </Icon>
            </Logo>
            
        </Fragment>
    )
}

export default Header;