import { useState } from "react"
import { FaCreditCard } from "react-icons/fa"
import { Form } from "react-router-dom"

function Banktransfer(){
   const submithandle = (e) =>{
  e.preventDefault()
  console.log(cardname, carnumber,cvv,expiration)
   }
 const[carnumber, setcardnumber] = useState()
 const[cardname, setcardname] = useState()
 const[cvv, setcvv] = useState()
 const[expiration, setexpiration] = useState()

    return(
        <>
        <div className="bg-gray-200 h-screen">
            <div className=" px-6 pt-5 ">
                <h1 className="text-3xl font-semibold ">Shoping Card </h1>
             <div className="">
             <p> payment method:</p>
             <div className="flex items-center gap-3 ">
                <input type="radio" className="text-2xl"/>
                <div className=" flex items-center gap-1">
                    <FaCreditCard/>
                    <p>Credit Card</p>
                </div>
             </div>
             <div className="mt-5">
                <form onClick={submithandle}>
                    <label>Name on Card</label>
                    <input type="text" placeholder="Enter name on card" 
                    className="border  w-full py-2 px-3 rounded "
                    value={cardname}
                    onChange={e=>setcardname(e.target.value)}
                
                    />
                   
                   <p className="mt-5">Card Number</p>
                    <input type="number" value={carnumber} onChange={e=>setcardnumber(e.target.value)}
                     placeholder="Enter number on card" className="border w-full py-2 px-3 rounded "/>
                 <div className=" flex justify-between mt-5 gap-2">
                    <div className="">
                         <label>Expiration Date</label>
                    <input type="number" value={expiration} onChange={e=>setexpiration(e.target.value)}
                     placeholder="Enter expiration date" 
                     className="w-full border rounded px-3 py-2"/>
                    </div>
                    <div className="">
                         <label>CVV</label>
                    <input type="number " value={cvv} onChange={e=>setcvv(e.target.value)}
                     className="border px-3 py-2 rounded w-full"/>
                    </div>
                 </div>
                  <button className="text-white font-semibold  text-xl bg-green-400 py-2 px-3 mt-10 w-full rounded"> check Out</button>
                </form>
             </div>
             </div>
               
               
            </div>
        </div>
        
        </>
    )
 }
export default Banktransfer