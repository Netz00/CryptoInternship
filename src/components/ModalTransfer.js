import ModalWeb from 'react-modal';
import ButtonHomemade from './Button';
import NumericInput from './NumericInput';
import { useState } from 'react';
import AddressInput from './AddressInput';


const ModalTransfer = ({handleSubmit}) => {

    let subtitle;

    const [modalIsOpen, setIsOpen] = useState(false);
    const [errorMsg, updateErrorMsg] = useState("");

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

    

    const onSumbit =  (e) => {
      e.preventDefault();
      const address = e.target.elements.address.value.trim();
      const bal=e.target.elements.NumericInput.value.trim();
      if(!handleSubmit(address,bal))
      updateErrorMsg("Insufficient balance.");
      else
      updateErrorMsg("");

    };
  

    return (
        <div id="body3">
               <ButtonHomemade text="Transfer" onClick={openModal} />

               
                <ModalWeb
                sytle={{backgroundcolor:'green'}}
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                contentLabel="Mint"
                appElement={document.getElementById('body3')}

                >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Mint</h2>
                <button onClick={closeModal}>close</button>
                <form onSubmit={onSumbit}>
                    <p id="errorMsg">{errorMsg}</p>
                    <NumericInput />
                    <AddressInput />
                    <button>Transfer</button>
                </form>
                </ModalWeb>
        </div>
        
    )
}

export default ModalTransfer
