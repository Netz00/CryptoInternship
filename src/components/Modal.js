import ModalWeb from 'react-modal';
import ButtonHomemade from './Button';
import NumericInput from './NumericInput';
import { useState } from 'react';

ModalWeb.setAppElement(document.getElementById('body2'));


const Modal = ({text,handleSubmit}) => {

    let subtitle;


    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
      setIsOpen(true);
    }
  
    function afterOpenModal() {
      // references are now sync'd and can be accessed.
      subtitle.style.color = '#f00';
    }
  
    function closeModal() {
      setIsOpen(false);
    }
  

    return (
        <div id='body2'>
               <ButtonHomemade text={text} onClick={openModal} />

               
                <Modal
                sytle={{backgroundcolor:'green'}}
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                contentLabel="Mint"
                >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Mint</h2>
                <button onClick={closeModal}>close</button>
                <form onSubmit={handleSubmit}>

                    <NumericInput 
                        id="NumericInput"
                    />
                    <button>{text}</button>
                </form>
                </Modal>
                
        </div>
    )
}

export default Modal
