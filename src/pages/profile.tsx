import { useEffect, useState } from "react"
import {  quizABI2 } from "../web3/quizABI";
import Web3 from "web3";

export const Profile = () => {

     const [account, setAccount] = useState<string | null>(null);
  
  
    
      useEffect(() => {
        const initializeWeb3 = async () => {
          if (window.ethereum) {
            const web3Instance = new Web3(window.ethereum);
         
    
            const accounts: string[] = await web3Instance.eth.getAccounts();
            if (accounts.length > 0) {
              setAccount(accounts[0]);
    
              const contractInstance = new web3Instance.eth.Contract(
                quizABI2,
                "0x07DE14c07EE9155278cf2c2a640ae44d520DD378" // Replace with your deployed contract address
              );
             
    
              try {
                const data = await contractInstance.methods.getUsertotalScore(account).call({from:accounts[0]});
                console.log(data)
                
              } catch (err) {
                console.error("Error fetching quizzes:", err);
              }
            }
          }
        };
    
        initializeWeb3();
      }, []);
    
return(
    <div>{account}</div>
)
}