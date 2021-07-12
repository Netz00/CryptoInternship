import ModalWeb from 'react-modal';
import ButtonHomemade from './Button';
import NumericInput from './NumericInput';
import { useState } from 'react';
import AddressInput from './AddressInput';


const ModalTransfer = ({handleSubmit}) => {

    let subtitle;


    const [modalIsOpen, setIsOpen] = useState(false);
    const [formData, updateFormData] = useState("");

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

    const handleChangeText = async (e) => {
      updateFormData(e.target.value.trim()); 
    };

    const onSumbit =  (e) => {
      e.preventDefault();
      handleSubmit(formData,e.target.elements.NumericInput.value);
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

                    <NumericInput 
                        id="NumericInput"
                    />
                    <AddressInput onTextChange={handleChangeText}/>
                    <button>Transfer</button>
                </form>
                </ModalWeb>
        </div>
        
    )
}

export default ModalTransfer
