import React, { useState } from 'react';



function Modal(props){

        function hideModal(event){
        let target = event.target;

        if (target.id == "modal"){
           props.onHideModal();
            }
    }

    

    return(
        <div id="modal" onClick={hideModal} className ={props.show ? "modal" : "modal hiddenModal"}>
            {props.children}
        </div>
    )

}

export default Modal;