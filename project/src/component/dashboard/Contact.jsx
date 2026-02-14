import { FaPhone, FaRoad, FaShoppingCart, FaVoicemail } from "react-icons/fa"
import { useState } from "react"
function Contact(){
    
    return (
        <>
       <div className="">
        <div className="text-center justify-center items-center h-screen px-10 bg-sky-200 ">
          <div className ="pt-40 " >
            <p >Quality You Can Trust.
               Delivery You Can Count On.
                We curate the best in
                 [Category, e.g., Home & Tech] so
                  you don’t have to. Experience seamless shopping, secure payments, and lightning-fast shipping. 📦 Free shipping on orders over $50. 
              #QualityMatters #SmartShopping</p>
          </div>
           <div className="text-center  mt-6">
            <div className="text- font-bold ">
              <p className="flex items-center ">Address : SOKOTO STATE UNIVERSITY,  MODURAWA AREA P .O.BOX  ALONG AIRPORT ROAD </p>
             <p className="flex  items-center gap-2 ">   NUMBER: <FaPhone/> 08168621705, 09154688044</p>
            <p></p>
            </div>
           </div>
        </div>
        </div>
        
        </>
    )

}
export default Contact