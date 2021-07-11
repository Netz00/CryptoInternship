import NumericInputweb from 'react-numeric-input';

const NumericInput = ({id}) => {
    return (
        
              <NumericInputweb 
              id={id}
              className="form-control" 
              value={ 0 } 
              min={ 0 } 
              max={ 999999999 } 
              step={ 1 } 
              precision={ 0 } 
              maxLength={ 8 }
              size={ 8 }  
              required
              strict
            />
        
    )
}

export default NumericInput
