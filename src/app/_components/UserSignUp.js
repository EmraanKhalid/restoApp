import { useRouter } from "next/navigation";
import { useState } from "react";

const UserSignUp = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState(''); 
    const [contact, setContact] = useState('');
    const router = useRouter();


    const handleSignup = async () => {
        console.log(name,email,password,confirmPassword,city,address,contact);
        let response = await fetch("http://localhost:3000/api/user",{
            method: "POST",
            body: JSON.stringify({name, email, password,city,address,contact})
        })
        response = await response.json();
        if(response.success){
            const result = response;
            delete result.password;
            localStorage.setItem('user',JSON.stringify(result));
            if(props.redirect){
                router.push('/order');
            }
            else{
                router.push('/')
            }
        }
    }
    return (
        <div>
            <div className="input-wrapper">
                <input type="text" className="input-field" value={name} onChange={(event)=>setName(event.target.value)} placeholder="Enter Name" />
            </div>

            <div className="input-wrapper">
                <input type="text" className="input-field" value={email} onChange={(event)=>setEmail(event.target.value)} placeholder="Enter Your Email" />
            </div>

            <div className="input-wrapper">
                <input type="password" className="input-field" value={password} onChange={(event)=>setPassword(event.target.value)} placeholder="Enter your Password" />
            </div>

            <div className="input-wrapper">
                <input type="password" className="input-field" value={confirmPassword} onChange={(event)=>setConfirmPassword(event.target.value)} placeholder="Enter your Password Again" />
            </div>

            <div className="input-wrapper">
                <input type="text" className="input-field" value={city} onChange={(event)=>setCity(event.target.value)} placeholder="Enter Your City"/>
            </div>

            <div className="input-wrapper">
                <input type="text" className="input-field" value={address} onChange={(event)=>setAddress(event.target.value)} placeholder="Enter Your Complete Address" />
            </div>

            <div className="input-wrapper">
                <input type="text" className="input-field" value={contact} onChange={(event)=>setContact(event.target.value)} placeholder="Enter Your Contact Number" />
            </div>

            <div className="input-wrapper">
                <button onClick={handleSignup} className="button">Sign Up</button>
            </div>

        </div>
    )
}

export default UserSignUp;