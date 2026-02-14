import { useState } from "react"
import {FaFirstOrder, FaHome, FaShoppingCart } from "react-icons/fa"
import Men from "./Men"
import Navber from "../Navber"
function Dashboard (){
    const [open , setopen] = useState()
    return(
        <>
        <Navber/>
        <div className="">
            <div className=" mt-3">
                <ul className="flex justify-center items-center gap-13  "> 
                    <li className="hover:border-b ">women</li>
                    <li className="hover:border-b">jewelry</li>
               <li className="hover:border-b">men</li>
                    <li className="hover:border-b">sport</li>
                    <li className="hover:border-b"> toy</li>
                    <li className="hover:border-b">phone case</li>
                    <li className="hover:border-b">Home</li>
                </ul>
                <div className="py-2 text-green-300 py-2 bg-orange-100 px-7 mt-2  flex items-center gap-3">
                   <FaShoppingCart/>
                    <p className=" "> Free shipping on items shipping from onlineshop</p>
                </div>
            </div>
           <Men/>
        </div>
        
        
        
        
        </>
    )
}
export default Dashboard