"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ResturantLogin = () =>{
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState(false);
    const router = useRouter();
    const handleLogin =  async () => {
        if(!email || !password)
        {
            setError(true);
            return false;
        }
        else{
            setError(false);
        }
        let response = await fetch("http://localhost:3000/api/resturant",{
            method: "POST",
            body:JSON.stringify({email,password,login:(true)})
        });

        response = await response.json();
        if(response.success)
        {
            const {result} = response;
            delete result.password;
            localStorage.setItem("restaurantUser",JSON.stringify(result));
            router.push("/resturant/dashboard");
        }   
        else {
            alert("Login Failed");
        }
    }

    return(
        <>
            <h3>Login Component</h3>
            <div>
                <div className="input-wrapper">
                    <input type="text" placeholder="Enter Your Email id" className="input-field" 
                    value={email} onChange={(event)=>setEmail(event.target.value)}/>
                    {
                        error && !email && <span className="input-error">Email Field is Empty.</span>
                    }
                </div>
                <div className="input-wrapper">
                    <input type="password" placeholder="Enter Your Password" className="input-field"
                    value={password} onChange={(event)=>setPassword(event.target.value)} />
                    {
                        error && !password && <span className="input-error">Password Field is empty.</span>
                    }
                </div>
                <div className="input-wrapper">
                    <button className="button" onClick={handleLogin}>Login</button>
                </div>
            </div>
        </>
    )
}

export default ResturantLogin;