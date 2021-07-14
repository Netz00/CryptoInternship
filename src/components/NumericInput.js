import NumericInputweb from 'react-numeric-input';

const NumericInput = ({onChange}) => {
    return (
        
              <NumericInputweb 
              id="NumericInput"
              name="NumericInput"
              value={ 0 } 
              min={ 0 } 
              max={ 999999999 } 
              step={ 1 } 
              precision={ 0 } 
              maxLength={ 8 }
              size={ 8 }  
              required
              strict
              onChange={onChange}
              style={{
                wrap: {
                    background: '#E2E2E2',
                    boxShadow: '0 0 1px 1px #fff inset, 1px 1px 5px -1px #000',
                    padding: '2px 2.26ex 2px 2px',
                    borderRadius: '6px 3px 3px 6px',
                    fontSize: 32
                },
                input: {
                    background:'transparent',
                    borderRadius: '4px 2px 2px 4px',
                    color: '#988869',
                    padding: '0.1ex 1ex',
                    border: '1px solid #ccc',
                    marginRight: 4,
                    display: 'block',
                    fontWeight: 100,
                    textShadow: '1px 1px 1px rgba(0, 0, 0, 0.1)'
                },
                'input:focus' : {
                    border: '1px inset #69C',
                    outline: 'none'
                },
                arrowUp: {
                    borderBottomColor: 'rgba(66, 54, 0, 0.63)'
                },
                arrowDown: {
                    borderTopColor: 'rgba(66, 54, 0, 0.63)'
                }
            }}
            />
        
    )
}

export default NumericInput
