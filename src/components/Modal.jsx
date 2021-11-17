import React, { Fragment }  from 'react';
import Modal from 'react-modal';
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faTimes, faFan } from "@fortawesome/free-solid-svg-icons";

//modules
import { hover, H1UnLine } from "../components/Main";

const customStyles = {
  content: {
    width : '60vw',
    height : '85vh',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-20%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement("#root-modal");

function CustomModal({isOpen, updating, closeModal, headerText, children}){
 
    return (
        <Modal isOpen={isOpen} style={customStyles}>
          <H1UnLine>
              {headerText && headerText}
              <FontAwesomeIcon style={hover} icon={faTimes} pull='right' onClick={closeModal}/>
          </H1UnLine>
          {children}
        </Modal>
    )
}

export default CustomModal;