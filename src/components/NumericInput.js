import NumericInputWeb from 'react-numeric-input';

const NumericInput = ({onChange}) => {
    return (
        
              <NumericInputWeb 
              id="NumericInput"
              name="NumericInput"
              min={ 0 } 
              step={ 0.1 } 
              precision={ 8 } 
              size={ 8 }  
              required
              strict
              onChange={onChange}
              style={{
                wrap: {
                    background: 'transparent',
                    boxShadow: '0 0 1px 1px #191616 inset, 1px 1px 1px -1px #191616',
                    padding: '2px 2.26ex 2px 2px',
                    borderRadius: '6px 3px 3px 6px',
                    fontSize: 32
                },
                input: {
                    background:'transparent',
                    borderRadius: '4px 2px 2px 4px',
                    padding: '0.1ex 1ex',
                    border: '1px solid #000000',
                    marginRight: 4,
                    display: 'block',
                    fontWeight: 100,
                    textShadow: '1px 1px 1px rgba(0, 0, 0, 0.1)'
                },
                'input:focus' : {
                    border: '3px solid #3f51b5',
                    outline: 'none'
                },
                arrowUp: {
                    borderBottomColor: 'rgb(0 0 0 / 71%)',
                },
                arrowDown: {
                    borderTopColor: 'rgb(0 0 0 / 71%)',
                }
            }}
            />
        
    )
}

export default NumericInput
