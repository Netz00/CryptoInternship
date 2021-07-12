import Modal from "react-modal";
import NumericInput from "./NumericInput";
import { useState } from 'react';
import ButtonHomemade from './Button';


const ModalMint = ({handleMint}) => {
    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);


    function openModal() {
        setIsOpen(true);
      }
    
      function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = "#f00";
      }
    
      function closeModal() {
        setIsOpen(false);
      }
    
      const handleMintSubmit = (e) => {
        e.preventDefault();
        handleMint(e.target.elements.NumericInput.value);
      };
    
  return (
    <div id="body2">
      <ButtonHomemade text="Mint" onClick={openModal} />

      <div>
        <Modal
          sytle={{ backgroundcolor: "green" }}
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          contentLabel="Mint"
          appElement={document.getElementById("body2")}
        >
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Mint</h2>
          <button onClick={closeModal}>close</button>
          <form onSubmit={handleMintSubmit}>
            <NumericInput id="NumericInput" />
            <button>Mint</button>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default ModalMint;
