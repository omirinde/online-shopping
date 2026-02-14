import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Post() {
    const [ID, setID] = useState("")
    const [Name, setName] = useState("")
    const [price, setprice] = useState("")
    const [description, setdescription] = useState("")
    const [file, setifile] = useState(null)
   const navigate = useNavigate()
   
    const toggolesubmit = async (e) => {
        e.preventDefault()
      
       
        console.log(ID, Name, price, description, file)

        const formData = new FormData();
        formData.append("id", ID);
        formData.append("name", Name);
        formData.append("price", price);
        formData.append("description", description);
        formData.append("image", file); 

        try {
       
            const response = await fetch("http://127.0.0.1:8000//api/posts", {
                method: "POST",
                body: formData, 
            });

            if (response.ok) {
                const result = await response.json();
                console.log("Success:", result);
                alert("Post created successfully!");
                 navigate('/men');
                console.error("Upload failed");
            }
        } catch (error) {
            console.error("Error connecting to server:", error);
        }
    }

    return (
        <div className="text-center flex flex-col justify-center items-center px-10">
            <div className=" uppercase font-bold text-center pt-30 mb-10" >
                post job 
            </div>
            <div className="text-center">
                <div className="">
                    <form onSubmit={toggolesubmit}>
                        <input className="border py-2 px-3 rounded shadow-xl w-full " type="number" placeholder="Enter your ID "
                            onChange={e => setID(e.target.value)} value={ID} />
                        
                        <input className="border py-2 px-3 rounded shadow-xl w-full mt-5" type="text"
                            placeholder="Enter your Name " onChange={e => setName(e.target.value)} value={Name} />
                        
                        <input className="border py-2 px-3 rounded shadow-xl w-full mt-5 " type="number"
                            placeholder="Enter your Price " onChange={e => setprice(e.target.value)} value={price} />
                        
                        <input className="border py-2 px-3 rounded shadow-xl w-full mt-5" type="text"
                            placeholder="Enter your Description" onChange={e => setdescription(e.target.value)} value={description} />
                        
                        <input 
                            type="file" 
                            className="border py-2 px-3 rounded shadow-xl w-full mt-5"
                            onChange={e => setifile(e.target.files[0])} 
                            // 4. Value removed (not allowed on file inputs)
                        />
                        
                        <div className="mt-10">
                            <button type="submit" className="text-white rounded shadow py-2 px-4 bg-green-500"> post</button> 
                            <button type="button" className="text-white rounded shadow py-2 px-4 bg-red-600 ml-2">delete</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Post