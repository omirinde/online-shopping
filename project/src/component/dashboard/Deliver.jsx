import { useState } from "react";

const Deliver =() =>{
    const [formData, setFormData] = useState({
        full_name: "",
        phone_number: "",
        email: "",
        street: "",
        city: "",
        contury: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:8000/api/delivery-info', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const result = await response.json();
            alert(result.message);
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };
    return(
        <>
        <div className="flex flex-col items-center justify-center pt-20">
            <div className="border border-blue-200 px-10 py-5 rounded">
                <p className="pb-4 font-bold text-3xl text-center">Delivery Page</p>
                
                <form className="flex flex-col" onSubmit={handleSubmit}>
                    <input name="full_name" onChange={handleChange} className="border px-2 py-2 rounded shadow border-blue-200" placeholder="Full name" type="text" />
                    <input name="phone_number" onChange={handleChange} className="border px-2 py-2 rounded shadow mt-5 border-blue-200" placeholder="Phone Number" type="number" />
                    <input name="email" onChange={handleChange} className="border px-2 py-2 rounded shadow mt-5 border-blue-200" placeholder="Email" type="email" />
                    <input name="street" onChange={handleChange} className="border px-2 py-2 rounded shadow mt-5 border-blue-200" placeholder="Street" type="text" />
                    <input name="city" onChange={handleChange} className="border px-2 py-2 rounded shadow mt-5 border-blue-200" placeholder="City/Town" type="text" />
                    <input name="contury" onChange={handleChange} className="border px-2 py-2 rounded shadow mt-5 border-blue-200" placeholder="Country" type="text" />
                    
                    <button type="submit" className="mt-4 rounded bg-blue-400 hover:bg-blue-500 py-2 text-white transition">Done</button>
                </form>
            </div>
        </div>
        </>
    )
}
export default Deliver