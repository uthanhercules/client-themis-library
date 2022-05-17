import './styles.css';

interface IDeleteCustomer {
    setPopUp: boolean;
    handleDeleteCustomer: function;
}

function PopUpToDeleteCustomer({ setPopUp, handleDeleteCustomer }) {
  return (
    <section className='PopUp'>
      <span>Tem certeza que quer apagar esse cliente?</span>
      <section className='Buttons-PopUp'>
      <button 
      className='Left-PopUp'
      onClick={() => handleDeleteCustomer()}
      >
        Sim
      </button>
      <button 
      className='Right-PopUp'
      onClick={() => setPopUp(false)}
      >
        Não
      </button>
      </section>
   </section>
  )
}

export default PopUpToDeleteCustomer;