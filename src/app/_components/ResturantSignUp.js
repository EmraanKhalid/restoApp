import { useState } from "react";

const ResturantSignUp = ()=>{
    const [email, setEmail] = useState("");
    const [password,SetPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [resturantName, setResturantName] = useState("");
    const [city,setCity] = useState("");
    const [address,setAddress]= useState("");
    const [contact,setContact] = useState("");

    const handleSignup = async()=> {
        console.log(email, password,confirmPassword,resturantName, city, address,contact);
        let result = await fetch("http://localhost:3000/api/resturant",{
            method:"POST",
            body:JSON.stringify({email,password,resturantName,city,address,contact})
        });
        result = await result.json();
        console.log(result);
        if(result.success){
            alert("Restaurant Added Successfully"); 
        }

    }
    
    return(
        <>
            <h3>Sign Up Component</h3>
            <div>
                <div className="input-wrapper">
                    <input type="text" placeholder="Enter Your Email id" className="input-field" value={email} 
                    onChange={(event)=>setEmail(event.target.value)}/>
                </div>
                <div className="input-wrapper">
                    <input type="password" placeholder="Enter Your Password" className="input-field" value={password}
                    onChange={(event)=>SetPassword(event.target.value)}/>
                </div>
                <div className="input-wrapper">
                    <input type="password" placeholder="Confirm Password" className="input-field" value={confirmPassword}
                    onChange={(event)=>setConfirmPassword(event.target.value)}/>
                </div>
                <div className="input-wrapper">
                    <input type="text" placeholder="Enter Resturant Name" className="input-field" value={resturantName}
                    onChange={(event)=>setResturantName(event.target.value)}/>
                </div>
                <div className="input-wrapper">
                    <input type="text" placeholder="Enter Resturant City" className="input-field" value={city}
                    onChange={(event)=>setCity(event.target.value)} />
                </div>
                <div className="input-wrapper">
                    <input type="text" placeholder="Enter Resturant Full Address" className="input-field" value={address}
                    onChange={(event)=>setAddress(event.target.value)} />
                </div>
                <div className="input-wrapper">
                    <input type="text" placeholder="Enter Resturant Contact Number" className="input-field" value={contact}
                    onChange={(event)=>setContact(event.target.value)}/>
                </div>
                <div className="input-wrapper">
                    <button className="button" onClick={handleSignup}>Sign Up</button>
                </div>
            </div>
        </>
    )
}

export default ResturantSignUp;