import {
    withRouter,
  } from "react-router-dom";
import ButtonHomemade from './Button';
import AddressInput from './AddressInput';
import { useState } from 'react';
import Typography from '@material-ui/core/Typography';

const initialFormData = Object.freeze(  {
    address:"",
        createdAt:"",
        balance:0,
        transactions:[{
          to:"",
          howMany:0,
          when:"",
        }],
      });

const Explore = ({address, AddrHistory,history}) => {

    const [formData, updateFormData] = useState(initialFormData);

    const handleChangeText = async (e) => {

             /*   var newMessageObj = formData;
                //address:e.target.value.trim(),

                AddrHistory.map((element,i) => {
                    if(element.address===e.target.value.trim())
                        newMessageObj=element;
                    return true;
                });

            updateFormData(newMessageObj); 
                    //console.log(e.target.value.trim());
*/


var num=0;
                //address:e.target.value.trim(),

                AddrHistory.map((element,i) => {
                    if(element.address===e.target.value.trim())
                    num=i;
                    return true;
                });

            updateFormData(AddrHistory[num]); 
                    console.log(num);


      };

    return (
        <div>
               <ButtonHomemade text="Back" onClick={()=>{history.push("/Dashboard",) }}/>
               <AddressInput onTextChange={handleChangeText}/>
               <Typography component="h1" variant="h5">
          Balance: {formData.address!==""?formData.balance:"Unused Wallet addresses."}
        </Typography>

        </div>
    )
}

export default withRouter(Explore)
